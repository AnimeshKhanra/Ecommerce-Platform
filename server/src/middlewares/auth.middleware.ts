import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { getCache, setCache } from "../utils/redisUtils";
import prisma from "../config/prisma";

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

        // console.log(process.env.JWT_ACCESS_SECRET!)
        const decodedToken = jwt.verify(
            token,
            // process.env.JWT_ACCESS_SECRET!,
            process.env.JWT_ACCESS_SECRET as Secret,
        ) as {
            id: string;
            role: string;
        }

        const cachedUser = await getCache<any>(`session:${decodedToken.id}`);

        if (cachedUser) {
            req.user = cachedUser;
            return next();
        }

        const user = await prisma.user.findUnique({
            where: { id: decodedToken.id }
        });
        // console.log(user)

        if(!user){
            throw new ApiError(400, "Invalid access token");
        }

        await setCache(
            `session:${user.id}`,
            {
                id: user.id,
                role: user.role,
            },
            3600
        )
    
        req.user = {
            id: user.id,
            role: user.role
        }
            
        next();
    }
)