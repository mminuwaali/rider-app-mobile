import React from "react";
import { Slot } from "expo-router";
import * as Location from "expo-location";
import RiderProvider from "./_layout/_context/rider.context";
import { useAuthContext } from "@/components/providers/auth.provider";
import { useLocationContext } from "../../_layout/_context/location.provider";

export default function () {
    const { user } = useAuthContext();
    const { socket } = useLocationContext();

    React.useEffect(() => {
        let locationWatcher: Location.LocationSubscription | null = null;

        startSendingLocation();
        async function startSendingLocation() {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (granted) {
                locationWatcher = await Location.watchPositionAsync(
                    { accuracy: Location.Accuracy.High, distanceInterval: 10 }, // High accuracy, updates every 10 meters
                    (location) => {
                        console.log("sending location", location);

                        console.log(socket, socket?.readyState === WebSocket.OPEN)
                        if (socket && socket.readyState === WebSocket.OPEN) {
                            // Emit location to the server
                            socket.send(
                                JSON.stringify({
                                    action: "send_location",
                                    data: { user, ...location.coords },
                                })
                            );
                        }
                    }
                );
            }
        }

        return () => {
            if (locationWatcher) locationWatcher.remove();
        };
    }, [socket]);

    return (
        <RiderProvider>
            <Slot initialRouteName="default/index" />
        </RiderProvider>
    );
}