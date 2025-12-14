import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import type { Role } from '@prisma/client';

export interface JwtPayload {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
}

export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn as string,
    } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, config.jwtSecret) as JwtPayload;
    } catch (error) {
        throw new Error('Invalid token');
    }
};
