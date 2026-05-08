import express from 'express';
import {
    getStories,
    getStoryById,
    toggleBookmark,
    triggerScrape
} from '../controllers/story.controller.js';
import { protect } from '../middleware/protect.middleware.js';

const router = express.Router();

router.get('/', getStories);
router.post('/scrape', triggerScrape);
router.get('/:id', getStoryById);
router.post('/:id/bookmark', protect, toggleBookmark);

export default router;