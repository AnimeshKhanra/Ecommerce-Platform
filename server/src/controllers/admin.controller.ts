import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';

export const adminDashboard = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, {}, 'Welcome Admin'));
  }
);
