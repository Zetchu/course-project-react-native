import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how the OS should handle a notification when the app is already open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
export async function registerForPushNotificationsAsync(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('Failed to get push token for local notification!');
    return false;
  }

  // Required configuration for Android channel channels
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F71',
    });
  }

  return true;
}

export async function scheduleMorningBriefing(
  cityName: string,
  temp: number,
  description: string,
) {
  // 1. Request permissions
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.warn('Notification permissions denied');
    return;
  }

  // 2. Clear any existing morning briefings so we don't spam the user
  await Notifications.cancelAllScheduledNotificationsAsync();

  // 3. Schedule the new daily notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🌤️ Morning SkyCast Briefing',
      body: `Good morning! Today in ${cityName} it will be ${temp}°C with ${description}.`,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 8,
      minute: 0,
    },
  });
}
export async function sendLocalNotification(title: string, body: string) {
  const hasPermission = await registerForPushNotificationsAsync();
  if (!hasPermission) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      sound: true,
    },
    trigger: null,
  });
}
