import { z } from "zod";

export const addToCartSchema = z.object({
    productId: z.string().min(1, "Product ID is required"),
    quantity: z
        .number()
        .int("Quantity must be an integer")
        .min(1, "Quantity must be at least 1")
        .max(10, "Maximum quantity is 10"),
});

export const updateCartSchema = z.object({
    quantity: z
        .number()
        .int("Quantity must be an integer")
        .min(1, "Quantity must be at least 1")
        .max(10, "Maximum quantity is 10"),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;

export type UpdateCartItemInput = z.infer<typeof updateCartSchema>;