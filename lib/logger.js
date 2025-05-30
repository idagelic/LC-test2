/**
 * Logger module for error handling and logging
 */

const { loadConfig } = require('./config');

/**
 * Log error messages with timestamp
 * @param {string} message - Error message to log
 * @param {Error} error - Optional error object
 */
function logError(message, error = null) {
    const config = loadConfig();
    
    // Check if we should log based on level
    if (config.logging.level === 'none') {
        return;
    }
    
    let timestamp;
    const now = new Date();
    
    switch (config.logging.timestampFormat) {
        case 'locale':
            timestamp = now.toLocaleString();
            break;
        case 'timestamp':
            timestamp = now.getTime().toString();
            break;
        default: // 'iso'
            timestamp = now.toISOString();
    }
    
    console.error(`[${timestamp}] ERROR: ${message}`);
    
    if (error && config.logging.showStackTrace) {
        console.error(`[${timestamp}] Stack trace:`, error.stack);
    }
}

/**
 * Log info messages (if logging level allows)
 * @param {string} message - Info message to log
 */
function logInfo(message) {
    const config = loadConfig();
    
    if (['debug', 'info'].includes(config.logging.level)) {
        let timestamp;
        const now = new Date();
        
        switch (config.logging.timestampFormat) {
            case 'locale':
                timestamp = now.toLocaleString();
                break;
            case 'timestamp':
                timestamp = now.getTime().toString();
                break;
            default: // 'iso'
                timestamp = now.toISOString();
        }
        
        console.log(`[${timestamp}] INFO: ${message}`);
    }
}

/**
 * Log debug messages (if logging level allows)
 * @param {string} message - Debug message to log
 */
function logDebug(message) {
    const config = loadConfig();
    
    if (config.logging.level === 'debug') {
        let timestamp;
        const now = new Date();
        
        switch (config.logging.timestampFormat) {
            case 'locale':
                timestamp = now.toLocaleString();
                break;
            case 'timestamp':
                timestamp = now.getTime().toString();
                break;
            default: // 'iso'
                timestamp = now.toISOString();
        }
        
        console.log(`[${timestamp}] DEBUG: ${message}`);
    }
}

module.exports = {
    logError,
    logInfo,
    logDebug
};
