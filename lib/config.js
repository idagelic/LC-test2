/**
 * Configuration module for application settings
 */

const fs = require('fs');
const path = require('path');

/**
 * Default configuration values
 */
const defaultConfig = {
    app: {
        name: 'LC-test2',
        version: '1.0.0',
        description: 'A sample Node.js application'
    },
    display: {
        welcomeMessage: 'Welcome to LC-test2!',
        showAppInfo: true,
        showCurrentTime: true,
        timeFormat: 'iso',
        successMessage: 'Application completed successfully.',
        errorMessage: 'Application completed with errors.'
    },
    logging: {
        level: 'error',
        timestampFormat: 'iso',
        showStackTrace: true
    },
    validation: {
        checkConsole: true,
        checkDate: true,
        strictMode: false
    },
    shutdown: {
        gracefulTimeout: 5000,
        showShutdownMessage: true,
        exitOnError: true
    }
};

/**
 * Load configuration from file or environment variables
 * @returns {Object} - Merged configuration object
 */
function loadConfig() {
    let config = { ...defaultConfig };
    
    const configPath = path.join(process.cwd(), 'config.json');
    if (fs.existsSync(configPath)) {
        try {
            const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            config = mergeConfig(config, fileConfig);
        } catch (error) {
            console.warn('Warning: Failed to load config.json, using defaults:', error.message);
        }
    }
    
    if (process.env.APP_NAME) config.app.name = process.env.APP_NAME;
    if (process.env.LOG_LEVEL) config.logging.level = process.env.LOG_LEVEL;
    if (process.env.TIME_FORMAT) config.display.timeFormat = process.env.TIME_FORMAT;
    if (process.env.WELCOME_MESSAGE) config.display.welcomeMessage = process.env.WELCOME_MESSAGE;
    
    return config;
}

/**
 * Deep merge configuration objects
 */
function mergeConfig(target, source) {
    const result = { ...target };
    
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = mergeConfig(result[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }
    
    return result;
}

module.exports = {
    loadConfig,
    defaultConfig
};
