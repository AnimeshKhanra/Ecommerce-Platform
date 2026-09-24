export interface CartProduct {
    id: string;
    name: string;
    price: string;
    // price: number;
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
    id?: string;
    userId?: string;
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