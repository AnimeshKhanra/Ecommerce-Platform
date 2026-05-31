"use client";

import Link from "next/link";
import { Order } from "@/types/order";
import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between">
        <h3 className="font-semibold">
          Order #{order.id.slice(-6)}
        </h3>

        <OrderStatusBadge status={order.status} />
      </div>

      <p className="text-gray-500 text-sm mt-2">
        {new Date(order.createdAt).toLocaleDateString()}
      </p>

      <p className="font-bold mt-2">
        ₹{order.totalAmount}
      </p>

      <Link
        href={`/orders/${order.id}`}
        className="text-blue-600 mt-3 inline-block"
      >
        View Details
      </Link>
    </div>
  );
}