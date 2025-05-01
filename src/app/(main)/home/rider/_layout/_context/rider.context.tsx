import React from "react";
import * as Location from "expo-location";
import { ImageURISource } from "react-native";
import { socketBaseURL } from "@/utils/socket";
import { MapMarkerProps } from "react-native-maps";
import { useGetMyRide } from "@/hooks/api/rider.hook";
import { useMapContext } from "../../../_layout/_context/map.context";
import { useAuthContext } from "@/components/providers/auth.provider";
import { useLocationContext } from "@/app/(main)/_layout/_context/location.provider";

interface IRiderContext {
    requests?: IRequest;
    riderStatus: WebSocket | null;
    setRequests: (item?: IRequest) => void;
}


interface IDriverLocationMarker {
    user: IUser;
    color?: string;
    latitude: number;
    longitude: number;
};

const RiderContext = React.createContext<null | IRiderContext>(null);
export const useRiderContext = () => React.useContext(RiderContext)!;

export default function RiderProvider(properties: React.PropsWithChildren) {
    const { user } = useAuthContext();
    const riderQuery = useGetMyRide();
    const { socket } = useLocationContext();
    const { updateProps } = useMapContext();
    const [request, setRequest] = React.useState<IRequest>();
    const [riderStatus, setRiderStatus] = React.useState<WebSocket | null>(null);
    const [markers, setMarkers] = React.useState<{ [key: number]: IDriverLocationMarker }>({});

    React.useEffect(() => {
        if (request && ["completed", "cancelled"].includes(request.status))
            setRequest(undefined);
    }, [request]);

    React.useEffect(() => {
        let locationWatcher: Location.LocationSubscription | null = null;

        startSendingLocation();
        async function startSendingLocation() {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (granted) {
                locationWatcher = await Location.watchPositionAsync(
                    { accuracy: Location.Accuracy.High, distanceInterval: 10 }, // High accuracy, updates every 10 meters
                    (location) => {
                        // console.log("sending location", location);

                        // console.log(socket, socket?.readyState === WebSocket.OPEN)
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
            socket?.close();
            if (locationWatcher) locationWatcher.remove();
        };
    }, [socket]);

    React.useEffect(() => {
        // Check if the socket needs to be created
        if (!riderStatus && request) {
            const newSocket = new WebSocket(`${socketBaseURL}/ws/rider-status/${request.id}/`);

            // newSocket.onmessage = console.log;
            newSocket.onopen = () => console.log("WebSocket connected");
            newSocket.onerror = (e) => console.error("WebSocket error", e);
            newSocket.onclose = () => console.log("WebSocket disconnected");
            newSocket.onmessage = (data: MessageEvent<string>) => {
                const item: { data: IRequest } = JSON.parse(data.data);
                if (["completed", "cancelled"].includes(item.data.status))
                    setRequest(undefined);
                else
                    setRequest(item.data);
            };

            setRiderStatus(newSocket); // Set the riderStatus in state when enabled
        } else if (riderStatus) {
            riderStatus.close(); // Close the riderStatus if not enabled
            setRiderStatus(null); // Reset the riderStatus in state
        }

        // Cleanup on component unmount or when enable is changed
        return () => {
            if (riderStatus) {
                riderStatus.close();
                setRiderStatus(null); // Ensure socket is null after cleanup
            }
        };
    }, [request]); // Only depend on `enable` and avoid socket in the dependency array

    React.useEffect(() => {
        if (riderQuery.isFetched && !request)
            setRequest(riderQuery.data);
    }, [riderQuery])

    React.useEffect(() => {
        const updatedMarkers = Object.entries(markers).map(([key, item]): MapMarkerProps => {
            let image: undefined | ImageURISource = undefined;
            if (item.user.profile) image = { uri: item.user.profile, width: 1, height: 1 };

            return ({
                className: "",
                title: item.user.username,
                pinColor: item.color || "blue",
                onPress: () => alert("driver is on his way, don't worry"),
                description: `${item.user.first_name} ${item.user.last_name}`,
                coordinate: { latitude: item.latitude, longitude: item.longitude },
            })
        })

        updateProps({ markers: updatedMarkers });
    }, [markers]);

    return (
        <RiderContext.Provider
            {...properties}
            value={{ requests: request, setRequests: setRequest, riderStatus, }}
        />
    )
}