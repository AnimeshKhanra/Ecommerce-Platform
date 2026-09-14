import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { getAdminStats  } from "../controllers/admin.controller";
import {
    getAdminOrders,
    getAdminOrderById,
    updateAdminOrderStatus
} from "../controllers/adminOrder.controller"



const router = Router();


router.use(authMiddleware);
router.use(adminMiddleware);

// GET /api/admin/stats
router.route("/stats").get(getAdminStats);

// GET /api/admin/orders
// Get all orders containing products owned by this admin
router.route("/orders").get(getAdminOrders);

// GET /api/admin/orders/:id
// Get a specific order belonging to this admin's products
router.route("/orders/:id").get(getAdminOrderById);

// PATCH /api/admin/orders/:id/status
// Update order status
router.route('/orders/:id/status').patch(updateAdminOrderStatus);



export default router;