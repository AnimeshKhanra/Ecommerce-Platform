export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalSales: number;
  revenueByMonth: {
    createdAt: string;
    _sum: {
      totalAmount: number;
    };
  }[];
  lowStockProducts: {
    id: string;
    name: string;
    stock: number;
  }[];
  recentOrders: any[];
}