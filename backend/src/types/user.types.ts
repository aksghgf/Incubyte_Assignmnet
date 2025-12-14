import type { Role } from '@prisma/client';

export interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthResponse {
    user: UserResponse;
    token: string;
}
