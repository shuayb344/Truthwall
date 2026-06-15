import { Router } from "express";
import {
  getReportsHandler,
  removePostHandler,
  banUserHandler,
  unbanUserHandler,
  getStatsHandler,
  getUsersHandler,
  resolveReportHandler,
} from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.js";
 
const router = Router();
 

router.use(protect, adminOnly);
 
router.get("/stats", getStatsHandler);
router.get("/users", getUsersHandler);
router.get("/reports", getReportsHandler);
router.patch("/reports/:id/resolve", resolveReportHandler);
router.patch("/posts/:id/remove", removePostHandler);
router.patch("/users/:id/ban", banUserHandler);
router.patch("/users/:id/unban", unbanUserHandler);
 
export default router;
