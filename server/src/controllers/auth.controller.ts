import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import {
    generateAccessToken,
    generateRefreshToken,
} from '../utils/generateTokens';

import { registerSchema, loginSchema } from '../schemas/auth.schema';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';








const register = asyncHandler(async (req: Request, res: Response) => {
    // const validatedData = registerSchema.parse(req.body);
    const validatedData = req.body;

    const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email },
    });

    if (existingUser) {
        throw new ApiError(400, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await prisma.user.create({
        data: {
            name: validatedData.name,
            email: validatedData.email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        }
    });

    return res
        .status(201)
        .json(new ApiResponse(201, user, 'User registered successfully'));
});

const login = asyncHandler(async (req: Request, res: Response) => {
    // const { email, password } = loginSchema.parse(req.body);
    // const { email, password } = req.body;
    const validatedData = req.body

    // console.log(validatedData);
    const user = await prisma.user.findUnique({
        where: { email: validatedData.email },
    });
    // console.log(user)

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(validatedData.password, user.password);

    if (!isPasswordCorrect) {
        throw new ApiError(400, 'Invalid credentials');
    }

    const accessToken = generateAccessToken({
        id: user.id,
        role: user.role,
    });
    // console.log("Access token --> "+ accessToken)

    const refreshToken = generateRefreshToken({
        id: user.id,
    });

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            refreshToken,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        }
    });
    // console.log(updatedUser)

    const options = {
        httpOnly: true,
        secure: true
    }


    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: updatedUser, accessToken, refreshToken },
                'Login successful'
            )
        );
});

const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        throw new ApiError(401, 'Refresh token missing');
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as {
        id: string;
    };

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
    });

    if (!user || user.refreshToken !== refreshToken) {
        throw new ApiError(401, 'Invalid refresh token');
    }

    const accessToken = generateAccessToken({
        id: user.id,
        role: user.role,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, { accessToken }, 'Access token refreshed'));
});

const logout = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user?.id;
    // console.log(userId)

    if (!userId) throw new ApiError(401, "Unauthorized");


    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            refreshToken: null,
        },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, 'Logged out successfully'));
});





export { 
    register, 
    login, 
    refreshAccessToken, 
    logout
};
