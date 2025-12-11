/**
 * Game Model
 * 
 * Mongoose schema for game session tracking (embedded in Child documents)
 * Tracks current game state, level, score, and timestamps
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import mongoose from "mongoose";

/**
 * Game Session Schema (Subdocument)
 * @typedef {Object} GameSchema
 * @property {number} gameLevel - Current game level (default: 0)
 * @property {number} score - Current session score (default: 0)
 * @property {boolean} isActive - Whether game session is active (default: false)
 * @property {Date} startedAt - Session start timestamp
 * @property {Date} lastUpdated - Last update timestamp
 */
export const game = new mongoose.Schema({
    gameLevel: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: false
    },
    startedAt: {
        type: Date,
        default: null
    },
    lastUpdated: {
        type: Date,
        default: null
    },
})