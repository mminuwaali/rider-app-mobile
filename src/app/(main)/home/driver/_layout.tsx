import React from "react";
import { Tabs } from "expo-router";
import { useMapContext } from "../_layout/_context/map.context";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export default function () {
    const { resetProps } = useMapContext();

    React.useEffect(() => {
        resetProps({
            showsUserLocation: true,
            followsUserLocation: true,
        });
    }, []);

    return (
        <Tabs screenOptions={screenOptions} initialRouteName="default">
            <Tabs.Screen name="default" />
        </Tabs>
    );
}

function screenOptions(): BottomTabNavigationOptions {
    return {};
}