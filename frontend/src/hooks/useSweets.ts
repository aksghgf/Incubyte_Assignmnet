import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sweetsApi } from '../services/api/sweets.api';
import type { SearchFilters, PurchaseData, RestockData } from '../types/sweet.types';

// Query keys
const QUERY_KEYS = {
    sweets: ['sweets'],
    sweetDetail: (id: string) => ['sweets', id],
    searchSweets: (filters: SearchFilters) => ['sweets', 'search', filters],
};

// Get all sweets
export const useSweets = () => {
    return useQuery({
        queryKey: QUERY_KEYS.sweets,
        queryFn: sweetsApi.getAll,
    });
};

// Search sweets
export const useSearchSweets = (filters: SearchFilters) => {
    return useQuery({
        queryKey: QUERY_KEYS.searchSweets(filters),
        queryFn: () => sweetsApi.search(filters),
        enabled: Object.keys(filters).length > 0,
    });
};

// Get single sweet
export const useSweet = (id: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.sweetDetail(id),
        queryFn: () => sweetsApi.getById(id),
        enabled: !!id,
    });
};

// Create sweet (admin)
export const useCreateSweet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sweetsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sweets });
        },
    });
};

// Update sweet (admin)
export const useUpdateSweet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            sweetsApi.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sweets });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sweetDetail(variables.id) });
        },
    });
};

// Delete sweet (admin)
export const useDeleteSweet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sweetsApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sweets });
        },
    });
};

// Purchase sweet
export const usePurchaseSweet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: PurchaseData }) =>
            sweetsApi.purchase(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sweets });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sweetDetail(variables.id) });
        },
    });
};

// Restock sweet (admin)
export const useRestockSweet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: RestockData }) =>
            sweetsApi.restock(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sweets });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.sweetDetail(variables.id) });
        },
    });
};
