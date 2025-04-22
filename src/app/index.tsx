import React from "react";
import { router } from "expo-router";
import Animated from "react-native-reanimated";
import { hideAsync } from "expo-splash-screen";
import { useAuthContext } from "./(providers)/auth.provider";

export default function () {
  const { user } = useAuthContext();

  React.useEffect(() => {
    if (user === undefined) return;

    const id = setTimeout(() => {
      hideAsync();
      router.replace(user ? "/home/" as never : "/(onboard)")
    }, 2000);

    return () => clearTimeout(id);
  }, [user]);

  return (
    <Animated.View className="flex-1 bg-white">
    </Animated.View>
  );
}
