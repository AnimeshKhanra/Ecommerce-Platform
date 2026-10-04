import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { fileSchema } from "../schemas/upload.schema";
import cloudinary from "../config/cloudinary";

const uploadImages = asyncHandler(async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
        throw new ApiError(400, "No images uploaded");
    }

    const uploadedImages = await Promise.all(
        files.map(async (file) => {
            fileSchema.parse({
                mimetype: file.mimetype,
                size: file.size,
            });

            const base64Image = `data:${file.mimetype};base64,${file.buffer.toString(
                "base64"
            )}`;

            const result = await cloudinary.uploader.upload(base64Image, {
                folder: "ecommerce-products",
                resource_type: "image",
            });

            return {
                imageUrl: result.secure_url,
                publicId: result.public_id,
            };
        })
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                images: uploadedImages,
                count: uploadedImages.length,
            },
            "Images uploaded successfully"
        )
    );
});

export { uploadImages };