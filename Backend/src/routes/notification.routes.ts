import { Router } from "express";
import {
  getNotificationsHandler,
  markAsReadHandler,
  markAllAsReadHandler,
} from "../controllers/notification.controller.js";
import { protect } from "../middleware/auth.middleware.js";
 
const router = Router();
 
// All notification routes are protected
router.get("/", protect, getNotificationsHandler);
router.patch("/read-all", protect, markAllAsReadHandler);
router.patch("/:id/read", protect, markAsReadHandler);
 
export default router;
 
