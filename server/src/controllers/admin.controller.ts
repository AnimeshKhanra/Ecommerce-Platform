import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { getDashboardStats } from '../services/admin.service';

export const getAdminStats = asyncHandler(async (req: Request, res: Response) => {
  const ownerId = req.user?.id as string
    const stats = await getDashboardStats(ownerId);

    // const stats = {}
    res.status(200).json(new ApiResponse(200, stats, 'Welcome Admin'));
  }
);
