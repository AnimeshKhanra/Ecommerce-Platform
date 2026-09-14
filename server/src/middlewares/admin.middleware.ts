import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "ADMIN") {
    throw new ApiError(403, "Access denied")
  }

  next();
};