import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';
import { validateBody } from '../middlewares/validateBody';

import {
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/order.controller';

import { updateOrderStatusSchema } from '../schemas/order.schema';

const router = Router();


router.get('/', authMiddleware, getUserOrders);

router.get('/:id', authMiddleware, getOrderById);

router.put('/:id/cancel', authMiddleware, cancelOrder);

/*
 * ADMIN
 */

/*
 * Update order status
 */
router.put(
  '/:id/status',
  authMiddleware,
  adminMiddleware,
  validateBody(updateOrderStatusSchema),
  updateOrderStatus
);

export default router;

// import { Router } from "express";
// import { authMiddleware } from "../middlewares/auth.middleware";
// import { adminMiddleware } from "../middlewares/admin.middleware";
// import {
//     getUserOrders,
//     getOrderById,
//     updateOrderStatus,
// } from "../controllers/order.controller"

// const router = Router()

// router.route("/").get(authMiddleware, getUserOrders);
// router.route("/:id").get(authMiddleware, getOrderById);

// // Question to chatGPT: customer can change orderstatus?
// router.route("/:id/status").put(authMiddleware, adminMiddleware, updateOrderStatus);

// export default router;
