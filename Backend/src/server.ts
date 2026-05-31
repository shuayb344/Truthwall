import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { CLIENT_URL, PORT, } from "./config/env.js";
import connectDB from "./config/db.js";

const app = express();

await connectDB();

app.use(helmet());
app.use(cors({origin: CLIENT_URL, credentials: true}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello, Truthwall!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 