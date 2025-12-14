import { prisma } from '../config/database';
import type { Sweet } from '@prisma/client';

export interface CreateSweetData {
    name: string;
    category: string;
    description?: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

export interface UpdateSweetData {
    name?: string;
    category?: string;
    description?: string;
    price?: number;
    quantity?: number;
    imageUrl?: string;
}

export interface SearchFilters {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}

export class SweetRepository {
    /**
     * Find all sweets
     */
    async findAll(): Promise<Sweet[]> {
        return prisma.sweet.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Search sweets with filters
     */
    async search(filters: SearchFilters): Promise<Sweet[]> {
        const where: any = {};

        if (filters.search) {
            where.OR = [
                { name: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
            ];
        }

        if (filters.category) {
            where.category = filters.category;
        }

        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            where.price = {};
            if (filters.minPrice !== undefined) {
                where.price.gte = filters.minPrice;
            }
            if (filters.maxPrice !== undefined) {
                where.price.lte = filters.maxPrice;
            }
        }

        return prisma.sweet.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Find sweet by ID
     */
    async findById(id: string): Promise<Sweet | null> {
        return prisma.sweet.findUnique({
            where: { id },
        });
    }

    /**
     * Create new sweet
     */
    async create(data: CreateSweetData): Promise<Sweet> {
        return prisma.sweet.create({
            data,
        });
    }

    /**
     * Update sweet
     */
    async update(id: string, data: UpdateSweetData): Promise<Sweet> {
        return prisma.sweet.update({
            where: { id },
            data,
        });
    }

    /**
     * Delete sweet
     */
    async delete(id: string): Promise<Sweet> {
        return prisma.sweet.delete({
            where: { id },
        });
    }

    /**
     * Update quantity (for purchase/restock)
     */
    async updateQuantity(id: string, newQuantity: number): Promise<Sweet> {
        return prisma.sweet.update({
            where: { id },
            data: { quantity: newQuantity },
        });
    }
}

export const sweetRepository = new SweetRepository();
