import type { Stripe } from 'stripe/cjs/stripe.core';
import prisma from '../config/prisma';
import { ApiError } from '../utils/ApiError';

import {
  getCache,
  setCache,
  delCache,
} from "../utils/redisUtils";
import { OrderStatus } from "@prisma/client";

// NOTE: keep these in sync with checkout.service.ts,
// or better, move them into a shared file (e.g. utils/pricing.ts).
const FREE_SHIPPING_THRESHOLD = 1000; // in rupees
const SHIPPING_FEE = 99; // in rupees

const toPaise = (rupees: number) => Math.round(rupees * 100);
const toRupees = (paise: number) => paise / 100;

const createOrderService = async (
    userId: string,
    session: Stripe.Checkout.Session
) => {
    const paymentIntentId =
        typeof session.payment_intent === 'string' ? session.payment_intent : null;

    if (!paymentIntentId) {
        throw new ApiError(400, 'Payment intent ID is missing');
    }

    const metadata = session.metadata ?? {};

    // 1. Get the user's cart with current product information
    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
        throw new ApiError(400, 'Cart is empty or not found');
    }

    // 2. Calculate totals from database prices, in paise (integers)
    const subtotalPaise = cart.items.reduce(
        (sum, item) => sum + toPaise(Number(item.product.price)) * item.quantity,
        0
    );
    const shippingPaise =
        subtotalPaise > toPaise(FREE_SHIPPING_THRESHOLD) ? 0 : toPaise(SHIPPING_FEE);
    const totalPaise = subtotalPaise + shippingPaise;

    // 3. Verify the amount Stripe charged matches our calculation
    //    (done before the transaction: no DB writes are needed to check it)
    if (session.amount_total !== totalPaise) {
        throw new ApiError(400, 'Checkout amount does not match order total');
    }

    // 4. Create Order + OrderItems, decrease stock and clear cart atomically
    const order = await prisma.$transaction(
        async (tx) => {
            // Verify and decrease stock (single atomic statement per product)
            for (const item of cart.items) {
                const updatedProduct = await tx.product.updateMany({
                    where: {
                        id: item.productId,
                        stock: { gte: item.quantity },
                    },
                    data: {
                        stock: { decrement: item.quantity },
                    },
                });

                if (updatedProduct.count !== 1) {
                    throw new ApiError(
                        400,
                        `Insufficient stock for product: ${item.product.name}`
                    );
                }
            }

            // Create order
            const createdOrder = await tx.order.create({
                data: {
                    userId,
                    totalAmount: toRupees(totalPaise),
                    paymentIntentId,
                    status: 'CONFIRMED',
                    paymentStatus: 'PAID',

                    shippingName: metadata.shippingName ?? '',
                    shippingPhone: metadata.shippingPhone ?? '',
                    shippingAddress1: metadata.shippingAddress1 ?? '',
                    shippingAddress2: metadata.shippingAddress2 || null,
                    shippingCity: metadata.shippingCity ?? '',
                    shippingState: metadata.shippingState ?? '',
                    shippingPostalCode: metadata.shippingPostalCode ?? '',
                    shippingCountry: metadata.shippingCountry ?? '',

                    items: {
                        create: cart.items.map((item) => ({
                            productId: item.productId,
                            productName: item.product.name,
                            productImage: item.product.images[0] ?? null,
                            quantity: item.quantity,
                            // Snapshot the price at the time of purchase
                            price: item.product.price,
                        })),
                    },
                },
                include: { items: true },
            });

            // Clear cart
            await tx.cartItem.deleteMany({
                where: { cartId: cart.id },
            });

            return createdOrder;
        },
        { timeout: 10000 }
    );

    console.log(`Order created: ${order.id} for user: ${userId}`);
    return order;
};

/* =========================================================
   GET USER ORDERS
========================================================= */

const getUserOrdersService = async (userId: string) => {
  const cacheKey = `orders:user:${userId}`;

  const cachedOrders = await getCache<any[]>(cacheKey);

  if (cachedOrders) {
    return cachedOrders;
  }

  const orders = await prisma.order.findMany({
    where: {
      userId,
    },

    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              images: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  await setCache(cacheKey, orders, 3600);

  return orders;
};


/* =========================================================
   GET ORDER BY ID
========================================================= */

const getOrderByIdService = async (
  orderId: string,
  userId: string,
  isAdmin: boolean
) => {
  const cacheKey = `order:${orderId}`;

  const cachedOrder = await getCache<any>(cacheKey);

  if (cachedOrder) {
    if (
      cachedOrder.userId !== userId &&
      !isAdmin
    ) {
      throw new ApiError(
        403,
        "Access denied"
      );
    }

    return cachedOrder;
  }

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },

    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              images: true,
            },
          },
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
    throw new ApiError(
      404,
      "Order not found"
    );
  }

  if (
    order.userId !== userId &&
    !isAdmin
  ) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  await setCache(
    cacheKey,
    order,
    3600
  );

  return order;
};


/* =========================================================
   UPDATE ORDER STATUS
   ADMIN ONLY
========================================================= */

const updateOrderStatusService = async (
  orderId: string,
  status: OrderStatus
) => {
  const existingOrder =
    await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

  if (!existingOrder) {
    throw new ApiError(
      404,
      "Order not found"
    );
  }

  if (
    existingOrder.status === "DELIVERED"
  ) {
    throw new ApiError(
      400,
      "Delivered order status cannot be changed"
    );
  }

  if (
    existingOrder.status === "CANCELLED"
  ) {
    throw new ApiError(
      400,
      "Cancelled order status cannot be changed"
    );
  }

  const updatedOrder =
    await prisma.order.update({
      where: {
        id: orderId,
      },

      data: {
        status,
      },

      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
              },
            },
          },
        },
      },
    });

  /*
   * Invalidate single-order cache
   */
  await delCache(
    `order:${orderId}`
  );

  /*
   * Invalidate user's order-list cache
   */
  await delCache(
    `orders:user:${existingOrder.userId}`
  );

  return updatedOrder;
};


/* =========================================================
   CANCEL ORDER
   CUSTOMER
========================================================= */

const cancelOrderService = async (
  orderId: string,
  userId: string
) => {
  const order =
    await prisma.order.findUnique({
      where: {
        id: orderId,
      },

      include: {
        items: true,
      },
    });

  if (!order) {
    throw new ApiError(
      404,
      "Order not found"
    );
  }

  /*
   * Customer can cancel only their own order
   */
  if (order.userId !== userId) {
    throw new ApiError(
      403,
      "Access denied"
    );
  }

  /*
   * Already cancelled
   */
  if (order.status === "CANCELLED") {
    throw new ApiError(
      400,
      "Order is already cancelled"
    );
  }

  /*
   * Cannot cancel delivered order
   */
  if (order.status === "DELIVERED") {
    throw new ApiError(
      400,
      "Delivered order cannot be cancelled"
    );
  }

  /*
   * Cannot cancel shipped order
   */
  if (order.status === "SHIPPED") {
    throw new ApiError(
      400,
      "Shipped order cannot be cancelled"
    );
  }

  const cancelledOrder =
    await prisma.order.update({
      where: {
        id: orderId,
      },

      data: {
        status: "CANCELLED",
      },

      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
              },
            },
          },
        },
      },
    });

  /*
   * Clear Redis
   */
  await delCache(
    `order:${orderId}`
  );

  await delCache(
    `orders:user:${userId}`
  );

  return cancelledOrder;
};


export { createOrderService };

export {
  getUserOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
  cancelOrderService,
};
