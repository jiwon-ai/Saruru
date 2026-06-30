import { Incident, ReframeResult } from './types';

// 배포한 Cloudflare Worker 프록시 주소를 넣으세요. 비워두면 mock 으로 동작(키 없이 실행 가능).
const PROXY_URL = '';

// 위기 키워드 — 클라이언트 1차 방어(서버 safety와 이중). 정확하지 않으니 보수적으로.
const CRISIS = ['죽고', '자살', '죽을', '사라지고 싶', '해치', '없어지고 싶', 'kill myself', 'suicide'];

export function clientCrisisCheck(text: string): boolean {
  const t = text.toLowerCase();
  return CRISIS.some((k) => t.includes(k.toLowerCase()));
}

// 키 없이도 돌아가는 mock 리프레임 (클로저 지향, 반격 멘트 없음).
function mockReframe(input: Incident): ReframeResult {
  const crisis = clientCrisisCheck(input.text);
  if (crisis) {
    return {
      neutral_summary: '',
      possible_interpretation: '',
      not_your_responsibility: '',
      why_it_stung: '',
      closure_reframe: '',
      boundary_line: null,
      melt_line: '',
      safety: { flag: true, reason: 'crisis keyword' },
    };
  }
  return {
    neutral_summary: '오늘, 응대 중에 마음이 다치는 일이 있었어요.',
    possible_interpretation:
      '그 사람은 자기 감정을 어딘가에 풀고 싶었을 수 있어요 — 당신이 잘못해서가 아니라.',
    not_your_responsibility: '당신은 해야 할 일을 했을 뿐이에요. 그 사람의 태도는 당신 몫이 아니에요.',
    why_it_stung: '단순한 일 때문이 아니라, 한 사람으로서 존중받지 못한 게 아팠던 거예요.',
    closure_reframe: '그건 당신의 가치가 아니에요. 오늘 건 오늘 내려놓아도 괜찮아요.',
    boundary_line: null,
    melt_line: '이건 내가 짊어질 게 아니다.',
    safety: { flag: false, reason: null },
  };
}

export async function getReframe(input: Incident): Promise<ReframeResult> {
  // 입력 단계에서 이미 위기면 서버 호출 없이 바로 안전 경로.
  if (clientCrisisCheck(input.text)) return mockReframe(input);

  if (!PROXY_URL) return mockReframe(input);

  try {
    const res = await fetch(`${PROXY_URL}/reframe`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text: input.text, emotions: input.emotions }),
    });
    const data = (await res.json()) as Partial<ReframeResult>;
    // 최소 검증 — 모양이 깨지면 mock 폴백.
    if (typeof data?.closure_reframe === 'string' && data?.safety) {
      return data as ReframeResult;
    }
    return mockReframe(input);
  } catch {
    return mockReframe(input);
  }
}
