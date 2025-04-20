import "./global.css";
import React from "react";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import AuthProvider from "./(providers)/auth.provider";
import { useTokenListener } from "../hooks/token.hook";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { QueryClient, QueryClientProvider } from "react-query";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export { ErrorBoundary } from "expo-router";
export const unstable_settings = { ignorePatterns: ["_*"] };

preventAutoHideAsync();
const client = new QueryClient();
export default function () {
  useTokenListener(60000); // Check token every minute
  const [loaded, error] = useFonts({ ...FontAwesome.font });

  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  React.useEffect(() => {
    if (loaded) hideAsync();
  }, [loaded]);

  return (
    <QueryClientProvider client={client}>
      <GestureHandlerRootView className="flex-1">
        <AuthProvider>
          <Slot />
          <StatusBar animated translucent networkActivityIndicatorVisible />
        </AuthProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
