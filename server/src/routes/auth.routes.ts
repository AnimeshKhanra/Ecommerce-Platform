import { Router } from "express";
import {
    register,
    login,
    refreshAccessToken,
    logout
} from "../controllers/auth.controller"

import { authMiddleware } from "../middlewares/auth.middleware";

import { validateBody } from "../middlewares/validateBody";
import { loginSchema, refreshSchema, registerSchema } from "../schemas/auth.schema";
import { authLimiter } from "../middlewares/rateLimit.middleware";



const router = Router();

// router.use(authLimiter);

router.route("/register").post(authLimiter, validateBody(registerSchema), register);

router.route("/login").post(authLimiter, validateBody(loginSchema), login);

router.route("/refresh-token").post(authLimiter, validateBody(refreshSchema), refreshAccessToken);


router.route("/logout").post(authMiddleware, logout);



export default router;