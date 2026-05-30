import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import {
    getUserOrders,
    getOrderById,
    updateOrderStatus,
} from "../controllers/order.controller"

const router = Router()

router.route("/").get(authMiddleware, getUserOrders);
router.route("/:id").get(authMiddleware, getOrderById);
router.route("/:id/status").put(authMiddleware, adminMiddleware, updateOrderStatus);

export default router;
