export interface Sweet {
    id: string;
    name: string;
    category: string;
    description?: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SearchFilters {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}
