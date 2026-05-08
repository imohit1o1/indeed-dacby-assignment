import { api } from './api.js';
import { API_ROUTES } from '../constants/apiRoutes.js';

export const authService = {
    login: async (username, password) => {
        const response = await api.post(API_ROUTES.auth.login, {
            username,
            password,
        });

        return response.data;
    },

    register: async (username, password) => {
        const response = await api.post(API_ROUTES.auth.register, {
            username,
            password,
        });

        return response.data;
    },
};
