#!/usr/bin/env node

/**
 * LC-test2 - A sample Node.js application
 * Main entry point for the application
 */

// Import modules
const { logError } = require('./lib/logger');
const { displayWelcome, displayAppInfo, displayCurrentTime } = require('./lib/display');
const { validateEnvironment } = require('./lib/validator');
const { handleShutdown, setupShutdownHandlers } = require('./lib/shutdown');

/**
 * Main application entry point with comprehensive error handling
 * @returns {Promise<number>} - Exit code (0 for success, 1 for error)
 */
async function main() {
    let hasErrors = false;
    
    try {
        // Validate environment before proceeding
        if (!validateEnvironment()) {
            logError('Environment validation failed, cannot continue');
            return 1;
        }
        
        // Execute main application functions
        const welcomeResult = displayWelcome();
        const appInfoResult = displayAppInfo();
        const timeResult = displayCurrentTime();
        
        // Check if any function failed
        if (!welcomeResult || !appInfoResult || !timeResult) {
            hasErrors = true;
            logError('One or more application functions failed');
        }
        
        if (hasErrors) {
            console.log('Application completed with errors.');
            return 1;
        } else {
            console.log('Application completed successfully.');
            return 0;
        }
        
    } catch (error) {
        logError('Unexpected error in main application', error);
        return 1;
    }
}

// Setup shutdown handlers
setupShutdownHandlers();

// Run the main function and handle the result
(async () => {
    try {
        const exitCode = await main();
        handleShutdown(exitCode);
    } catch (error) {
        logError('Fatal error in application startup', error);
        handleShutdown(1);
    }
})();
