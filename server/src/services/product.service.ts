import prisma from '../config/prisma';
import { ApiError } from '../utils/ApiError';
import { logger } from '../config/logger';
import { Prisma } from '@prisma/client';
import {
    getCache,
    delCache,
    delCacheByPattern,
    setCache,
} from '../utils/redisUtils';


interface CreateProductInput {
    name: string;
    description?: string;
    price: number;
    stock: number;
    images: string[];
    isActive: boolean;
    categoryId: string;
}

interface UpdateProductInput {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    images?: string[];
    isActive?: boolean;
    categoryId?: string;
}

type ProductWithCategeroy = Prisma.ProductGetPayload<{
    include: {
        category: true;
    };
}>;

export interface GetAllProductsInput {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'createdAt' | 'price' | 'name';
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

interface ProductListResponse {
    products: ProductWithCategeroy[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}



const createProductService = async (
    data: CreateProductInput,
    adminId: string
) => {
    const category = await prisma.category.findUnique({
        where: {
            id: data.categoryId,
        },
        select: {
            id: true,
        },
    });

    if (!category) {
        throw new ApiError(404, 'Category not found');
    }

    const product = await prisma.product.create({
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            images: data.images,
            isActive: data.isActive,
            categoryId: data.categoryId,
            adminId,
        },
        include: {
            category: true,
        },
    });

    await delCacheByPattern('products:*');

    logger.info(
        `Product created: ${product.id} by admin: ${adminId}`
    );

    return product;
};

const updateProductService = async (id: string, adminId: string, data: UpdateProductInput) => {
    const existingProduct = await prisma.product.findFirst({
        where: {
            id,
            adminId,
        },
    });

    if (!existingProduct) {
        throw new ApiError(404, 'Product not found or you do not have permission to update it');
    }

    // 2. If categoryId is being changed,
    //    verify that the new category exists
    if (data.categoryId) {
        const category = await prisma.category.findUnique({
            where: {
                id: data.categoryId,
            },
            select: {
                id: true,
            },
        });

        if (!category) {
            throw new ApiError(404, 'Category not found');
        }
    }

    const updatedProduct = await prisma.product.update({
        where: {
            id,
        },
        data: {
            ...(data.name !== undefined && {
                name: data.name,
            }),

            ...(data.description !== undefined && {
                description: data.description,
            }),

            ...(data.price !== undefined && {
                price: data.price,
            }),

            ...(data.stock !== undefined && {
                stock: data.stock,
            }),

            ...(data.images !== undefined && {
                images: data.images,
            }),

            ...(data.isActive !== undefined && {
                isActive: data.isActive,
            }),

            ...(data.categoryId !== undefined && {
                categoryId: data.categoryId,
            }),
        },
        include: {
            category: true,
        },
    });

    await delCacheByPattern('products:*');
    await delCache(`product:${id}`);


    logger.info(`Product updated: ${id}`);

    return updatedProduct;

}

const deleteProductService = async (id: string, adminId: string) => {

    const existingProduct = await prisma.product.findFirst({
        where: {
            id,
            adminId
        },
    });

    if (!existingProduct) {
        throw new ApiError(404, 'Product not found or you do not have permission to update it');
    }

    const deletedProduct = await prisma.product.update({
        where: {
            id,
        },
        data: {
            isActive: false,
        },
    });

    await delCacheByPattern('products:*');
    await delCache(`product:${id}`);

    logger.info(`Product deleted: ${id}`);

    return existingProduct;
}



const getAllProductsService = async (params: GetAllProductsInput): Promise<ProductListResponse> => {
    const {
        search = '',
        category,
        minPrice,
        maxPrice,
        sortBy = 'createdAt',
        order = 'desc',
        page = 1,
        limit = 10,
    } = params;

    // 1. Pagination

    const currentPage = Math.max(1, page);
    const pageLimit = Math.max(1, Math.min(limit, 100));
    const skip = (currentPage - 1) * pageLimit;

    // 2. Build Prisma WHERE condition

    const where: Prisma.ProductWhereInput = {
        isActive: true,
    };

    if (search) {
        where.OR = [
            {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            {
                description: {
                    contains: search,
                    mode: 'insensitive',
                },
            }
        ]
    }

    if (category) {
        where.categoryId = category;
    }

    // Price filter
    if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {};

        if (minPrice !== undefined) {
            where.price.gte = minPrice;
        }

        if (maxPrice !== undefined) {
            where.price.lte = maxPrice;
        }
    }

    // 3. Allowed sorting

    const allowedSortFields = [
        'createdAt',
        'price',
        'name',
    ] as const;

    const sortField = allowedSortFields.includes(
        sortBy
    )
        ? sortBy
        : 'createdAt';

    const sortOrder = (order === 'asc') ? 'asc' : 'desc';

    // 4. Create cache key

    const cacheKey =
        `products:` +
        `${search}:` +
        `${category ?? ''}:` +
        `${minPrice ?? ''}:` +
        `${maxPrice ?? ''}:` +
        `${sortField}:` +
        `${sortOrder}:` +
        `${currentPage}:` +
        `${pageLimit}`;

    // 5. Check Redis

    const cached =
        await getCache<ProductListResponse>(
            cacheKey
        );

    if (cached) {
        logger.info(
            `PRODUCT LIST CACHE HIT: ${cacheKey}`
        );

        return cached;
    }

    // 6. Database query

    const [products, total] = await Promise.all([
        prisma.product.findMany({
            where,
            include: {
                category: true
            },
            orderBy: {
                [sortField]: sortOrder,
            },
            skip,
            take: pageLimit,
        }),
        prisma.product.count({
            where
        })
    ])

    // 7. Pagination metadata

    const totalPages = Math.ceil(total / pageLimit);

    const responseData: ProductListResponse = {
        products,
        pagination: {
            total,
            page: currentPage,
            limit: pageLimit,
            totalPages,
            hasNext: currentPage < totalPages,
            hasPrev: currentPage > 1,
        }
    }

    // 8. Cache result

    await setCache(cacheKey, responseData);

    logger.info(`Cache SET: ${cacheKey}`);

    logger.info(
        `Products fetched — ` +
        `search:"${search}" ` +
        `category:"${category ?? 'all'}" ` +
        `page:${currentPage}`
    );

    return responseData;
}

const getProductByIdService = async(id: string): Promise<ProductWithCategeroy> => {
    const cacheKey = `product:${id}`;

    // 1. Check Redis cache
    const cached = await getCache<any>(cacheKey);

    if(cached){
        logger.info(`PRODUCT CACHE HIT: ${id}`);
        return cached;
    }

    // 2. Fetch product from database
    const product = await prisma.product.findUnique({
        where: {id},
        include: {
            category: true,
        },
    })

    // if data is not present Or soft-deleted
    if(!product || !product.isActive){
        throw new ApiError(404, 'Product not found');
    }

    // set data into cache
    await setCache(cacheKey, product, 300);
    logger.info(`PRODUCT FETCHED: ${id}`);

    return product;
}



export {
    createProductService,
    updateProductService,
    deleteProductService,
    getAllProductsService,
    getProductByIdService,
};