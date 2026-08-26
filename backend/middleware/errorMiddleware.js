/**
 * Structured Error Handling Middleware for ShopSphere Backend (Task 4.2)
 * Emits JSON-structured error log entries carrying timestamp and ERROR severity level.
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);

    const errorLog = {
        timestamp: new Date().toISOString(),
        level: 'ERROR',
        type: 'SYSTEM_ERROR',
        method: req.method,
        url: req.originalUrl || req.url,
        statusCode: statusCode,
        message: err.message || 'An unexpected server error occurred.',
        errorName: err.name || 'Error',
        errorCode: err.code || null,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    };

    console.error(JSON.stringify(errorLog));

    if (err.code && err.code.startsWith('P2')) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: "Record to update or delete does not exist." });
        }
        return res.status(400).json({ error: `Database error code: ${err.code}` });
    }

    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(el => el.message);
        return res.status(400).json({ error: `Validation failed: ${messages.join(', ')}` });
    }
    if (err.name === 'CastError') {
        return res.status(400).json({ error: `Invalid database ID format for field: ${err.path}` });
    }

    res.status(statusCode).json({
        error: err.message || "An unexpected server error occurred."
    });
};

module.exports = errorHandler;