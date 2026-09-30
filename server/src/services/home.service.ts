import prisma from '../config/prisma';
import { HomeResponse } from '../types/home.types';
import { getCache, setCache } from '../utils/redisUtils';

const HOME_CACHE_KEY = 'home:data';
const HOME_CACHE_TTL = 300;

const getHomeDataService = async (): Promise<HomeResponse> => {
    const cachedHome = await getCache<HomeResponse>(HOME_CACHE_KEY);

    if (cachedHome) {
        return cachedHome;
    }

    const [featuredCategories, featuredProducts, newArrivals] = await Promise.all(
        [
            // Featured Categories
            prisma.category.findMany({
                where: {
                    products: {
                        some: {
                            isActive: true,
                        },
                    },
                },
                select: {
                    id: true,
                    name: true,
                },
                take: 6,
                orderBy: {
                    name: 'asc',
                },
            }),

            // Featured Products
            prisma.product.findMany({
                where: {
                    isActive: true,
                    stock: {
                        gt: 0,
                    },
                },
                select: {
                    // id: true,
                    // name: true,
                    // price: true,
                    // images: true,
                    // stock: true,
                    // categoryId: true,

                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    stock: true,
                    images: true,
                    isActive: true,
                    categoryId: true,
                    adminId: true,
                    createdAt: true,
                    updatedAt: true,

                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: 8,
            }),

            // New Arrivals
            prisma.product.findMany({
                where: {
                    isActive: true,
                },
                select: {
                    // id: true,
                    // name: true,
                    // price: true,
                    // images: true,
                    // stock: true,
                    // categoryId: true,

                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    stock: true,
                    images: true,
                    isActive: true,
                    categoryId: true,
                    adminId: true,
                    createdAt: true,
                    updatedAt: true,

                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: 8,
            }),
        ]
    );

    const homeData: HomeResponse = {
        featuredCategories,
        featuredProducts: featuredProducts.map((product) => ({
            ...product,
            price: product.price.toString(),
        })),
        newArrivals: newArrivals.map((product) => ({
            ...product,
            price: product.price.toString(),
        })),
    };

    await setCache(HOME_CACHE_KEY, homeData, HOME_CACHE_TTL);

    return homeData;
};

export { getHomeDataService };
