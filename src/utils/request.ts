import axios from "axios";

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

export { };
export default instance;
