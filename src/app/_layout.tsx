import "./global.css";
import React from "react";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useTokenListener } from "../hooks/token.hook";
import AuthProvider from "./(providers)/auth.provider";
import QueryProvider from "./(providers)/query.provider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { preventAutoHideAsync } from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export { ErrorBoundary } from "expo-router";
export const unstable_settings = { ignorePatterns: ["_*"] };

preventAutoHideAsync();
export default function () {
  useTokenListener(60000); // Check token every minute
  const [loaded, error] = useFonts({ ...FontAwesome.font });

  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <QueryProvider>
      <GestureHandlerRootView className="flex-1">
        <AuthProvider>
          {loaded && <Slot />}
          <StatusBar animated translucent networkActivityIndicatorVisible />
        </AuthProvider>
      </GestureHandlerRootView>
    </QueryProvider>
  );
}
