'use client';

import { useEffect, useState } from 'react';

import api from '@/lib/axios';

import { Order } from '@/types/order.types';

import OrderCard from '@/components/orders/OrderCard';
import EmptyState from '@/components/common/EmptyState';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');

      setOrders(res.data.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <EmptyState
          title="No Orders Yet"
          description="You haven't placed any orders."
          buttonText="Shop Now"
          buttonLink="/products"
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}




// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/axios";
// import { Order } from "@/types/order.types";
// import OrderCard from "@/components/orders/OrderCard";
// import EmptyState from "@/components/common/EmptyState";

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await api.get("/orders");

//       setOrders(res.data.orders);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!orders.length) {
//     return (
//       <div className="max-w-6xl mx-auto p-6">
//         <EmptyState
//           title="No Orders Yet"
//           description="You haven't placed any orders."
//           buttonText="Shop Now"
//           buttonLink="/products"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">
//         Order History
//       </h1>

//       <div className="space-y-4">
//         {orders.map((order) => (
//           <OrderCard
//             key={order.id}
//             order={order}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
