'use client';

import Link from 'next/link';
import { CalendarDays, CreditCard, ChevronRight } from 'lucide-react';

import { Order } from '@/types/order.types';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import OrderStatusBadge from './OrderStatusBadge';

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  return (
    <Card className="transition-colors hover:border-primary/40">
      <CardContent className="space-y-4 p-5">
        {/* Order number + status */}
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-sm font-semibold tracking-wide">
            #{order.id.slice(-6).toUpperCase()}
          </span>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Date + payment */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>

          <span className="flex items-center gap-1.5">
            <CreditCard className="size-3.5" />
            Payment: {order.paymentStatus}
          </span>
        </div>

        {/* Total + details link */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold">
              ₹
              {Number(order.totalAmount).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <Link
            href={`/orders/${order.id}`}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'gap-1 pr-1 text-primary'
            )}
          >
            View Details
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}