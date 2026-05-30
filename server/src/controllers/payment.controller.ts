import { Request, Response } from "express";
import { checkoutSchema } from "../schemas/payment.schema";
import { stripe } from "../config/stripe";
import prisma from "../config/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";



const createCheckoutSession = asyncHandler(async (req: Request, res: Response) => {
  const parsed = checkoutSchema.safeParse(req.body);

  if (!parsed.success) {
    throw new ApiError(400, "Validation failed");
  }

  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  console.log("in cart: ", cart);
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is Empty");
  }

  const lineItems = cart.items.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.product.name,
        images: item.product.images,
      },
      unit_amount: Math.round(item.product.price * 100)
    },
    quantity: item.quantity
  }))

  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 0
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "upi"],
    mode: "payment",
    line_items: lineItems,
    customer_email: user?.email,
    metadata: {
      userId,
      shippingName: parsed.data.shippingAddress.fullName,
      shippingAddress: parsed.data.shippingAddress.address,
      city: parsed.data.shippingAddress.city,
      postalCode: parsed.data.shippingAddress.postalCode,
      country: parsed.data.shippingAddress.country,
      totalAmount: totalAmount.toString(),
    },
    success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
  })

  return res
    .status(200)
    .json({
      success: true,
      message: "Checkout session created successfully",
      url: session.url,
    })

});

const getLatestOrder = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, "Unauthorized");
    }

    const order = await prisma.order.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          order,
          "Order fetched"
        )
      );
  }
);

export { createCheckoutSession, getLatestOrder }