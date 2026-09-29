// Import the Stripe namespace from the core module where all sub-types
// (Event, Checkout.Session, etc.) are properly exported.
// The default CJS export (`StripeConstructor`) only re-exports `type Stripe`.
import type { Stripe } from 'stripe/cjs/stripe.core';
// import Stripe from 'stripe';
import { stripe } from '../config/stripe';
import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { createOrderService } from '../services/order.service';

/**
 * Processes a completed checkout session by creating an order from the user's cart.
 *
 * Handles idempotency (duplicate webhook deliveries) and clears the cart after order creation.
 */

async function handleCheckoutSessionCompleted(
    session: Stripe.Checkout.Session
): Promise<void> {
    /*
     * Make sure the payment was actually successful.
     */
    if (session.payment_status !== 'paid') {
        console.log(`Payment not completed for session: ${session.id}`);
        return;
    }

    const userId = session.metadata?.userId;

    if (!userId) {
        throw new ApiError(400, 'Missing userId in session metadata');
    }

    const paymentIntentId = session.payment_intent?.toString() ?? null;
    if (!paymentIntentId) {
        throw new ApiError(400, 'Missing payment intent ID');
    }

    /*
     * Idempotency check.
     * Stripe can send the same webhook more than once.
     */
    const existingOrder = await prisma.order.findUnique({
        where: {
            paymentIntentId,
        },
    });

    if (existingOrder) {
        console.log(`Duplicate webhook received for order: ${existingOrder.id}`);
        return;
    }

    /*
     * Create the order.
     */
    const order = await createOrderService(userId, session);
    console.log(`Order created successfully: ${order.id} for user: ${userId}`);
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
const stripeWebhookHandler = asyncHandler(
    async (req: Request, res: Response) => {
        console.log('Stripe webhook received');

        // 6. Stripe signature
        const signature = req.headers['stripe-signature'];

        if (!signature) {
            throw new ApiError(400, 'Missing Stripe signature header');
        }

        // 7. Webhook secret
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!webhookSecret) {
            throw new ApiError(500, 'STRIPE_WEBHOOK_SECRET is not configured');
        }

        let event: Stripe.Event;

        // 8. Verify Stripe webhook signature
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                webhookSecret
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';

            throw new ApiError(
                400,
                `Webhook signature verification failed: ${message}`
            );
        }

        // 9. Handle Stripe event
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                await handleCheckoutSessionCompleted(session);
                break;
            }
            default:
                console.log(`Unhandled Stripe event: ${event.type}`);
        }

        // 10. Always acknowledge successful webhook handling
        return res
            .status(200)
            .json(new ApiResponse(200, null, 'Webhook received successfully'));
    }
);

export { stripeWebhookHandler };
