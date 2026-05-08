import dotenv from 'dotenv';
import createExpressApp from './app.js';
import connectDB from './config/db.js';

dotenv.config("../.env");

async function main() {
    try {
        // Connect to MongoDB
        await connectDB(process.env.MONGODB_URI);

        // Create Express app
        const app = await createExpressApp();

        // Start server
        const PORT = process.env.PORT || 8000;
        const server = app.listen(PORT, () => {
            console.log(`✓ Server running on http://localhost:${PORT}`);
            console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('SIGTERM received, shutting down gracefully...');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

        process.on('SIGINT', () => {
            console.log('SIGINT received, shutting down gracefully...');
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });
    } catch (error) {
        console.error('✗ Failed to start server:', error.message);
        process.exit(1);
    }
}

main();