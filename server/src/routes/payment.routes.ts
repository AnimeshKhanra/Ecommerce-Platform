import express from "express";
import { createCheckoutSession } from "../controllers/payment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/checkout", authMiddleware, createCheckoutSession);

export default router;