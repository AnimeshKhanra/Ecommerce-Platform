import { z } from 'zod';

export const fileSchema = z.object({
  mimetype: z.enum(['image/jpeg', 'image/png', 'image/webp', 'image/jpg']),
  size: z.number().max(5 * 1024 * 1024, 'File size must be under 5MB'),
});

export const deleteImagesSchema = z.object({
  keys: z
    .array(
      z
        .string()
        .min(1, 'S3 key cannot be empty')
        .refine((key) => key.startsWith('products/'), {
          message: 'Only product image keys are allowed',
        })
    )
    .min(1, 'At least one image key is required')
    .max(8, 'Maximum 8 images can be deleted at once'),
});
