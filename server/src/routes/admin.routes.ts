import { Router } from "express";

import { getAdminStats  } from "../controllers/admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";



const router = Router();


router
    .route("/stats")
    .get(
        authMiddleware,
        adminMiddleware,
        getAdminStats 
    );


export default router;