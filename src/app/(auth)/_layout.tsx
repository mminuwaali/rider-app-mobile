import React from "react";
import { router, Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useAuthContext } from "@/components/providers/auth.provider";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export default function () {
    const { user } = useAuthContext();

    React.useEffect(() => {
        if (user) router.replace(`/home/${user.role}/` as never);
    }, [user]);

    return (
        <Tabs screenOptions={screenOptions}>
            <Tabs.Screen
                name="sign-in/index"
                options={{
                    title: "Sign in",
                    tabBarItemStyle: { display: "flex" },
                }}
            />
            <Tabs.Screen
                name="sign-up/index"
                options={{
                    title: "Sign up",
                    tabBarItemStyle: { display: "flex" },
                }}
            />
        </Tabs>
    );
}

function screenOptions(): BottomTabNavigationOptions {
    return {
        animation: "shift",
        headerShown: false,
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#757575",
        tabBarActiveBackgroundColor: "#fff",
        tabBarItemStyle: { display: "none" },
        tabBarIconStyle: { display: "none" },
        tabBarInactiveBackgroundColor: "transparent",
        sceneStyle: {
            padding: "5%",
            paddingTop: 150,
            backgroundColor: "#f7f7f7",
        },
        tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "800",
        },
        tabBarStyle: {
            top: 50,
            left: 50,
            right: 50,
            elevation: 5,
            shadowRadius: 4,
            marginInline: 50,
            borderRadius: 50,
            shadowOpacity: 0.1,
            position: "absolute",
            backgroundColor: "#eeeeee",
            shadowColor: "rgba((0, 0, 0, 0.05)",
            shadowOffset: { width: 0, height: 2 },
        },
        tabBarButton(props) {
            return (
                <TouchableOpacity
                    style={props.style}
                    onPress={props.onPress}
                    children={props.children}
                    className="flex-1 m-2 shadow-sm items-center !justify-center !rounded-full"
                />
            );
        },
    };
}