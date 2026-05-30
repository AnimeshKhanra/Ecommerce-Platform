import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import {
    getCache,
    setCache,
    delCache,
    delCacheByPattern,
} from '../utils/redisUtils';
import prisma from '../config/prisma';

const getUserOrders = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new ApiError(400, 'You are not Authorized');
    }

    const cacheKey = `orders:user:${userId}`;

    const cachedOrder = await getCache<any[]>(cacheKey);

    if (cachedOrder) {
        return res
            .status(200)
            .json(new ApiResponse(200, cachedOrder, 'Order fetched from cache'));
    }

    const order = await prisma.order.findMany({
        where: {
            userId,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    await setCache(cacheKey, order, 3600);

    return res
        .status(200)
        .json(new ApiResponse(200, order, 'Order fetched successfully'));
});

const getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const orderId = req.params.id;

    if (!userId) {
        throw new ApiError(400, 'You are not Authorized');
    }

    if (!orderId || Array.isArray(orderId)) {
        throw new ApiError(400, 'Invalid order ID');
    }

    const cacheKey = `order:${orderId}`;
    const cachedOrder = await getCache<any>(cacheKey);

    if (cachedOrder) {
        if (cachedOrder.userId !== userId && req.user?.role !== 'ADMIN') {
            throw new ApiError(400, 'Access denied');
        }

        return res
            .status(200)
            .json(new ApiResponse(200, cachedOrder, 'Order fetched from cache'));
    }

    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    if (!order) {
        throw new ApiError(404, 'Order not found');
    }

    if (order.userId !== userId && req.user?.role !== 'ADMIN') {
        throw new ApiError(403, 'Access denied');
    }

    await setCache(cacheKey, order, 3600);

    return res
        .status(200)
        .json(new ApiResponse(200, order, 'Order fetched successfully'));
});

const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!orderId || Array.isArray(orderId)) {
        throw new ApiError(400, 'Invalid order ID');
    }

    const allowedStatus = [
        'PENDING',
        'CONFIRMED',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED',
    ];

    if (!allowedStatus.includes(status)) {
        throw new ApiError(400, 'Invalid order status');
    }

    const existingOrder = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
    });

    if (!existingOrder) {
        throw new ApiError(404, 'Order not found');
    }

    const updateOrder = await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            status,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    await delCache(`order:${orderId}`);
    await delCache(`orders:user:${existingOrder.userId}`);

    await delCacheByPattern('orders:user:*');

    return res
        .status(200)
        .json(new ApiResponse(200, updateOrder, 'Order status updated'));
});

export { getUserOrders, getOrderById, updateOrderStatus };
