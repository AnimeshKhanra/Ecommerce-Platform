// export interface CartProduct {
//     id: string;
//     name: string;
//     price: unknown;
//     images: string[];
//     stock: number;
// }

// export interface CartItemResponse {
//     id: string;
//     cartId: string;
//     productId: string;
//     quantity: number;
//     product: CartProduct;
// }

// export interface CartResponse {
//     id?: string;
//     userId?: string;
//     createdAt?: Date;
//     updatedAt?: Date;
//     items: CartItemResponse[];
// }


export interface CartProduct {
    id: string;
    name: string;
    price: string;
    images: string[];
    stock: number;
}

export interface CartItem {
    id: string;
    cartId?: string;
    productId: string;
    quantity: number;
    product: CartProduct;
}

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
    createdAt?: string;
    updatedAt?: string;
}

export interface AddToCartPayload {
    productId: string;
    quantity: number;
}

export interface UpdateCartItemPayload {
    quantity: number;
}

export interface SyncCartItem {
    productId: string;
    quantity: number;
}

export interface CartApiResponse<T> {
    statusCode: number;
    message: string;
    data: T;
    success: boolean;
}