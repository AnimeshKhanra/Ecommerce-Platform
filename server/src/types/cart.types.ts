export interface CartProduct {
    id: string;
    name: string;
    price: unknown;
    images: string[];
    stock: number;
}

export interface CartItemResponse {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    product: CartProduct;
}

export interface CartResponse {
    id?: string;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    items: CartItemResponse[];
}