
import api from "./axios";


// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

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

export const clearCartApi = async () => {
    const response = await api.delete("/cart/clear");

    return response.data;
};

export const syncCartApi = async (items: any[]) => {
  const res = await api.post("/cart/sync", {
    items,
  });

  return res.data;
};

