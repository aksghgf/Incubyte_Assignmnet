import type { Request, Response, NextFunction } from 'express';
import { sweetsService } from '../services/sweets.service';
import { successResponse } from '../utils/response.util';

export class SweetsController {
    /**
     * Get all sweets
     * GET /api/sweets
     */
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const sweets = await sweetsService.getAll();
            res.json(successResponse(sweets));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Search sweets with filters
     * GET /api/sweets/search
     */
    async search(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { search, category, minPrice, maxPrice } = req.query;

            const filters = {
                search: search as string,
                category: category as string,
                minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
                maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
            };

            const sweets = await sweetsService.search(filters);
            res.json(successResponse(sweets));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get single sweet
     * GET /api/sweets/:id
     */
    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const sweet = await sweetsService.getById(req.params.id);
            res.json(successResponse(sweet));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Create new sweet (admin only)
     * POST /api/sweets
     */
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const sweet = await sweetsService.create(req.body);
            res.status(201).json(successResponse(sweet, 'Sweet created successfully'));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update sweet (admin only)
     * PUT /api/sweets/:id
     */
    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const sweet = await sweetsService.update(req.params.id, req.body);
            res.json(successResponse(sweet, 'Sweet updated successfully'));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Delete sweet (admin only)
     * DELETE /api/sweets/:id
     */
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await sweetsService.delete(req.params.id);
            res.json(successResponse(null, 'Sweet deleted successfully'));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Purchase sweet
     * POST /api/sweets/:id/purchase
     */
    async purchase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const sweet = await sweetsService.purchase(req.params.id, req.body);
            res.json(successResponse(sweet, 'Purchase successful'));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Restock sweet (admin only)
     * POST /api/sweets/:id/restock
     */
    async restock(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const sweet = await sweetsService.restock(req.params.id, req.body);
            res.json(successResponse(sweet, 'Restock successful'));
        } catch (error) {
            next(error);
        }
    }
}

export const sweetsController = new SweetsController();
