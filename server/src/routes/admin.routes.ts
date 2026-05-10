import { Router } from "express";

import { adminDashboard } from "../controllers/admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";



const router = Router();


router
    .route("/dashboard")
    .get(
        authMiddleware,
        adminMiddleware,
        adminDashboard
    );


export default router;