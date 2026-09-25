// store/cartStore.ts

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  addToCartApi,
  getCart,
  removeCartItemApi,
  syncCartApi,
  updateCartItemApi,
  clearCartApi,
} from '@/lib/cartApi';
import type { CartItem, CartProduct, SyncCartItem } from '@/types/cart.types';
import { useAuthStore } from './auth.store';

interface CartState {
  cartItems: CartItem[];
  loading: boolean;

  fetchCart: () => Promise<void>;
  addToCart: (product: CartProduct, quantity?: number) => Promise<void>;
  increaseQty: (itemId: string) => Promise<void>;
  decreaseQty: (itemId: string) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  syncCartAfterLogin: () => Promise<void>;

  subtotal: () => number;
  totalItems: () => number;
}

// const { token } = useAuthStore.getState();

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      loading: false,

      fetchCart: async () => {
        try {
          set({ loading: true });
          const data = await getCart();

          set({
            cartItems: data.data?.items || [],
          });
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        } finally {
          set({ loading: false });
        }
      },

      addToCart: async (product, quantity = 1) => {
        try {
          // const token = localStorage.getItem('token');
          const { token } = useAuthStore.getState();

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
                    cartId: '',
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
          console.error('Failed to add item:', error);
        }
      },

      increaseQty: async (itemId) => {
        const item = get().cartItems.find((item) => item.id === itemId);

        if (!item) return;

        try {
          // const token = localStorage.getItem('token');
          const { token } = useAuthStore.getState();

          if (!token) {
            set({
              cartItems: get().cartItems.map((cartItem) =>
                cartItem.id === itemId
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + 1,
                    }
                  : cartItem
              ),
            });

            return;
          }

          await updateCartItemApi(itemId, item.quantity + 1);

          await get().fetchCart();
        } catch (error) {
          console.error(error);
        }
      },

      decreaseQty: async (itemId) => {
        const item = get().cartItems.find((item) => item.id === itemId);

        if (!item) return;

        try {
          // const token = localStorage.getItem('token');
          const { token } = useAuthStore.getState();

          if (!token) {
            if (item.quantity <= 1) {
              set({
                cartItems: get().cartItems.filter(
                  (cartItem) => cartItem.id !== itemId
                ),
              });
            } else {
              set({
                cartItems: get().cartItems.map((cartItem) =>
                  cartItem.id === itemId
                    ? {
                        ...cartItem,
                        quantity: cartItem.quantity - 1,
                      }
                    : cartItem
                ),
              });
            }

            return;
          }

          if (item.quantity <= 1) {
            await removeCartItemApi(itemId);
          } else {
            await updateCartItemApi(itemId, item.quantity - 1);
          }

          await get().fetchCart();
        } catch (error) {
          console.error(error);
        }
      },

      removeItem: async (itemId) => {
        try {
          // const token = localStorage.getItem('token');
          const { token } = useAuthStore.getState();

          if (!token) {
            set({
              cartItems: get().cartItems.filter((item) => item.id !== itemId),
            });
            return;
          }

          await removeCartItemApi(itemId);
          await get().fetchCart();
        } catch (error) {
          console.error('Failed to remove item:', error);
        }
      },

      clearCart: async () => {
        try {
          set({ loading: true });
          // const token = localStorage.getItem('token');
          const { token } = useAuthStore.getState();
          if (!token) {
            set({
              cartItems: [],
            });
            return;
          }
          await clearCartApi();

          set({
            cartItems: [],
          });
        } catch (error) {
          console.error(error);
        } finally {
          set({ loading: false });
        }
      },

      // clearCart: () => {
      //   set({
      //     cartItems: [],
      //   });
      // },

      // syncCartAfterLogin: async () => {
      //   const token = localStorage.getItem('token');
      //   if (!token) return;

      //   const localItems = get().cartItems.map((item) => ({
      //     productId: item.productId,
      //     quantity: item.quantity,
      //   }));

      //   if (localItems.length > 0) {
      //     await syncCartApi(localItems);
      //   }

      //   await get().fetchCart();
      // },

      syncCartAfterLogin: async () => {
        // const token = localStorage.getItem('token');
        const { token } = useAuthStore.getState();

        if (!token) return;

        const localItems = get().cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));

        // Nothing to sync
        if (localItems.length === 0) {
          await get().fetchCart();
          return;
        }

        try {
          set({ loading: true });

          // Send guest cart to backend
          await syncCartApi(localItems);

          // Clear local guest cart
          set({
            cartItems: [],
          });

          // Fetch merged database cart
          await get().fetchCart();
        } catch (error) {
          console.error('Cart synchronization failed:', error);
        } finally {
          set({ loading: false });
        }
      },

      subtotal: () => {
        //TODO: CHEK HERE item.product.price
        return get().cartItems.reduce(
          (sum, item) => sum + Number(item.product.price) * item.quantity,
          0
        );
      },

      totalItems: () => {
        return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'guest-cart',
    }
  )
);
