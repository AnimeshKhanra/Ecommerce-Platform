import { Request, Response } from 'express';
import { addToCartSchema, updateCartSchema } from '../schemas/cart.schema';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { addToCartService, clearCartService, getCartService, removeCartItemService, syncCartService, updateCartItemService } from '../services/cart.service';

const getCartCacheKey = (userId: string) => `cart:${userId}`;



const getCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, 'You are not authorized');
    }

    const response = await getCartService(userId);

    return res
        .status(200)
        .json(new ApiResponse(200, response, 'Card fetched from database'));
});

const addToCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new ApiError(400, 'You are not authorized');
    }

    const validated = addToCartSchema.parse(req.body);

    await addToCartService(userId, validated);

    return res.status(201).json(new ApiResponse(201, null, 'Item added to cart'));
});

const updateCartItem = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new ApiError(400, 'You are not authorized');
    }

    const itemId = req.params.itemId;
    if (!itemId || Array.isArray(itemId)) {
        throw new ApiError(400, 'Invalid item id');
    }

    const validated = updateCartSchema.parse(req.body);

    await updateCartItemService(userId, itemId, validated);

    return res.status(200).json(new ApiResponse(200, null, 'Cart updated'));
}
);

const removeCartItem = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new ApiError(400, 'You are not authorized');
    }

    const itemId = req.params.itemId;
    if (!itemId || Array.isArray(itemId)) {
        throw new ApiError(400, 'Invalid item id');
    }

    await removeCartItemService(userId, itemId);

    return res.status(200).json(new ApiResponse(200, null, 'Item removed'));
}
);

const clearCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(
            401,
            "You are not authorized"
        );
    }

    await clearCartService(userId);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Cart cleared successfully"
            )
        );
})

const syncCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id as string;

    const cart = await syncCartService(userId, req.body);

    return res
        .status(200)
        .json(
            new ApiResponse(200, cart, "Cart synced successfully")
        )
})

export {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    syncCart
}
