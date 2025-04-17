import React from "react";
import { Dimensions, View } from "react-native";
import { useMapContext } from "../_context/map.context";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";


export const SharedMap = () => {
    const { props } = useMapContext();
    const mapRef = React.useRef<MapView>(null);

    return <View className="flex-1">
        <MapView
            {...props}
            showsUserLocation
            followsUserLocation
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1, ...Dimensions.get("screen") }}
        >
            {props.markers && props.markers.map((marker, index) => (
                <Marker key={index} {...marker} />
            ))}

            {props.polylines && props.polylines.map((polyline, index) => (
                <Polyline
                    key={index}
                    // {...polyline}
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
