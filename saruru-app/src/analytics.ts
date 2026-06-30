import AsyncStorage from '@react-native-async-storage/async-storage';

// 익명 이벤트만 수집. 사용자가 적은 사건/감정 텍스트는 절대 다루지 않는다.
// ENDPOINT 설정 시 익명 이벤트를 POST(없으면 로컬 집계만). PII 없음.
const ENDPOINT = '';
const AID_KEY = 'saruru.aid.v1';
const EV_KEY = 'saruru.events.v1';

let aid: string | null = null;

function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function getAid(): Promise<string> {
  if (aid) return aid;
  let v = await AsyncStorage.getItem(AID_KEY);
  if (!v) {
    v = uuid();
    await AsyncStorage.setItem(AID_KEY, v);
  }
  aid = v;
  return v;
}

type Props = Record<string, number | string | boolean>;

// event = 화면/행동 이름만. props 도 숫자/불리언 등 비식별 값만 넣을 것.
export async function track(event: string, props: Props = {}): Promise<void> {
  try {
    const id = await getAid();
    const rec = { event, props, t: Date.now() };
    const raw = await AsyncStorage.getItem(EV_KEY);
    const arr = raw ? (JSON.parse(raw) as unknown[]) : [];
    arr.push(rec);
    await AsyncStorage.setItem(EV_KEY, JSON.stringify(arr.slice(-500)));
    if (ENDPOINT) {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ aid: id, ...rec }),
      }).catch(() => {});
    }
  } catch {
    // 분석 실패는 비치명적 — 앱 흐름을 막지 않는다.
  }
}

// 로컬 퍼널 점검용(개발 중 콘솔 확인).
export async function getEventCounts(): Promise<Record<string, number>> {
  try {
    const raw = await AsyncStorage.getItem(EV_KEY);
    const arr = raw ? (JSON.parse(raw) as { event: string }[]) : [];
    const c: Record<string, number> = {};
    for (const r of arr) c[r.event] = (c[r.event] || 0) + 1;
    return c;
  } catch {
    return {};
  }
}
