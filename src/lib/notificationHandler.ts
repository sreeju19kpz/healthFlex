import * as Notifications from "expo-notifications";

export const showNotification = (name: string, message: string, category = "") => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: name,
      body: message,
      sticky: true,
      categoryIdentifier: category,
    },
    trigger: null,
  });
};
