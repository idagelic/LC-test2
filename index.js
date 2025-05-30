#!/usr/bin/env node

/**
 * LC-test2 - A sample Node.js application
 * Main entry point for the application
 * Refactored for improved modularity, error handling, and maintainability
 */

const AppService = require('./src/utils/appService');
const Logger = require('./src/utils/logger');

/**
 * Main application entry point
 * Handles application startup and error management
 */
async function main() {
    try {
        await AppService.run();
    } catch (error) {
        Logger.error('Application startup failed', error);
        process.exit(1);
    }
}

// Start the application
main();
