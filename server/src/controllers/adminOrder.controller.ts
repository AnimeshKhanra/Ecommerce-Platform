import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import {
    getCache,
    setCache,
    delCache,
} from '../utils/redisUtils';
import prisma from '../config/prisma';

/**
 * Get all orders containing products owned by the logged-in admin
 */
const getAdminOrders = asyncHandler(
    async (req: Request, res: Response) => {
        const adminId = req.user?.id;

        if (!adminId) {
            throw new ApiError(401, 'You are not authorized');
        }

        if (req.user?.role !== 'ADMIN') {
            throw new ApiError(403, 'Admin access required');
        }

        const cacheKey = `orders:admin:${adminId}`;

        // Check cache
        const cachedOrders = await getCache<any[]>(cacheKey);

        if (cachedOrders) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        cachedOrders,
                        'Admin orders fetched from cache'
                    )
                );
        }

        /**
         * Find orders where at least one order item
         * belongs to a product owned by this admin.
         */
        const orders = await prisma.order.findMany({
            where: {
                items: {
                    some: {
                        product: {
                            adminId: adminId,
                        },
                    },
                },
            },

            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },

                items: {
                    where: {
                        product: {
                            adminId: adminId,
                        },
                    },

                    include: {
                        product: true,
                    },
                },
            },

            orderBy: {
                createdAt: 'desc',
            },
        });

        await setCache(cacheKey, orders, 3600);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    orders,
                    'Admin orders fetched successfully'
                )
            );
    }
);


/**
 * Get a single order for the logged-in admin
 *
 * Admin can only access the order if the order
 * contains at least one product owned by him.
 */
const getAdminOrderById = asyncHandler(
    async (req: Request, res: Response) => {
        const adminId = req.user?.id;
        const orderId = req.params.id;

        if (!adminId) {
            throw new ApiError(401, 'You are not authorized');
        }

        if (req.user?.role !== 'ADMIN') {
            throw new ApiError(403, 'Admin access required');
        }

        if (!orderId || Array.isArray(orderId)) {
            throw new ApiError(400, 'Invalid order ID');
        }

        const cacheKey = `order:admin:${adminId}:${orderId}`;

        const cachedOrder = await getCache<any>(cacheKey);

        if (cachedOrder) {
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        cachedOrder,
                        'Order fetched from cache'
                    )
                );
        }

        const order = await prisma.order.findFirst({
            where: {
                id: orderId,

                items: {
                    some: {
                        product: {
                            adminId: adminId,
                        },
                    },
                },
            },

            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },

                items: {
                    where: {
                        product: {
                            adminId: adminId,
                        },
                    },

                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!order) {
            throw new ApiError(
                404,
                'Order not found or you do not have access to this order'
            );
        }

        await setCache(cacheKey, order, 3600);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    order,
                    'Order fetched successfully'
                )
            );
    }
);


/**
 * Update order status
 *
 * Only ADMIN can update the status.
 *
 * IMPORTANT:
 * The admin must own at least one product
 * inside this order.
 */
const updateAdminOrderStatus = asyncHandler(
    async (req: Request, res: Response) => {
        const adminId = req.user?.id;
        const orderId = req.params.id;
        const { status } = req.body;

        if (!adminId) {
            throw new ApiError(401, 'You are not authorized');
        }

        if (req.user?.role !== 'ADMIN') {
            throw new ApiError(403, 'Admin access required');
        }

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

        /**
         * Check whether this order contains
         * at least one product owned by this admin.
         */
        const existingOrder = await prisma.order.findFirst({
            where: {
                id: orderId,

                items: {
                    some: {
                        product: {
                            adminId: adminId,
                        },
                    },
                },
            },
        });

        if (!existingOrder) {
            throw new ApiError(
                404,
                'Order not found or you do not have access to this order'
            );
        }

        /**
         * Update order status.
         */
        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId,
            },

            data: {
                status,
            },

            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },

                items: {
                    where: {
                        product: {
                            adminId: adminId,
                        },
                    },

                    include: {
                        product: true,
                    },
                },
            },
        });

        /**
         * Invalidate caches.
         */
        await delCache(`order:admin:${adminId}:${orderId}`);
        await delCache(`order:${orderId}`);
        await delCache(`orders:admin:${adminId}`);
        await delCache(`orders:user:${existingOrder.userId}`);

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    updatedOrder,
                    'Order status updated successfully'
                )
            );
    }
);


export {
    getAdminOrders,
    getAdminOrderById,
    updateAdminOrderStatus,
};