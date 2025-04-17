import "./global.css";
import React from "react";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import AuthProvider from "./(providers)/auth.provider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export { ErrorBoundary } from "expo-router";
export const unstable_settings = { ignorePatterns: ["_*"] };

preventAutoHideAsync();
export default function () {
  const [loaded, error] = useFonts({ ...FontAwesome.font });

  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  React.useEffect(() => {
    if (loaded) hideAsync();
  }, [loaded]);

  return (
    <GestureHandlerRootView className="flex-1">
      <AuthProvider>
        <Slot />
        <StatusBar animated translucent networkActivityIndicatorVisible />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
