'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import api from '@/lib/axios';
import { Order } from '@/types/order.types';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
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
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 md:px-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // No orders yet
  if (!orders.length) {
    return (
      <EmptyState
        title="No Orders Yet"
        description="You haven't placed any orders."
        buttonText="Shop Now"
        buttonLink="/products"
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Order History
            </h1>
            <Badge variant="secondary">
              {orders.length}{' '}
              {orders.length === 1 ? 'order' : 'orders'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Track and review your past purchases
          </p>
        </div>
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}