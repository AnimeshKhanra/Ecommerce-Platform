import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validateBody } from "../middlewares/validateBody";
import { productSchema, updateProductSchema } from "../schemas/product.schema";
import { 
    createProduct, 
    updateProduct, 
    deleteProduct,
    getAllProducts,
    getProductById,
} from "../controllers/product.controller";

const router = Router();

// Admin Only route
router
    .route("/")
    .post(
        authMiddleware, 
        adminMiddleware, 
        validateBody(productSchema), 
        createProduct
    );

router
    .route("/:id")
    .put(
        authMiddleware, 
        adminMiddleware, 
        validateBody(updateProductSchema), 
        updateProduct
    )
    .delete(
        authMiddleware, 
        adminMiddleware, 
        deleteProduct
    )

// Public Route
router.route("/").get(getAllProducts);
router.route("/:id").get(getProductById);



export default router;
