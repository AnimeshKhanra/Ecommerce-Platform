export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CheckoutResponse {
  url: string;
  sessionId: string;
  subtotal: number;
  shipping: number;
  total: number;
}