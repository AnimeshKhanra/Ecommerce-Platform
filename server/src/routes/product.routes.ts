import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validateBody } from "../middlewares/validateBody";
import { 
    productQuerySchema, 
    productSchema, 
    updateProductSchema
} from "../schemas/product.schema";
import { 
    createProduct, 
    updateProduct, 
    deleteProduct,
    getAllProducts,
    getProductById,
} from "../controllers/product.controller";
import { validateQuery } from "../middlewares/validateQuery.middleware";

const router = Router();


//^ Admin Only route - create
// /api/v1/products/create
router
    .route("/")
    .post(
        authMiddleware, 
        adminMiddleware, 
        validateBody(productSchema), 
        createProduct
    );

//^ Admin Only route - update and delete
// /api/v1/products/:id
router
    .route("/:id")
    .patch(
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
router
    .route("/")
    .get(
        validateQuery(productQuerySchema), 
        getAllProducts
    );

router
    .route("/:id")
    .get(getProductById);



export default router;
