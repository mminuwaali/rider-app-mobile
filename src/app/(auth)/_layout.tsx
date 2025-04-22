import React from "react";
import { router, Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useAuthContext } from "../(providers)/auth.provider";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export default function () {
  const {user} = useAuthContext();

  React.useEffect(() =>{
    if(user) router.replace("/home/" as never);
  },[user]);

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen name="sign-in/index" options={{ title: "Sign in" }} />
      <Tabs.Screen name="sign-up/index" options={{ title: "Sign up" }} />
      <Tabs.Screen
        name="(pass)"
        options={{ tabBarItemStyle: { display: "none" } }}
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
      top: 60,
      left: 40,
      right: 40,
      elevation: 5,
      shadowRadius: 4,
      marginInline: 40,
      borderRadius: 40,
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
