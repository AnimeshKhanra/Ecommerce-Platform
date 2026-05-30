import express from "express";
import {
  createCheckoutSession,
  getLatestOrder,
} from "../controllers/payment.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post(
  "/checkout",
  authMiddleware,
  createCheckoutSession
);

router.get(
  "/latest-order",
  authMiddleware,
  getLatestOrder
);

export default router;