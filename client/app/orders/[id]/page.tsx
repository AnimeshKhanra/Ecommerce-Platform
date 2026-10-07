'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Package,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

import api from '@/lib/axios';
import { Order } from '@/types/order.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
      toast.error('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 md:px-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-28 w-full" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-72 lg:col-span-2" />
          <Skeleton className="h-72" />
        </div>
      </div>
    );
  }

  // Order not found
  if (!order) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="size-4" />
          <AlertTitle>Order not found</AlertTitle>
          <AlertDescription>
            This order does not exist or could not be loaded.
          </AlertDescription>
        </Alert>

        <Link
          href="/orders"
          className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}
        >
          <ArrowLeft className="size-4" />
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      {/* Back link */}
      <Link
        href="/orders"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'mb-6 gap-2 pl-0 text-muted-foreground hover:text-foreground'
        )}
      >
        <ArrowLeft className="size-4" />
        Back to Orders
      </Link>

      {/* Order header */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Package className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-mono text-sm font-semibold tracking-wide">
                #{order.id.slice(-6).toUpperCase()}
              </p>
              <p className="text-sm text-muted-foreground">
                Placed on{' '}
                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          <OrderStatusBadge status={order.status} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Items</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="divide-y">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    {item.productImage ? (
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          loading="lazy"
                          className="size-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-muted">
                        <Package className="size-6 text-muted-foreground" />
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold tabular-nums">
                      ₹
                      {(
                        Number(item.price) * item.quantity
                      ).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping address */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-muted-foreground" />
                <CardTitle className="text-lg">Shipping Address</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-1 text-sm">
              <p className="font-medium">Name: {order.shippingName}</p>
              <p className="text-muted-foreground">
                Mobile No: {order.shippingPhone}
              </p>
              <p className="pt-1">Address Line1: {order.shippingAddress1}</p>
              {order.shippingAddress2 && <p>Address Line2: {order.shippingAddress2}</p>}
              <p>Address: 
                {order.shippingCity}, {order.shippingState}{' '}
                {order.shippingPostalCode}
              </p>
              <p>Country: {order.shippingCountry}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right column — payment summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="size-4 text-muted-foreground" />
                <CardTitle className="text-lg">Payment</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="secondary">
                  {order.paymentStatus}
                </Badge>
              </div>

              <Separator />

              <div className="flex items-baseline justify-between">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold tabular-nums">
                  ₹
                  {Number(order.totalAmount).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}