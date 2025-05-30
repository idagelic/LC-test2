#!/usr/bin/env node

/**
 * LC-test2 - A sample Node.js application
 * Main entry point for the application
 */

/**
 * Displays welcome messages to the user
 */
function displayWelcomeMessages() {
    console.log('Welcome to LC-test2!');
    console.log('This is a sample Node.js application.');
}

/**
 * Gets the current timestamp in ISO format
 * @returns {string} Current timestamp in ISO format
 */
function getCurrentTimestamp() {
    return new Date().toISOString();
}

/**
 * Displays the current timestamp
 */
function displayCurrentTime() {
    const timestamp = getCurrentTimestamp();
    console.log('Current time:', timestamp);
}

/**
 * Initializes and runs the application
 */
function initializeApplication() {
    displayWelcomeMessages();
    displayCurrentTime();
}

/**
 * Main entry point for the application
 */
function main() {
    try {
        initializeApplication();
    } catch (error) {
        console.error('Application failed to start:', error.message);
        process.exit(1);
    }
}

// Run the main function
main();
