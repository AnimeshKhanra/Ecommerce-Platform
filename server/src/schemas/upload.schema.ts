import { z } from "zod";

export const fileSchema = z.object({
    mimetype: z.enum([
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
    ]),
    size: z.number().max(5 * 1024 * 1024, "File size must be under 5MB"),
});

