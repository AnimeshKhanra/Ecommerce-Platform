// lib/cartapi.ts

// import axios from "axios";
import api from "./axios";

// const API = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
// });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getCart = async () => {
  const res = await api.get("/cart");
  return res.data;
};

export const addToCartApi = async (
  productId: string,
  quantity: number
) => {
  const res = await api.post("/cart/add", {
    productId,
    quantity,
  });

  return res.data;
};

export const updateCartItemApi = async (
  itemId: string,
  quantity: number
) => {
  const res = await api.patch(`/cart/item/${itemId}`, {
    quantity,
  });

  return res.data;
};

export const removeCartItemApi = async (itemId: string) => {
  const res = await api.delete(`/cart/item/${itemId}`);
  return res.data;
};

export const syncCartApi = async (items: any[]) => {
  const res = await api.post("/cart/sync", {
    items,
  });

  return res.data;
};


//^ -----------------------------------------------------------------

// import axios from "axios";
// import api from "./axios";

// const API = axios.create({
//   baseURL:
//     process.env.NEXT_PUBLIC_API_URL ||
//     "http://localhost:5000/api/v1",
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization =
//       `Bearer ${token}`;
//   }

//   return config;
// });


// export const getCart = async () => {
//   const res = await api.get("/cart");
//   return res.data.data;
// };

// export const addToCartApi = async (
//   productId: string,
//   quantity: number
// ) => {
//   const res = await api.post("/cart", {
//     productId,
//     quantity,
//   });

//   return res.data.data;
// };

// export const updateCartItemApi = async (
//   itemId: string,
//   quantity: number
// ) => {
//   const res = await api.put(`/cart/${itemId}`, {
//     quantity,
//   });

//   return res.data.data;
// };

// export const removeCartItemApi = async (
//   itemId: string
// ) => {
//   const res = await api.delete(
//     `/cart/${itemId}`
//   );

//   return res.data.data;
// };

// export const syncCartApi = async (
//   items: any[]
// ) => {
//   for (const item of items) {
//     await addToCartApi(
//       item.productId,
//       item.quantity
//     );
//   }
// };