'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';

import StatsCard from '@/components/admin/StatsCard';
import RevenueChart from '@/components/admin/RevenueChart';
import RecentOrdersTable from '@/components/admin/RecentOrdersTable';
import LowStockAlert from '@/components/admin/LowStockAlert';

export default function DashboardPage() {
    const [stats, setStats] = useState<any>();

    useEffect(() => {
        const fetchStats = async () => {
            const res = await api.get('/admin/stats');

            setStats(res.data.data);
        };

        fetchStats();
    }, []);

    if (!stats) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="grid grid-cols-4 gap-6">
                <StatsCard title="Sales" value={`₹${stats.totalSales}`} />

                <StatsCard title="Orders" value={stats.totalOrders} />

                <StatsCard title="Users" value={stats.totalUsers} />

                <StatsCard title="Products" value={stats.totalProducts} />
            </div>

            <RevenueChart data={stats.revenueByMonth} />

            <LowStockAlert products={stats.lowStockProducts} />

            <RecentOrdersTable orders={stats.recentOrders} />
        </div>
    );
}
