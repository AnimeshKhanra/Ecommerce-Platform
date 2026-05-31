"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Order } from "@/types/order";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import OrderItem from "@/components/orders/OrderItem";

interface Props {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({
  params,
}: Props) {
  const [order, setOrder] = useState<Order | null>(
    null
  );

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const res = await api.get(
      `/orders/${params.id}`
    );

    setOrder(res.data.order);
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">
          Order #{order.id}
        </h1>

        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-8 space-y-4">
        {order.orderItems.map((item) => (
          <OrderItem
            key={item.id}
            item={item}
          />
        ))}
      </div>

      <div className="mt-8 border rounded p-4">
        <h3 className="font-semibold mb-2">
          Shipping Address
        </h3>

        <p>{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.address}</p>
        <p>{order.shippingAddress.city}</p>
        <p>{order.shippingAddress.phone}</p>
      </div>

      <div className="mt-6 text-xl font-bold">
        Total: ₹{order.totalAmount}
      </div>
    </div>
  );
}