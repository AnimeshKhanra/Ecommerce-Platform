import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { logger } from '../config/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // logger.error(err.message);

  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
  });

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      errors: err.errors || [],
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ status: 'error', message: 'Token expired' });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ status: 'error', message: 'Invalid token' });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
