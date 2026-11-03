// import prisma from '../config/prisma';

// export const getDashboardStats = async () => {
//     const totalUsers = await prisma.user.count();
//     const totalProducts = await prisma.product.count();
//     const totalOrders = await prisma.order.count();

//     const sales = await prisma.order.aggregate({
//         _sum: {
//             totalAmount: true,
//         },
//     });

//     const revenueByMonth = await prisma.order.groupBy({
//         by: ['createdAt'],
//         _sum: {
//             totalAmount: true,
//         },
//         orderBy: {
//             createdAt: 'asc',
//         },
//     });

//     const lowStockProducts = await prisma.product.findMany({
//         where: {
//             stock: {
//                 lte: 5,
//             },
//         },
//         select: {
//             id: true,
//             name: true,
//             stock: true,
//         },
//     });

//     const recentOrders = await prisma.order.findMany({
//         take: 10,
//         orderBy: {
//             createdAt: 'desc',
//         },
//         select: {
//             user: true,
//         },
//     });

//     return {
//         totalUsers,
//         totalProducts,
//         totalOrders,
//         totalSales: sales._sum.totalAmount || 0,
//         revenueByMonth,
//         lowStockProducts,
//         recentOrders,
//     };
// };




import prisma from "../config/prisma";

const LOW_STOCK_THRESHOLD = 5;

export const getDashboardStats = async (ownerId: string) => {
  // Only paid order items belonging to this owner
  const paidItems = await prisma.orderItem.findMany({
    where: {
      product: {
        adminId: ownerId,
      },
      order: {
        paymentStatus: "PAID",
      },
    },
    select: {
      productId: true,
      productName: true,
      quantity: true,
      price: true,
      order: {
        select: {
          id: true,
          userId: true,
          createdAt: true,
        },
      },
    },
  });

  // Revenue: only this owner's products
  const totalSales = paidItems.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  // Unique orders and customers
  const orderIds = new Set(
    paidItems.map((item) => item.order.id)
  );

  const userIds = new Set(
    paidItems.map((item) => item.order.userId)
  );

  // Unique products that have actually been ordered and paid for
  const orderedProductIds = new Set(
    paidItems.map((item) => item.productId)
  );

  // Only this owner's products with low stock
  const lowStockProducts = await prisma.product.findMany({
    where: {
      adminId: ownerId,
      stock: {
        lte: LOW_STOCK_THRESHOLD,
      },
    },
    select: {
      id: true,
      name: true,
      stock: true,
      price: true,
      images: true,
    },
    orderBy: {
      stock: "asc",
    },
  });

  // Recent orders containing this owner's products.
  // Return only this owner's items, not other vendors' items.
  const recentOrders = await prisma.order.findMany({
    where: {
      items: {
        some: {
          product: {
            adminId: ownerId,
          },
        },
      },
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      userId: true,
      totalAmount: true,
      status: true,
      paymentStatus: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        where: {
          product: {
            adminId: ownerId,
          },
        },
        select: {
          id: true,
          productId: true,
          productName: true,
          quantity: true,
          price: true,
        },
      },
    },
  });

  // Group paid revenue by calendar month
  const monthlyRevenue = new Map<
    string,
    number
  >();

  for (const item of paidItems) {
    const date = item.order.createdAt;

    const month = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
    ].join("-");

    const itemRevenue =
      Number(item.price) * item.quantity;

    monthlyRevenue.set(
      month,
      (monthlyRevenue.get(month) ?? 0) + itemRevenue
    );
  }

  const revenueByMonth = Array.from(
    monthlyRevenue,
    ([month, revenue]) => ({
      month,
      revenue: Number(revenue.toFixed(2)),
    })
  ).sort((a, b) => a.month.localeCompare(b.month));

  return {
    totalSales: Number(totalSales.toFixed(2)),
    totalOrders: orderIds.size,
    totalUsers: userIds.size,
    totalProducts: orderedProductIds.size,
    lowStockProducts,
    recentOrders,
    revenueByMonth,
  };
};
