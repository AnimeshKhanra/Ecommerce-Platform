import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { getAdminStats  } from "../controllers/admin.controller";
import {
    getAdminOrders,
    getAdminOrderById,
    updateAdminOrderStatus
} from "../controllers/adminOrder.controller"
import { createProduct, deleteProduct, getAdminProducts, getAdminProductsById, updateProduct } from "../controllers/product.controller";
import { validateBody } from "../middlewares/validateBody";
import { productSchema, updateProductSchema } from "../schemas/product.schema";



const router = Router();


router.use(authMiddleware);
router.use(adminMiddleware);

// GET /api/admin/stats
router.route("/stats").get(getAdminStats);


//^ Admin order ----------------
// GET /api/admin/orders
// Get all orders containing products owned by this admin
router.route("/orders").get(getAdminOrders);

// GET /api/admin/orders/:id
// Get a specific order belonging to this admin's products
router.route("/orders/:id").get(getAdminOrderById);

// PATCH /api/admin/orders/:id/status
// Update order status
router.route('/orders/:id/status').patch(updateAdminOrderStatus);


//^ Admin Product ------------------
// get /api/admin/getproducts
router.route('/products').get(getAdminProducts);

// /api/v1/admin/products/create
router
    .route("/products/create")
    .post(
        authMiddleware, 
        adminMiddleware, 
        validateBody(productSchema), 
        createProduct
    );

//^ Admin Only route - update and delete
// /api/v1/products/:id
router
    .route("/products/:id")
    .get(
        authMiddleware, 
        adminMiddleware, 
        getAdminProductsById,
    )
    .patch(
        authMiddleware, 
        adminMiddleware, 
        validateBody(updateProductSchema), 
        updateProduct,
    )
    .delete(
        authMiddleware, 
        adminMiddleware, 
        deleteProduct,
    )


export default router;