import React from "react";
import { router } from "expo-router";
import Animated from "react-native-reanimated";

export default function () {
  React.useEffect(() => {
    const id = setTimeout(() => router.replace("/(onboard)"), 2000);
    return () => clearTimeout(id);
  }, []);

  return (
    <Animated.View className="flex-1 bg-white">
    </Animated.View>
  );
}
