import * as Notifications from 'expo-notifications';

// 잔잔한 취침 전 알림(밤 의식 데일리 트리거). 부담 없이 켜고 끄기 자유.
export async function scheduleBedtime(hour = 22, minute = 30): Promise<boolean> {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') return false;
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '오늘의 마무리',
        body: '오늘 건 오늘 녹이고, 깨끗한 마음으로 자요.',
      },
      trigger: { hour, minute, repeats: true },
    });
    return true;
  } catch {
    return false;
  }
}

export async function cancelBedtime(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {
    // ignore
  }
}
