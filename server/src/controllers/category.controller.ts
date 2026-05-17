import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';

import prisma from '../config/prisma';

const createCategory = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name || name.trim().length < 2) {
        throw new ApiError(400, 'Category name must be at least 2 characters');
    }

    const existing = await prisma.category.findUnique({
        where: { name },
    });

    if (existing) {
        throw new ApiError(404, 'Category already exist');
    }

    const category = await prisma.category.create({
        data: { name },
    });

    return res
        .status(201)
        .json(new ApiResponse(201, category, 'Category created successfully'));
});

const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    
    const categories = await prisma.category.findMany({
        include: { _count: { select: { products: true } } },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, categories, 'Categories fetched successfully'));
});

export { createCategory, getAllCategories };
