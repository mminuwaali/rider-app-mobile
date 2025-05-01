import { baseURL } from "./request";
import { io } from "socket.io-client";

export const socketBaseURL = baseURL.replace("http", "ws").concat(":8000");

export const driverLocationWebsocket = io(
    socketBaseURL, {
    timeout: 60_000,
    autoConnect: false,
    transports: ["websocket"],
    path: "/ws/driver-location/",
}
);

export const socket = new WebSocket(socketBaseURL + "/ws/driver-location/");