// 404 Not Found handler
export const notFoundHandler = (req, res) => {
    res.status(404).json({ error: 'Route not found' });
};

// Global Error handler
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
        status: err.status || 500,
    });
};
