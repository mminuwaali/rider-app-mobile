import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export default function () {
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: (props) => (
            <View
              className={`w-16 h-16 rounded-full items-center justify-center absolute ${props.focused ? "bg-white" : "bg-gray-800"
                }`}
              style={{ top: -30, ...shadowStyle }}
            >
              <Ionicons
                {...props}
                color={props.focused ? "#000" : "#aaa"}
                name={props.focused ? "wallet" : "wallet-outline"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: (props) => (
            <View
              className={`w-16 h-16 rounded-full items-center justify-center absolute ${props.focused ? "bg-white" : "bg-gray-800"
                }`}
              style={{ top: -30, ...shadowStyle }}
            >
              <Ionicons
                {...props}
                color={props.focused ? "#000" : "#aaa"}
                name={props.focused ? "home" : "home-outline"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: (props) => (
            <View
              className={`w-16 h-16 rounded-full items-center justify-center absolute ${props.focused ? "bg-white" : "bg-gray-800"
                }`}
              style={{ top: -30, ...shadowStyle }}
            >
              <Ionicons
                {...props}
                color={props.focused ? "#000" : "#aaa"}
                name={props.focused ? "person" : "person-outline"}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

function screenOptions(): BottomTabNavigationOptions {
  return {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarIconStyle: { transform: [{ scale: 0.8 }] },
    tabBarStyle: {
      bottom: 20,
      borderRadius: 15,
      marginInline: 30,
      position: "absolute",
      shadowColor: "rgba(0 0 0 / 0.2)",
    },
  };
}

const shadowStyle = {
  elevation: 5,
  shadowRadius: 5,
  shadowOpacity: 0.2,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 5 },
};
