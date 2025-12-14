import { prisma } from '../config/database';
import type { User, Role } from '@prisma/client';

export interface CreateUserData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: Role;
}

export type UserWithoutPassword = Omit<User, 'password'>;

export class UserRepository {
    /**
     * Find user by email
     */
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    /**
     * Find user by ID
     */
    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    /**
     * Create new user
     */
    async create(data: CreateUserData): Promise<User> {
        return prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role || 'USER',
            },
        });
    }

    /**
     * Get all users (admin only)
     */
    async findAll(): Promise<UserWithoutPassword[]> {
        return prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                password: false, // Don't return password
            },
        });
    }
}

export const userRepository = new UserRepository();
