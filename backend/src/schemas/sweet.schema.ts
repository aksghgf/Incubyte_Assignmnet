import { z } from 'zod';

export const createSweetSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required').max(100),
        category: z.string().min(1, 'Category is required').max(50),
        description: z.string().max(500).optional(),
        price: z.number().positive('Price must be positive'),
        quantity: z.number().int().min(0, 'Quantity cannot be negative').default(0),
        imageUrl: z.string().url('Invalid URL').optional(),
    }),
});

export const updateSweetSchema = z.object({
    body: z.object({
        name: z.string().min(1).max(100).optional(),
        category: z.string().min(1).max(50).optional(),
        description: z.string().max(500).optional(),
        price: z.number().positive().optional(),
        quantity: z.number().int().min(0).optional(),
        imageUrl: z.string().url().optional(),
    }),
    params: z.object({
        id: z.string().min(1, 'Sweet ID is required'),
    }),
});

export const searchSweetsSchema = z.object({
    query: z.object({
        search: z.string().optional(),
        category: z.string().optional(),
        minPrice: z.string().transform(Number).optional(),
        maxPrice: z.string().transform(Number).optional(),
    }),
});

export const purchaseSchema = z.object({
    body: z.object({
        quantity: z.number().int().positive('Quantity must be at least 1'),
    }),
    params: z.object({
        id: z.string().min(1, 'Sweet ID is required'),
    }),
});

export const restockSchema = z.object({
    body: z.object({
        quantity: z.number().int().positive('Quantity must be at least 1'),
    }),
    params: z.object({
        id: z.string().min(1, 'Sweet ID is required'),
    }),
});

export type CreateSweetInput = z.infer<typeof createSweetSchema>['body'];
export type UpdateSweetInput = z.infer<typeof updateSweetSchema>['body'];
export type SearchSweetsInput = z.infer<typeof searchSweetsSchema>['query'];
export type PurchaseInput = z.infer<typeof purchaseSchema>['body'];
export type RestockInput = z.infer<typeof restockSchema>['body'];
