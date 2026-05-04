import type { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError.middlewares';
import { logger } from '../config/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    
  if(err instanceof AppError){
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message
    })
  }

  logger.error(err.message);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
};