import { Stack } from "expo-router";
import { useSharedValue } from "react-native-reanimated";
import { AnimationContext } from "./_layout/_context/animation";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export default function () {
  const scrollY = useSharedValue(0);
  const chartHeight = useSharedValue(200);

  return (
    <AnimationContext.Provider value={{ scrollY, chartHeight }}>
      <Stack screenOptions={screenOptions} initialRouteName="balance/index">
        <Stack.Screen
          name="balance/index"
          options={{ headerTitle: "Balance" }}
        />
        <Stack.Screen
          name="deposit/index"
          options={{ headerTitle: "Deposit" }}
        />
        <Stack.Screen
          name="withdraw/index"
          options={{ headerTitle: "Withdraw" }}
        />
      </Stack>
    </AnimationContext.Provider>
  );
}

function screenOptions(): NativeStackNavigationOptions {
  return {
    animation: "fade",
    headerTitleAlign: "center",
    headerShadowVisible: false,
    contentStyle: {
      backgroundColor: "white",
    },
    headerTitleStyle: {
      fontSize: 30,
      color: "#141e30",
      fontWeight: "800",
      fontFamily: "Inter",
    },
  };
}
