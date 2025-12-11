/**
 * Problem Controller
 * 
 * Manages educational problem sets for the game
 * Handles CRUD operations for math problems
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import Problem from "../models/problemModel.js";

/**
 * Add a new problem to the database
 * @async
 * @function addProblem
 * @param {Object} req - Express request object
 * @param {Object} req.body - Problem data
 * @param {string} req.body.img - Problem image URL
 * @param {string} req.body.solution - Correct answer (single character)
 * @param {Array<string>} req.body.answers - Array of possible answers
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with created problem or error
 */
export const addProblem = async (req, res) => {
    try {
        const newProblem = new Problem(req.body);
        if (!newProblem) {
            return res.status(400).json({ message: "Invalid problem data" });
        }
        await newProblem.save();
        res.status(201).json(newProblem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Retrieve a random set of 10 problems
 * @async
 * @function getProblemSet
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with array of 10 problems or error
 */
export const getProblemSet = async (req, res) => {
    try {
        const problemSet = await Problem.find().limit(10);
        res.status(200).json(problemSet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Delete a problem by ID
 * @async
 * @function deleteProblem
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.id - Problem ID to delete
 * @param {Object} res - Express response object
 * @returns {Object} JSON response confirming deletion or error
 */
export const deleteProblem = async (req, res) => {
    try {
        const problem = await Problem.findByIdAndDelete(req.body.id);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        res.status(200).json({ message: "Problem deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}