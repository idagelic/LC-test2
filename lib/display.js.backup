/**
 * Display module for user interface functions
 */

const { logError } = require('./logger');

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

module.exports = {
    displayWelcome,
    displayAppInfo,
    displayCurrentTime
};
