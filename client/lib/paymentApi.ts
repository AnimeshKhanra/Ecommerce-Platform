import api from "./axios";


// export const createCheckoutSession =
//   async (shippingAddress: any) => {
//     const res = await api.post(
//       "/payments/checkout",
//       {
//         shippingAddress,
//       }
//     );

//     return res.data.data;
//   };

export const getLatestOrder =
  async () => {
    const res = await api.get(
      "/payments/latest-order"
    );

    return res.data.data;
  };