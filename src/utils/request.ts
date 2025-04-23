import axios from "axios";
import { TokenManager } from "./token";
import { getExpoHost } from "./expo-host";

const baseURL = "https://rider-app-3lgy.onrender.com";
const instance = axios.create({ baseURL:baseURL + "/api/" });

// Helper function to process Django-style errors
const extractErrorMessages = (errorData: any) => {
    let messages = [];
    if (typeof errorData === "object" && errorData !== null) {
        for (const [field, errors] of Object.entries(errorData)) {
            if (Array.isArray(errors)) {
                errors.forEach((err) => messages.push(`${field}: ${err}`));
            } else {
                messages.push(`${field}: ${errors}`);
            }
        }
    } else if (typeof errorData === "string") {
        messages.push(errorData);
    }
    return messages;
};

// Interceptors
instance.interceptors.request.use(
    async (config) => {
        const token = await TokenManager.getAccessToken();
        if (token && !(await TokenManager.isTokenExpired(token)))
            config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { data } = error.response;
            const messages = extractErrorMessages(data);
            if (messages.length > 0) {
                alert(messages.join("\n")); // You can replace this with a custom alert/toast
            }
        } else {
            // Handle other errors, like network issues
            alert("An unexpected error occurred. Please try again.");
        }
        return Promise.reject(error);
    }
);

export { baseURL };
export default instance;
