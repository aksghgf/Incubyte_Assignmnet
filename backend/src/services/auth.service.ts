import { userRepository } from '../repositories/user.repository';
import { hashPassword, comparePassword } from '../utils/password.util';
import { generateToken } from '../utils/jwt.util';
import { AppError } from '../utils/errors';
import type { Role } from '@prisma/client';

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: Role;
    };
    token: string;
}

export class AuthService {
    /**
     * Register a new user
     */
    async register(data: RegisterData): Promise<AuthResponse> {
        // Check if user already exists
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError(400, 'User with this email already exists');
        }

        // Hash password
        const hashedPassword = await hashPassword(data.password);

        // Create user
        const user = await userRepository.create({
            email: data.email,
            password: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
        });

        // Generate JWT token
        const token = generateToken({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
            token,
        };
    }

    /**
     * Login user
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        // Find user by email
        const user = await userRepository.findByEmail(credentials.email);
        if (!user) {
            throw new AppError(401, 'Invalid email or password');
        }

        // Verify password
        const isPasswordValid = await comparePassword(credentials.password, user.password);
        if (!isPasswordValid) {
            throw new AppError(401, 'Invalid email or password');
        }

        // Generate JWT token
        const token = generateToken({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
            token,
        };
    }

    /**
     * Verify user exists
     */
    async verifyUser(userId: string): Promise<boolean> {
        const user = await userRepository.findById(userId);
        return !!user;
    }
}

export const authService = new AuthService();
