import { Response, Request } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { logger } from '../config/logger';
import {
    delCache,
    getCache,
    setCache,
    delCacheByPattern,
} from '../utils/redisUtils';
import {
    createProductService,
    deleteProductService,
    getAllProductsService,
    updateProductService,
    GetAllProductsInput,
    getProductByIdService,
} from '../services/product.service';
import prisma from '../config/prisma';


// create product - Admin
const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const adminId = req.user?.id as string;

    if (!adminId) {
        throw new ApiError(401, 'Unauthorized');
    }

    const product = await createProductService(
        req.body,
        adminId
    );

    return res
        .status(201)
        .json(new ApiResponse(201, product, 'Product created successfully'));
});

// update product - Admin
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const adminId = req.user?.id as string;

    if (!adminId) {
        throw new ApiError(401, 'Unauthorized');
    }

    if (!id || Array.isArray(id)) {
        throw new ApiError(400, 'Invalid product ID');
    }

    const updatedProduct = await updateProductService(
        id,
        adminId,
        req.body
    );


    return res
        .status(200)
        .json(new ApiResponse(200, updatedProduct, 'Peoduct Updated successfully'));
});

// delete product - admin
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const adminId = req.user?.id as string;

    if (!adminId) {
        throw new ApiError(401, "Unauthorized")
    }

    if (!id || Array.isArray(id)) {
        throw new ApiError(400, 'Invalid product ID');
    }

    deleteProductService(id, adminId);

    // const existingProduct = await prisma.product.findUnique({
    //     where: { id },
    // });

    // if (!existingProduct) {
    //     throw new ApiError(404, 'Product not found');
    // }

    // await prisma.product.delete({
    //     where: { id },
    // });

    // await delCacheByPattern('products:*');
    // await delCache(`product:${id}`);

    // logger.info(`Product deleted: ${id}`);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'Product deleted successfully'));
});




// GET /api/v1/products (public)
const getAllProducts = asyncHandler(async (req: Request, res: Response) => {

    // const {
    //     search,
    //     category,
    //     minPrice,
    //     maxPrice,
    //     sortBy,
    //     order,
    //     page,
    //     limit,
    // } = req.query;

    // const responseData = await getAllProductsService({
    //     search: search as string | undefined,
    //     category: category as string | undefined,
    //     minPrice: minPrice !== undefined ? Number(minPrice) : undefined,
    //     maxPrice: maxPrice !== undefined ? Number(maxPrice) : undefined,
    //     sortBy: sortBy as 'createdAt' | 'name' | 'price' | undefined,
    //     order: order as 'asc' | 'desc' | undefined,
    //     page: page !== undefined ? Number(page) : undefined,
    //     limit: limit !== undefined ? Number(limit) : undefined,
    // })

    const query = res.locals.query;

    const responseData =
        await getAllProductsService(
            query as unknown as GetAllProductsInput
        );

    return res
        .status(200)
        .json(new ApiResponse(200, responseData, 'Products fetched successfully'));
});



// GET /api/v1/products/:id (public)
const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;

    // Validate ID
    if (!id || Array.isArray(id)) {
        throw new ApiError(400, 'Invalid product ID');
    }

    const product = await getProductByIdService(id);

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
