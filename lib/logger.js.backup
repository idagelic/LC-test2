/**
 * Logger module for error handling and logging
 */

/**
 * Log error messages with timestamp
 * @param {string} message - Error message to log
 * @param {Error} error - Optional error object
 */
function logError(message, error = null) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`);
    if (error) {
        console.error(`[${timestamp}] Stack trace:`, error.stack);
    }
}

module.exports = {
    logError
};
