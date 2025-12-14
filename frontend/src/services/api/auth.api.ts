import apiClient from './base.api';
import { STORAGE_KEYS } from '../../config/constants';
import type { LoginCredentials, RegisterData, AuthResponse } from '../../types/user.types';

export const authApi = {
    /**
     * Register a new user
     * POST /auth/register
     */
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await apiClient.post<{ data: AuthResponse }>('/auth/register', data);
        return response.data.data;
    },

    /**
     * Login user
     * POST /auth/login
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await apiClient.post<{ data: AuthResponse }>('/auth/login', credentials);
        return response.data.data;
    },

    /**
     * Logout user (client-side)
     */
    logout: () => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
    },
};

