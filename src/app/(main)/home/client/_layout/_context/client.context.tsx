import React from "react";
import * as Location from "expo-location";
import { ImageURISource } from "react-native";
import { socketBaseURL } from "@/utils/socket";
import { MapMarkerProps } from "react-native-maps";
import { calculateDistance } from "@/utils/geocoding";
import { useMapContext } from "../../../_layout/_context/map.context";
import { useGetMyRide, useSearchRiders } from "@/hooks/api/rider.hook";
import { useLocationContext } from "@/app/(main)/_layout/_context/location.provider";

interface IClientContext {
    rider?: IRequest;
    riderStatus: WebSocket | null;
    setRider: (item?: IRequest) => void;
    riders: (IRider & ISearchRiderData)[];
    fetchRiders: (item: IFetchRidersArg) => Promise<void>
    setRiders: (items: (IRider & ISearchRiderData)[]) => void;
}

interface IFetchRidersArg {
    location?: Record<string, any>;
    destination: Record<string, any>;
    service_type: IRider['service_type'];
}

interface IDriverLocationMarker {
    user: IUser;
    color?: string;
    latitude: number;
    longitude: number;
};

const ClientContext = React.createContext<null | IClientContext>(null);
export const useClientContext = () => React.useContext(ClientContext)!;

export default function ClientProvider(properties: React.PropsWithChildren) {
    const riderQuery = useGetMyRide();
    const { socket } = useLocationContext();
    const { updateProps } = useMapContext();
    const ridersMutation = useSearchRiders();
    const [rider, setRider] = React.useState<IRequest>();
    const [riderStatus, setRiderStatus] = React.useState<WebSocket | null>(null);
    const [riders, setRiders] = React.useState<(IRider & ISearchRiderData)[]>([]);
    const [markers, setMarkers] = React.useState<{ [key: number]: IDriverLocationMarker }>({});

    React.useEffect(() => {
        console.log(rider && ["completed", "cancelled"].includes(rider.status))
        if (rider && ["completed", "cancelled"].includes(rider.status)) {
            setRiders([]);
            setRider(undefined);
            console.log("updating rider from state", rider);
        }
    }, [rider]);

    React.useEffect(() => {
        // Check if the socket needs to be created
        if (!riderStatus && rider) {
            const newSocket = new WebSocket(`${socketBaseURL}/ws/rider-status/${rider.id}/`);

            // newSocket.onmessage = console.log;
            newSocket.onopen = () => console.log("WebSocket connected");
            newSocket.onerror = (e) => console.error("WebSocket error", e);
            newSocket.onclose = () => console.log("WebSocket disconnected");
            newSocket.onmessage = (data: MessageEvent<string>) => {
                const item: { data: IRequest } = JSON.parse(data.data);
                console.log("setting rider through websocket", item.data);
                if (["completed", "cancelled"].includes(item.data.status)) {
                    setRider(undefined);
                } else {
                    setRider(item.data);
                }
                setRiders([]);
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
    }, [rider]); // Only depend on `enable` and avoid socket in the dependency array

    const fetchRiders = async (item: IFetchRidersArg) => {
        const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        const { latitude, longitude } = coords

        item['location'] = item['location'] ?? { latitude, longitude };
        const distance = calculateDistance(item.location as any, item.destination as any);

        ridersMutation.mutate(item, {
            onSuccess(data) {
                if (data.length === 0)
                    return alert("Could not find riders with the given parameter");
                setRiders(data.map((ele) => ({
                    ...item,
                    ...ele,
                    distance,
                    ...ele.rider,

                })));
            }
        })
    };

    React.useEffect(() => {
        if (riderQuery.isFetched && riderQuery.data && !rider) {
            console.log("updating rider from query", riderQuery.data);

            setRiders([]);
            setRider(riderQuery.data);
        }
    }, [riderQuery])

    React.useEffect(() => {
        console.log(markers);

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

    React.useEffect(() => {
        if (socket) {
            function handleSetLocationMarkers(event: MessageEvent<any>) {
                const data: IDriverLocationMarker = JSON.parse(event.data as string);
                setMarkers(prev => ({ ...prev, [data.user.id]: data }));
            }

            socket.addEventListener("message", handleSetLocationMarkers);
            return () => socket.removeEventListener("message", handleSetLocationMarkers);
        }
    }, [socket]);

    return (
        <ClientContext.Provider
            {...properties}
            value={{ rider, riders, setRider, setRiders, riderStatus, fetchRiders }}
        />
    )
}