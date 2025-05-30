/**
 * Validator module for environment validation
 */

const { logError } = require('./logger');

/**
 * Validate application environment and prerequisites
 * @returns {boolean} - True if environment is valid
 */
function validateEnvironment() {
    try {
        // Check if console is available
        if (typeof console === 'undefined') {
            throw new Error('Console object is not available');
        }
        
        // Check if Date constructor is available
        if (typeof Date === 'undefined') {
            throw new Error('Date constructor is not available');
        }
        
        // Test basic Date functionality
        const testDate = new Date();
        if (isNaN(testDate.getTime())) {
            throw new Error('Date functionality is not working properly');
        }
        
        return true;
    } catch (error) {
        logError('Environment validation failed', error);
        return false;
    }
}

module.exports = {
    validateEnvironment
};
