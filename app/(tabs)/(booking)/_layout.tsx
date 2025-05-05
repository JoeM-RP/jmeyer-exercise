import i18n from "@/constants/Localization";
import { Stack } from "expo-router";

export default function BookingLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackVisible: true,
        statusBarTranslucent: true,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="confirmation"
        options={{
          title: i18n.t("booking.title"),
          headerBackVisible: true,
          headerBackTitle: i18n.t("global.back"),
        }}
      />
    </Stack>
  );
}
