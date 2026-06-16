import { Server } from "socket.io";
import type {Server as HTTPServer} from "http";
import { CLIENT_URL } from "./env.js";
import type { INotification } from "../models/notification.js";
import logger from "../utils/logger.js";

let io: Server;

const connectedUsers = new Map<string, string>();

export const initSocket = (httpServer: HTTPServer): Server => {
    io = new Server(httpServer, {
        cors: {
            origin: CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        logger.info("New client connected: " + socket.id);
        socket.on("register", (userId: string) => {
            connectedUsers.set(socket.id, userId);
            logger.info(`User ${userId} registered for notifications with socket ${socket.id}`);
        });
        
        socket.on("disconnect", () => {
            for (const [sockId, userId] of connectedUsers.entries()) {
                if (sockId === socket.id) {
                    connectedUsers.delete(sockId);
                    logger.info(`User ${userId} disconnected from socket ${sockId}`);
                    break;
                }
            }
        });
        
        });


    return io;
};

export const sendNotificationToUser = (userId: string, notification: INotification) => {
  const socketId = connectedUsers.get(userId);
  if (socketId && io) {
    io.to(socketId).emit("notification", notification);
    logger.info(`Sent notification to user ${userId} on socket ${socketId}`);
  } else {
    logger.info(`User ${userId} is not connected, cannot send notification`);
  }
}

export const getIo = () : Server=>{
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
}