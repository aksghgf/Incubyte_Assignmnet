import { sweetRepository, type CreateSweetData, type UpdateSweetData, type SearchFilters } from '../repositories/sweet.repository';
import type { Sweet } from '@prisma/client';
import { NotFoundError } from '../utils/errors';

export interface PurchaseData {
    quantity: number;
}

export interface RestockData {
    quantity: number;
}

export class SweetsService {
    /**
     * Get all sweets
     */
    async getAll(): Promise<Sweet[]> {
        return sweetRepository.findAll();
    }

    /**
     * Search sweets with filters
     */
    async search(filters: SearchFilters): Promise<Sweet[]> {
        return sweetRepository.search(filters);
    }

    /**
     * Get single sweet by ID
     */
    async getById(id: string): Promise<Sweet> {
        const sweet = await sweetRepository.findById(id);
        if (!sweet) {
            throw new NotFoundError('Sweet not found');
        }
        return sweet;
    }

    /**
     * Create new sweet (admin only)
     */
    async create(data: CreateSweetData): Promise<Sweet> {
        // Validate price
        if (data.price <= 0) {
            throw new Error('Price must be greater than 0');
        }

        // Validate quantity
        if (data.quantity < 0) {
            throw new Error('Quantity cannot be negative');
        }

        return sweetRepository.create(data);
    }

    /**
     * Update sweet (admin only)
     */
    async update(id: string, data: UpdateSweetData): Promise<Sweet> {
        // Check if sweet exists
        const sweet = await sweetRepository.findById(id);
        if (!sweet) {
            throw new NotFoundError('Sweet not found');
        }

        // Validate price if provided
        if (data.price !== undefined && data.price <= 0) {
            throw new Error('Price must be greater than 0');
        }

        // Validate quantity if provided
        if (data.quantity !== undefined && data.quantity < 0) {
            throw new Error('Quantity cannot be negative');
        }

        return sweetRepository.update(id, data);
    }

    /**
     * Delete sweet (admin only)
     */
    async delete(id: string): Promise<void> {
        // Check if sweet exists
        const sweet = await sweetRepository.findById(id);
        if (!sweet) {
            throw new NotFoundError('Sweet not found');
        }

        await sweetRepository.delete(id);
    }

    /**
     * Purchase sweet (decrease quantity)
     */
    async purchase(id: string, purchaseData: PurchaseData): Promise<Sweet> {
        // Get sweet
        const sweet = await sweetRepository.findById(id);
        if (!sweet) {
            throw new NotFoundError('Sweet not found');
        }

        // Validate quantity
        if (purchaseData.quantity <= 0) {
            throw new Error('Purchase quantity must be greater than 0');
        }

        // Check if enough stock
        if (sweet.quantity < purchaseData.quantity) {
            throw new Error(`Insufficient stock. Only ${sweet.quantity} available`);
        }

        // Update quantity
        const newQuantity = sweet.quantity - purchaseData.quantity;
        return sweetRepository.updateQuantity(id, newQuantity);
    }

    /**
     * Restock sweet (increase quantity) - admin only
     */
    async restock(id: string, restockData: RestockData): Promise<Sweet> {
        // Get sweet
        const sweet = await sweetRepository.findById(id);
        if (!sweet) {
            throw new NotFoundError('Sweet not found');
        }

        // Validate quantity
        if (restockData.quantity <= 0) {
            throw new Error('Restock quantity must be greater than 0');
        }

        // Update quantity
        const newQuantity = sweet.quantity + restockData.quantity;
        return sweetRepository.updateQuantity(id, newQuantity);
    }
}

export const sweetsService = new SweetsService();
