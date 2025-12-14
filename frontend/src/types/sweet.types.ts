export type SweetCategory = 'INDIAN' | 'WESTERN' | 'FUSION' | 'TRADITIONAL' | 'MODERN';

export interface Sweet {
    id: string;
    name: string;
    category: SweetCategory;
    description?: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSweetData {
    name: string;
    category: SweetCategory;
    description?: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

export interface UpdateSweetData {
    name?: string;
    category?: SweetCategory;
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

export interface PurchaseData {
    quantity: number;
}

export interface RestockData {
    quantity: number;
}
