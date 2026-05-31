import { Router } from "express";
const authRouter = Router();

import { register, login, logout } from "../controllers/auth.controller.js";

authRouter.post("/auth/register", register);
authRouter.post("/auth/login", login);
authRouter.post("/auth/logout", logout);

export default authRouter;