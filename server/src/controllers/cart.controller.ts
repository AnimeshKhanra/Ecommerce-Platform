import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { addToCartSchema, updateCartSchema } from '../schemas/cart.schema';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { delCache, getCache, setCache } from '../utils/redisUtils';

const getCartCacheKey = (userId: string) => `cart:${userId}`;



const getCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, 'You are not authorized');
    }

    const cacheKey = getCartCacheKey(userId);

    // const cachedCart = await redis.get(cacheKey);

    const cachedCart = await getCache(cacheKey);
    // console.log(cachedCart);

    if (cachedCart) {
        return res
            .status(200)
            .json(new ApiResponse(200, cachedCart, 'Cart fetched from cache'));
    }

    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: { product: true },
            },
        },
    });

    const finalCart = cart || { items: [] };

    // await redis.set(cacheKey, JSON.stringify(finalCart), "EX", 3600);
    await setCache(cacheKey, finalCart, 3600);

    return res
        .status(200)
        .json(new ApiResponse(200, finalCart, 'Card fetched from database'));
});

const addToCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new ApiError(400, 'You are not authorized');
    }

    const validated = addToCartSchema.parse(req.body);

    const product = await prisma.product.findUnique({
        where: { id: validated.productId },
    });

    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    if (product.stock < validated.quantity) {
        throw new ApiError(400, 'Not enough stock');
    }

    let cart = await prisma.cart.findUnique({
        where: { userId },
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: { userId },
        });
    }

    const existingItem = await prisma.cartItem.findFirst({
        where: {
            cartId: cart.id,
            productId: validated.productId,
        },
    });

    if (existingItem) {
        await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: {
                quantity: existingItem.quantity + validated.quantity,
            },
        });
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: validated.productId,
                quantity: validated.quantity,
            },
        });
    }

    await delCache(getCartCacheKey(userId));

    return res.status(201).json(new ApiResponse(201, null, 'Item added to cart'));
});

const updateCartItem = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId) {
            throw new ApiError(400, 'You are not authorized');
        }

        const itemId = req.params.itemId;
        if (!itemId || Array.isArray(itemId)) {
            throw new ApiError(400, 'Invalid item id');
        }

        const validated = updateCartSchema.parse(req.body);

        const item = await prisma.cartItem.findUnique({
            where: { id: itemId },
            include: {
                product: true,
                cart: true,
            },
        });

        if (!item || item.cart.userId !== userId) {
            throw new ApiError(400, 'cart item not found');
        }

        if (item.product.stock < validated.quantity) {
            throw new ApiError(400, 'Not enough stock');
        }

        await prisma.cartItem.update({
            where: { id: itemId },
            data: {
                quantity: validated.quantity,
            },
        });

        await delCache(getCartCacheKey(userId));

        return res.status(200).json(new ApiResponse(200, null, 'Cart updated'));
    }
);

const removeCartItem = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?.id;
        if (!userId) {
            throw new ApiError(400, 'You are not authorized');
        }

        const itemId = req.params.itemId;
        if (!itemId || Array.isArray(itemId)) {
            throw new ApiError(400, 'Invalid item id');
        }

        const item = await prisma.cartItem.findUnique({
            where: { id: itemId },
            include: {
                cart: true,
            },
        });

        if (!item || item.cart.userId !== userId) {
            throw new ApiError(404, 'Cart item not found');
        }

        await prisma.cartItem.delete({
            where: { id: itemId },
        });

        await delCache(getCartCacheKey(userId));

        return res.status(200).json(new ApiResponse(200, null, 'Item removed'));
    }
);



export {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
}
