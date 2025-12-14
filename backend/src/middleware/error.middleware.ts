import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { sendError } from '../utils/response.util';

export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return sendError(res, err.message, err.statusCode);
    }

    // Log unexpected errors
    console.error('Unexpected error:', err);

    return sendError(res, 'Internal server error', 500);
};
