import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { initSocket } from "./config/socket.js";
import { CLIENT_URL, PORT, } from "./config/env.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import  postRouter  from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import startCronJobs from "./utils/cronJobs.js";
import { createServer } from "http";
import bookmarkRouter from "./routes/bookmark.routes.js";
import adminRouter from "./routes/admin.routes.js";
import profileRouter from "./routes/profile.routes.js";

const app = express();
const httpServer = createServer(app)

await connectDB();
initSocket(httpServer);
startCronJobs();


app.use(helmet());
app.use(cors({origin: CLIENT_URL, credentials: true}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRouter);
app.use("/api", postRouter);
app.use("/api/posts/:id", commentRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/bookmarks", bookmarkRouter);
app.use("/api/admin", adminRouter);
app.use("/api/profile", profileRouter);
 

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});


app.use(errorMiddleware);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 