// import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

// import s3Client from '../config/s3';

// const bucketName = process.env.AWS_S3_BUCKET_NAME!;

// interface UploadImageResult {
//     imageUrl: string;
//     key: string;
// }

// export const uploadImageToS3 = async (
//     file: Express.Multer.File
// ): Promise<UploadImageResult> => {
//     const fileExtension = file.originalname.split('.').pop() || 'jpg';

//     const uniqueFileName = `${Date.now()}-${Math.round(
//         Math.random() * 1_000_000_000
//     )}.${fileExtension}`;

//     const key = `products/${uniqueFileName}`;

//     const command = new PutObjectCommand({
//         Bucket: bucketName,
//         Key: key,
//         Body: file.buffer,
//         ContentType: file.mimetype,
//     });

//     await s3Client.send(command);

//     //   const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

//     const cloudFrontDomain = process.env.AWS_CLOUDFRONT_DOMAIN!;
//     const imageUrl = `https://${cloudFrontDomain}/${key}`;

//     return {
//         imageUrl,
//         key,
//     };
// };

// export const deleteImageFromS3 = async (key: string): Promise<void> => {
//     const command = new DeleteObjectCommand({
//         Bucket: bucketName,
//         Key: key,
//     });

//     await s3Client.send(command);
// };

// export const deleteImagesFromS3 = async (keys: string[]): Promise<void> => {
//     await Promise.all(keys.map((key) => deleteImageFromS3(key)));
// };

import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

import s3Client from '../config/s3';

const bucketName = process.env.AWS_S3_BUCKET_NAME!;
const cloudFrontDomain = process.env.AWS_CLOUDFRONT_DOMAIN!;

interface UploadImageResult {
    imageUrl: string;
    key: string;
}

export const uploadImageToS3 = async (
    file: Express.Multer.File
): Promise<UploadImageResult> => {
    const fileExtension =
        file.originalname.split('.').pop()?.toLowerCase() || 'jpg';

    const uniqueFileName = `${Date.now()}-${Math.round(
        Math.random() * 1_000_000_000
    )}.${fileExtension}`;

    const key = `products/${uniqueFileName}`;

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    await s3Client.send(command);

    const imageUrl = `https://${cloudFrontDomain}/${key}`;

    return {
        imageUrl,
        key,
    };
};

export const deleteImageFromS3 = async (key: string): Promise<void> => {
    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
    });

    await s3Client.send(command);
};

export const deleteImagesFromS3 = async (keys: string[]): Promise<void> => {
    await Promise.all(keys.map((key) => deleteImageFromS3(key)));
};
