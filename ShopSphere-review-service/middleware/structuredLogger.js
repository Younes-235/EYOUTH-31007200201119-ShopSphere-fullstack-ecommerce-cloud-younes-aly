/**
 * Structured Logging Middleware for ShopSphere Review Microservice (Task 4.2)
 * Emits JSON-structured request log entries carrying timestamp, severity level, latency, and status code.
 */
const structuredLogger = (req, res, next) => {
    const startTime = process.hrtime();

    res.on('finish', () => {
        const diff = process.hrtime(startTime);
        const responseTimeMs = Math.round((diff[0] * 1e3 + diff[1] * 1e-6) * 100) / 100;

        let level = 'INFO';
        if (res.statusCode >= 500) {
            level = 'ERROR';
        } else if (res.statusCode >= 400) {
            level = 'WARN';
        }

        const logEntry = {
            timestamp: new Date().toISOString(),
            level: level,
            type: 'HTTP_REQUEST',
            service: 'review-service',
            method: req.method,
            url: req.originalUrl || req.url,
            statusCode: res.statusCode,
            responseTimeMs: responseTimeMs,
            ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
        };

        const logMessage = JSON.stringify(logEntry);

        if (level === 'ERROR') {
            console.error(logMessage);
        } else if (level === 'WARN') {
            console.warn(logMessage);
        } else {
            console.log(logMessage);
        }
    });

    next();
};

module.exports = structuredLogger;
