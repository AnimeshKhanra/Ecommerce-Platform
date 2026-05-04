import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    description: z.string().optional(),
    price: z.number().positive('Price must be a positive number'),
    stock: z.number().int().nonnegative('Stock must be a non-negative integer'),
    categoryId: z.string().min(1, 'Category is required'),
});

export type ProductInput = z.infer<typeof productSchema>;