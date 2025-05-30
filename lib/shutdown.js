/**
 * Shutdown module for graceful application termination
 */

const { loadConfig } = require('./config');
const { logError, logInfo } = require('./logger');

/**
 * Handle application shutdown gracefully
 * @param {number} exitCode - Exit code for the process
 */
function handleShutdown(exitCode = 0) {
    try {
        const config = loadConfig();
        
        if (config.shutdown.showShutdownMessage) {
            console.log('Application shutting down...');
        }
        
        logInfo(`Application shutdown initiated with exit code: ${exitCode}`);
        
        // Allow some time for cleanup if configured
        if (config.shutdown.gracefulTimeout > 0) {
            setTimeout(() => {
                process.exit(exitCode);
            }, Math.min(config.shutdown.gracefulTimeout, 10000)); // Max 10 seconds
        } else {
            process.exit(exitCode);
        }
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
    const config = loadConfig();
    
    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
        logError('Uncaught exception occurred', error);
        if (config.shutdown.exitOnError) {
            handleShutdown(1);
        }
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
        logError(`Unhandled promise rejection at: ${promise}, reason: ${reason}`);
        if (config.shutdown.exitOnError) {
            handleShutdown(1);
        }
    });

    // Handle SIGINT (Ctrl+C)
    process.on('SIGINT', () => {
        if (config.shutdown.showShutdownMessage) {
            console.log('\nReceived SIGINT, shutting down gracefully...');
        }
        logInfo('Received SIGINT signal');
        handleShutdown(0);
    });

    // Handle SIGTERM
    process.on('SIGTERM', () => {
        if (config.shutdown.showShutdownMessage) {
            console.log('Received SIGTERM, shutting down gracefully...');
        }
        logInfo('Received SIGTERM signal');
        handleShutdown(0);
    });
    
    logInfo('Shutdown handlers configured');
}

module.exports = {
    handleShutdown,
    setupShutdownHandlers
};
