import express from 'express';
import cors from 'cors';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.middleware.js';

import authRoutes from './routes/auth.route.js';
import storyRoutes from './routes/story.route.js';

async function createExpressApp() {
    const app = express();

    // CORS Configuration
    const origins = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
        : ['http://localhost:5173'];

    app.use(cors({
        origin: origins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Health check route
    app.get('/api/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    app.get('/', (req, res) => {
        res.json({ message: 'Indeed-Dacby Backend API is running' });
    });

    // API routes
    app.use('/api/auth', authRoutes);
    app.use('/api/stories', storyRoutes);

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
}

export default createExpressApp;
