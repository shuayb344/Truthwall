import axios from "axios";
import useAuthStore from "@/store/authStore";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const adminApi = axios.create({
  baseURL: `${API_URL}/admin`,
});

adminApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getStats = async () => {
  const response = await adminApi.get("/stats");
  return response.data;
};

export const getUsers = async () => {
  const response = await adminApi.get("/users");
  return response.data;
};

export const getReports = async () => {
  const response = await adminApi.get("/reports");
  return response.data;
};

export const resolveReport = async (reportId: string) => {
  const response = await adminApi.patch(`/reports/${reportId}/resolve`);
  return response.data;
};

export const removePost = async (postId: string) => {
  const response = await adminApi.patch(`/posts/${postId}/remove`);
  return response.data;
};

export const banUser = async (userId: string) => {
  const response = await adminApi.patch(`/users/${userId}/ban`);
  return response.data;
};

export const unbanUser = async (userId: string) => {
  const response = await adminApi.patch(`/users/${userId}/unban`);
  return response.data;
};

export default adminApi;
