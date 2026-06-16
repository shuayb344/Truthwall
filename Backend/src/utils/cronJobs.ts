import cron from "node-cron";
import Post from "../models/Post.js";
import logger from "./logger.js";
 
const startCronJobs = (): void => {

  cron.schedule("0 * * * *", async () => {
    try {
      const result = await Post.deleteMany({
        isPermanent: false,
        expiresAt: { $lt: new Date() },
      });
 
      if (result.deletedCount > 0) {
        logger.info(`🗑️  Expired ${result.deletedCount} post(s)`);
      }
    } catch (error) {
      logger.error("Cron job error (post expiry):", error);
    }
  });
 
  logger.info("⏰ Cron jobs started");
};
 
export default startCronJobs;
