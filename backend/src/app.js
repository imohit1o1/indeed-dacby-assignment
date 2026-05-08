import express from 'express';
import cors from 'cors';
import { CORS_OPTIONS } from './config/constants.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

async function createExpressApp() {
    const app = express();

    // Middleware
    app.use(cors(CORS_OPTIONS));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Health check route
    app.get('/api/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // API routes
    // app.use('/api/auth', authRoutes);
    // app.use('/api/users', userRoutes);

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
}

export default createExpressApp;