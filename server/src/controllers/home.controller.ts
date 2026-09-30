import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { getHomeDataService } from "../services/home.service";

const getHomeDataController = asyncHandler(
    async (req: Request, res: Response) => {
        const homeData = await getHomeDataService();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    homeData,
                    "Home data fetched successfully"
                )
            );
    }
);

export { getHomeDataController };