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

export const productQuerySchema = z.object({
    search: z
        .string()
        .trim()
        .optional(),

    category: z
        .string()
        .optional(),

    minPrice: z.preprocess(
        (value) => value === "" ? undefined : value,
        z.coerce.number().nonnegative().optional()
    ),

    maxPrice: z.preprocess(
        (value) => value === "" ? undefined : value,
        z.coerce.number().nonnegative().optional()
    ),

    sortBy: z
        .enum([
            'createdAt',
            'price',
            'name'
        ])
        .default('createdAt'),

    order: z
        .enum([
            'asc',
            'desc',
        ])
        .default('desc'),

    page: z
        .coerce
        .number()
        .int()
        .min(1)
        .default(1),

    limit: z
        .coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(10),
    
})




export const updateProductSchema =
    productSchema.partial();

export type ProductInput =
    z.infer<typeof productSchema>;

export type UpdateProductInput =
    z.infer<typeof updateProductSchema>;