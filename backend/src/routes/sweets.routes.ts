import { Router } from 'express';
import { sweetsController } from '../controllers/sweets.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { createSweetSchema, updateSweetSchema, purchaseSchema, restockSchema } from '../schemas/sweet.schema';

const router = Router();

/**
 * GET /api/sweets/search
 * Search sweets with filters (public)
 */
router.get('/search', sweetsController.search.bind(sweetsController));

/**
 * GET /api/sweets
 * Get all sweets (public)
 */
router.get('/', sweetsController.getAll.bind(sweetsController));

/**
 * GET /api/sweets/:id
 * Get single sweet (public)
 */
router.get('/:id', sweetsController.getById.bind(sweetsController));

/**
 * POST /api/sweets
 * Create new sweet (admin only)
 */
router.post(
    '/',
    authenticate,
    requireRole('ADMIN'),
    validateRequest(createSweetSchema),
    sweetsController.create.bind(sweetsController)
);

/**
 * PUT /api/sweets/:id
 * Update sweet (admin only)
 */
router.put(
    '/:id',
    authenticate,
    requireRole('ADMIN'),
    validateRequest(updateSweetSchema),
    sweetsController.update.bind(sweetsController)
);

/**
 * DELETE /api/sweets/:id
 * Delete sweet (admin only)
 */
router.delete(
    '/:id',
    authenticate,
    requireRole('ADMIN'),
    sweetsController.delete.bind(sweetsController)
);

/**
 * POST /api/sweets/:id/purchase
 * Purchase sweet (authenticated users)
 */
router.post(
    '/:id/purchase',
    authenticate,
    validateRequest(purchaseSchema),
    sweetsController.purchase.bind(sweetsController)
);

/**
 * POST /api/sweets/:id/restock
 * Restock sweet (admin only)
 */
router.post(
    '/:id/restock',
    authenticate,
    requireRole('ADMIN'),
    validateRequest(restockSchema),
    sweetsController.restock.bind(sweetsController)
);

export default router;
