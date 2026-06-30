import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Switch } from 'react-native';
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

export default function Onboarding({ onDone, font }: { onDone: (p: Prefs) => void; font?: string }) {
  const [step, setStep] = useState(0);
  const [reminder, setReminder] = useState(true);
  const [tried, setTried] = useState<ReframeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const f = font ? { fontFamily: font } : null;
  const [variant] = useState<'A' | 'B'>(() => (Math.random() < 0.5 ? 'A' : 'B'));
  useEffect(() => { if (step === 5) track('paywall_view', { variant }); }, [step, variant]);

  const next = () => setStep((s) => s + 1);

  const tryReframe = async (text: string) => {
    setLoading(true);
    const r = await getReframe({ text, emotions: [] });
    setLoading(false);
    setTried(r);
  };

  return (
    <ScrollView contentContainerStyle={s.wrap}>
      {step === 0 && (
        <View style={s.center}>
          <Text style={[s.brand, f]}>사르르</Text>
          <Text style={[s.h, f]}>사람 때문에 상한 마음,{'\n'}혼자 삼키지 마세요.</Text>
          <Text style={[s.body, f]}>사람한테 받은 감정, 쌓이기 전에 사르르 녹여 보내요.</Text>
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
              <Text style={[s.melted, f]}>사르르… 녹았어요 ✨</Text>
              <Btn label="좋아요, 계속" onPress={next} font={font} />
            </>
          )}
        </View>
      )}

      {step === 3 && (
        <View style={s.center}>
          <Text style={[s.h, f]}>당신의 감정은 상품이 아니에요.</Text>
          <Text style={[s.body, f]}>기록은 기기에 남고, 녹이면 지워져요. 광고에 쓰지 않고, 팔지 않아요. AI 정리에는 텍스트만 쓰고 음성은 저장하지 않아요.</Text>
          <Btn label="알겠어요" onPress={next} font={font} />
        </View>
      )}

      {step === 4 && (
        <View style={s.center}>
          <Text style={[s.h, f]}>🌙 자기 전, 오늘의 마무리</Text>
          <Text style={[s.body, f]}>오늘 건 오늘 녹이고 깨끗하게 잘 수 있게, 잔잔한 알림을 보내드릴까요?</Text>
          <View style={s.row}><Text style={[s.body, { marginBottom: 0 }, f]}>취침 전 알림</Text><Switch value={reminder} onValueChange={setReminder} trackColor={{ true: colors.accent }} /></View>
          <Btn label="다음" onPress={next} font={font} />
        </View>
      )}

      {step === 5 && (
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
          <Btn label="14일 무료 체험 시작" onPress={async () => { track('trial_start', { variant }); const ok = await startTrial(variant === 'B' ? 'monthly' : 'annual'); onDone({ deleteAfterMelt: true, bedtimeReminder: reminder, isPlus: ok }); }} font={font} />
          <Pressable onPress={() => { track('paywall_skip', { variant }); onDone({ deleteAfterMelt: true, bedtimeReminder: reminder, isPlus: false }); }}>
            <Text style={[s.skip, f]}>지금은 무료로 시작</Text>
          </Pressable>
          <Text style={[s.note, f]}>※ 가격은 출시 예정(검증용 가정값).</Text>
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
  btn: { backgroundColor: colors.accent, borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 8, alignSelf: 'stretch' },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  sample: { backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 10 },
  sampleText: { fontSize: 15, color: colors.ink },
  reCard: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 12 },
  reLabel: { fontSize: 11, color: colors.accent, fontWeight: '700', marginBottom: 6 },
  reText: { fontSize: 15, color: colors.ink, lineHeight: 22 },
  melted: { textAlign: 'center', color: colors.accent, fontSize: 14, marginVertical: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  planCard: { backgroundColor: colors.card, borderRadius: 14, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: colors.accentSoft },
  planName: { fontSize: 16, fontWeight: '700', color: colors.ink },
  planPrice: { fontSize: 20, fontWeight: '700', color: colors.ink, marginTop: 6 },
  planSmall: { fontSize: 13, color: colors.muted, fontWeight: '400' },
  planList: { fontSize: 13, color: colors.muted, marginTop: 10, lineHeight: 20 },
  skip: { textAlign: 'center', color: colors.muted, marginTop: 14, fontSize: 14 },
  note: { fontSize: 11, color: colors.muted, textAlign: 'center', marginTop: 16 },
});
