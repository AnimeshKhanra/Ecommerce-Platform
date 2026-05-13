import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { logger } from '../config/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);

  if(err instanceof ApiError){
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      errors: err.errors || [],
    })
  }


  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
};

