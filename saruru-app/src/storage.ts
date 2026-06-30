import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'saruru.state.v1';

export type SaruruState = {
  onboarded: boolean;
  streak: number;
  lastMeltDate: string | null; // YYYY-MM-DD
  meltDates: string[]; // 최근 세션 날짜들(주간 레터용) — 텍스트는 저장 안 함
  deleteAfterMelt: boolean;
  bedtimeReminder: boolean;
  isPlus: boolean;
};

export const defaultState: SaruruState = {
  onboarded: false,
  streak: 0,
  lastMeltDate: null,
  meltDates: [],
  deleteAfterMelt: true,
  bedtimeReminder: false,
  isPlus: false,
};

export async function loadState(): Promise<SaruruState> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? { ...defaultState, ...JSON.parse(raw) } : defaultState;
  } catch {
    return defaultState;
  }
}

export async function saveState(s: SaruruState): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // 저장 실패는 조용히 무시(로컬 우선, 비치명적)
  }
}

function dayStr(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}
export function todayStr(): string {
  return dayStr(Date.now());
}

// 날짜 기반 연속 스트릭 — 같은 날 여러 번 녹여도 1일로 카운트.
export function recordMelt(s: SaruruState): SaruruState {
  const today = todayStr();
  const yesterday = dayStr(Date.now() - 86400000);
  let streak: number;
  if (s.lastMeltDate === today) streak = s.streak || 1;
  else if (s.lastMeltDate === yesterday) streak = (s.streak || 0) + 1;
  else streak = 1;
  const meltDates = [...s.meltDates, today].slice(-90);
  return { ...s, streak, lastMeltDate: today, meltDates };
}

export function meltsThisWeek(s: SaruruState): number {
  const wk = Date.now() - 7 * 86400000;
  return s.meltDates.filter((d) => new Date(d).getTime() >= wk).length;
}
