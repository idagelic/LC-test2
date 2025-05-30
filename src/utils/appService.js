/**
 * Application Service
 * Contains the core business logic and application functionality
 */

const Logger = require('./logger');
const config = require('../config/app');

class AppService {
    /**
     * Initialize the application
     */
    static async initialize() {
        try {
            Logger.info('Initializing application...');
            Logger.info(`Starting ${config.app.name} v${config.app.version}`);
            Logger.info(config.app.description);
            return true;
        } catch (error) {
            Logger.error('Failed to initialize application', error);
            throw error;
        }
    }

    /**
     * Display welcome messages
     */
    static displayWelcome() {
        try {
            Logger.info(`Welcome to ${config.app.name}!`);
            Logger.info('This is a sample Node.js application.');
        } catch (error) {
            Logger.error('Failed to display welcome message', error);
            throw error;
        }
    }

    /**
     * Display current timestamp
     */
    static displayCurrentTime() {
        try {
            const currentTime = new Date().toISOString();
            Logger.info(`Current time: ${currentTime}`);
            return currentTime;
        } catch (error) {
            Logger.error('Failed to display current time', error);
            throw error;
        }
    }

    /**
     * Run the main application logic
     */
    static async run() {
        try {
            await this.initialize();
            this.displayWelcome();
            this.displayCurrentTime();
            Logger.info('Application completed successfully');
        } catch (error) {
            Logger.error('Application failed to run', error);
            process.exit(1);
        }
    }
}

module.exports = AppService;
