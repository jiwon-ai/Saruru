import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView, Animated, Easing,
  StyleSheet, ActivityIndicator, Switch,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors, EMOTIONS } from './src/theme';
import { getReframe } from './src/ai';
import { Incident, ReframeResult } from './src/types';

type Screen = 'home' | 'capture' | 'reframe' | 'melt' | 'released' | 'crisis';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [streak, setStreak] = useState(0);
  const [deleteAfterMelt, setDeleteAfterMelt] = useState(true);
  const [night, setNight] = useState(false); // '오늘의 마무리' 진입 여부

  const [text, setText] = useState('');
  const [emotions, setEmotions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [reframe, setReframe] = useState<ReframeResult | null>(null);

  const reset = () => { setText(''); setEmotions([]); setReframe(null); setNight(false); };

  const startCapture = (isNight: boolean) => { setNight(isNight); setScreen('capture'); };

  const toggleEmotion = (e: string) =>
    setEmotions((prev) => (prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]));

  const onContinue = async () => {
    if (!text.trim()) return;
    setScreen('reframe');
    setLoading(true);
    const incident: Incident = { text: text.trim(), emotions };
    const r = await getReframe(incident);
    setLoading(false);
    setReframe(r);
    if (r.safety.flag) setScreen('crisis');
  };

  const onReleased = () => {
    setStreak((s) => s + 1);
    if (deleteAfterMelt) reset(); else setNight(false);
    setScreen('home');
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      {screen === 'home' && (
        <Home streak={streak} onStart={startCapture} deleteAfterMelt={deleteAfterMelt} setDeleteAfterMelt={setDeleteAfterMelt} />
      )}
      {screen === 'capture' && (
        <Capture text={text} setText={setText} emotions={emotions} toggleEmotion={toggleEmotion} night={night} onContinue={onContinue} onBack={() => setScreen('home')} />
      )}
      {screen === 'reframe' && (
        <Reframe loading={loading} reframe={reframe} onMelt={() => setScreen('melt')} />
      )}
      {screen === 'melt' && <Melt line={reframe?.melt_line || '이건 내가 짊어질 게 아니다.'} onDone={() => setScreen('released')} />}
      {screen === 'released' && <Released onHome={onReleased} />}
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

function Home({ streak, onStart, deleteAfterMelt, setDeleteAfterMelt }: any) {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.brand}>사르르</Text>
      <Text style={styles.slogan}>쌓이기 전에, 녹여 보내요</Text>

      <View style={styles.card}>
        <Text style={styles.streakNum}>{streak}</Text>
        <Text style={styles.streakLabel}>번 녹여 보냈어요</Text>
      </View>

      <Text style={styles.body}>오늘, 마음에 남은 일이 있나요? 쌓이기 전에 사르르 녹여 보내요.</Text>

      <Btn label="마음 녹이기" onPress={() => onStart(false)} />
      <Btn label="🌙 오늘의 마무리 (밤 의식)" onPress={() => onStart(true)} ghost />

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>녹이면 기록 삭제</Text>
        <Switch value={deleteAfterMelt} onValueChange={setDeleteAfterMelt} trackColor={{ true: colors.accent }} />
      </View>
      <Text style={styles.disclaimer}>사르르는 의료·치료·상담·진단 서비스가 아니에요.</Text>
    </ScrollView>
  );
}

function Capture({ text, setText, emotions, toggleEmotion, night, onContinue, onBack }: any) {
  return (
    <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
      <Pressable onPress={onBack}><Text style={styles.back}>←</Text></Pressable>
      <Text style={styles.h2}>{night ? '오늘 녹이고 갈 거 있어요?' : '무슨 일이 있었어요?'}</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        multiline
        placeholder="한 줄이면 충분해요. (키보드 마이크로 말해도 돼요.)"
        placeholderTextColor={colors.muted}
        textAlignVertical="top"
      />
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
        <View style={styles.note}>
          <Text style={styles.noteText}>{line}</Text>
        </View>
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

function Crisis({ onHome }: { onHome: () => void }) {
  return (
    <ScrollView contentContainerStyle={[styles.screen, styles.center]}>
      <Text style={styles.h2}>잠깐, 당신이 걱정돼요.</Text>
      <Text style={[styles.body, { textAlign: 'center' }]}>
        지금 많이 힘들다면, 혼자 견디지 않아도 돼요. 아래로 바로 연결돼요.
      </Text>
      <View style={[styles.card, { marginTop: 16 }]}>
        <Text style={styles.resource}>· 자살예방상담전화 109</Text>
        <Text style={styles.resource}>· 정신건강상담 1577-0199</Text>
        <Text style={styles.resourceSub}>24시간 · 비밀 보장 안내는 기관 정책에 따라요.</Text>
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
  brand: { fontSize: 26, fontWeight: '700', color: colors.accent },
  slogan: { fontSize: 14, color: colors.muted, marginTop: 4, marginBottom: 24 },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 20 },
  streakNum: { fontSize: 34, fontWeight: '700', color: colors.ink },
  streakLabel: { fontSize: 12, color: colors.muted, marginTop: 4 },
  body: { fontSize: 15, color: colors.muted, lineHeight: 23, marginBottom: 20 },
  back: { fontSize: 24, color: colors.muted, marginBottom: 8 },
  h2: { fontSize: 20, fontWeight: '700', color: colors.ink, marginBottom: 16 },
  input: { backgroundColor: colors.card, borderRadius: 12, padding: 14, minHeight: 120, fontSize: 16, color: colors.ink, marginBottom: 18 },
  smallLabel: { fontSize: 12, color: colors.muted, marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  chip: { backgroundColor: colors.card, borderRadius: 999, paddingVertical: 7, paddingHorizontal: 13 },
  chipOn: { backgroundColor: colors.accentSoft },
  chipText: { fontSize: 13, color: colors.muted },
  chipTextOn: { color: colors.accent, fontWeight: '600' },
  btn: { backgroundColor: colors.accent, borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 6 },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  btnGhost: { borderWidth: 1.5, borderColor: colors.accent, borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 12 },
  btnGhostText: { color: colors.accent, fontSize: 15, fontWeight: '600' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28 },
  settingLabel: { fontSize: 14, color: colors.ink },
  disclaimer: { fontSize: 11, color: colors.muted, marginTop: 24, textAlign: 'center' },
  reCard: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 12 },
  reLabel: { fontSize: 11, color: colors.accent, fontWeight: '700', marginBottom: 6 },
  reText: { fontSize: 15, color: colors.ink, lineHeight: 22 },
  note: { backgroundColor: '#F1EFEA', borderRadius: 8, paddingVertical: 22, paddingHorizontal: 24, transform: [{ rotate: '-2deg' }] },
  noteText: { fontSize: 16, color: '#2B3038', textAlign: 'center' },
  meltHint: { color: colors.pale, fontSize: 14, marginTop: 28 },
  releasedTitle: { fontSize: 22, fontWeight: '700', color: colors.ink, marginBottom: 8, textAlign: 'center' },
  resource: { fontSize: 15, color: colors.ink, lineHeight: 26 },
  resourceSub: { fontSize: 11, color: colors.muted, marginTop: 8 },
});
