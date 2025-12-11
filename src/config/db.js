/**
 * Database Configuration
 * 
 * MongoDB connection setup and configuration
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import mongoose from "mongoose";

/**
 * Establishes connection to MongoDB database
 * @async
 * @function dbConnect
 * @returns {Promise<void>}
 * @throws {Error} If database connection fails
 */
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
        });
        // Database connection logging is intentionally kept for deployment monitoring
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default dbConnect;
