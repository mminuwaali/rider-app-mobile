import React from "react";
import { IMap } from "./_context/map.context";
import { Dimensions, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

const nigeriRegion = {
    latitude: 9.082,
    longitude: 8.6753,
    latitudeDelta: 10,
    longitudeDelta: 10,
}

export default React.Fragment;
export function SharedMap(properties: IMap) {
    return <View className={`pt-10% flex-1 ${properties.className}`}>
        <MapView
            {...properties}
            showsUserLocation
            followsUserLocation
            style={{ flex: 1 }}
            region={nigeriRegion}
            provider={PROVIDER_GOOGLE}
            showsMyLocationButton={false}
        >
            {properties.markers && properties.markers.map((marker, index) => (
                <Marker key={index} {...marker} />
            ))}

            {properties.polylines && properties.polylines.map((polyline, index) => (
                <Polyline
                    key={index}
                    coordinates={polyline.coordinates}
                    strokeWidth={polyline.strokeWidth || 2}
                    strokeColor={polyline.strokeColor || "#000"}
                />
            ))}
        </MapView>

    </View>

    // return (
    // );
};
