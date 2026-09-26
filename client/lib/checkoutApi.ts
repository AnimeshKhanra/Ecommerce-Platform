import api from "./axios";
import {
  ShippingAddress,
  CheckoutResponse,
} from "@/types/checkout.types";



export const createCheckout = async (
    shippingAddress: ShippingAddress
): Promise<CheckoutResponse> => {
    const res = await api.post("/checkout", {
        shippingAddress,
    });

    return res.data.data;
};