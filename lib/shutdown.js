/**
 * Shutdown module for graceful application termination
 */

const { logError } = require('./logger');

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
 * Setup process event handlers for graceful shutdown
 */
function setupShutdownHandlers() {
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
}

module.exports = {
    handleShutdown,
    setupShutdownHandlers
};
