import { Router } from "express";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    syncCart,
} from "../controllers/cart.controller";
import {
    addToCartSchema,
    syncCartSchema,
    updateCartSchema,
} from "../schemas/cart.schema";
import { validateBody } from "../middlewares/validateBody";
import { authMiddleware } from "../middlewares/auth.middleware";




const router = Router();

router.use(authMiddleware);

// get cart
// router.get("/", getCart);
router
    .route("/")
    .get(getCart)

// Add item
// router.post("/", validateBody(addToCartSchema), addToCart);
router
    .route("/")
    .post(validateBody(addToCartSchema), addToCart)

// Update item
// router.put("/:itemId", validateBody(updateCartSchema), updateCartItem);
router
    .route("/:itemId")
    .put(validateBody(updateCartSchema), updateCartItem)

// Clear entire cart
router.delete(
    "/clear",
    clearCart
);

// Remove item
router.delete("/:itemId", removeCartItem);


router
    .route("/sync")
    .post(validateBody(syncCartSchema), syncCart);


export default router;