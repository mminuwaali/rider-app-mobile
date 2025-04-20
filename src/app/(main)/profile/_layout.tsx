import { Stack } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export default function () {
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="default/index" options={{ headerTitle: "Profile" }} />
      <Stack.Screen name="edit-profile/index" options={{ headerTitle: "Edit Profile" }} />
      <Stack.Screen name="update-password/index" options={{ headerTitle: "Update Password" }} />
    </Stack>
  );
}

function screenOptions(): NativeStackNavigationOptions {
  return {
    animation: "fade",
    headerTitleAlign: "center",
    headerShadowVisible: false,
    headerTitleStyle: {
      fontSize: 30,
      color: "#141e30",
      fontWeight: "800",
      fontFamily: "Inter",
    },
    contentStyle: {
      padding:"5%",
      backgroundColor: "white",
    },
  };
}
