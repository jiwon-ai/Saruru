# 사르르(Saruru) 출시 체크리스트

> 돈을 벌려면 "검증 → 결제 → 제출"이 막힘없이 이어져야 한다. 아래는 현재 상태와 남은 일.
> ✅ 완료(코드/문서) · 🟡 당신 계정·검토 필요 · ⬜ 다음

## 0. 그 전에 — 검증 게이트
- ⬜ 위저드오즈 20~30명(효능·빈도) + 페이크도어(지불의향) → `Saruru_Validation_Kit.md`의 kill criteria 통과
- ⬜ 통과해야 마케팅비·실결제 투자. 안 되면 *이름·디자인이 아니라 모델*을 바꾼다

## 1. 앱(코드) — ✅ 대부분 완료
- ✅ 핵심 루프(캡처→리프레임→녹이기→완료) + 위기 경로
- ✅ 온보딩 + 페이월 **A/B**(가격 앵커 2종) + 전환 측정
- ✅ 프리미엄 게이팅(무료 1회/일 → 업셀, Plus 무제한 + 주간 레터)
- ✅ 영구 저장·날짜 스트릭, 밤 의식 알림, **리텐션 알림(3·7일)**
- ✅ 익명 분석 스캐폴드(퍼널) + 위기 전화 연결
- ✅ 결제 추상화 레이어(`src/purchases.ts`) — 호출부 연결 완료
- 🟡 **실기기 테스트**: `cd saruru-app && npm install && npx expo start` → Expo Go로 전체 흐름 1회 점검
- ⬜ 분석 수신 엔드포인트 연결(`src/analytics.ts`의 `ENDPOINT`) — 무료 티어로 충분(예: 간단한 Worker)

## 2. 실결제(RevenueCat) — 🟡 당신 계정 필요
- 🟡 App Store Connect / Play Console 구독 상품 2개 등록(₩5,900/월, ₩39,000/년, 14일 체험)
- 🟡 RevenueCat 프로젝트 + 엔타이틀먼트 `plus` + Offering
- 🟡 `npx expo install react-native-purchases` + EAS dev build
- 🟡 `src/purchases.ts` `PURCHASES_CONFIGURED=true` + 키/ TODO 채우기 → 절차: `Saruru_RevenueCat_Setup_KR.md`
- 🟡 샌드박스 결제·복원 테스트

## 3. 법무 — 🟡 검토 필요
- ✅ 개인정보처리방침 초안 `Saruru_Privacy_Policy_KR.md`
- ✅ 이용약관 초안 `Saruru_Terms_KR.md`
- 🟡 `[ ]`(상호·이메일·시행일) 채우고 **전문가 검토**
- 🟡 웹에 게시(스토어가 URL 요구) — 예: GitHub Pages/Notion 공개 페이지

## 4. 스토어 등록물 — 🟡/⬜
- ✅ 앱 아이콘·스플래시(임시 플레이스홀더) — 🟡 디자인은 별도 툴로 교체 예정
- ✅ ASO 문안 `Saruru_ASO_StoreListing_KR.md`
- ⬜ **스크린샷**(기기 프레임 5~8장) + 미리보기 — 출시 필수
- 🟡 개발자 계정(Apple $99/년, Google $25 1회), 앱 이름/번들ID `app.saruru`
- 🟡 상표 확인(KIPO 등) — 브랜드비 쓰기 전

## 5. 실제 AI(선택) — 🟡
- 🟡 `server/worker.ts` Cloudflare Worker 배포 + `ANTHROPIC_API_KEY` 시크릿
- 🟡 `src/ai.ts` `PROXY_URL` 입력 (키는 앱에 넣지 않음)
- ✅ 키 없이도 상황별 mock으로 동작 — 초기엔 mock로 출시 후 점진 전환 가능

## 6. 출시 후 — 매출 운영
- ⬜ 퍼널(`paywall_view→trial_start`) A/B 승자 채택 → 카피·가격 고정
- ⬜ 리텐션(3·7일 복귀율) 모니터링 → 알림 문구 개선
- ⬜ 채널별 CAC 측정(숏폼 영상 `Saruru_Validation_Scripts.md`) → 페이백 < LTV 확인
- ⬜ 로컬라이즈(en) → 글로벌 확장(벤치마크 교훈)

---
**가장 가까운 다음 한 걸음:** 검증 게이트(§0)를 돌리면서, 통과 신호가 보이면 §2 RevenueCat을 붙인다. 코드/문서는 그 순간 바로 출시할 수 있게 준비돼 있다.
