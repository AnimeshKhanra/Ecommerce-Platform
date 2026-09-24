import { Router } from "express";
import { validateQuery } from "../middlewares/validateQuery.middleware";
import { 
    productQuerySchema, 
} from "../schemas/product.schema";
import { 
    getAllProducts,
    getProductById,
} from "../controllers/product.controller";

const router = Router();




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
