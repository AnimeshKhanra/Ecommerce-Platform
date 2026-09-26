import express from 'express';

import { createCheckout } from '../controllers/checkout.controller';

import { authMiddleware } from '../middlewares/auth.middleware';

import { checkoutLimiter } from '../middlewares/rateLimit.middleware';

const router = express.Router();


router.post('/', checkoutLimiter, authMiddleware, createCheckout);

export default router;
