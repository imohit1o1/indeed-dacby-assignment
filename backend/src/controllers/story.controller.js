import { Story } from '../models/story.model.js';
import { User } from '../models/user.model.js';
import { scrapeHackerNews } from '../services/scraper.service.js';

// Fetch all stories (sorted by points descending)
export async function getStories(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const stories = await Story.find()
            .sort({ points: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Story.countDocuments();

        return res.json({
            stories,
            page,
            pages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        next(error);
    }
}

// Fetch a single story by ID
export async function getStoryById(req, res, next) {
    try {
        const story = await Story.findById(req.params.id);

        if (story) {
            return res.json(story);
        } else {
            const error = new Error('Story not found');
            error.status = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
}

// Toggle bookmark for a story
export async function toggleBookmark(req, res, next) {
    try {
        const storyId = req.params.id;
        const user = await User.findById(req.user._id);

        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        const isBookmarked = user.bookmarks.some(id => id.toString() === storyId);

        if (!isBookmarked) {
            user.bookmarks.push(storyId);
        } else {
            user.bookmarks = user.bookmarks.filter(id => id.toString() !== storyId);
        }

        await user.save();
        
        return res.json({ 
            message: isBookmarked ? 'Bookmark removed successfully' : 'Story bookmarked successfully',
            isBookmarked: !isBookmarked,
            bookmarks: user.bookmarks 
        });
    } catch (error) {
        next(error);
    }
}

// Manually trigger the scraper
export async function triggerScrape(req, res, next) {
    try {
        const stories = await scrapeHackerNews();
        return res.status(200).json({
            message: 'Scraping successful',
            count: stories.length,
            data: stories.map(story => ({
                title: story.title,
                url: story.url,
                points: story.points,
                author: story.author,
                postedAt: story.postedAt
            }))
        });
    } catch (error) {
        next(error);
    }
}