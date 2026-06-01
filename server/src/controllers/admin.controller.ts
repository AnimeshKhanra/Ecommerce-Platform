import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { getDashboardStats } from '../services/admin.service';

export const getAdminStats = asyncHandler(
  async (req: Request, res: Response) => {
    const stats = await getDashboardStats();

    res.status(200).json(new ApiResponse(200, stats, 'Welcome Admin'));
  }
);
