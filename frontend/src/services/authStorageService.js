const AUTH_TOKEN_KEY = 'token';
const AUTH_USER_KEY = 'user';

export const authStorageService = {
    getToken: () => localStorage.getItem(AUTH_TOKEN_KEY),

    setToken: (token) => {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    },

    clearToken: () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
    },

    getUser: () => {
        const storedUser = localStorage.getItem(AUTH_USER_KEY);

        if (!storedUser) {
            return null;
        }

        try {
            return JSON.parse(storedUser);
        } catch {
            localStorage.removeItem(AUTH_USER_KEY);
            return null;
        }
    },

    setUser: (user) => {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    },

    clearUser: () => {
        localStorage.removeItem(AUTH_USER_KEY);
    },

    setSession: ({ token, user }) => {
        authStorageService.setToken(token);
        authStorageService.setUser(user);
    },

    clearSession: () => {
        authStorageService.clearToken();
        authStorageService.clearUser();
    },
};
