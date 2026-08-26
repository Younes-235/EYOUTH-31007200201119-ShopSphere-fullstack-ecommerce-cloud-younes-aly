const axios = require('axios');

// Serverless Function URL on Vercel
const SERVERLESS_EMAIL_URL = process.env.SERVERLESS_EMAIL_URL || 'http://localhost:3000/api/send-welcome-email';

/**
 * Triggers the Vercel Serverless Function to dispatch a welcome email.
 * This runs the background email workload completely outside the main application.
 *
 * @param {string} to - Recipient email address
 * @param {string} name - Recipient user name
 */
const sendWelcomeEmail = async (to, name) => {
    try {
        console.log(`[Serverless Trigger] Forwarding welcome email workload for ${to} to Serverless Function: ${SERVERLESS_EMAIL_URL}`);
        
        const response = await axios.post(
            SERVERLESS_EMAIL_URL,
            { to, name },
            { timeout: 8000 }
        );

        console.log(`[Serverless Trigger] Response:`, response.data);
        return response.data;
    } catch (error) {
        console.error('[Serverless Trigger] Could not reach serverless function or execution failed:', error.message);
        // Non-blocking for user registration flow
    }
};

module.exports = sendWelcomeEmail;