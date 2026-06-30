# 사르르 앱 (Expo) — v0 스캐폴드

핵심 루프가 도는 실행 가능한 시작점. **API 키 없이도 mock 으로 바로 켜집니다.**

## 실행
```bash
cd saruru-app
npm install
npx expo start      # Expo Go 앱으로 QR 스캔 (또는 i / a 로 시뮬레이터)
```
의존성 버전이 안 맞다고 나오면: `npx expo install --fix`

## 구현된 것 (v0)
- 화면 흐름: 홈 → (마음 녹이기 / 🌙 오늘의 마무리) → 캡처(한 줄+감정 태그) → 리프레임 → **녹이기 애니메이션** → 완료.
- **위기 경로:** 위험 키워드 감지 시 의식 생략하고 도움 리소스 화면(자살예방상담 109 등).
- **mock AI**(`src/ai.ts`): 키 없이 클로저 지향 리프레임 반환. 반격 멘트 없음.
- 미스트 블루 테마(`src/theme.ts`), 녹이면 기록 삭제 토글, 스트릭 카운트(메모리).

## 실제 Claude 연결 (선택)
1. `server/worker.ts` 를 Cloudflare Worker로 배포(`npx wrangler deploy`), 시크릿 `ANTHROPIC_API_KEY` 설정.
2. `src/ai.ts` 의 `PROXY_URL` 에 Worker 주소 입력.
> **키는 절대 앱에 넣지 않음** — 프록시만 호출. 프록시는 사건 텍스트를 로그에 남기지 않음.

## 아직 안 한 것 (다음)
- 영구 저장(expo-sqlite) — 지금은 메모리. 앱 재시작 시 초기화.
- 커스텀 폰트(Gowun Dodum, expo-font), 온보딩/페이월, 취침 전 알림(expo-notifications), 주간 '사르르 레터'.
- 디자인 폴리시(그라데이션·로고).

## 구조
```
App.tsx            # 화면 상태머신 + 모든 화면
src/theme.ts       # 미스트 블루 팔레트
src/types.ts       # Incident, ReframeResult
src/ai.ts          # getReframe (mock + 프록시 폴백 + 위기 체크)
server/worker.ts   # Cloudflare Worker (Claude 호출, 키 보관)
```
