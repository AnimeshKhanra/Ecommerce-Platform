import { Router } from 'express';
import { createCategory, getAllCategories } from '../controllers/category.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';

const router = Router();

router.route('/').get(getAllCategories);
router.route('/').post(authMiddleware, adminMiddleware, createCategory);

export default router;