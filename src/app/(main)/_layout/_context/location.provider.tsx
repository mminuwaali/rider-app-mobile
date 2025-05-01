import React from "react";
import { socketBaseURL } from "@/utils/socket";

interface ILocationContext {
    enable: boolean;
    socket: WebSocket | null; // Directly store WebSocket instance in state
    setEnable: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocationContext = React.createContext<ILocationContext | null>(null);
export const useLocationContext = () => React.useContext(LocationContext)!;

export default function LocationProvider(properties: React.PropsWithChildren) {
    const [enable, setEnable] = React.useState(false);
    const [socket, setSocket] = React.useState<WebSocket | null>(null);

    React.useEffect(() => {
        // Check if the socket needs to be created
        if (enable && !socket) {
            const newSocket = new WebSocket(`${socketBaseURL}/ws/driver-location/`);

            // newSocket.onmessage = console.log;
            newSocket.onopen = () => console.log("WebSocket connected");
            newSocket.onerror = (e) => console.error("WebSocket error", e);
            newSocket.onclose = () => console.log("WebSocket disconnected");

            setSocket(newSocket); // Set the socket in state when enabled
        } else if (!enable && socket) {
            socket.close(); // Close the socket if not enabled
            setSocket(null); // Reset the socket in state
        }

        // Cleanup on component unmount or when enable is changed
        return () => {
            if (socket) {
                socket.close();
                setSocket(null); // Ensure socket is null after cleanup
            }
        };
    }, [enable]); // Only depend on `enable` and avoid socket in the dependency array

    return (
        <LocationContext.Provider value={{ socket, enable, setEnable }} {...properties} />
    );
}
