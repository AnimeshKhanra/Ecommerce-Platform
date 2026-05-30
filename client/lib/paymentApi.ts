import axios from "axios";

const paymentAPI = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api/v1",
});

paymentAPI.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

export const createCheckoutSession =
  async (shippingAddress: any) => {
    const res = await paymentAPI.post(
      "/payments/checkout",
      {
        shippingAddress,
      }
    );

    return res.data.data;
  };

export const getLatestOrder =
  async () => {
    const res = await paymentAPI.get(
      "/payments/latest-order"
    );

    return res.data.data;
  };