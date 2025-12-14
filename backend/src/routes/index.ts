import { Router } from 'express';
import authRoutes from './auth.routes';
import sweetsRoutes from './sweets.routes';

const router = Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/sweets', sweetsRoutes);

export default router;
