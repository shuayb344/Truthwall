import axios from "axios";
import useAuthStore from "@/store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const isAuthPage = window.location.pathname === "/auth";
      const isAuthRequest = error.config.url?.includes("/auth/login") || error.config.url?.includes("/auth/register");

      if (!isAuthPage && !isAuthRequest) {
        useAuthStore.getState().logout();
        window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

export default api;