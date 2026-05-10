import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import prisma from "../config/prisma";
import { asyncHandler } from "../utils/asyncHandler";

export const authMiddleware = asyncHandler (async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

        const authHeader = req.headers.authorization;
    
        if(!authHeader || !authHeader?.startsWith("Bearer ")){
            throw new ApiError(401, "Missing or malformed Authorization header. Expected: Bearer <token>");
        }
    
        const token = authHeader.split(" ")[1];
        if(!token){
            throw new ApiError(400, "Token is empty");
        }

        const decodedToken = jwt.verify(
            token,
            // process.env.JWT_ACCESS_SECRET!
            process.env.JWT_ACCESS_SECRET as Secret,
        ) as {
            id: string;
            role: string;
        }

        const user = await prisma.user.findUnique({
            where: { id: decodedToken.id }
        });

        if(!user){
            throw new ApiError(400, "Invalid access token");
        }
    
        req.user = {
            id: user.id,
            role: user.role
        }
            
        next();
    }
)