import { Router } from "express";
import { uploadImage } from "../controllers/upload.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import upload from "../middlewares/upload.middleware";
// import prisma from "../config/prisma";

const router = Router();

router
    .route("/image")
    .post(
        authMiddleware, 
        adminMiddleware, 
        upload.single("image"),
        uploadImage
    )

export default router;