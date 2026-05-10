import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "ADMIN") {
    throw new ApiError(403, "Access denied")
    
    // return res.status(403).json({
    //   success: false,
    //   status: "error",
    //   message: "Access denied",
    // });
  }

  next();
};