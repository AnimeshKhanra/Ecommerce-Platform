import prisma from "../config/prisma";
import { ApiError } from "../utils/ApiError";
import { delCache, getCache, setCache } from "../utils/redisUtils";
import {
    AddToCartInput,
    UpdateCartItemInput,
} from "../schemas/cart.schema";
import { string } from "zod";

const getCartCacheKey = (userId: string) => `cart:${userId}`;



const getCartService = async (userId: string) => {
    const cacheKey = getCartCacheKey(userId);
    const cacheCart = await getCache(cacheKey);

    if (cacheCart) {
        return cacheCart;
    }

    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: {
                    product: true,
                }
            }
        }
    })

    const finalCart = cart || { items: [] };
    await setCache(cacheKey, finalCart, 3600);

    return finalCart;
}

const addToCartService = async (
    userId: string,
    data: AddToCartInput
) => {
    const product = await prisma.product.findUnique({
        where: {
            id: data.productId,
        },
    });

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    let cart = await prisma.cart.findUnique({
        where: {
            userId,
        },
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                userId,
            },
        });
    }

    const existingItem = await prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId: data.productId,
            },
        },
    });

    const newQuantity = existingItem
        ? existingItem.quantity + data.quantity
        : data.quantity;

    if (product.stock < newQuantity) {
        throw new ApiError(400, "Not enough stock");
    }

    if (existingItem) {
        await prisma.cartItem.update({
            where: {
                id: existingItem.id,
            },
            data: {
                quantity: newQuantity,
            },
        });
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId: data.productId,
                quantity: data.quantity,
            },
        });
    }

    await delCache(getCartCacheKey(userId));

    return null;
};

const updateCartItemService = async (
    userId: string,
    itemId: string,
    data: UpdateCartItemInput
) => {
    const item = await prisma.cartItem.findUnique({
        where: {
            id: itemId,
        },
        include: {
            product: true,
            cart: true,
        },
    });

    if (!item || item.cart.userId !== userId) {
        throw new ApiError(404, "Cart item not found");
    }

    if (item.product.stock < data.quantity) {
        throw new ApiError(400, "Not enough stock");
    }

    await prisma.cartItem.update({
        where: {
            id: itemId,
        },
        data: {
            quantity: data.quantity,
        },
    });

    await delCache(getCartCacheKey(userId));

    return null;
};

const removeCartItemService = async (userId: string, itemId: string): Promise<void> => {
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
    // return null;
}

const clearCartService = async (userId: string): Promise<void> => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    })

    if(!cart){
        return;
    }

    await prisma.cartItem.deleteMany({
        where: {
            cartId: cart.id,
        }
    })

    await delCache(getCartCacheKey(userId));
}



export {
    getCartService,
    addToCartService,
    updateCartItemService,
    removeCartItemService,
    clearCartService,
}