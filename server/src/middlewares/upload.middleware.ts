import multer from "multer";
import { ApiError } from "../utils/ApiError";

const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/temp')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })



const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/png",        
            "image/webp",
            "image/jpg",
        ];

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(
                new ApiError(
                    400,
                    "Only JPG, JPEG, PNG, WEBP images are allowed"
                )
            );
        }

        cb(null, true);
    },
});

export default upload;