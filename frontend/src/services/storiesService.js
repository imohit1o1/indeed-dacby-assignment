import { api } from './api.js';
import { API_ROUTES } from '../constants/apiRoutes.js';

const throwApiError = (error) => {
    throw error.response?.data || error;
};

export const storiesService = {
    getStories: async (page = 1, limit = 10) => {
        try {
            const response = await api.get(API_ROUTES.stories.list, {
                params: { page, limit },
            });

            return response.data;
        } catch (error) {
            throwApiError(error);
        }
    },

    getStoryById: async (id) => {
        try {
            const response = await api.get(API_ROUTES.stories.detail(id));

            return response.data;
        } catch (error) {
            throwApiError(error);
        }
    },

    toggleBookmark: async (storyId) => {
        try {
            const response = await api.post(API_ROUTES.stories.bookmark(storyId));

            return response.data;
        } catch (error) {
            throwApiError(error);
        }
    },

    triggerScrape: async () => {
        try {
            const response = await api.post(API_ROUTES.stories.scrape);

            return response.data;
        } catch (error) {
            throwApiError(error);
        }
    },
};
