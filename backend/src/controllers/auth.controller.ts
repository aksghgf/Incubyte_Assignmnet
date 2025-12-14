import type { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { successResponse } from '../utils/response.util';

export class AuthController {
    /**
     * Register new user
     * POST /api/auth/register
     */
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await authService.register(req.body);
            res.status(201).json(successResponse(result, 'User registered successfully'));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Login user
     * POST /api/auth/login
     */
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await authService.login(req.body);
            res.json(successResponse(result, 'Login successful'));
        } catch (error) {
            next(error);
        }
    }
}

export const authController = new AuthController();
