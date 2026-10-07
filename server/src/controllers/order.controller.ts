import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import {
    getUserOrdersService,
    getOrderByIdService,
    updateOrderStatusService,
    cancelOrderService,
} from '../services/order.service';

import { OrderStatus } from '@prisma/client';




/* =========================================================
   GET USER ORDERS
========================================================= */

const getUserOrders = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, 'You are not authorized');
    }

    const orders = await getUserOrdersService(userId);

    return res
        .status(200)
        .json(new ApiResponse(200, orders, 'Orders fetched successfully'));
});

/* =========================================================
   GET ORDER BY ID
========================================================= */

const getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const orderId = req.params.id;

    if (!userId) {
        throw new ApiError(401, 'You are not authorized');
    }

    if (!orderId || Array.isArray(orderId)) {
        throw new ApiError(400, 'Invalid order ID');
    }

    const isAdmin = req.user?.role === 'ADMIN';

    const order = await getOrderByIdService(orderId, userId, isAdmin);

    return res
        .status(200)
        .json(new ApiResponse(200, order, 'Order fetched successfully'));
});

/* =========================================================
   UPDATE ORDER STATUS
   ADMIN ONLY
========================================================= */

const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!orderId || Array.isArray(orderId)) {
        throw new ApiError(400, 'Invalid order ID');
    }

    const updatedOrder = await updateOrderStatusService(
        orderId,
        status as OrderStatus
    );

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedOrder, 'Order status updated successfully')
        );
});

/* =========================================================
   CANCEL ORDER
   CUSTOMER
========================================================= */

const cancelOrder = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const orderId = req.params.id;

    if (!userId) {
        throw new ApiError(401, 'You are not authorized');
    }

    if (!orderId || Array.isArray(orderId)) {
        throw new ApiError(400, 'Invalid order ID');
    }

    const cancelledOrder = await cancelOrderService(orderId, userId);

    return res
        .status(200)
        .json(new ApiResponse(200, cancelledOrder, 'Order cancelled successfully'));
});

export { getUserOrders, getOrderById, updateOrderStatus, cancelOrder };
