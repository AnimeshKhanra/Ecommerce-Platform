import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { fileSchema } from '../schemas/upload.schema';
import cloudinary from '../config/cloudinary';
// import { uploadOnCloudinary } from "../utils/uploadOnCloudinary";

const uploadImage = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
        throw new ApiError(400, 'file not found');
    }

    fileSchema.parse({
        mimetype: req.file.mimetype,
        size: req.file.size,
    });

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        'base64'
    )}`;

    const result = await cloudinary.uploader.upload(base64Image, {
        folder: 'ecommerce-products',
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                imageUrl: result.secure_url,
                publicId: result.public_id,
            },
            'Image uploaded successfully'
        )
    );
});

export { uploadImage };
