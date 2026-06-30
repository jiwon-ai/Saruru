import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView, Animated, Easing,
  StyleSheet, ActivityIndicator, Switch, Linking, Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { useFonts, GowunDodum_400Regular } from '@expo-google-fonts/gowun-dodum';
import { colors, EMOTIONS, EXAMPLES } from './src/theme';
import { getReframe } from './src/ai';
import { Incident, ReframeResult } from './src/types';
import { loadState, saveState, recordMelt, meltsThisWeek, canMelt, SaruruState, defaultState } from './src/storage';
import { scheduleBedtime, cancelBedtime, scheduleRetention } from './src/notify';
import Onboarding from './src/onboarding';
import { track, getEventCounts } from './src/analytics';
import { initPurchases, startTrial, checkEntitlement } from './src/purchases';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false }),
});

const FONT = 'GowunDodum_400Regular';
type Screen = 'home' | 'capture' | 'reframe' | 'melt' | 'released' | 'crisis' | 'letter' | 'upsell';

export default function App() {
  const [fontsLoaded] = useFonts({ GowunDodum_400Regular });
  const [state, setState] = useState<SaruruState | null>(null);
  const [screen, setScreen] = useState<Screen>('home');
  const [night, setNight] = useState(false);
  const [text, setText] = useState('');
  const [emotions, setEmotions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [reframe, setReframe] = useState<ReframeResult | null>(null);

  useEffect(() => {
    loadState().then((s) => { setState(s); checkEntitlement().then((p) => { if (p) { const ns = { ...s, isPlus: true }; setState(ns); saveState(ns); } }); });
    track('app_open'); scheduleRetention(); initPurchases();
  }, []);

  if (!fontsLoaded || !state) {
    return <View style={[styles.root, styles.center]}><ActivityIndicator color={colors.accent} /></View>;
  }

  const persist = (s: SaruruState) => { setState(s); saveState(s); };

  const onOnboardDone = async (p: { deleteAfterMelt: boolean; bedtimeReminder: boolean; isPlus: boolean }) => {
    const ns = { ...state, ...defaultState, onboarded: true, ...p };
    persist(ns);
    track('onboarding_done', { isPlus: p.isPlus, reminder: p.bedtimeReminder });
    if (p.bedtimeReminder) await scheduleBedtime();
  };

  if (!state.onboarded) return <Onboarding onDone={onOnboardDone} font={FONT} />;

  const reset = () => { setText(''); setEmotions([]); setReframe(null); setNight(false); };
  const startCapture = (isNight: boolean) => { if (!canMelt(state)) { track('upsell_view'); setScreen('upsell'); return; } track('melt_start', { night: isNight }); setNight(isNight); setScreen('capture'); };
  const toggleEmotion = (e: string) =>
    setEmotions((p) => (p.includes(e) ? p.filter((x) => x !== e) : [...p, e]));

  const onContinue = async () => {
    if (!text.trim()) return;
    setScreen('reframe'); setLoading(true);
    const r = await getReframe({ text: text.trim(), emotions } as Incident, state.isPlus);
    setLoading(false); setReframe(r);
    if (r.safety.flag) setScreen('crisis');
  };

  const onReleased = () => { track('melt_complete'); persist(recordMelt(state)); reset(); setScreen('home'); };

  const setReminder = async (on: boolean) => {
    persist({ ...state, bedtimeReminder: on });
    if (on) await scheduleBedtime(); else await cancelBedtime();
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      {screen === 'home' && (
        <Home state={state} onStart={startCapture} onLetter={() => setScreen('letter')}
          setDelete={(v: boolean) => persist({ ...state, deleteAfterMelt: v })} setReminder={setReminder} />
      )}
      {screen === 'capture' && (
        <Capture text={text} setText={setText} emotions={emotions} toggleEmotion={toggleEmotion}
          night={night} onContinue={onContinue} onBack={() => setScreen('home')} />
      )}
      {screen === 'reframe' && <Reframe loading={loading} reframe={reframe} onMelt={() => setScreen('melt')} />}
      {screen === 'melt' && <Melt line={reframe?.melt_line || '이건 내가 짊어질 게 아니다.'} onDone={() => setScreen('released')} />}
      {screen === 'released' && <Released onHome={onReleased} />}
      {screen === 'letter' && <Letter count={meltsThisWeek(state)} isPlus={state.isPlus} onUpsell={() => setScreen('upsell')} onHome={() => setScreen('home')} />}
      {screen === 'upsell' && <Upsell onStart={async () => { track('upsell_convert'); const ok = await startTrial('annual'); persist({ ...state, isPlus: ok || state.isPlus }); setScreen('home'); }} onHome={() => setScreen('home')} />}
      {screen === 'crisis' && <Crisis onHome={() => { reset(); setScreen('home'); }} />}
    </View>
  );
}

function Btn({ label, onPress, ghost }: { label: string; onPress: () => void; ghost?: boolean }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [ghost ? styles.btnGhost : styles.btn, pressed && { opacity: 0.85 }]}>
      <Text style={ghost ? styles.btnGhostText : styles.btnText}>{label}</Text>
    </Pressable>
  );
}

function Home({ state, onStart, onLetter, setDelete, setReminder }: any) {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.brand}>사르르</Text>
      <Text style={styles.slogan}>쌓이기 전에, 녹여 보내요</Text>
      <View style={styles.card}>
        <Text style={styles.streakNum}>{state.streak}</Text>
        <Text style={styles.streakLabel}>일 연속 깨끗하게</Text>
      </View>
      <Text style={styles.body}>오늘, 마음에 남은 일이 있나요? 쌓이기 전에 사르르 녹여 보내요.</Text>
      <Btn label="마음 녹이기" onPress={() => onStart(false)} />
      <Btn label="🌙 오늘의 마무리 (밤 의식)" onPress={() => onStart(true)} ghost />
      <Pressable onPress={onLetter}><Text style={styles.link}>이번 주 사르르 레터 보기 ›</Text></Pressable>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>녹이면 기록 삭제</Text>
        <Switch value={state.deleteAfterMelt} onValueChange={setDelete} trackColor={{ true: colors.accent }} />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>취침 전 알림(밤 의식)</Text>
        <Switch value={state.bedtimeReminder} onValueChange={setReminder} trackColor={{ true: colors.accent }} />
      </View>
      {__DEV__ && (
        <Pressable onPress={async () => { const c = await getEventCounts(); Alert.alert('퍼널 카운트', JSON.stringify(c, null, 2)); }}>
          <Text style={styles.link}>디버그: 퍼널 카운트</Text>
        </Pressable>
      )}
      <Text style={styles.disclaimer}>사르르는 의료·치료·상담·진단 서비스가 아니에요.</Text>
    </ScrollView>
  );
}

function Capture({ text, setText, emotions, toggleEmotion, night, onContinue, onBack }: any) {
  return (
    <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
      <Pressable onPress={onBack}><Text style={styles.back}>←</Text></Pressable>
      <Text style={styles.h2}>{night ? '오늘 녹이고 갈 거 있어요?' : '무슨 일이 있었어요?'}</Text>
      <TextInput style={styles.input} value={text} onChangeText={setText} multiline
        placeholder="한 줄이면 충분해요. (키보드 마이크로 말해도 돼요.)" placeholderTextColor={colors.muted} textAlignVertical="top" />
      {!text.trim() && (
        <View style={styles.exWrap}>
          <Text style={styles.smallLabel}>막막하면, 예시로 시작해요 (눌러서 내 얘기로 고쳐요)</Text>
          {EXAMPLES.map((ex: string) => (
            <Pressable key={ex} onPress={() => setText(ex)} style={styles.exChip}>
              <Text style={styles.exText}>{ex}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <Text style={styles.smallLabel}>지금 기분은? (선택)</Text>
      <View style={styles.chips}>
        {EMOTIONS.map((e) => {
          const on = emotions.includes(e);
          return (
            <Pressable key={e} onPress={() => toggleEmotion(e)} style={[styles.chip, on && styles.chipOn]}>
              <Text style={[styles.chipText, on && styles.chipTextOn]}>{e}</Text>
            </Pressable>
          );
        })}
      </View>
      <Btn label="다음" onPress={onContinue} />
    </ScrollView>
  );
}

function ReframeCard({ label, children }: { label: string; children: string }) {
  return (
    <View style={styles.reCard}>
      <Text style={styles.reLabel}>{label}</Text>
      <Text style={styles.reText}>{children}</Text>
    </View>
  );
}

function Reframe({ loading, reframe, onMelt }: any) {
  if (loading || !reframe) {
    return (
      <View style={[styles.screen, styles.center]}>
        <ActivityIndicator color={colors.accent} />
        <Text style={[styles.body, { marginTop: 12 }]}>마음을 정리하는 중…</Text>
      </View>
    );
  }
  const r = reframe as ReframeResult;
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.h2}>다시 한 번, 이렇게 봐요</Text>
      <ReframeCard label="당신 잘못이 아니에요">{r.not_your_responsibility}</ReframeCard>
      <ReframeCard label="왜 아팠나">{r.why_it_stung}</ReframeCard>
      <ReframeCard label="놓아주기">{r.closure_reframe}</ReframeCard>
      {r.boundary_line ? <ReframeCard label="다음엔 (선택)">{r.boundary_line}</ReframeCard> : null}
      <Btn label="사르르 녹이기" onPress={onMelt} />
    </ScrollView>
  );
}

function Melt({ line, onDone }: { line: string; onDone: () => void }) {
  const opacity = useRef(new Animated.Value(1)).current;
  const ty = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 2200, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      Animated.timing(ty, { toValue: 26, duration: 2200, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      Animated.timing(scale, { toValue: 0.94, duration: 2200, useNativeDriver: true }),
    ]).start();
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, []);
  return (
    <View style={[styles.screen, styles.center, { backgroundColor: colors.dark }]}>
      <Animated.View style={{ opacity, transform: [{ translateY: ty }, { scale }] }}>
        <View style={styles.note}><Text style={styles.noteText}>{line}</Text></View>
      </Animated.View>
      <Text style={styles.meltHint}>사르르…</Text>
    </View>
  );
}

function Released({ onHome }: { onHome: () => void }) {
  return (
    <View style={[styles.screen, styles.center]}>
      <Text style={styles.releasedTitle}>녹아서 사라졌어요.</Text>
      <Text style={styles.body}>더는 짊어지지 않아도 돼요.</Text>
      <View style={{ height: 24 }} />
      <Btn label="돌아가기" onPress={onHome} />
    </View>
  );
}

function Letter({ count, isPlus, onUpsell, onHome }: { count: number; isPlus: boolean; onUpsell: () => void; onHome: () => void }) {
  const line = count === 0
    ? '이번 주는 아직이네요. 오늘 하나, 가볍게 녹여볼까요?'
    : '쌓이기 전에 흘려보낸 당신, 잘하고 있어요. 그 무게는 더 이상 당신 것이 아니에요.';
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Pressable onPress={onHome}><Text style={styles.back}>←</Text></Pressable>
      <Text style={styles.brand}>이번 주 사르르 레터</Text>
      <View style={[styles.card, { marginTop: 20 }]}>
        <Text style={styles.streakNum}>{count}</Text>
        <Text style={styles.streakLabel}>번 마음을 녹여 보냈어요</Text>
      </View>
      {isPlus ? (
        <>
          <Text style={styles.body}>{line}</Text>
          <Btn label="돌아가기" onPress={onHome} ghost />
        </>
      ) : (
        <>
          <Text style={styles.body}>주간 레터는 Plus에서 매주 따뜻한 회고로 만나요.</Text>
          <Btn label="Plus로 받아보기" onPress={onUpsell} />
          <Btn label="돌아가기" onPress={onHome} ghost />
        </>
      )}
    </ScrollView>
  );
}

function Upsell({ onStart, onHome }: { onStart: () => void; onHome: () => void }) {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Pressable onPress={onHome}><Text style={styles.back}>←</Text></Pressable>
      <Text style={styles.h2}>오늘의 무료 녹이기를 다 썼어요</Text>
      <Text style={styles.body}>Plus로 마음을 무제한으로 녹이고, 매주 사르르 레터를 받아보세요.</Text>
      <View style={[styles.card, { alignItems: 'flex-start' }]}>
        <Text style={styles.resource}>· 무제한 녹이기</Text>
        <Text style={styles.resource}>· 깊은 AI 리프레임</Text>
        <Text style={styles.resource}>· 주간 사르르 레터 · 광고 없음</Text>
      </View>
      <Text style={styles.body}>연 ₩39,000 (하루 약 107원) · 14일 무료 체험</Text>
      <Btn label="14일 무료 체험 시작" onPress={onStart} />
      <Btn label="내일 다시" onPress={onHome} ghost />
      <Text style={styles.disclaimer}>※ 가격은 출시 예정(가정값). 실결제는 추후 연동.</Text>
    </ScrollView>
  );
}

function Crisis({ onHome }: { onHome: () => void }) {
  return (
    <ScrollView contentContainerStyle={[styles.screen, styles.center]}>
      <Text style={styles.h2}>잠깐, 당신이 걱정돼요.</Text>
      <Text style={[styles.body, { textAlign: 'center' }]}>지금 많이 힘들다면, 혼자 견디지 않아도 돼요. 아래로 바로 연결돼요.</Text>
      <View style={[styles.card, { marginTop: 16, alignItems: 'flex-start' }]}>
        <Pressable onPress={() => Linking.openURL('tel:109')}><Text style={styles.resource}>· 자살예방상담전화 109  (전화 걸기)</Text></Pressable>
        <Pressable onPress={() => Linking.openURL('tel:1577-0199')}><Text style={styles.resource}>· 정신건강상담 1577-0199  (전화 걸기)</Text></Pressable>
        <Text style={styles.resourceSub}>24시간 연결돼요.</Text>
      </View>
      <View style={{ height: 16 }} />
      <Btn label="돌아가기" onPress={onHome} ghost />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  screen: { flexGrow: 1, padding: 24, paddingTop: 64 },
  center: { justifyContent: 'center', alignItems: 'center' },
  brand: { fontSize: 26, color: colors.accent, fontFamily: FONT },
  slogan: { fontSize: 14, color: colors.muted, marginTop: 4, marginBottom: 24, fontFamily: FONT },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 20 },
  streakNum: { fontSize: 34, color: colors.ink, fontFamily: FONT },
  streakLabel: { fontSize: 12, color: colors.muted, marginTop: 4, fontFamily: FONT },
  body: { fontSize: 15, color: colors.muted, lineHeight: 23, marginBottom: 20, fontFamily: FONT },
  link: { color: colors.accent, fontSize: 14, marginTop: 14, fontFamily: FONT },
  back: { fontSize: 24, color: colors.muted, marginBottom: 8 },
  h2: { fontSize: 20, color: colors.ink, marginBottom: 16, fontFamily: FONT },
  input: { backgroundColor: colors.card, borderRadius: 12, padding: 14, minHeight: 120, fontSize: 16, color: colors.ink, marginBottom: 18, fontFamily: FONT },
  smallLabel: { fontSize: 12, color: colors.muted, marginBottom: 8, fontFamily: FONT },
  exWrap: { marginBottom: 16 },
  exChip: { backgroundColor: colors.card, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 8 },
  exText: { fontSize: 14, color: colors.muted, fontFamily: FONT },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  chip: { backgroundColor: colors.card, borderRadius: 999, paddingVertical: 7, paddingHorizontal: 13 },
  chipOn: { backgroundColor: colors.accentSoft },
  chipText: { fontSize: 13, color: colors.muted, fontFamily: FONT },
  chipTextOn: { color: colors.accent },
  btn: { backgroundColor: colors.accent, borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 6 },
  btnText: { color: colors.white, fontSize: 16, fontFamily: FONT },
  btnGhost: { borderWidth: 1.5, borderColor: colors.accent, borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 12 },
  btnGhostText: { color: colors.accent, fontSize: 15, fontFamily: FONT },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 },
  settingLabel: { fontSize: 14, color: colors.ink, fontFamily: FONT },
  disclaimer: { fontSize: 11, color: colors.muted, marginTop: 24, textAlign: 'center', fontFamily: FONT },
  reCard: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 12 },
  reLabel: { fontSize: 11, color: colors.accent, marginBottom: 6, fontFamily: FONT },
  reText: { fontSize: 15, color: colors.ink, lineHeight: 22, fontFamily: FONT },
  note: { backgroundColor: '#F1EFEA', borderRadius: 8, paddingVertical: 22, paddingHorizontal: 24, transform: [{ rotate: '-2deg' }] },
  noteText: { fontSize: 16, color: '#2B3038', textAlign: 'center', fontFamily: FONT },
  meltHint: { color: colors.pale, fontSize: 14, marginTop: 28, fontFamily: FONT },
  releasedTitle: { fontSize: 22, color: colors.ink, marginBottom: 8, textAlign: 'center', fontFamily: FONT },
  resource: { fontSize: 15, color: colors.ink, lineHeight: 26, fontFamily: FONT },
  resourceSub: { fontSize: 11, color: colors.muted, marginTop: 8, fontFamily: FONT },
});
