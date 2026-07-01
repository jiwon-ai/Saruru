import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'saruru.state.v1';

export type SaruruState = {
  onboarded: boolean;
  streak: number;
  lastMeltDate: string | null; // YYYY-MM-DD
  meltDates: string[]; // 최근 세션 날짜들(주간 레터용) — 텍스트는 저장 안 함
  todayCount: number; // 오늘 녹인 횟수(무료 일일 캡용)
  todayCountDate: string | null;
  deleteAfterMelt: boolean;
  bedtimeReminder: boolean;
  isPlus: boolean;
};

export const defaultState: SaruruState = {
  onboarded: false,
  streak: 0,
  lastMeltDate: null,
  meltDates: [],
  todayCount: 0,
  todayCountDate: null,
  deleteAfterMelt: true,
  bedtimeReminder: false,
  isPlus: false,
};

const FREE_DAILY_LIMIT = 1; // 무료: 하루 1회 AI 녹이기

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
    // 로컬 우선, 비치명적
  }
}

function dayStr(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}
export function todayStr(): string {
  return dayStr(Date.now());
}

// 무료는 하루 FREE_DAILY_LIMIT회. Plus는 무제한.
export function canMelt(s: SaruruState): boolean {
  if (s.isPlus) return true;
  if (s.todayCountDate !== todayStr()) return true;
  return s.todayCount < FREE_DAILY_LIMIT;
}

// 날짜 기반 연속 스트릭 + 오늘 횟수.
export function recordMelt(s: SaruruState): SaruruState {
  const today = todayStr();
  const yesterday = dayStr(Date.now() - 86400000);
  const twoDaysAgo = dayStr(Date.now() - 2 * 86400000);
  let streak: number;
  if (s.lastMeltDate === today) streak = s.streak || 1;
  else if (s.lastMeltDate === yesterday) streak = (s.streak || 0) + 1;
  else if (s.lastMeltDate === twoDaysAgo) streak = s.streak || 1; // 하루 건너뛰어도 유지(죄책감 방지)
  else streak = 1;
  const meltDates = [...s.meltDates, today].slice(-90);
  const todayCount = s.todayCountDate === today ? s.todayCount + 1 : 1;
  return { ...s, streak, lastMeltDate: today, meltDates, todayCount, todayCountDate: today };
}

export function meltsThisWeek(s: SaruruState): number {
  const wk = Date.now() - 7 * 86400000;
  return s.meltDates.filter((d) => new Date(d).getTime() >= wk).length;
}
