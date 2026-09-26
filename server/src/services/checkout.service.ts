import prisma from '../config/prisma';
import { stripe } from '../config/stripe';
import { CheckoutInput } from '../schemas/checkout.schema';
import { ApiError } from '../utils/ApiError';

const createCheckoutService = async (userId: string, input: CheckoutInput) => {
    /*
      1. get User
      2. get user's cart
      3. valid cart
      4. calculate subtotal price
      5. calculate shipping price
      6. calculate total price
      7. Create Stripe line items
      8. Add shipping as Stripe line item
      9. Create Stripe checkout session
      10. Return checkout information
      */

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!cart || cart.items.length === 0) {
        throw new ApiError(404, 'Cart is empty');
    }

    const subtotal = cart.items.reduce(
        (sum, item) => sum + Number(item.product.price) * item.quantity,
        0
    );

    const shipping = subtotal > 1000 ? 0 : 99;

    const total = subtotal + shipping;

    const lineItems = cart.items.map((item) => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: item.product.name,
                images: item.product.images || [],  //TODO: Check here once
            },
            unit_amount: Math.round(Number(item.product.price) * 100),
        },
        quantity: item.quantity,
    }));

    if (shipping > 0) {
        lineItems.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "shipping",
                    images: [],   //TODO: Check here once
                },
                unit_amount: shipping * 100,
            },
            quantity: 1,
        })
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "upi"],  //TODO: CHECK HERE
        mode: "payment",
        line_items: lineItems,
        customer_email: user.email,
        metadata: {
            userId,
            shippingName: input.shippingAddress.fullName,
            shippingPhone: input.shippingAddress.phone,
            shippingAddress: input.shippingAddress.addressLine1,
            shippingAddressLine2: input.shippingAddress.addressLine2 ?? "",
            city: input.shippingAddress.city,
            state: input.shippingAddress.state,
            postalCode: input.shippingAddress.postalCode,
            country: input.shippingAddress.country,

            subtotal: subtotal.toString(),
            shipping: shipping.toString(),
            totalAmount: total.toString(),
        },

        success_url:
            `${process.env.CLIENT_URL}/checkout/success` +
            `?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
            `${process.env.CLIENT_URL}/checkout/cancel`,
    })

    if (!session.url) {
        throw new ApiError(500, "Failed to create Stripe checkout session")
    }

    return {
        url: session.url,
        sessionId: session.id,
        subtotal,
        shipping,
        total
    }
};

export { createCheckoutService, }
