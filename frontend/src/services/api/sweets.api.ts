import apiClient from './base.api';
import type {
    Sweet,
    CreateSweetData,
    UpdateSweetData,
    SearchFilters,
    PurchaseData,
    RestockData,
} from '../../types/sweet.types';

export const sweetsApi = {
    /**
     * Get all sweets
     * GET /sweets
     */
    getAll: async (): Promise<Sweet[]> => {
        const response = await apiClient.get<{ data: Sweet[] }>('/sweets');
        return response.data.data;
    },

    /**
     * Search sweets with filters
     * GET /sweets/search
     */
    search: async (filters: SearchFilters): Promise<Sweet[]> => {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());

        const response = await apiClient.get<{ data: Sweet[] }>(`/sweets/search?${params.toString()}`);
        return response.data.data;
    },

    /**
     * Get single sweet
     * GET /sweets/:id
     */
    getById: async (id: string): Promise<Sweet> => {
        const response = await apiClient.get<{ data: Sweet }>(`/sweets/${id}`);
        return response.data.data;
    },

    /**
     * Create new sweet (Admin only)
     * POST /sweets
     */
    create: async (data: CreateSweetData): Promise<Sweet> => {
        const response = await apiClient.post<{ data: Sweet }>('/sweets', data);
        return response.data.data;
    },

    /**
     * Update sweet (Admin only)
     * PUT /sweets/:id
     */
    update: async (id: string, data: UpdateSweetData): Promise<Sweet> => {
        const response = await apiClient.put<{ data: Sweet }>(`/sweets/${id}`, data);
        return response.data.data;
    },

    /**
     * Delete sweet (Admin only)
     * DELETE /sweets/:id
     */
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/sweets/${id}`);
    },

    /**
     * Purchase sweet
     * POST /sweets/:id/purchase
     */
    purchase: async (id: string, data: PurchaseData): Promise<Sweet> => {
        const response = await apiClient.post<{ data: Sweet }>(`/sweets/${id}/purchase`, data);
        return response.data.data;
    },

    /**
     * Restock sweet (Admin only)
     * POST /sweets/:id/restock
     */
    restock: async (id: string, data: RestockData): Promise<Sweet> => {
        const response = await apiClient.post<{ data: Sweet }>(`/sweets/${id}/restock`, data);
        return response.data.data;
    },
};
