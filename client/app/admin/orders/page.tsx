// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/axios";
// import { Order } from "@/types/order";
// import AdminOrderTable from "@/components/orders/AdminOrderTable";
// import EmptyState from "@/components/common/EmptyState";


// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);

//   const fetchOrders = async () => {
//     const res = await api.get("/admin/orders");

//     setOrders(res.data.data);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);


// if (!orders.length) {
//   return (
//     <EmptyState
//       title="No Orders"
//       description="No customer orders found."
//     />
//   );
// }


//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">
//         Order Management
//       </h1>

//       <AdminOrderTable
//         orders={orders}
//         refreshOrders={fetchOrders}
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import toast from "react-hot-toast";

import api from "@/lib/axios";
import { Order } from "@/types/order";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import AdminOrderTable from "@/components/orders/AdminOrderTable";
import EmptyState from "@/components/common/EmptyState";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <Skeleton className="mb-6 h-8 w-56" />
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // No orders yet
  if (!orders.length) {
    return (
      <EmptyState
        title="No Orders"
        description="No customer orders found."
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <ClipboardList className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Order Management</CardTitle>
              <CardDescription>
                View and manage customer orders
              </CardDescription>
            </div>
            <Badge variant="secondary" className="ml-1">
              {orders.length}
            </Badge>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <AdminOrderTable
            orders={orders}
            refreshOrders={fetchOrders}
          />
        </CardContent>
      </Card>
    </div>
  );
}