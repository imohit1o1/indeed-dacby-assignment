import { useState } from 'react';
import { authService } from '../services/authService.js';
import { authStorageService } from '../services/authStorageService.js';

const getAuthErrorMessage = (error, fallbackMessage) => {
    return error.response?.data?.error?.message || fallbackMessage;
};

export const useAuthProviderValue = () => {
    const [user, setUserState] = useState(authStorageService.getUser());
    const [token, setToken] = useState(authStorageService.getToken());
    const loading = false;

    const saveSession = (sessionToken, sessionUser) => {
        setToken(sessionToken);
        setUserState(sessionUser);
        authStorageService.setSession({
            token: sessionToken,
            user: sessionUser,
        });
    };

    const setUser = (nextUser) => {
        setUserState(nextUser);

        if (nextUser) {
            authStorageService.setUser(nextUser);
        } else {
            authStorageService.clearUser();
        }
    };

    const login = async (username, password) => {
        try {
            const { token: newToken, user: userData } = await authService.login(username, password);
            saveSession(newToken, userData);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: getAuthErrorMessage(error, 'Login failed'),
            };
        }
    };

    const register = async (username, password) => {
        try {
            const { token: newToken, user: userData } = await authService.register(username, password);
            saveSession(newToken, userData);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: getAuthErrorMessage(error, 'Registration failed'),
            };
        }
    };

    const logout = () => {
        setUserState(null);
        setToken(null);
        authStorageService.clearSession();
    };

    const isAuthenticated = () => !!token;

    return {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
        setUser,
    };
};
