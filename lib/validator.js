/**
 * Validator module for environment validation
 */

const { loadConfig } = require('./config');
const { logError, logDebug } = require('./logger');

/**
 * Validate application environment and prerequisites
 * @returns {boolean} - True if environment is valid
 */
function validateEnvironment() {
    try {
        const config = loadConfig();
        logDebug('Starting environment validation');
        
        // Check if console is available (if configured to check)
        if (config.validation.checkConsole) {
            if (typeof console === 'undefined') {
                throw new Error('Console object is not available');
            }
            logDebug('Console validation passed');
        }
        
        // Check if Date constructor is available (if configured to check)
        if (config.validation.checkDate) {
            if (typeof Date === 'undefined') {
                throw new Error('Date constructor is not available');
            }
            
            // Test basic Date functionality
            const testDate = new Date();
            if (isNaN(testDate.getTime())) {
                throw new Error('Date functionality is not working properly');
            }
            logDebug('Date validation passed');
        }
        
        // Additional strict mode validations
        if (config.validation.strictMode) {
            // Check Node.js version
            if (process.version) {
                const majorVersion = parseInt(process.version.slice(1).split('.')[0]);
                if (majorVersion < 12) {
                    throw new Error(`Node.js version ${process.version} is too old. Minimum required: 12.x`);
                }
                logDebug(`Node.js version validation passed: ${process.version}`);
            }
            
            // Check required globals
            const requiredGlobals = ['process', 'Buffer', 'global'];
            for (const globalVar of requiredGlobals) {
                if (typeof global[globalVar] === 'undefined') {
                    throw new Error(`Required global '${globalVar}' is not available`);
                }
            }
            logDebug('Strict mode validations passed');
        }
        
        logDebug('Environment validation completed successfully');
        return true;
    } catch (error) {
        logError('Environment validation failed', error);
        return false;
    }
}

module.exports = {
    validateEnvironment
};
