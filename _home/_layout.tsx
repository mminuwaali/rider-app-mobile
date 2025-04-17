import {  View } from "react-native";
import { Slot, Stack } from "expo-router";
import MapProvider from "./_layout/_context/map.context";
import { SharedMap } from "./_layout/_components/shared-map";

export default function () {
  return <MapProvider>
    <View className="flex-1">
      <SharedMap />

      <View className="flex-1 absolute inset-0 bg-transparent pointer-events-box-none">
        <Slot />
      </View>
    </View>
  </MapProvider>;
}
