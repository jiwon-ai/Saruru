import { Incident, ReframeResult } from './types';

// 배포한 Cloudflare Worker 프록시 주소. 비우면 mock 으로 동작(키 없이 실행 가능).
const PROXY_URL = '';

const CRISIS = ['죽고', '자살', '죽을', '사라지고 싶', '해치', '없어지고 싶', 'kill myself', 'suicide'];

export function clientCrisisCheck(text: string): boolean {
  const t = text.toLowerCase();
  return CRISIS.some((k) => t.includes(k.toLowerCase()));
}

type Tpl = Omit<ReframeResult, 'safety'>;

// 사람 때문에 상한 마음 — 대인관계 전반(손님·상사·동료·가족·연인·친구·온라인).
const TEMPLATES: { match: RegExp; tpl: Tpl }[] = [
  {
    match: /손님|고객|진상|쿠폰|환불|교환|별점|리뷰|컴플|클레임|진상|반말로/,
    tpl: {
      neutral_summary: '응대 중에 손님·고객이 무례하게 굴거나 막무가내로 몰아세웠어요.',
      possible_interpretation: '그 사람은 자기 기분을 풀 곳이 필요했을 수 있어요 — 당신이 잘못해서가 아니라.',
      not_your_responsibility: '당신은 규칙을 똑같이 적용하고 할 일을 했을 뿐이에요.',
      why_it_stung: '항의 자체가 아니라, 사람들 앞에서 무례하게 다뤄진 게 아팠던 거예요.',
      closure_reframe: '그건 당신의 가치가 아니라, 그 사람이 작은 경계를 못 견딘 것뿐이에요.',
      boundary_line: null,
      melt_line: '이 무례는 내 것이 아니다. 나는 내 품위를 지킨다.',
    },
  },
  {
    match: /상사|부장|팀장|사장|갑질|혼났|혼나|깨졌|깨짐|지적|야근|업무|회사|직장|면박/,
    tpl: {
      neutral_summary: '직장에서 윗사람에게 부당하게 혼나거나 깎였어요.',
      possible_interpretation: '그 사람의 압박이나 서툰 표현이 당신에게 쏟아진 것일 수 있어요.',
      not_your_responsibility: '한 번의 지적이 당신의 능력이나 가치를 정하지 않아요.',
      why_it_stung: '피드백이 아니라, 사람 앞에서 존중 없이 다뤄진 게 아팠던 거예요.',
      closure_reframe: '그 사람의 방식은 그 사람의 문제예요. 당신은 충분히 애쓰고 있어요.',
      boundary_line: null,
      melt_line: '그의 말투는 내 가치가 아니다. 나는 내 몫만 진다.',
    },
  },
  {
    match: /동료|동기|뒷담|험담|따돌|왕따|배제|텃세|선배/,
    tpl: {
      neutral_summary: '동료 사이에서 뒷담화·따돌림·텃세 같은 일로 마음이 상했어요.',
      possible_interpretation: '그들의 불안이나 무리짓기가 당신을 향한 것일 수 있어요 — 당신 탓이 아니라.',
      not_your_responsibility: '남의 무리짓기는 당신이 부족해서가 아니에요.',
      why_it_stung: '일이 아니라, 한 사람으로서 배제당한 느낌이 아팠던 거예요.',
      closure_reframe: '그들의 인정이 당신의 가치를 정하지 않아요.',
      boundary_line: null,
      melt_line: '그들의 무리는 내 것이 아니다. 나는 나로 충분하다.',
    },
  },
  {
    match: /엄마|아빠|부모|시어|장모|시댁|가족|형|누나|언니|오빠|동생|잔소리/,
    tpl: {
      neutral_summary: '가족·가까운 사람의 말이나 잔소리에 마음이 상했어요.',
      possible_interpretation: '걱정이 서툰 방식으로 나왔을 수 있어요 — 그래도 당신이 받은 상처는 진짜예요.',
      not_your_responsibility: '가깝다고 해서 무엇이든 받아줘야 하는 건 아니에요.',
      why_it_stung: '그 말 자체보다, 이해받지 못한 느낌이 아팠던 거예요.',
      closure_reframe: '그들의 기대가 당신의 잘못을 뜻하진 않아요. 당신은 당신대로 괜찮아요.',
      boundary_line: null,
      melt_line: '그 말은 서툰 사랑의 모양일 뿐, 내 흠이 아니다.',
    },
  },
  {
    match: /남자친구|여자친구|애인|연인|남친|여친|헤어|이별|썸|연락|읽씹|서운/,
    tpl: {
      neutral_summary: '연인·가까운 사람과의 일로 서운하거나 상처받았어요.',
      possible_interpretation: '서로의 방식이 어긋났을 수 있어요 — 당신의 감정은 충분히 타당해요.',
      not_your_responsibility: '당신이 너무 예민해서가 아니에요. 서운함은 신호일 뿐이에요.',
      why_it_stung: '상황보다, 소중한 사람에게 닿지 못한 느낌이 아팠던 거예요.',
      closure_reframe: '오늘의 감정은 오늘 흘려보내도 돼요. 답은 내일의 당신이 정해요.',
      boundary_line: null,
      melt_line: '이 서운함을 내려놓는다. 나는 나를 먼저 다독인다.',
    },
  },
  {
    match: /친구|절친|배신|뒤통수|약속/,
    tpl: {
      neutral_summary: '친구에게 실망하거나 배신감을 느끼는 일이 있었어요.',
      possible_interpretation: '그 사람의 선택은 그 사람의 한계일 수 있어요 — 당신이 부족해서가 아니라.',
      not_your_responsibility: '믿어준 게 잘못은 아니에요. 그건 당신의 다정함이에요.',
      why_it_stung: '일 자체보다, 믿음이 어긋난 게 아팠던 거예요.',
      closure_reframe: '한 사람의 행동이 당신의 사람 보는 눈을 부정하진 않아요.',
      boundary_line: null,
      melt_line: '그의 선택은 내 것이 아니다. 나는 내 다정함을 지킨다.',
    },
  },
  {
    match: /악플|댓글|디엠|dm|카톡|단톡|sns|인스타|메시지|온라인/,
    tpl: {
      neutral_summary: '온라인에서 악플·무례한 메시지·읽씹 등으로 마음이 상했어요.',
      possible_interpretation: '화면 뒤의 그 사람은 아무에게나 던졌을 수 있어요 — 당신을 알아서가 아니라.',
      not_your_responsibility: '익명의 한 마디가 당신을 규정하지 않아요.',
      why_it_stung: '내용보다, 함부로 다뤄진 느낌이 아팠던 거예요.',
      closure_reframe: '스쳐가는 누군가의 분풀이가 당신의 하루를 정하진 않아요.',
      boundary_line: null,
      melt_line: '그 화면 속 말은 내 것이 아니다. 나는 끄고 나를 지킨다.',
    },
  },
  {
    match: /무시|모욕|이런 것도|깔보|비웃|망신|얕보/,
    tpl: {
      neutral_summary: '누군가 사람을 깎아내리는 말로 당신을 모욕했어요.',
      possible_interpretation: '본인 기분을 풀고 싶었을 수 있어요 — 그 말이 당신을 규정하진 않아요.',
      not_your_responsibility: '실수가 있었더라도 고치면 되는 일이고, 인격과는 별개예요.',
      why_it_stung: '지적이 아니라, 사람 자체를 깎아내린 말이 아팠던 거예요.',
      closure_reframe: '그 말은 그 사람의 태도일 뿐, 당신을 정의하지 않아요.',
      boundary_line: null,
      melt_line: '그 말은 나를 정의하지 않는다. 나는 나를 지킨다.',
    },
  },
];

const DEFAULT_TPL: Tpl = {
  neutral_summary: '오늘, 사람 때문에 마음이 상하는 일이 있었어요.',
  possible_interpretation: '그 사람은 자기 감정을 어딘가에 풀고 싶었을 수 있어요 — 당신이 잘못해서가 아니라.',
  not_your_responsibility: '당신은 할 수 있는 만큼 했어요. 그 사람의 태도는 당신 몫이 아니에요.',
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

// usePlusAI=true(=Plus 구독)일 때만 내 얘기를 읽는 실제 AI 사용. 무료는 비AI 템플릿(원가 0).
export async function getReframe(input: Incident, usePlusAI = false): Promise<ReframeResult> {
  if (clientCrisisCheck(input.text)) return mockReframe(input);
  if (!PROXY_URL || !usePlusAI) return mockReframe(input);
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
