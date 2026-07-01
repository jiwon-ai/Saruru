import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Switch, Animated, Easing } from 'react-native';
import { colors } from './theme';
import { getReframe } from './ai';
import { ReframeResult } from './types';
import { track } from './analytics';
import { startTrial } from './purchases';

type Prefs = { deleteAfterMelt: boolean; bedtimeReminder: boolean; isPlus: boolean };

const SAMPLES = [
  '손님이 쿠폰을 제 앞에서 찢어 던졌어요.',
  '상사가 사람들 앞에서 면박을 줬어요.',
  '친한 친구가 약속을 또 어겼어요.',
];

// 온보딩 안의 실제 '녹이기' — 효과를 체감시키는 핵심 순간.
function OnbMelt({ line, onDone, font }: { line: string; onDone: () => void; font?: string }) {
  const opacity = useRef(new Animated.Value(1)).current;
  const ty = useRef(new Animated.Value(0)).current;
  const f = font ? { fontFamily: font } : null;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 2200, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      Animated.timing(ty, { toValue: 28, duration: 2200, easing: Easing.in(Easing.quad), useNativeDriver: true }),
    ]).start();
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, []);
  return (
    <View style={[s.center, { flex: 1 }]}>
      <Animated.View style={{ opacity, transform: [{ translateY: ty }] }}>
        <View style={s.noteBox}><Text style={[s.noteText, f]}>{line}</Text></View>
      </Animated.View>
      <Text style={[s.melted, f]}>사르르…</Text>
    </View>
  );
}

export default function Onboarding({ onDone, font }: { onDone: (p: Prefs) => void; font?: string }) {
  const [step, setStep] = useState(0);
  const [reminder, setReminder] = useState(true);
  const [tried, setTried] = useState<ReframeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [variant] = useState<'A' | 'B'>(() => (Math.random() < 0.5 ? 'A' : 'B'));
  const f = font ? { fontFamily: font } : null;
  const next = () => setStep((x) => x + 1);

  useEffect(() => { if (step === 6) track('paywall_view', { variant }); }, [step, variant]);

  const tryReframe = async (text: string) => {
    setLoading(true);
    const r = await getReframe({ text, emotions: [] });
    setLoading(false);
    setTried(r);
  };

  const finish = (isPlus: boolean) => onDone({ deleteAfterMelt: true, bedtimeReminder: reminder, isPlus });

  return (
    <ScrollView contentContainerStyle={s.wrap}>
      {step === 0 && (
        <View style={s.center}>
          <Text style={[s.brand, f]}>사르르</Text>
          <Text style={[s.h, f]}>사람 때문에 상한 마음,{'\n'}혼자 삼키지 마세요.</Text>
          <Text style={[s.body, f]}>사람한테 받은 감정, 쌓이기 전에 사르르 녹여 보내요.</Text>
          <Text style={[s.anon, f]}>로그인 없이 익명으로 시작해요.</Text>
          <Btn label="시작하기" onPress={next} font={font} />
        </View>
      )}

      {step === 1 && (
        <View style={s.center}>
          <Text style={[s.h, f]}>상처 준 사람 뒤,{'\n'}그 감정 어디에 두세요?</Text>
          <Text style={[s.body, f]}>참고 삼키면 번아웃이 돼요. 사르르는 그 전에 녹여요.</Text>
          <Btn label="다음" onPress={next} font={font} />
        </View>
      )}

      {step === 2 && (
        <View style={s.center}>
          <Text style={[s.h, f]}>당신의 감정은 상품이 아니에요.</Text>
          <Text style={[s.body, f]}>기록은 내 기기에만 남고, 녹이면 사라져요. 광고에 쓰지 않고, 팔지 않아요. 로그인도 없어요.</Text>
          <View style={s.row}>
            <Text style={[s.body, { marginBottom: 0 }, f]}>자기 전, 잔잔한 알림</Text>
            <Switch value={reminder} onValueChange={setReminder} trackColor={{ true: colors.accent }} />
          </View>
          <Btn label="알겠어요" onPress={next} font={font} />
        </View>
      )}

      {step === 3 && (
        <View>
          <Text style={[s.h, f]}>한 번 해볼까요?</Text>
          {!tried ? (
            <>
              <Text style={[s.body, f]}>비슷한 일을 골라보세요. 어떻게 정리되는지 바로 보여드릴게요.</Text>
              {SAMPLES.map((x) => (
                <Pressable key={x} style={s.sample} onPress={() => tryReframe(x)} disabled={loading}>
                  <Text style={[s.sampleText, f]}>{x}</Text>
                </Pressable>
              ))}
              {loading && <Text style={[s.body, f]}>정리하는 중…</Text>}
            </>
          ) : (
            <>
              <View style={s.reCard}><Text style={[s.reLabel, f]}>당신 잘못이 아니에요</Text><Text style={[s.reText, f]}>{tried.not_your_responsibility}</Text></View>
              <View style={s.reCard}><Text style={[s.reLabel, f]}>놓아주기</Text><Text style={[s.reText, f]}>{tried.closure_reframe}</Text></View>
              <Btn label="사르르 녹이기" onPress={next} font={font} />
            </>
          )}
        </View>
      )}

      {step === 4 && (
        <OnbMelt line={tried?.melt_line || '이건 내가 짊어질 게 아니다.'} onDone={next} font={font} />
      )}

      {step === 5 && (
        <View style={s.center}>
          <Text style={[s.h, f]}>녹아서 사라졌어요.{'\n'}조금 가벼워졌나요?</Text>
          <Text style={[s.body, f]}>이렇게 매일, 쌓이기 전에 녹여 보내요.</Text>
          <Btn label="네, 계속" onPress={next} font={font} />
        </View>
      )}

      {step === 6 && (
        <View>
          <Text style={[s.h, f]}>{variant === 'A' ? '방금처럼, 무제한으로.' : '쌓인 감정, 매일 비우세요.'}</Text>
          <View style={s.planCard}>
            <Text style={[s.planName, f]}>Saruru Plus</Text>
            {variant === 'A' ? (
              <>
                <Text style={[s.planPrice, f]}>연 ₩39,000 <Text style={s.planSmall}>· 하루 약 107원</Text></Text>
                <Text style={[s.planSmall, f]}>또는 월 ₩5,900 · 14일 무료 체험</Text>
              </>
            ) : (
              <>
                <Text style={[s.planPrice, f]}>월 ₩5,900 <Text style={s.planSmall}>· 첫 14일 무료</Text></Text>
                <Text style={[s.planSmall, f]}>연 ₩39,000으로 약 45% 절약</Text>
              </>
            )}
            <Text style={[s.planList, f]}>무제한 녹이기 · 깊은 리프레임 · 주간 사르르 레터 · 광고 없음</Text>
          </View>
          <Btn label="14일 무료 체험 시작" onPress={async () => { track('trial_start', { variant }); const ok = await startTrial(variant === 'B' ? 'monthly' : 'annual'); finish(ok); }} font={font} />
          <Pressable onPress={() => { track('paywall_skip', { variant }); finish(false); }}>
            <Text style={[s.skip, f]}>지금은 무료로 시작</Text>
          </Pressable>
          <Text style={[s.note, f]}>※ 가격은 출시 예정(검증용 가정값). 사르르는 의료기기가 아니에요.</Text>
        </View>
      )}
    </ScrollView>
  );
}

function Btn({ label, onPress, font }: { label: string; onPress: () => void; font?: string }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.btn, pressed && { opacity: 0.85 }]}>
      <Text style={[s.btnText, font ? { fontFamily: font } : null]}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  wrap: { flexGrow: 1, padding: 24, paddingTop: 72, justifyContent: 'center' },
  center: { alignItems: 'center' },
  brand: { fontSize: 30, fontWeight: '700', color: colors.accent, marginBottom: 20 },
  h: { fontSize: 22, fontWeight: '700', color: colors.ink, textAlign: 'center', lineHeight: 31, marginBottom: 14 },
  body: { fontSize: 15, color: colors.muted, lineHeight: 23, textAlign: 'center', marginBottom: 24 },
  anon: { fontSize: 13, color: colors.accent, textAlign: 'center', marginBottom: 20 },
  btn: { backgroundColor: colors.accent, borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 8, alignSelf: 'stretch' },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  sample: { backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 10 },
  sampleText: { fontSize: 15, color: colors.ink },
  reCard: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 12 },
  reLabel: { fontSize: 11, color: colors.accent, fontWeight: '700', marginBottom: 6 },
  reText: { fontSize: 15, color: colors.ink, lineHeight: 22 },
  noteBox: { backgroundColor: '#F1EFEA', borderRadius: 10, paddingVertical: 22, paddingHorizontal: 24, transform: [{ rotate: '-2deg' }], maxWidth: 300 },
  noteText: { fontSize: 16, color: '#2B3038', textAlign: 'center' },
  melted: { textAlign: 'center', color: colors.accent, fontSize: 14, marginTop: 28 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  planCard: { backgroundColor: colors.card, borderRadius: 14, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: colors.accentSoft },
  planName: { fontSize: 16, fontWeight: '700', color: colors.ink },
  planPrice: { fontSize: 20, fontWeight: '700', color: colors.ink, marginTop: 6 },
  planSmall: { fontSize: 13, color: colors.muted, fontWeight: '400' },
  planList: { fontSize: 13, color: colors.muted, marginTop: 10, lineHeight: 20 },
  skip: { textAlign: 'center', color: colors.muted, marginTop: 14, fontSize: 14 },
  note: { fontSize: 11, color: colors.muted, textAlign: 'center', marginTop: 16 },
});
