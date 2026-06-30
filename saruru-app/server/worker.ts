// Cloudflare Worker — Claude 프록시. ANTHROPIC_API_KEY 는 Worker 시크릿으로만 보관(앱에 넣지 않음).
// 배포: `npx wrangler deploy` (wrangler.toml 필요) / 시크릿: `npx wrangler secret put ANTHROPIC_API_KEY`

const SYSTEM_PROMPT = `당신은 사르르(Saruru)의 리프레임 엔진입니다. 사용자는 고객 응대 중 겪은 힘든 일을 적습니다.
목표는 '놓아주기(클로저)' — 복수를 연습하거나 상대를 평가하는 게 아닙니다.

규칙:
1. 상대 행동은 '가능한 해석'만 제시. "확실히 ~였다"고 단정하지 말 것.
2. 사용자 책임이 아닌 것을 분명히 구분.
3. 왜 아팠는지 짧고 정확하게.
4. 클로저 지향의 한마디로 마무리(놓아주기).
5. boundary_line(다음에 쓸 차분한 경계 표현)은 선택, 없으면 null. 절대 '받아치는 말' 아님.
6. 의료/임상 단정 금지(치료·진단 아님).
7. 안전: 자해·자살·타해·급성 위기 신호가 있으면 safety.flag=true, reason 기입, 리프레임 필드는 비워둠.
8. 각 필드 1~2문장. 따뜻하고 담백하게.
한국어로, 아래 JSON 스키마에 맞는 JSON만 출력. JSON 외 텍스트 금지.`;

export default {
  async fetch(req: Request, env: { ANTHROPIC_API_KEY: string }): Promise<Response> {
    if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
    const cors = {
      'access-control-allow-origin': '*',
      'access-control-allow-headers': 'content-type',
      'content-type': 'application/json',
    };
    try {
      const { text, emotions } = (await req.json()) as { text: string; emotions?: string[] };
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 700,
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: 'user',
              content: `감정 태그: ${(emotions ?? []).join(', ') || '없음'}\n\n사건:\n${text}\n\n출력 스키마:\n{"neutral_summary":"","possible_interpretation":"","not_your_responsibility":"","why_it_stung":"","closure_reframe":"","boundary_line":null,"melt_line":"","safety":{"flag":false,"reason":null}}`,
            },
          ],
        }),
      });
      const data: any = await r.json();
      const raw = data?.content?.[0]?.text ?? '{}';
      return new Response(raw, { headers: cors }); // 본문(사건 텍스트)은 로그에 남기지 않음
    } catch (e) {
      return new Response(JSON.stringify({ error: 'reframe_failed' }), { status: 500, headers: cors });
    }
  },
};
