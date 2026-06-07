import Notification from "../models/notification.js";
import { sendNotificationToUser } from "../config/socket.js";
import { AppError } from "../utils/appError.js";
import type { NotificationType } from "../models/notification.js";

export const createNotification = async ({ userId, message, type , postId}: { userId: string; message: string; type: NotificationType; postId: string }) => {

  const notification = await Notification.create({
    userId,
    message,
    type,
    postId,
  });
  sendNotificationToUser(userId.toString(), notification);
  return notification;
}

export const getUserNotifications = async ( userId: string) => {
  const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(20);
  const unreadCount = await Notification.countDocuments({ userId, read: false });
 
  return { notifications, unreadCount };
}

export const markAsRead = async (notificationId: string, userId: string) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { read: true },
    { new: true }
  );
  if (!notification) {
    throw new AppError("Notification not found", 404);
  }
  return notification;
}

export const markAllAsRead = async (userId: string) => {
  await Notification.updateMany({ userId, read: false }, { read: true });
  return { message: "All notifications marked as read" };
}