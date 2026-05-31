import { Router } from "express";
import { createReview, getReviews } from "../controllers/review.controller";
import { authMiddleware } from "../middlewares/auth.middleware";



const router = Router()

router.route("/").post(authMiddleware, createReview);
router.route("/:productId").get(getReviews);

export default router;