'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import api from '@/lib/axios';

import { Order } from '@/types/order.types';

import OrderStatusBadge from '@/components/orders/OrderStatusBadge';

export default function OrderDetailsPage() {
  const params = useParams();

  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/${orderId}`);

      setOrder(res.data.data);
    } catch (error) {
      console.error('Failed to fetch order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="max-w-6xl mx-auto p-6">Loading order...</div>;
  }

  if (!order) {
    return <div className="max-w-6xl mx-auto p-6">Order not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Order Details</h1>

          <p className="text-gray-500 mt-1">#{order.id}</p>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      {/* Products */}

      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Items</h2>

        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">{item.productName}</h3>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ₹{(Number(item.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping */}

      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

        <p>{order.shippingName}</p>

        <p>{order.shippingPhone}</p>

        <p>{order.shippingAddress1}</p>

        {order.shippingAddress2 && <p>{order.shippingAddress2}</p>}
        <p>
          {order.shippingCity}, {order.shippingState}
        </p>
        <p>{order.shippingPostalCode}</p>
        <p>{order.shippingCountry}</p>
      </div>

      {/* Payment */}

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Payment</h2>
        <p>Status: {order.paymentStatus}</p>
        <p className="font-bold text-lg mt-2">
          Total: ₹{Number(order.totalAmount).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/axios";
// import { Order } from "@/types/order.types";
// import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
// import OrderItem from "@/components/orders/OrderItem";

// interface Props {
//   params: {
//     id: string;
//   };
// }

// export default function OrderDetailPage({
//   params,
// }: Props) {
//   const [order, setOrder] = useState<Order | null>(
//     null
//   );

//   useEffect(() => {
//     fetchOrder();
//   }, []);

//   const fetchOrder = async () => {
//     const res = await api.get(
//       `/orders/${params.id}`
//     );

//     setOrder(res.data.order);
//   };

//   if (!order) return <p>Loading...</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <div className="flex justify-between">
//         <h1 className="text-2xl font-bold">
//           Order #{order.id}
//         </h1>

//         <OrderStatusBadge status={order.status} />
//       </div>

//       <div className="mt-8 space-y-4">
//         {order.orderItems.map((item) => (
//           <OrderItem
//             key={item.id}
//             item={item}
//           />
//         ))}
//       </div>

//       <div className="mt-8 border rounded p-4">
//         <h3 className="font-semibold mb-2">
//           Shipping Address
//         </h3>

//         <p>{order.shippingAddress.fullName}</p>
//         <p>{order.shippingAddress.address}</p>
//         <p>{order.shippingAddress.city}</p>
//         <p>{order.shippingAddress.phone}</p>
//       </div>

//       <div className="mt-6 text-xl font-bold">
//         Total: ₹{order.totalAmount}
//       </div>
//     </div>
//   );
// }
