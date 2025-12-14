import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { BadRequestError } from '../utils/errors';

export const validate = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = error.errors.map((err) => ({
                    path: err.path.join('.'),
                    message: err.message,
                }));
                return next(
                    new BadRequestError(
                        `Validation failed: ${formattedErrors.map((e) => e.message).join(', ')}`
                    )
                );
            }
            next(error);
        }
    };
};

// Alias for backward compatibility
export const validateRequest = validate;

