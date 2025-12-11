/**
 * Child Model
 * 
 * Mongoose schema for child profiles (embedded in Parent documents)
 * Includes game session tracking and high score management
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import mongoose from "mongoose";
import { game } from "./gameModel.js";

/**
 * Child Schema (Subdocument)
 * @typedef {Object} ChildSchema
 * @property {string} name - Child's name
 * @property {Date} DOB - Child's date of birth
 * @property {string} gender - Child's gender (Male/Female)
 * @property {string} image - Avatar image URL from DiceBear API
 * @property {number} highScore - Highest score achieved (default: 0)
 * @property {Game} game - Current game session data
 */
export const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    highScore: {
        type: Number,
        required: true,
        default: 0
    },
    game: {
        type: game,
        required: true,
        default: () => ({})
    }

});