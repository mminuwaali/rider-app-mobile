import { Slot } from "expo-router";
import { View } from "react-native";
import { SharedMap } from "./_layout/shared-map";
import MapProvider from "./_layout/_context/map.context";

export default function () {
    return (
        <MapProvider>
            <View className="flex-1">
                <SharedMap />

                <View className="pt-10% pb-20% flex-1 absolute inset-0 bg-transparent pointer-events-box-none">
                    <Slot initialRouteName="client" />
                </View>
            </View>
        </MapProvider>
    );
}