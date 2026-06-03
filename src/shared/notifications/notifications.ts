import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

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

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.warn("Failed to get push token for local notification!");
    return false;
  }

  // Required configuration for Android channel channels
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F71",
    });
  }

  return true;
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
