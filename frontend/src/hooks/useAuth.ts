import { useState, useEffect } from 'react';
import { authApi } from '../services/api/auth.api';
import { STORAGE_KEYS } from '../config/constants';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

        if (storedToken && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setToken(storedToken);
                setIsAuthenticated(true);
            } catch (error) {
                localStorage.removeItem(STORAGE_KEYS.TOKEN);
                localStorage.removeItem(STORAGE_KEYS.USER);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authApi.login({ email, password });
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
        setUser(response.user);
        setToken(response.token);
        setIsAuthenticated(true);
        return response;
    };

    const register = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
        const response = await authApi.register(data);
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
        setUser(response.user);
        setToken(response.token);
        setIsAuthenticated(true);
        return response;
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
    };

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
    };
};

