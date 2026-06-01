'use client';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';

export default function RevenueChart({ data }: { data: any[] }) {
    const chartData = data.map((item) => ({
        date: new Date(item.createdAt).toLocaleDateString(),
        revenue: item._sum.totalAmount,
    }));

    return (
        <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-bold text-lg mb-4">Revenue</h2>

            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis />

                    <Tooltip />

                    <Line type="monotone" dataKey="revenue" stroke="#2563eb" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
