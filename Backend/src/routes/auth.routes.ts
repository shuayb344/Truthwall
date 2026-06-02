import { Router } from "express";
import { registerController, loginController } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { googleAuth } from "../controllers/googleAuth.controller.js";
import { googleAuthSchema } from "../validators/googleAuth.validator.js";
const authRouter = Router();

authRouter.post("/auth/register", validate({ body: registerSchema }), registerController);
authRouter.post("/auth/login", validate({ body: loginSchema }), loginController);
authRouter.post("/auth/google", validate({ body: googleAuthSchema }), googleAuth);

export default authRouter;



