import { Router } from "express";
import { registerController, loginController } from "../controllers/auth.controller.js";
const authRouter = Router();

authRouter.post("/auth/register", registerController);
authRouter.post("/auth/login", loginController);

export default authRouter;



