import { z } from "zod"

export const checkoutSchema  = z.object({
    shippingAddress: z.object({
        fullName: z.string().min(2, "Full name must be atleast two character"),
        address: z.string().min(5, "Address must be atleast 5 character"),
        city: z.string().min(2, "City is required"),
        postalCode: z.string().min(4, "Postal code is required"),
        country: z.string().min(2, "Country is required"),
    })
})


export type CheckoutInput = z.infer<typeof checkoutSchema>;