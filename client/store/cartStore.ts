// store/cartStore.ts

"use client";

import { create } from "zustand";
import {
  addToCartApi,
  getCart,
  removeCartItemApi,
  syncCartApi,
  updateCartItemApi,
} from "@/lib/cartApi";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

interface CartState {
  cartItems: CartItem[];
  loading: boolean;

  fetchCart: () => Promise<void>;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  increaseQty: (itemId: string) => Promise<void>;
  decreaseQty: (itemId: string) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  syncCartAfterLogin: () => Promise<void>;

  subtotal: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  loading: false,

  fetchCart: async () => {
    try {
      set({ loading: true });

      const data = await getCart();

      set({
        cartItems: data.items || [],
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async (product, quantity = 1) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        const existing = get().cartItems.find(
          (item) => item.productId === product.id
        );

        if (existing) {
          set({
            cartItems: get().cartItems.map((item) =>
              item.productId === product.id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                  }
                : item
            ),
          });
        } else {
          set({
            cartItems: [
              ...get().cartItems,
              {
                id: crypto.randomUUID(),
                productId: product.id,
                quantity,
                product,
              },
            ],
          });
        }

        return;
      }

      await addToCartApi(product.id, quantity);
      await get().fetchCart();
    } catch (error) {
      console.error(error);
    }
  },

  increaseQty: async (itemId) => {
    const item = get().cartItems.find((i) => i.id === itemId);
    if (!item) return;

    await updateCartItemApi(itemId, item.quantity + 1);
    await get().fetchCart();
  },

  decreaseQty: async (itemId) => {
    const item = get().cartItems.find((i) => i.id === itemId);
    if (!item) return;

    if (item.quantity <= 1) {
      await removeCartItemApi(itemId);
    } else {
      await updateCartItemApi(itemId, item.quantity - 1);
    }

    await get().fetchCart();
  },

  removeItem: async (itemId) => {
    await removeCartItemApi(itemId);
    await get().fetchCart();
  },

  syncCartAfterLogin: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const localItems = get().cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    if (localItems.length > 0) {
      await syncCartApi(localItems);
    }

    await get().fetchCart();
  },

  subtotal: () => {
    return get().cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  },

  totalItems: () => {
    return get().cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  },
}));