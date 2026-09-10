export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

type orderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface Order {
  id: string;
  totalAmount: number;
  status: orderStatus;
  // status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  shippingAddress: ShippingAddress;
  orderItems: OrderItem[];
}