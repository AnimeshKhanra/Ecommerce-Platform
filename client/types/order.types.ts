export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";


export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";


export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage?: string | null;
  quantity: number;
  price: number | string;
  createdAt: string;
}


export interface Order {
  id: string;
  userId: string;
  totalAmount: number | string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentIntentId?: string | null;
  shippingName: string;
  shippingPhone: string;
  shippingAddress1: string;
  shippingAddress2?: string | null;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}


// export interface OrderItem {
//   id: string;
//   productId: string;
//   productName: string;
//   image: string;
//   price: number;
//   quantity: number;
// }

// export interface ShippingAddress {
//   fullName: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
// }

// type orderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

// export interface Order {
//   id: string;
//   totalAmount: number;
//   status: orderStatus;
//   createdAt: string;
//   shippingAddress: ShippingAddress;
//   orderItems: OrderItem[];
// }