/**
 * Environment Configuration
 * 
 * Centralized environment variables configuration for the application
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import "dotenv/config"

/**
 * Environment variables object
 * @constant {Object} ENV
 * @property {number} PORT - Server port number (default: 4001)
 * @property {string} DATABASE_URL - MongoDB connection string
 * @property {string} NODE_ENV - Node environment (development/production)
 * @property {string} JWT_SECRET - Secret key for JWT token generation
 */
export const ENV = {
    PORT: process.env.PORT || 4001,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
}