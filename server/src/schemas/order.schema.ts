import { z } from 'zod';

export const orderSchema = z.object({
    items: z.array(z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive('Quantity must be at least 1'),
    })).min(1, 'Order must have at least one item'),
    shippingAddress: z.string().min(10, 'Please provide a full shipping address'),
});

export type OrderInput = z.infer<typeof orderSchema>;