import { z } from "zod";

export const addToCartSchema = z.object({
    productId: z.string().min(1),
    quantity: z.number().min(1).max(10),
});

export const updateCartSchema = z.object({
    quantity: z.number().min(1).max(10),
});