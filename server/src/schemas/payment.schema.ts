import { number, z } from "zod"

export const checkoutSchema  = z.object({
    shippingAddress: z.object({
        fullName: z.string().min(2, "Full name must be atleast two character"),
        phone: z.string().min(5, "Phone number must be atleast 5 digit").max(12, "Phone number not more than 12"),
        addressLine1: z.string().min(5, "Address must be atleast 5 character"),
        addressLine2: z.string().min(5, "Address must be atleast 5 character").optional(),
        city: z.string().min(2, "City is required"),
        state: z.string().min(2, "State is required"),
        postalCode: z.string().min(4, "Postal code is required"),
        country: z.string().min(2, "Country is required"),
    })
})


export type CheckoutInput = z.infer<typeof checkoutSchema>;