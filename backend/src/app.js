import express from 'express';
import cors from 'cors';
import { getCorsOptions } from './config/constants.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.middleware.js';

import authRoutes from './routes/auth.route.js';
import storyRoutes from './routes/story.route.js';

async function createExpressApp() {
    const app = express();

    // Middleware
    app.use(cors(getCorsOptions()));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Health check route
    app.get('/api/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // API routes
    app.use('/api/auth', authRoutes);
    app.use('/api/stories', storyRoutes);

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
}

export default createExpressApp;
