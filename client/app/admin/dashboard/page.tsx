'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, Store } from 'lucide-react';

import api from '@/lib/axios';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import StatsCard from '@/components/admin/StatsCard';
import RevenueChart from '@/components/admin/RevenueChart';
import RecentOrdersTable from '@/components/admin/RecentOrdersTable';
import LowStockAlert from '@/components/admin/LowStockAlert';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/stats');
      setStats(res.data.data);
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
    }
  };

  // Loading skeleton
  if (!stats) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 md:px-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>

        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 md:px-6">
      {/* Header — Orders link on the right */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <LayoutDashboard className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Overview of your store&apos;s performance
            </p>
          </div>
        </div>

        <div className='flex items-center gap-6'>
        <Link
          href="/admin/orders"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'gap-2 self-start sm:self-auto',
            'hover:bg-primary hover:text-primary-foreground'
          )}
        >
          <Package className="size-4" />
          View Orders
        </Link>
        <Link
          href="/admin/products"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'gap-2 self-start sm:self-auto',
            'hover:bg-primary hover:text-primary-foreground'
          )}
        >
          <Store className="size-4" />
          View Products
        </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Sales" value={`₹${stats.totalSales}`} />
        <StatsCard title="Orders" value={stats.totalOrders} />
        <StatsCard title="Users" value={stats.totalUsers} />
        <StatsCard title="Products" value={stats.totalProducts} />
      </div>

      {/* Revenue chart */}
      <RevenueChart data={stats.revenueByMonth} />

      {/* Alerts + recent orders side by side */}
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <LowStockAlert products={stats.lowStockProducts} />
        <RecentOrdersTable orders={stats.recentOrders} />
      </div>
    </div>
  );
}
