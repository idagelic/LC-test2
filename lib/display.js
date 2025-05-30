/**
 * Display module for user interface functions
 */

const { loadConfig } = require('./config');
const { logError } = require('./logger');

/**
 * Display welcome message to the user
 */
function displayWelcome() {
    try {
        const config = loadConfig();
        if (config.display.welcomeMessage) {
            console.log(config.display.welcomeMessage);
        }
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
        const config = loadConfig();
        if (config.display.showAppInfo) {
            const message = config.app.description || 'This is a sample Node.js application.';
            console.log(message);
        }
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
        const config = loadConfig();
        if (!config.display.showCurrentTime) {
            return true;
        }
        
        const now = new Date();
        let currentTime;
        
        switch (config.display.timeFormat) {
            case 'locale':
                currentTime = now.toLocaleString();
                break;
            case 'timestamp':
                currentTime = now.getTime().toString();
                break;
            default: // 'iso'
                currentTime = now.toISOString();
        }
        
        console.log('Current time:', currentTime);
        return true;
    } catch (error) {
        logError('Failed to display current time', error);
        console.log('Current time: [Unable to retrieve timestamp]');
        return false;
    }
}

module.exports = {
    displayWelcome,
    displayAppInfo,
    displayCurrentTime
};
