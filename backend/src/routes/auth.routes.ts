import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validation.middleware';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
    '/register',
    validateRequest(registerSchema),
    authController.register.bind(authController)
);

/**
 * POST /api/auth/login
 * Login user
 */
router.post(
    '/login',
    validateRequest(loginSchema),
    authController.login.bind(authController)
);

export default router;
