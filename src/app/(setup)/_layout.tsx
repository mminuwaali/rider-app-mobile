import { Stack } from "expo-router";
import { useAuthContext } from "@/components/providers/auth.provider";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export default function () {
  const { user } = useAuthContext();

  return (
    <Stack screenOptions={screenOptions} initialRouteName={`${user?.role}/index`}>
      <Stack.Screen name="rider/index" />
      <Stack.Screen name="client/index" />
    </Stack>
  );
}

function screenOptions(): NativeStackNavigationOptions {
  return {
    animation: "fade",
    headerTitle: "Setup",
    headerTitleAlign: "center",
    headerShadowVisible: false,
    headerTitleStyle: {
      fontSize: 30,
      color: "#141e30",
      fontWeight: "800",
      fontFamily: "Inter",
    },
    contentStyle: {
      padding: "5%",
      backgroundColor: "white",
    },
  };
}
