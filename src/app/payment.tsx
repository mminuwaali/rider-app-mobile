import React from "react";
import WebView from "react-native-webview";
import { Alert, BackHandler } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useVerifyTransaction } from "@/hooks/api/wallet.hook";

export default function PaystackPaymentScreen() {
    const verifyMutation = useVerifyTransaction();
    const { url } = useLocalSearchParams<{ url: string }>();
    const callback_url = "https://rider-app/paystack/verify"; // Callback URL

    React.useEffect(() => {
        // Handle hardware back button
        const handleBackPress = () => {
            router.back(); // Navigate back to the previous screen
            return true; // Prevent default behavior
        };

        BackHandler.addEventListener("hardwareBackPress", handleBackPress);

        // Cleanup the event listener on unmount
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
        };
    }, [router]);

    const handleNavigationChange = async (event: any) => {
        // Check if the URL is the Paystack callback URL
        console.log(event);
        if (event.url.startsWith(callback_url)) {
            const url = new URL(event.url);

            const status = url.searchParams.get("status");
            const reference = url.searchParams.get("reference");

            console.log(status, reference);

            if (reference) {
                await verifyMutation.mutateAsync(reference);

                // Success scenario
                Alert.alert("Success", "Payment was successful.", [
                    { text: "OK", onPress: () => router.back() },
                ]);
            } else {
                // Error scenario
                Alert.alert("Error", "Payment failed. Please try again.", [
                    { text: "OK", onPress: () => router.back() },
                ]);
            }
        }
    };

    return (
        url && (
            <WebView
                javaScriptEnabled
                domStorageEnabled
                source={{ uri: url }}
                className="flex-1 w-screen h-screen"
                onNavigationStateChange={handleNavigationChange}
            />
        )
    );
}
