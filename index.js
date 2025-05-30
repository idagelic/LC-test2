#!/usr/bin/env node

/**
 * LC-test2 - A sample Node.js application
 * Main entry point for the application
 */

/**
 * Display welcome message to the user
 */
function displayWelcome() {
    console.log('Welcome to LC-test2!');
}

/**
 * Display application information
 */
function displayAppInfo() {
    console.log('This is a sample Node.js application.');
}

/**
 * Display current timestamp
 */
function displayCurrentTime() {
    const currentTime = new Date().toISOString();
    console.log('Current time:', currentTime);
}

/**
 * Main application entry point
 */
function main() {
    displayWelcome();
    displayAppInfo();
    displayCurrentTime();
}

// Run the main function
main();
