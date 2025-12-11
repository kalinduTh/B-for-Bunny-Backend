/**
 * Problem Model
 * 
 * Mongoose schema for educational math problems
 * Stores problem images, solutions, and answer choices
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import mongoose from "mongoose";

/**
 * Problem Schema
 * @typedef {Object} ProblemSchema
 * @property {string} img - Problem image URL
 * @property {string} solution - Correct answer (single character)
 * @property {Array<string>} answers - Array of possible answers (single characters)
 */
const problemSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true,
        maxLength: 1,
    },
    answers: [{
        type: String,
        maxLength: 1,
        required: true,
    }]
});

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;