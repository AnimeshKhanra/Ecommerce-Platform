import { z } from 'zod';

export const productSchema = z.object({
    name: z.string()
        .min(2, 'Product name must be at least 2 characters'),

    description: z.string()
        .optional(),

    price: z.number()
        .positive('Price must be positive'),

    stock: z.number()
        .int()
        .nonnegative('Stock cannot be negative'),

    images: z.array(
        z.string().url('Each image must be a valid URL')
    ).optional().default([]),

    isActive: z.boolean()
        .optional()
        .default(true),

    categoryId: z.string()
        .min(1, 'Category is required'),
});

export const updateProductSchema =
    productSchema.partial();

export type ProductInput =
    z.infer<typeof productSchema>;

export type UpdateProductInput =
    z.infer<typeof updateProductSchema>;