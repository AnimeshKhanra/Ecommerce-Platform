import {
  OrderStatus,
  PaymentStatus,
} from "@prisma/client";

export {
  OrderStatus,
  PaymentStatus,
};

export interface UpdateOrderStatusInput {
  status: OrderStatus;
}