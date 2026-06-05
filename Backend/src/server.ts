import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { CLIENT_URL, PORT, } from "./config/env.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import  postRouter  from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import uploadRouter from "./routes/upload.routes.js";

const app = express();

await connectDB();

app.use(helmet());
app.use(cors({origin: CLIENT_URL, credentials: true}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRouter);
app.use("/api", postRouter);
app.use("/api/posts/:id", commentRouter);
app.use("/api/upload", uploadRouter);
app.get("/", (req, res) => {
  res.json({ message: "Hello, Truthwall!" });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 