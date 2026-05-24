// lib/cartApi.ts

import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getCart = async () => {
  const res = await API.get("/cart");
  return res.data;
};

export const addToCartApi = async (
  productId: string,
  quantity: number
) => {
  const res = await API.post("/cart/add", {
    productId,
    quantity,
  });

  return res.data;
};

export const updateCartItemApi = async (
  itemId: string,
  quantity: number
) => {
  const res = await API.patch(`/cart/item/${itemId}`, {
    quantity,
  });

  return res.data;
};

export const removeCartItemApi = async (itemId: string) => {
  const res = await API.delete(`/cart/item/${itemId}`);
  return res.data;
};

export const syncCartApi = async (items: any[]) => {
  const res = await API.post("/cart/sync", {
    items,
  });

  return res.data;
};