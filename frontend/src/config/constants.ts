export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    ADMIN: '/admin',
} as const;

export const STORAGE_KEYS = {
    TOKEN: 'sweet_shop_token',
    USER: 'sweet_shop_user',
} as const;
