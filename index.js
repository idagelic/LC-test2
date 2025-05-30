#!/usr/bin/env node

/**
 * LC-test2 - A sample Node.js application
 * Main entry point for the application
 * 
 * This application demonstrates basic Node.js functionality with proper
 * error handling, logging, and code organization following best practices.
 */

'use strict';

const process = require('process');
const util = require('util');

/**
 * Application configuration
 */
const CONFIG = {
    APP_NAME: 'LC-test2',
    VERSION: '1.0.0',
    LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};

/**
 * Simple logging utility
 */
class Logger {
    static info(message, ...args) {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`, ...args);
    }
    
    static error(message, ...args) {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, ...args);
    }
    
    static warn(message, ...args) {
        console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, ...args);
    }
}

/**
 * Application class to encapsulate functionality
 */
class Application {
    constructor(config) {
        this.config = config;
        this.startTime = new Date();
    }
    
    /**
     * Initialize the application
     */
    async initialize() {
        try {
            Logger.info(`Initializing ${this.config.APP_NAME} v${this.config.VERSION}`);
            // Add any initialization logic here
            return true;
        } catch (error) {
            Logger.error('Failed to initialize application:', error.message);
            throw error;
        }
    }
    
    /**
     * Run the main application logic
     */
    async run() {
        try {
            Logger.info(`Welcome to ${this.config.APP_NAME}!`);
            Logger.info('This is a sample Node.js application with improved structure.');
            Logger.info(`Application started at: ${this.startTime.toISOString()}`);
            Logger.info(`Current time: ${new Date().toISOString()}`);
            
            // Add main application logic here
            
            Logger.info('Application completed successfully');
        } catch (error) {
            Logger.error('Application error:', error.message);
            throw error;
        }
    }
    
    /**
     * Cleanup resources before exit
     */
    async cleanup() {
        Logger.info('Cleaning up resources...');
        // Add cleanup logic here
    }
}

/**
 * Main entry point with proper error handling
 */
async function main() {
    const app = new Application(CONFIG);
    
    // Handle process signals for graceful shutdown
    process.on('SIGINT', async () => {
        Logger.info('Received SIGINT, shutting down gracefully...');
        await app.cleanup();
        process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
        Logger.info('Received SIGTERM, shutting down gracefully...');
        await app.cleanup();
        process.exit(0);
    });
    
    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
        Logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
        process.exit(1);
    });
    
    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
        Logger.error('Uncaught Exception:', error);
        process.exit(1);
    });
    
    try {
        await app.initialize();
        await app.run();
    } catch (error) {
        Logger.error('Application failed:', error.message);
        process.exit(1);
    }
}

// Only run if this file is executed directly
if (require.main === module) {
    main().catch((error) => {
        Logger.error('Fatal error:', error);
        process.exit(1);
    });
}

// Export for testing purposes
module.exports = { Application, Logger, CONFIG };
