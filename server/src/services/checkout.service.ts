import type Stripe from 'stripe';
// import type { Stripe } from 'stripe/cjs/stripe.core';
import prisma from '../config/prisma';
import { stripe } from '../config/stripe';
import { CheckoutInput } from '../schemas/checkout.schema';
import { ApiError } from '../utils/ApiError';

const CURRENCY = 'inr';
const FREE_SHIPPING_THRESHOLD = 1000; // in rupees
const SHIPPING_FEE = 99; // in rupees
const MAX_STRIPE_IMAGES = 8;

type LineItem = Stripe.Checkout.SessionCreateParams.LineItem;

// Stripe expects the smallest currency unit (paise for INR)
const toPaise = (rupees: number) => Math.round(rupees * 100);
const toRupees = (paise: number) => paise / 100;

const buildProductLineItem = (
    name: string,
    unitAmountPaise: number,
    quantity: number,
    images: string[] = []
): LineItem => ({
    price_data: {
        currency: CURRENCY,
        product_data: {
            name,
            images: images.slice(0, MAX_STRIPE_IMAGES),
        },
        unit_amount: unitAmountPaise,
    },
    quantity,
});

const createCheckoutService = async (userId: string, input: CheckoutInput) => {
    // 1. Fetch user and cart together
    const [user, cart] = await Promise.all([
        prisma.user.findUnique({
            where: { id: userId },
            select: { email: true },
        }),
        prisma.cart.findUnique({
            where: { userId },
            include: { items: { include: { product: true } } },
        }),
    ]);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    if (!cart || cart.items.length === 0) {
        throw new ApiError(400, 'Cart is empty');
    }

    const inactiveProduct = cart.items.find(
        (item) => !item.product.isActive
    );

    if (inactiveProduct) {
        throw new ApiError(
            400,
            `Product "${inactiveProduct.product.name}" is no longer available`
        );
    }

    // 2. Build line items (prices come from the DB, never from the client)
    const productLineItems = cart.items.map((item) =>
        buildProductLineItem(
            item.product.name,
            toPaise(Number(item.product.price)),
            item.quantity,
            item.product.images ?? []
        )
    );

    // 3. Calculate totals in paise to avoid floating-point errors
    const subtotalPaise = cart.items.reduce(
        (sum, item) => sum + toPaise(Number(item.product.price)) * item.quantity,
        0
    );
    const shippingPaise =
        toRupees(subtotalPaise) > FREE_SHIPPING_THRESHOLD ? 0 : toPaise(SHIPPING_FEE);
    const totalPaise = subtotalPaise + shippingPaise;

    const subtotal = toRupees(subtotalPaise);
    const shipping = toRupees(shippingPaise);
    const total = toRupees(totalPaise);

    // 4. Add shipping as its own line item (only when charged)
    const lineItems: LineItem[] =
        shippingPaise > 0
            ? [...productLineItems, buildProductLineItem('Shipping', shippingPaise, 1)]
            : productLineItems;

    // 5. Create Stripe Checkout Session
    const { shippingAddress } = input;

    

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        // payment_method_types: ['card', 'upi'],
        payment_method_types: ['card'],
        line_items: lineItems,
        customer_email: user.email,
        metadata: {
            userId,
            shippingName: shippingAddress.fullName,
            shippingPhone: shippingAddress.phone,
            shippingAddress1: shippingAddress.addressLine1,
            shippingAddress2: shippingAddress.addressLine2 ?? '',
            shippingCity: shippingAddress.city,
            shippingState: shippingAddress.state,
            shippingPostalCode: shippingAddress.postalCode,
            shippingCountry: shippingAddress.country,
            subtotal: subtotal.toString(),
            shipping: shipping.toString(),
            totalAmount: total.toString(),
        },
        success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
    });

    if (!session.url) {
        throw new ApiError(500, 'Failed to create Stripe checkout session');
    }

    // 6. Return checkout information
    return {
        url: session.url,
        sessionId: session.id,
        subtotal,
        shipping,
        total,
    };
};

export { createCheckoutService };



// import prisma from '../config/prisma';
// import { stripe } from '../config/stripe';
// import { CheckoutInput } from '../schemas/checkout.schema';
// import { ApiError } from '../utils/ApiError';

// const createCheckoutService = async (userId: string, input: CheckoutInput) => {
//     /*
//       1. get User
//       2. get user's cart
//       3. valid cart
//       4. calculate subtotal price
//       5. calculate shipping price
//       6. calculate total price
//       7. Create Stripe line items
//       8. Add shipping as Stripe line item
//       9. Create Stripe checkout session
//       10. Return checkout information
//       */
    
//     // 1. Get user
//     const user = await prisma.user.findUnique({
//         where: {
//             id: userId,
//         },
//     });

//     if (!user) {
//         throw new ApiError(404, 'User not found');
//     }

//     // 2. Get user's cart
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

//     // 3. Validate cart
//     if (!cart || cart.items.length === 0) {
//         throw new ApiError(400, 'Cart is empty');
//     }

//     // 4. Calculate subtotal
//     const subtotal = cart.items.reduce(
//         (sum, item) => sum + Number(item.product.price) * item.quantity,
//         0
//     );

//     // 5. Calculate shipping
//     const shipping = subtotal > 1000 ? 0 : 99;

//     // 6. Calculate total
//     const total = subtotal + shipping;

//     // 7. Create Stripe line items
//     const lineItems = cart.items.map((item) => ({
//         price_data: {
//             currency: 'inr',
//             product_data: {
//                 name: item.product.name,
//                 images: item.product.images || [],
//             },
//             unit_amount: Math.round(Number(item.product.price) * 100),
//         },
//         quantity: item.quantity,
//     }));

//     // 8. Add shipping as Stripe line item
//     if (shipping > 0) {
//         lineItems.push({
//             price_data: {
//                 currency: 'inr',
//                 product_data: {
//                     name: 'Shipping',
//                     images: [],
//                 },
//                 unit_amount: Math.round(shipping * 100),
//             },
//             quantity: 1,
//         });
//     }

//     // 9. Create Stripe Checkout Session
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card', 'upi'],
//         mode: 'payment',
//         line_items: lineItems,
//         customer_email: user.email,
//         metadata: {
//             userId,
//             shippingName: input.shippingAddress.fullName,
//             shippingPhone: input.shippingAddress.phone,
//             shippingAddress1: input.shippingAddress.addressLine1,
//             shippingAddress2: input.shippingAddress.addressLine2 ?? '',
//             shippingCity: input.shippingAddress.city,
//             shippingState: input.shippingAddress.state,
//             shippingPostalCode: input.shippingAddress.postalCode,
//             shippingCountry: input.shippingAddress.country,

//             subtotal: subtotal.toString(),
//             shipping: shipping.toString(),
//             totalAmount: total.toString(),
//         },

//         success_url:
//             `${process.env.CLIENT_URL}/checkout/success` +
//             `?session_id={CHECKOUT_SESSION_ID}`,

//         cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
//     });

//     // 10. Make sure Stripe returned a URL
//     if (!session.url) {
//         throw new ApiError(500, 'Failed to create Stripe checkout session');
//     }

//     // 11. Return checkout information
//     return {
//         url: session.url,
//         sessionId: session.id,
//         subtotal,
//         shipping,
//         total,
//     };
// };

// export { createCheckoutService };

