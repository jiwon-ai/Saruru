# Saruru — 실결제(RevenueCat) 연동 가이드

> 목적: 지금 mock 으로 동작하는 결제를 **실제 인앱 구독**으로 바꾼다. 코드 교체 지점은 `saruru-app/src/purchases.ts` 한 곳에 모아뒀다. 이 문서대로 따라가면 그 파일의 TODO만 채우면 된다.
>
> ⚠️ 전제: RevenueCat의 `react-native-purchases`는 **네이티브 모듈**이라 Expo Go에서는 안 된다. **EAS dev build(개발용 네이티브 빌드)**가 필요하다.

---

## 0. 한눈에 보는 흐름
앱 → RevenueCat SDK → (App Store / Google Play 결제) → RevenueCat 서버가 영수증 검증 → "plus" 엔타이틀먼트 부여 → 앱은 엔타이틀먼트만 확인.

장점: 영수증 검증·갱신·복원·환불 처리를 RevenueCat이 대신 한다. 앱엔 **public SDK 키**만 들어가고(서버 비밀 아님), 검증은 서버가 한다.

---

## 1. 상품 설계(가격은 검증값)
| 상품 ID | 종류 | 가격(가정) | 무료체험 |
|---|---|---|---|
| `saruru_plus_monthly` | 자동갱신 구독 | ₩9,900 / 월 | 14일 |
| `saruru_plus_annual` | 자동갱신 구독 | ₩59,000 / 년 | 14일 |

- **엔타이틀먼트:** `plus` (앱은 이 값만 본다)
- **Offering:** `default` 에 `monthly`·`annual` 패키지 2개

## 2. 스토어에 상품 등록
**App Store Connect**
1. 앱 → 기능 → 구독 → **구독 그룹** 생성(예: "Saruru Plus").
2. 위 2개 상품 등록, 가격·**무료 체험(인트로 오퍼 14일)** 설정.
3. 세금/은행/계약(유료 앱 계약) 완료해야 구독이 활성화됨.

**Google Play Console**
1. 수익 창출 → 구독 → 정기 결제 2개 생성(같은 ID 권장).
2. 기본 요금제 + **무료 평가판 14일** 추가.

## 3. RevenueCat 설정
1. [app.revenuecat.com](https://app.revenuecat.com) 계정 → 프로젝트 생성.
2. **App 추가**: iOS(App Store), Android(Play). 각 플랫폼 **public API 키** 발급.
   - iOS: App Store Connect의 In-App Purchase 키 업로드.
   - Android: Play 서비스 계정 JSON 연결.
3. **Products**: 스토어에서 만든 4개(플랫폼×2) import.
4. **Entitlements**: `plus` 생성 → 위 상품들 attach.
5. **Offerings**: `default` 생성 → `annual`/`monthly` 패키지에 상품 연결.

## 4. 앱 코드 연결
```bash
cd saruru-app
npx expo install react-native-purchases
# Expo Go 불가 → 개발용 네이티브 빌드
npm i -g eas-cli && eas login
eas build --profile development --platform ios   # 또는 android
# 빌드 설치 후:
npx expo start --dev-client
```

`src/purchases.ts` 수정:
1. 맨 위 `PURCHASES_CONFIGURED = true`
2. `initPurchases()` 의 TODO 주석 해제 + 키 입력:
```ts
import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';
Purchases.configure({ apiKey: Platform.select({ ios: 'appl_XXX', android: 'goog_XXX' })! });
```
3. `startTrial()` / `restorePurchases()` / `checkEntitlement()` 의 TODO 블록 주석 해제.

> 호출부는 이미 연결돼 있다: 온보딩 체험 버튼·홈 업셀 → `startTrial()`, 앱 시작 → `initPurchases()`+`checkEntitlement()`로 isPlus 동기화. `purchases.ts`만 바꾸면 끝.

## 5. 키 관리
- RevenueCat **public SDK 키**는 앱에 넣어도 된다(서버 비밀 아님). Anthropic 키와 다름 — 그건 절대 앱에 넣지 말 것(프록시 유지).

## 6. 테스트
- iOS: **Sandbox 테스터** 계정으로 체험→구매→해지→복원.
- Android: **라이선스 테스터** + 내부 테스트 트랙.
- 확인: 구매 후 `plus` 엔타이틀먼트 활성 → 앱 무제한 동작, 재설치 후 "복원" 동작.

## 7. 스토어 심사 체크
- 구독 화면에 **가격·기간·자동갱신·해지 방법** 명시.
- **구매 복원** 버튼 제공(애플 필수).
- 개인정보처리방침·이용약관 링크(별도 문서).
- "무료 체험 후 자동 결제" 고지.

---

## 부록: 무료/Plus 경계(현재 구현)
- 무료: 하루 1회 AI 녹이기(`src/storage.ts` `canMelt`, `FREE_DAILY_LIMIT=1`).
- Plus: 무제한 + 주간 사르르 레터.
- 실연동 후엔 `isPlus`가 RevenueCat 엔타이틀먼트로 채워진다(로컬 플래그 대체).
