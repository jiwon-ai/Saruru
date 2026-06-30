import * as Notifications from 'expo-notifications';

const BEDTIME_ID = 'saruru-bedtime';
const RET3_ID = 'saruru-ret3';
const RET7_ID = 'saruru-ret7';

async function ensurePermission(prompt: boolean): Promise<boolean> {
  try {
    const cur = await Notifications.getPermissionsAsync();
    if (cur.status === 'granted') return true;
    if (!prompt) return false;
    const req = await Notifications.requestPermissionsAsync();
    return req.status === 'granted';
  } catch {
    return false;
  }
}

// 잔잔한 취침 전 알림(밤 의식 데일리 트리거).
export async function scheduleBedtime(hour = 22, minute = 30): Promise<boolean> {
  try {
    if (!(await ensurePermission(true))) return false;
    await Notifications.cancelScheduledNotificationAsync(BEDTIME_ID).catch(() => {});
    await Notifications.scheduleNotificationAsync({
      identifier: BEDTIME_ID,
      content: { title: '오늘의 마무리', body: '오늘 건 오늘 녹이고, 깨끗한 마음으로 자요.' },
      trigger: { hour, minute, repeats: true },
    });
    return true;
  } catch {
    return false;
  }
}

export async function cancelBedtime(): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(BEDTIME_ID);
  } catch {
    // ignore
  }
}

// 리텐션: 앱을 열 때마다 3·7일 뒤로 재설정 → 그만큼 안 들어오면 그때 한 번 울림.
// 권한이 이미 허용된 경우에만(앱 열 때 권한 팝업을 새로 띄우지 않음).
export async function scheduleRetention(): Promise<void> {
  try {
    if (!(await ensurePermission(false))) return;
    await Notifications.cancelScheduledNotificationAsync(RET3_ID).catch(() => {});
    await Notifications.cancelScheduledNotificationAsync(RET7_ID).catch(() => {});
    await Notifications.scheduleNotificationAsync({
      identifier: RET3_ID,
      content: { title: '사르르', body: '며칠 됐네요. 쌓인 게 있으면 잠깐 녹여볼까요?' },
      trigger: { seconds: 3 * 86400, repeats: false },
    });
    await Notifications.scheduleNotificationAsync({
      identifier: RET7_ID,
      content: { title: '사르르', body: '괜찮아요? 오늘 하나, 가볍게 흘려보내요.' },
      trigger: { seconds: 7 * 86400, repeats: false },
    });
  } catch {
    // 비치명적
  }
}
