# 사르르 앱 (Expo)

핵심 루프가 도는 실행 가능한 앱. **API 키 없이도 mock 으로 바로 켜집니다.**

## 실행
```bash
cd saruru-app
npm install
npx expo install --fix   # SDK에 맞게 버전 정렬(권장)
npx expo start           # Expo Go 로 QR 스캔 (또는 i / a)
```

## 구현된 것
- **온보딩 + 페이월**: 따뜻한 인사 → 공감 → *직접 한 번 녹여보기* → 프라이버시 → 취침 알림 → 페이월(연 ₩59,000 앵커·14일 체험·무가입 스킵). (`src/onboarding.tsx`)
- **핵심 루프**: 홈 →(마음 녹이기 / 🌙 오늘의 마무리)→ 캡처(한 줄+감정태그) → 리프레임 → **녹이기 애니메이션** → "녹아서 사라졌어요".
- **밤 의식 데일리 트리거**: 취침 전 알림(`expo-notifications`) 켜고 끄기.
- **영구 저장 + 날짜 스트릭**: `@react-native-async-storage`. 같은 날 여러 번 녹여도 1일. (`src/storage.ts`)
- **주간 '사르르 레터'**: 이번 주 녹인 횟수 + 따뜻한 한마디.
- **위기 경로**: 위험 키워드 감지 시 의식 생략 + 도움 리소스(자살예방상담 109 등).
- **수익 모델(프리미엄 게이팅)**: 무료 하루 1회 → 초과 시 업셀, Plus 무제한 + 주간 레터 전용. (실결제 RevenueCat 연동은 다음 단계.)
- **익명 분석 스캐폴드**(`src/analytics.ts`): 퍼널·전환 이벤트(app_open·melt_start·melt_complete·upsell_view·upsell_convert 등). 기록 텍스트·PII 전송 없음.
- **위기 전화 연결**: 109·1577-0199 탭하면 바로 전화 걸기(`Linking`).
- **페이월 A/B 골격**(`src/onboarding.tsx`): 가격 앵커 2종(A=연간·하루단가 / B=월간·연 50%절약) 랜덤 분기 + `paywall_view·trial_start·paywall_skip` 측정 → 전환 비교.
- **리텐션 알림**(`src/notify.ts`): 앱 열 때마다 3·7일 뒤로 재설정 → 미사용 시 잔잔한 복귀. 식별자 기반이라 취침 알림과 공존.
- **퍼널 디버그**(개발용): 홈에서 `__DEV__`일 때 퍼널 카운트 확인.
- **mock AI**(`src/ai.ts`): 키 없이 클로저 지향 리프레임. 반격 멘트 없음.
- **브랜드**: 미스트 블루 테마(`src/theme.ts`) + **Gowun Dodum** 폰트, 녹이면-삭제 토글.

## 실제 Claude 연결 (선택)
1. `server/worker.ts` 를 Cloudflare Worker로 배포, 시크릿 `ANTHROPIC_API_KEY` 설정.
2. `src/ai.ts` 의 `PROXY_URL` 에 Worker 주소 입력. **키는 앱에 넣지 않음.**

## 아직 안 한 것 (다음)
- 실결제(RevenueCat) — 지금 페이월은 UI만. · **디자인 에셋은 임시 플레이스홀더**(사용자가 별도 툴로 교체 예정) · 실제 분석 엔드포인트 연결.

## 구조
```
App.tsx            