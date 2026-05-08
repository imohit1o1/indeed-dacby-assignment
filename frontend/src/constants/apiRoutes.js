export const API_ROUTES = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
    },
    stories: {
        list: '/stories',
        detail: (id) => `/stories/${id}`,
        bookmark: (storyId) => `/stories/${storyId}/bookmark`,
        scrape: '/stories/scrape',
    },
};
