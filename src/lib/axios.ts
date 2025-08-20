/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "@/config";
import axios, { type AxiosRequestConfig } from "axios";



export const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
},
);

let isRefreshing = false;

let pendingQueue: {
    resolve: (value: unknown) => void;
    reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: any) => {
    pendingQueue.forEach((promise) => {
        if (error) {
            promise.reject(error)
        } else {
            promise.resolve(null)
        }
    });
    pendingQueue = [];
}

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {

        const originalRequest = error.config as AxiosRequestConfig & { _retry: boolean };

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                pendingQueue.push({ resolve, reject });
            })
                .then(() => axiosInstance(originalRequest))
                .catch(() => Promise.reject(error))
        }

        isRefreshing = true;
        if (error.response.status === 500 && error.response.data.message === "jwt expired" && !originalRequest._retry) {
            console.log("jwt expired")
            originalRequest._retry = true
            try {
                const res = await axiosInstance.post("/auth/refresh-token");
                console.log("new token ; ", res.data)
                processQueue(null);
                return axiosInstance(originalRequest);
            } catch (error) {
                console.error(error)
                processQueue(error);
                return Promise.reject(error)
            } finally {
                isRefreshing = false
            }
        }
        return Promise.reject(error);
    }
);