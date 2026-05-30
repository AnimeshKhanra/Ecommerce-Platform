import { Request, Response } from "express";
// Import the Stripe namespace from the core module where all sub-types
// (Event, Checkout.Session, etc.) are properly exported.
// The default CJS export (`StripeConstructor`) only re-exports `type Stripe`.
import type { Stripe } from "stripe/cjs/stripe.core";
import { stripe } from "../config/stripe";
import prisma from "../config/prisma";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

/**
 * Processes a completed checkout session by creating an order from the user's cart.
 *
 * Handles idempotency (duplicate webhook deliveries) and clears the cart after order creation.
 */
async function handleCheckoutSessionCompleted(
    session: Stripe.Checkout.Session
): Promise<void> {
    const userId = session.metadata?.userId;

    if (!userId) {
        throw new ApiError(400, "Missing userId in session metadata");
    }

    const paymentIntentId = session.payment_intent?.toString() ?? null;

    // Idempotency: skip if this payment was already processed
    if (paymentIntentId) {
        const existingOrder = await prisma.order.findFirst({
            where: { paymentIntentId },
        });

        if (existingOrder) {
            console.log(`Duplicate webhook received for order: ${existingOrder.id}`);
            return;
        }
    }

    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: { product: true },
            },
        },
    });

    if (!cart || cart.items.length === 0) {
        throw new ApiError(400, "Cart is empty or not found");
    }

    const metadata = session.metadata ?? {};

    // Use a transaction to ensure order creation and cart cleanup are atomic
    const order = await prisma.$transaction(async (tx) => {
        const createdOrder = await tx.order.create({
            data: {
                userId,
                totalAmount: Number(metadata.totalAmount) || 0,
                paymentIntentId,
                status: "CONFIRMED",
                paymentStatus: "PAID",
                shippingName: metadata.shippingName ?? "",
                shippingAddress: metadata.shippingAddress ?? "",
                city: metadata.city ?? "",
                postalCode: metadata.postalCode ?? "",
                country: metadata.country ?? "",
                items: {
                    create: cart.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price,
                    })),
                },
            },
        });

        await tx.cartItem.deleteMany({
            where: { cartId: cart.id },
        });

        return createdOrder;
    });

    console.log(`Order created: ${order.id} for user: ${userId}`);
}

/**
 * Stripe webhook handler.
 *
 * Verifies the webhook signature, then dispatches to the appropriate
 * event handler based on `event.type`.
 *
 * IMPORTANT: The route serving this handler must use `express.raw()` middleware
 * (not `express.json()`) so that `req.body` is the raw Buffer needed for
 * signature verification.
 */
const stripeWebhookHandler = asyncHandler(async (req: Request, res: Response) => {
    console.log("Webhook hit");
    const signature = req.headers["stripe-signature"];

    if (!signature) {
        throw new ApiError(400, "Missing Stripe signature header");
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        throw new ApiError(500, "STRIPE_WEBHOOK_SECRET is not configured");
    }

    // constructEvent throws on invalid signature — no need for a separate null check
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        throw new ApiError(400, `Webhook signature verification failed: ${message}`);
    }

    switch (event.type) {
        case "checkout.session.completed":
            await handleCheckoutSessionCompleted(
                event.data.object as Stripe.Checkout.Session
            );
            break;

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Webhook received"));
});

export { stripeWebhookHandler };