import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { storiesService } from '../services/storiesService.js';

const STORIES_PER_PAGE = 10;

export const useStories = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [scraping, setScraping] = useState(false);

    const { user, isAuthenticated, logout, setUser } = useAuth();
    const authenticated = isAuthenticated();

    const fetchStories = useCallback(async () => {
        try {
            setLoading(true);
            const data = await storiesService.getStories(page, STORIES_PER_PAGE);
            setStories(data.stories);
            setTotalPages(data.pages);
            setError('');
        } catch (err) {
            setError('Failed to fetch stories');
            console.error('Error fetching stories:', err);
        } finally {
            setLoading(false);
        }
    }, [page]);

    const handleToggleBookmark = async (storyId) => {
        if (!authenticated) {
            alert('Please login to bookmark stories');
            return;
        }

        try {
            const data = await storiesService.toggleBookmark(storyId);
            setUser({ ...user, bookmarks: data.bookmarks });
        } catch (err) {
            console.error('Error toggling bookmark:', err);
            alert('Failed to toggle bookmark');
        }
    };

    const handleScrape = async () => {
        try {
            setScraping(true);
            await storiesService.triggerScrape();
            alert('Scraping completed successfully!');
            await fetchStories();
        } catch (err) {
            console.error('Error triggering scrape:', err);
            alert('Failed to trigger scraping');
        } finally {
            setScraping(false);
        }
    };

    const handlePreviousPage = () => {
        setPage(currentPage => Math.max(1, currentPage - 1));
    };

    const handleNextPage = () => {
        setPage(currentPage => Math.min(totalPages, currentPage + 1));
    };

    return {
        stories,
        loading,
        error,
        page,
        totalPages,
        handlePreviousPage,
        handleNextPage,
        refreshStories: fetchStories,
        handleToggleBookmark,
        handleScrape,
        scraping,
        authenticated,
        user,
        logout,
    };
};
