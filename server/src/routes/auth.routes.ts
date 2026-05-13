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



const router = Router();

router.route("/register").post(validateBody(registerSchema), register);
// router.route("/register").post(register);

router.route("/login").post(validateBody(loginSchema), login);
// router.route("/login").post(login);

router.route("/refresh-token").post(validateBody(refreshSchema), refreshAccessToken);
// router.route("/refresh-token").post(refreshAccessToken);

router.route("/logout").post(authMiddleware, logout);


// router
//     .route("/admin/dashboard")
//     .get(
//         authMiddleware,
//         adminMiddleware,
//         adminDashboard
//     );

export default router;