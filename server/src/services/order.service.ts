import type { Stripe } from 'stripe/cjs/stripe.core';
import prisma from '../config/prisma';
import { ApiError } from '../utils/ApiError';

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

export { createOrderService };





// import type { Stripe } from 'stripe/cjs/stripe.core';
// // import { Stripe } from "stripe";
// import prisma from '../config/prisma';
// import { ApiError } from '../utils/ApiError';

// const createOrderService = async (
//     userId: string,
//     session: Stripe.Checkout.Session
// ) => {
//     const paymentIntentId = session.payment_intent?.toString() ?? null;

//     if (!paymentIntentId) {
//         throw new ApiError(400, 'Payment intent ID is missing');
//     }

//     const metadata = session.metadata ?? {};

//     /*
//      * Get the user's cart with current product information.
//      */
//     const cart = await prisma.cart.findUnique({
//         where: {
//             userId,
//         },
//         include: {
//             items: {
//                 include: {
//                     product: true,
//                 },
//             },
//         },
//     });

//     if (!cart || cart.items.length === 0) {
//         throw new ApiError(400, 'Cart is empty or not found');
//     }

//     /*
//      * Create Order + OrderItems + update stock
//      * + clear cart atomically.
//      */
//     /*
//     * 2. Calculate total from database prices
//          */
//     const subtotalPaise = cart.items.reduce(
//         (sum, item) =>
//             sum + Math.round(Number(item.product.price) * 100) * item.quantity,
//         0
//     );

//     const shippingPaise = subtotalPaise / 100 > 1000 ? 0 : 99 * 100;
//     const totalPaise = subtotalPaise + shippingPaise;
//     if (session.amount_total !== totalPaise) {
//         throw new ApiError(400, 'Checkout amount does not match order total');
//     }
//     const total = totalPaise / 100;

//     const order = await prisma.$transaction(async (tx) => {
//         //* Verify and decrease stock
//         for (const item of cart.items) {
//             const updatedProduct = await tx.product.updateMany({
//                 where: {
//                     id: item.productId,
//                     stock: {
//                         gte: item.quantity,
//                     },
//                 },
//                 data: {
//                     stock: {
//                         decrement: item.quantity,
//                     },
//                 },
//             });

//             if (updatedProduct.count !== 1) {
//                 throw new ApiError(
//                     400,
//                     `Insufficient stock for product: ${item.product.name}`
//                 );
//             }
//         }

//         /*
//          * 3. Create Order
//          */
//         const createdOrder = await tx.order.create({
//             data: {
//                 userId,
//                 totalAmount: total,
//                 paymentIntentId,
//                 status: 'CONFIRMED',
//                 paymentStatus: 'PAID',

//                 shippingName: metadata.shippingName ?? '',
//                 shippingPhone: metadata.shippingPhone ?? '',
//                 shippingAddress1: metadata.shippingAddress1 ?? '',
//                 shippingAddress2: metadata.shippingAddress2 || null,
//                 shippingCity: metadata.shippingCity ?? '',
//                 shippingState: metadata.shippingState ?? '',
//                 shippingPostalCode: metadata.shippingPostalCode ?? '',
//                 shippingCountry: metadata.shippingCountry ?? '',

//                 items: {
//                     create: cart.items.map((item) => ({
//                         productId: item.productId,
//                         quantity: item.quantity,
//                         // Snapshot current product price
//                         price: item.product.price,
//                     })),
//                 },
//             },
//             include: {
//                 items: true,
//             },
//         });

//         /*
//          * 4. Clear cart
//          */
//         await tx.cartItem.deleteMany({
//             where: {
//                 cartId: cart.id,
//             },
//         });

//         return createdOrder;
//     });

//     console.log(`Order created: ${order.id} for user: ${userId}`);
//     return order;
// };

// export { createOrderService };



