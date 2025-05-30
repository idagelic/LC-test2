#!/usr/bin/env node

/**
 * LC-test2 - A sample Node.js application
 * Main entry point for the application
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

/**
 * Display welcome message to the user
 */
function displayWelcome() {
    try {
        console.log('Welcome to LC-test2!');
        return true;
    } catch (error) {
        logError('Failed to display welcome message', error);
        return false;
    }
}

/**
 * Display application information
 */
function displayAppInfo() {
    try {
        console.log('This is a sample Node.js application.');
        return true;
    } catch (error) {
        logError('Failed to display application information', error);
        return false;
    }
}

/**
 * Display current timestamp
 */
function displayCurrentTime() {
    try {
        const currentTime = new Date().toISOString();
        if (!currentTime) {
            throw new Error('Failed to generate timestamp');
        }
        console.log('Current time:', currentTime);
        return true;
    } catch (error) {
        logError('Failed to display current time', error);
        console.log('Current time: [Unable to retrieve timestamp]');
        return false;
    }
}

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

/**
 * Handle application shutdown gracefully
 * @param {number} exitCode - Exit code for the process
 */
function handleShutdown(exitCode = 0) {
    try {
        console.log('Application shutting down...');
        process.exit(exitCode);
    } catch (error) {
        logError('Error during shutdown', error);
        // Force exit if graceful shutdown fails
        process.exit(1);
    }
}

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

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logError('Uncaught exception occurred', error);
    handleShutdown(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logError(`Unhandled promise rejection at: ${promise}, reason: ${reason}`);
    handleShutdown(1);
});

// Handle SIGINT (Ctrl+C)
process.on('SIGINT', () => {
    console.log('\nReceived SIGINT, shutting down gracefully...');
    handleShutdown(0);
});

// Handle SIGTERM
process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    handleShutdown(0);
});

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
