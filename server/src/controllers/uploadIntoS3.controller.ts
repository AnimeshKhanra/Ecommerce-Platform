import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { fileSchema, deleteImagesSchema } from '../schemas/upload.schema';
import {
    uploadImageToS3,
    deleteImagesFromS3,
} from '../services/upload.service';

interface UploadedImage {
    imageUrl: string;
    key: string;
}

const uploadImages = asyncHandler(async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
        throw new ApiError(400, 'No images uploaded');
    }

    const uploadedImages: UploadedImage[] = [];

    try {
        for (const file of files) {
            // Validate file
            fileSchema.parse({
                mimetype: file.mimetype,
                size: file.size,
            });

            // Upload to S3
            const uploadedImage = await uploadImageToS3(file);

            uploadedImages.push(uploadedImage);
        }

        // throw new ApiError(
        //     500,
        //     "TEST: Product creation failed"
        // );

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    images: uploadedImages,
                    count: uploadedImages.length,
                },
                'Images uploaded successfully'
            )
        );
    } catch (error) {
        // ROLLBACK

        if (uploadedImages.length > 0) {
            await Promise.allSettled(
                uploadedImages.map((image) => deleteImagesFromS3([image.key]))
            );
        }

        throw error;
    }
});


const deleteImages = asyncHandler(async (req: Request, res: Response) => {
    const { keys } = deleteImagesSchema.parse(req.body);

    await deleteImagesFromS3(keys);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                deleted: keys,
                count: keys.length,
            },
            'Images deleted successfully'
        )
    );
});

export { uploadImages, deleteImages };
