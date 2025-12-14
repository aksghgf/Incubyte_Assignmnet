import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, STORAGE_KEYS } from '../../config/constants';
import type { ApiError } from '../../types/api.types';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
        if (error.response) {
            // Handle 401 - Unauthorized (token expired or invalid)
            if (error.response.status === 401) {
                localStorage.removeItem(STORAGE_KEYS.TOKEN);
                localStorage.removeItem(STORAGE_KEYS.USER);
                window.location.href = '/login';
            }

            // Create standardized error
            const apiError: ApiError = {
                message: error.response.data?.message || 'An error occurred',
                statusCode: error.response.status,
                errors: error.response.data?.errors,
            };
            return Promise.reject(apiError);
        }

        // Network error
        return Promise.reject({
            message: 'Network error. Please check your connection.',
            statusCode: 0,
        });
    }
);

export default apiClient;
