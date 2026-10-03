import { Router } from "express";
import { createReview, getReviews, updateReview, deleteReview } from "../controllers/review.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validateBody";
import { createReviewSchema, updateReviewSchema } from "../schemas/review.schema";



const router = Router()

router
    .route("/")
    .post(
        authMiddleware, 
        validateBody(createReviewSchema),
        createReview
    );


router
    .route("/:productId")
    .get(getReviews);


router
    .route("/:id")
    .put(
        authMiddleware,
        validateBody(updateReviewSchema),
        updateReview
    )
    .delete(
        authMiddleware,
        deleteReview
    )


export default router;