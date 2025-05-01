import "./global.css";
import React from "react";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useTokenListener } from "../hooks/token.hook";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { preventAutoHideAsync } from "expo-splash-screen";
import AuthProvider from "@/components/providers/auth.provider";
import { PaystackProvider } from "react-native-paystack-webview";
import QueryProvider from "@/components/providers/query.provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export { ErrorBoundary } from "expo-router";
export const unstable_settings = { ignorePatterns: ["_*"] };

preventAutoHideAsync();
export default function () {
  useTokenListener(60_000); // Check token every minute
  const [loaded, error] = useFonts({ ...FontAwesome.font });

  React.useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <AuthProvider>
      <QueryProvider>
        <GestureHandlerRootView className="flex-1">
          <PaystackProvider currency="NGN" debug defaultChannels={['bank', 'card', 'bank_transfer']} publicKey={process.env.NEXT_PUBLIC_PAYSTACK_KEY || ""}>
            {loaded && <Slot />}
            <StatusBar animated translucent networkActivityIndicatorVisible />
          </PaystackProvider>
        </GestureHandlerRootView>
      </QueryProvider>
    </AuthProvider>
  );
}
