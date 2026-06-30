// 결제 추상화 레이어.
// 현재: Expo Go에서 동작하도록 mock(즉시 성공). 실제 결제는 RevenueCat(react-native-purchases)로 교체.
// 교체 절차: Saruru_RevenueCat_Setup_KR.md 참고. 아래 TODO(RevenueCat) 지점만 채우면 됨.

export type Plan = 'monthly' | 'annual';

// RevenueCat 연결을 마치면 true 로 바꾼다(그 전까지는 mock 동작).
export const PURCHASES_CONFIGURED = false;

// 앱 시작 시 1회. 실제: Purchases.configure({ apiKey }).
export async function initPurchases(): Promise<void> {
  if (!PURCHASES_CONFIGURED) return;
  // TODO(RevenueCat):
  // import Purchases from 'react-native-purchases';
  // import { Platform } from 'react-native';
  // Purchases.configure({ apiKey: Platform.select({ ios: IOS_KEY, android: ANDROID_KEY })! });
}

// 체험/구매 시작. 성공 시 true → 호출부에서 isPlus 반영.
export async function startTrial(plan: Plan = 'annual'): Promise<boolean> {
  if (!PURCHASES_CONFIGURED) return true; // mock: 개발/검증용으로 항상 성공
  // TODO(RevenueCat):
  // const offerings = await Purchases.getOfferings();
  // const pkg = plan === 'annual' ? offerings.current?.annual : offerings.current?.monthly;
  // if (!pkg) return false;
  // const { customerInfo } = await Purchases.purchasePackage(pkg);
  // return !!customerInfo.entitlements.active['plus'];
  return false;
}

// 구매 복원(기기 변경/재설치 시).
export async function restorePurchases(): Promise<boolean> {
  if (!PURCHASES_CONFIGURED) return false;
  // TODO(RevenueCat):
  // const info = await Purchases.restorePurchases();
  // return !!info.entitlements.active['plus'];
  return false;
}

// 현재 구독 상태(앱 시작 시 동기화). plus 엔타이틀먼트 보유 여부.
export async function checkEntitlement(): Promise<boolean> {
  if (!PURCHASES_CONFIGURED) return false;
  // TODO(RevenueCat):
  // const info = await Purchases.getCustomerInfo();
  // return !!info.entitlements.active['plus'];
  return false;
}
