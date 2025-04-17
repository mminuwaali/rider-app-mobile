import React from "react";
import { View } from "react-native";
import { useMapContext } from "../../_layout/_context/map.context";

export default function () {
    const { updateProps } = useMapContext();


    React.useEffect(() => {
        updateProps({
            region: {
                latitude: 9.0820,
                longitude: 8.6753,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers: [
                {
                    coordinate: { latitude: 34.0522, longitude: -118.2437 },
                    title: "Los Angeles",
                    description: "This is Los Angeles",
                    onPress: ({ currentTarget }) => {

                        console.log("Marker pressed");
                    }
                },
            ],
        });
    }, []);

    return <View className="flex-1"></View>
}