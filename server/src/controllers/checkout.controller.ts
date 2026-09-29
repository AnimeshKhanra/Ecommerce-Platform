import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { checkoutSchema } from "../schemas/checkout.schema";
import { createCheckoutService } from "../services/checkout.service";

const createCheckout = asyncHandler(async (req: Request, res: Response) => {
        // 1. Validate request body
        const parsed = checkoutSchema.safeParse(req.body);
        // console.log(parsed)
        // console.log(parsed.success)

        if (!parsed.success) {
            throw new ApiError(
                400,
                "Validation failed"
            );
        }

        // 2. Get authenticated user
        const userId = req.user?.id;

        if (!userId) {
            throw new ApiError(
                401,
                "Unauthorized"
            );
        }

        // 3. Call checkout service
        const checkout =
            await createCheckoutService(
                userId,
                parsed.data
            );

        // 4. Return response
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    checkout,
                    "Checkout session created successfully"
                )
            );
    }
);

export {
    createCheckout,
};