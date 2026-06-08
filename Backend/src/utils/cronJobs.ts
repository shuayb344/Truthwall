
import cron from "node-cron";
import Post from "../models/Post.js";
 
const startCronJobs = (): void => {
  // ─── Expire posts every hour ───────────────────────────────
  cron.schedule("0 * * * *", async () => {
    try {
      const result = await Post.deleteMany({
        isPermanent: false,
        expiresAt: { $lt: new Date() },
      });
 
      if (result.deletedCount > 0) {
        console.log(`🗑️  Expired ${result.deletedCount} post(s)`);
      }
    } catch (error) {
      console.error("Cron job error (post expiry):", error);
    }
  });
 
  console.log("⏰ Cron jobs started");
};
 
export default startCronJobs;
