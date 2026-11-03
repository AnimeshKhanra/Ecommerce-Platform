// 'use client';

// import {
//     ResponsiveContainer,
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     Tooltip,
// } from 'recharts';

// export default function RevenueChart({ data }: { data: any[] }) {
//     const chartData = data.map((item) => ({
//         date: new Date(item.createdAt).toLocaleDateString(),
//         revenue: item._sum.totalAmount,
//     }));

//     return (
//         <div className="bg-white rounded-xl shadow p-5">
//             <h2 className="font-bold text-lg mb-4">Revenue</h2>

//             <ResponsiveContainer width="100%" height={350}>
//                 <LineChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />

//                     <Tooltip />

//                     <Line type="monotone" dataKey="revenue" stroke="#2563eb" />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }





"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface RevenueData {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export default function RevenueChart({
  data,
}: RevenueChartProps) {
  const chartData = (data ?? []).map((item) => ({
    month: item.month,
    revenue: Number(item.revenue ?? 0),
  }));

  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-4 text-lg font-bold text-gray-900">
        Monthly Revenue
      </h2>

      {chartData.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          No revenue data available yet.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis
              tickFormatter={(value) =>
                `₹${Number(value).toLocaleString("en-IN")}`
              }
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Revenue",
              ]}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
