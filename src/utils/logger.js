/**
 * Logger Utility
 * Provides centralized logging functionality with error handling
 */

class Logger {
    /**
     * Log an informational message
     * @param {string} message - The message to log
     */
    static info(message) {
        try {
            console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
        } catch (error) {
            console.error('Failed to log info message:', error.message);
        }
    }

    /**
     * Log an error message
     * @param {string} message - The error message to log
     * @param {Error} error - Optional error object
     */
    static error(message, error = null) {
        try {
            const errorDetails = error ? ` - ${error.message}` : '';
            console.error(`[ERROR] ${new Date().toISOString()}: ${message}${errorDetails}`);
        } catch (logError) {
            console.error('Failed to log error message:', logError.message);
        }
    }

    /**
     * Log a warning message
     * @param {string} message - The warning message to log
     */
    static warn(message) {
        try {
            console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
        } catch (error) {
            console.error('Failed to log warning message:', error.message);
        }
    }
}

module.exports = Logger;
