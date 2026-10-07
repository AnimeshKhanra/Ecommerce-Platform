import { Router } from "express";
// import { uploadImages } from "../controllers/upload.controller";
import { deleteImages, uploadImages } from "../controllers/uploadIntoS3.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import upload from "../middlewares/upload.middleware";

const router = Router();

router
    .route("/images")
    .post(
        authMiddleware, 
        adminMiddleware, 
        upload.array("images", 8),
        uploadImages
    )
    .delete(
        authMiddleware,
        adminMiddleware,
        deleteImages
    )



export default router;