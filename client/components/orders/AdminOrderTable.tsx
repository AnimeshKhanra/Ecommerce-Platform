"use client";

import api from "@/lib/axios";
import { Order } from "@/types/order";

interface Props {
  orders: Order[];
  refreshOrders: () => void;
}

export default function AdminOrderTable({
  orders,
  refreshOrders,
}: Props) {
  const updateStatus = async (
    orderId: string,
    status: string
  ) => {
    try {
      await api.put(`/orders/${orderId}/status`, {
        status,
      });

      refreshOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3">Order</th>
          <th>Status</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="p-3">
              {order.id.slice(-6)}
            </td>

            <td>{order.status}</td>

            <td>₹{order.totalAmount}</td>

            <td>
              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(
                    order.id,
                    e.target.value
                  )
                }
                className="border p-2 rounded"
              >
                <option value="PENDING">
                  Pending
                </option>

                <option value="SHIPPED">
                  Shipped
                </option>

                <option value="DELIVERED">
                  Delivered
                </option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}