import { Stack } from "expo-router";
import AnimateProvider from "./_layout/_providers/animate.provider";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export default function () {
    return (
        <AnimateProvider>
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
        </AnimateProvider>
    );
}

function screenOptions(): NativeStackNavigationOptions {
    return {
        animation: "fade",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        contentStyle: {
            padding: "5%",
            paddingTop: 0,
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