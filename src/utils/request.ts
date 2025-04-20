import axios from "axios";
import { getExpoHost } from "./expo-host";

const baseURL = getExpoHost().concat(":8000/api/");
const instance = axios.create({});

// interceptors
instance.interceptors.request.use(
    config => { return config },
    error => { return Promise.reject(error) },
);

instance.interceptors.response.use(
    config => { return config },
    error => { return Promise.reject(error) },
);

export { baseURL };
export default instance;
