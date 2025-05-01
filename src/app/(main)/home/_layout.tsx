import React from "react";
import { Slot } from "expo-router";
import { View } from "react-native";
import { SharedMap } from "./_layout/map";
import { useMapContext } from "./_layout/_context/map.context";
import { requestLocationPermission } from "@/utils/permissions";
import { useLocationContext } from "../_layout/_context/location.provider";

export default function () {
    const { props } = useMapContext();
    const { setEnable } = useLocationContext();

    React.useEffect(() => {
        requestPermissions();
        async function requestPermissions() {
            const hasPermission = await requestLocationPermission();
            setEnable(hasPermission);
        }

        return () => { setEnable(false); };
    }, []);

    return (
        <>
            <SharedMap {...props} />
            <View className="flex-1 py-10% px-5% mb-20% inset-0 absolute">
                <Slot initialRouteName="client" />
            </View>
        </>
    )
}