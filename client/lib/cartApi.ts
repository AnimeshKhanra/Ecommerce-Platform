import {
  AddToCartPayload,
  SyncCartItem,
  UpdateCartItemPayload,
} from '@/types/cart.types';
import api from './axios';

export const getCart = async () => {
  const res = await api.get('/cart');
  return res.data;
};

export const addToCartApi = async (productId: string, quantity: number) => {
  const payload: AddToCartPayload = {
    productId,
    quantity,
  };

  const res = await api.post('/cart', payload);

  return res.data;
};

export const updateCartItemApi = async (itemId: string, quantity: number) => {
  const payload: UpdateCartItemPayload = {
    quantity,
  };
  const res = await api.put(`/cart/${itemId}`, payload);

  return res.data;
};

export const removeCartItemApi = async (itemId: string) => {
  const res = await api.delete(`/cart/${itemId}`);
  return res.data;
};

export const clearCartApi = async () => {
  const response = await api.delete('/cart/clear');

  return response.data;
};

export const syncCartApi = async (items: SyncCartItem[]) => {
  const res = await api.post('/cart/sync', {
    items,
  });

  return res.data;
};
