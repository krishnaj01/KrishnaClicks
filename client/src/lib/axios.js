import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
    baseURL: backendUrl,
    withCredentials: true
});