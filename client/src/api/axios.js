import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000" : "https://restaurant-qr-ordering-system-njvn.onrender.com");

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export default api;
