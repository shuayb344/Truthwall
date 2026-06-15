import api from "@/lib/axios";
import type { NotificationsResponse, Notification } from "@/types";

export const fetchNotifications = async (): Promise<NotificationsResponse> => {
  const res = await api.get<NotificationsResponse>("/notifications");
  return res.data;
};

export const markNotificationRead = async (id: string): Promise<Notification> => {
  const res = await api.patch<Notification>(`/notifications/${id}/read`);
  return res.data;
};

export const markAllNotificationsRead = async (): Promise<{ message: string }> => {
  const res = await api.patch<{ message: string }>("/notifications/read-all");
  return res.data;
};
