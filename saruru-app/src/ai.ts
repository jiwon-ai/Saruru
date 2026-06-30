import { Incident, ReframeResult } from './types';

// 배포한 Cloudflare Worker 프록시 주소. 비워두면 mock 으로 동작(키 없이 실행 가능).
const PROXY_URL = '';

const CRISIS = ['죽고', '자살', '죽을', '사라지고 싶', '해치', '없어지고 싶', 'kill myself', 'suicide'];

export function clientCrisisCheck(text: string): boolean {
  const t = text.toLowerCase();
  return CRISIS.some((k) => t.includes(k.toLowerCase()));
}

type Tpl = Omit<ReframeResult, 'safety'>;

const TEMPLATES: { match: RegExp; tpl: Tpl }[] = [
  {
    match: /쿠폰|적립|찢|던/,
    tpl: {
      neutral_summary: '적립·쿠폰 안내에 손님이 화를 내며 거칠게 행동했어요.',
      possible_interpretation: '즉시 보상을 기대했다 실망했을 수 있어요. 다만 표현 방식이 무례했을 뿐, 당신 탓이 아니에요.',
      not_your_responsibility: '당신은 모두에게 똑같은 규칙을 적용했을 뿐이에요.',
      why_it_stung: '규칙에 대한 이견이 아니라, 사람들 앞에서 무례를 드러내 보인 게 아팠던 거예요.',
      closure_reframe: '그건 당신의 가치가 아니라, 그 사람이 작은 경계를 못 견딘 것뿐이에요.',
      boundary_line: null,
      melt_line: '이 무례는 내 것이 아니다. 나는 내 품위를 지킨다.',
    },
  },
  {
    match: /반말|소리|고함|언성|화내/,
    tpl: {
      neutral_summary: '바쁜 상황에서 손님이 반말·고함으로 다그쳤어요.',
      possible_interpretation: '급했거나 스스로 통제력을 잃었을 수 있어요. 그래도 당신을 향한 고함은 정당하지 않아요.',
      not_your_responsibility: '혼잡은 당신 혼자 만든 게 아니고, 당신은 최선을 다하고 있었어요.',
      why_it_stung: '일의 속도가 아니라, 한 사람으로서 존중받지 못한 게 아팠던 거예요.',
      closure_reframe: '그 사람의 조급함은 그 사람의 몫이지, 당신의 부족함이 아니에요.',
      boundary_line: null,
      melt_line: '그의 조급함은 내 것이 아니다. 나는 차분함을 고른다.',
    },
  },
  {
    match: /환불|교환|반품/,
    tpl: {
      neutral_summary: '규정상 어려운 환불·교환을 두고 손님이 막무가내로 우겼어요.',
      possible_interpretation: '손해 보는 느낌이 싫었을 수 있어요. 하지만 규정을 당신 개인 탓으로 돌릴 일은 아니에요.',
      not_your_responsibility: '환불 규정은 당신이 만든 게 아니고, 당신은 공정하게 적용했을 뿐이에요.',
      why_it_stung: '거절 자체보다, 당신을 벽처럼 대하며 몰아세운 태도가 아팠던 거예요.',
      closure_reframe: '규정을 지킨 건 잘못이 아니에요. 당신은 해야 할 일을 했어요.',
      boundary_line: null,
      melt_line: '나는 규정을 지켰다. 그의 화는 내 것이 아니다.',
    },
  },
  {
    match: /별점|리뷰|신고|협박/,
    tpl: {
      neutral_summary: '불만을 품은 손님이 별점·신고로 압박했어요.',
      possible_interpretation: '압박으로 원하는 걸 얻으려 했을 수 있어요. 당신의 잘못된 응대 때문이 아니에요.',
      not_your_responsibility: '압박에 굴해 규칙을 깨지 않은 건 옳은 선택이었어요.',
      why_it_stung: '평가가 두려운 게 아니라, 당신의 성실함이 한순간에 부정당하는 느낌이 아팠던 거예요.',
      closure_reframe: '한 사람의 분풀이가 당신의 하루 전체를 정의하진 않아요.',
      boundary_line: null,
      melt_line: '그의 압박은 내 가치를 정하지 못한다. 나는 흔들리지 않는다.',
    },
  },
  {
    match: /무시|모욕|이런 것도|깔보|비웃/,
    tpl: {
      neutral_summary: '손님이 사람을 깎아내리는 말로 모욕했어요.',
      possible_interpretation: '본인 기분을 누군가에게 풀고 싶었을 수 있어요. 그 말이 당신의 능력을 규정하진 않아요.',
      not_your_responsibility: '실수가 있었더라도 고치면 되는 일이고, 당신의 인격과는 별개예요.',
      why_it_stung: '지적이 아니라, 사람 자체를 모욕한 말이 아팠던 거예요.',
      closure_reframe: '그 말은 그 사람의 태도일 뿐, 당신을 정의하지 않아요.',
      boundary_line: null,
      melt_line: '그 말은 나를 정의하지 않는다. 나는 나를 지킨다.',
    },
  },
];

const DEFAULT_TPL: Tpl = {
  neutral_summary: '오늘, 응대 중에 마음이 다치는 일이 있었어요.',
  possible_interpretation: '그 사람은 자기 감정을 어딘가에 풀고 싶었을 수 있어요. 당신이 잘못해서가 아니라.',
  not_your_responsibility: '당신은 해야 할 일을 했을 뿐이에요. 그 사람의 태도는 당신 몫이 아니에요.',
  why_it_stung: '단순한 일 때문이 아니라, 한 사람으로서 존중받지 못한 게 아팠던 거예요.',
  closure_reframe: '그건 당신의 가치가 아니에요. 오늘 건 오늘 내려놓아도 괜찮아요.',
  boundary_line: null,
  melt_line: '이건 내가 짊어질 게 아니다.',
};

function mockReframe(input: Incident): ReframeResult {
  if (clientCrisisCheck(input.text)) {
    return { neutral_summary: '', possible_interpretation: '', not_your_responsibility: '', why_it_stung: '', closure_reframe: '', boundary_line: null, melt_line: '', safety: { flag: true, reason: 'crisis keyword' } };
  }
  const hit = TEMPLATES.find((t) => t.match.test(input.text));
  return { ...(hit ? hit.tpl : DEFAULT_TPL), safety: { flag: false, reason: null } };
}

export async function getReframe(input: Incident): Promise<ReframeResult> {
  if (clientCrisisCheck(input.text)) return mockReframe(input);
  if (!PROXY_URL) return mockReframe(input);
  try {
    const res = await fetch(PROXY_URL + '/reframe', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text: input.text, emotions: input.emotions }),
    });
    const data = (await res.json()) as Partial<ReframeResult>;
    if (typeof data.closure_reframe === 'string' && data.safety) return data as ReframeResult;
    return mockReframe(input);
  } catch {
    return mockReframe(input);
  }
}
