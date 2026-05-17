import { Response, Request } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { delCache, getCache, setCache, delCacheByPattern } from '../utils/redisUtils';
import { logger } from '../config/logger';

import prisma from '../config/prisma';
// import { json } from 'zod';



const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const { name, description, price, stock, images, isActive, categoryId } =
        req.body;

    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    });

    if (!category) {
        throw new ApiError(404, 'Category not found');
    }

    const product = await prisma.product.create({
        data: {
            name,
            description,
            price,
            stock,
            images,
            isActive,
            categoryId,
        },
        include: { category: true },
    });

    await delCacheByPattern("products:*");
    logger.info(`Product created: ${product.id}`);

    return res
        .status(201)
        .json(new ApiResponse(201, product, 'Product created successfully'));
});

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
        throw new ApiError(400, 'Invalid product ID');
    }

    const updatedData = req.body;

    const existingProduct = await prisma.product.findUnique({
        where: {
            id,
        },
    });

    if (!existingProduct) {
        throw new ApiError(404, 'Product not found');
    }

    const updatedProduct = await prisma.product.update({
        where: {
            id,
        },
        data: updatedData,
        include: { category: true },
    });

    await delCacheByPattern("products:*");
    await delCache(`product:${id}`);

    logger.info(`Product updated: ${id}`);

    return res
        .status(200)
        .json(new ApiResponse(200, updatedProduct, 'Peoduct Updated successfully'));
});

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
        throw new ApiError(400, 'Invalid product ID');
    }

    const existingProduct = await prisma.product.findUnique({
        where: { id },
    });

    if (!existingProduct) {
        throw new ApiError(404, 'Product not found');
    }

    await prisma.product.delete({
        where: { id },
    });

    await delCacheByPattern("products:*");
    await delCache(`product:${id}`);

    logger.info(`Product deleted: ${id}`);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'Product deleted successfully'));
});


// GET /api/v1/products (public)
const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
    // ── Query params ──────────────────────────────────────────
    const {
        search    = '',
        category,
        minPrice,
        maxPrice,
        sortBy    = 'createdAt',   // createdAt | price | name
        order     = 'desc',        // asc | desc
        page      = '1',
        limit     = '10',
    } = req.query as Record<string, string>;

    // const cacheKey = `products:${JSON.stringify(req.query)}`
    const cacheKey = `products:${search}:${category}:${minPrice}:${maxPrice}:${sortBy}:${order}:${page}:${limit}`;

    
    type ProductListCache = {
        products: any[];
        pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
        };
    };

    const cached = await getCache<ProductListCache>(cacheKey);

    if (cached) {
        logger.info("PRODUCT LIST CACHE HIT");

        return res
            .status(200)
            .json(new ApiResponse(200, cached, 'Product fetched (cache)'));
    }

    const currentPage = Math.max(1, Number(page) || 1);
    const pageLimit = Math.max(1, Math.min(100, Number(limit) || 10));
    const skip = (currentPage - 1) * pageLimit;

    // ── Build Prisma where clause ─────────────────────────────
    const where: any = {
        isActive: true
    }

    if(search){
        where.OR = [
            { name: { contains: String(search), mode: 'insensitive' } },
            { description:  { contains: String(search), mode: 'insensitive' } }
        ];
    }

    if (typeof category === "string") {
        where.categoryId = category;
    }

    if (minPrice || maxPrice) {
        where.price = {};

        const min = Number(minPrice);
        const max = Number(maxPrice);

        if (!isNaN(min)) where.price.gte = min;
        if (!isNaN(max)) where.price.lte = max;


        // if (minPrice) where.price.gte = parseFloat(minPrice);
        // if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }


    // ── Allowed sort fields (whitelist to prevent injection) ───
    const allowedSortFields = ['createdAt', 'price', 'name'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sortOrder = order === 'asc' ? 'asc' : 'desc';

    // ── Run query + count in parallel ─────────────────────────
    const [products, total] = await Promise.all([
        prisma.product.findMany({
            where,
            include:  { category: true },
            orderBy:  { [sortField]: sortOrder },
            skip,
            take:     pageLimit,
        }),
        prisma.product.count({ where }),
    ]);

    const responseData = {
        products,
        pagination: {
            total,
            page:       currentPage,
            limit:      pageLimit,
            totalPages: Math.ceil(total / pageLimit),
            hasNext:    currentPage < Math.ceil(total / pageLimit),
            hasPrev:    currentPage > 1,
        }
    };

// ── Cache for 5 min ───────────────────────────────────────
    await setCache(cacheKey, responseData, 300);
    logger.info(`Cache SET: ${cacheKey}`);

    logger.info(
        `Products fetched — search:"${search}" category:"${category || 'all'}" page:${currentPage}`
    );


    return res
        .status(200)
        .json(new ApiResponse(200, responseData, 'Products fetched successfully'));
});



// GET /api/v1/products/:id (public)
const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const cached = await getCache<any>(`product:${id}`);

    if (cached) {
        logger.info(`PRODUCT CACHE HIT: ${id}`)
        return res
            .status(200)
            .json(new ApiResponse(200, cached, 'Product fetched (cache)'));
    }

    const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true },
    });

    if (!product || !product.isActive) {
        throw new ApiError(404, 'Product not found');
    }

    await setCache(`product:${id}`, product, 300);

    logger.info(`PRODUCT FETCHED: ${id}`);

    return res
        .status(200)
        .json(new ApiResponse(200, product, 'Product fetched successfully'));
});


export {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
};
