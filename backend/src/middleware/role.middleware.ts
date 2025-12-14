import type { Request, Response, NextFunction } from 'express';
import type { Role } from '@prisma/client';


/**
 * Middleware to check if user has required role
 */
export const requireRole = (...allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized - Please login first',
            });
            return;
        }

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: 'Forbidden - You do not have permission to access this resource',
            });
            return;
        }

        next();
    };
};
