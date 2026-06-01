import prisma from '../config/prisma';

export const getDashboardStats = async () => {
    const totalUsers = await prisma.user.count();
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.order.count();

    const sales = await prisma.order.aggregate({
        _sum: {
            totalAmount: true,
        },
    });

    const revenueByMonth = await prisma.order.groupBy({
        by: ['createdAt'],
        _sum: {
            totalAmount: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    const lowStockProducts = await prisma.product.findMany({
        where: {
            stock: {
                lte: 5,
            },
        },
        select: {
            id: true,
            name: true,
            stock: true,
        },
    });

    const recentOrders = await prisma.order.findMany({
        take: 10,
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            user: true,
        },
    });

    return {
        totalUsers,
        totalProducts,
        totalOrders,
        totalsales: sales._sum.totalAmount || 0,
        revenueByMonth,
        lowStockProducts,
        recentOrders,
    };
};
