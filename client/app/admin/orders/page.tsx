"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Order } from "@/types/order";
import AdminOrderTable from "@/components/orders/AdminOrderTable";
import EmptyState from "@/components/common/EmptyState";


export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const res = await api.get("/orders");

    setOrders(res.data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);


if (!orders.length) {
  return (
    <EmptyState
      title="No Orders"
      description="No customer orders found."
    />
  );
}


  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Order Management
      </h1>

      <AdminOrderTable
        orders={orders}
        refreshOrders={fetchOrders}
      />
    </div>
  );
}