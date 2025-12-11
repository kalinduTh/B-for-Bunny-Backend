/**
 * Game Controller
 * 
 * Handles game session management including creation, updates, and termination
 * Manages game scores and high score tracking
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import Parent from "../models/parentModel.js";

/**
 * Retrieve the current active game session for a child
 * @async
 * @function getCurrentGameSession
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.parentId - Parent's ID
 * @param {string} req.params.childId - Child's ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with current game session data or error
 */
export const getCurrentGameSession = async (req, res) => {
    try {
        const { parentId, childId } = req.params;
        const parent = await Parent.findById(parentId);
        if (!parent) {
            return res.status(404).json({ message: "No parent found" });
        }
        const child = parent.children.id(childId);
        if (!child) {
            return res.status(404).json({ message: "No child found" });
        }
        const currentGameSession = child.game;

        if (!currentGameSession.isActive) {
            return res.status(404).json({ message: "No active game session found" });
        }

        res.status(200).json(currentGameSession);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Start a new game session for a child
 * Automatically ends any existing active session and updates high score if needed
 * @async
 * @function createGameSession
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.parentId - Parent's ID
 * @param {string} req.params.childId - Child's ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response confirming session creation or error
 */
export const createGameSession = async (req, res) => {
    try {
        const { parentId, childId } = req.params;

        let msg = "";
        const parent = await Parent.findById(parentId);
        if (!parent) {
            return res.status(404).json({ message: "No parent found" });
        }
        const child = parent.children.id(childId);
        if (!child) {
            return res.status(404).json({ message: "No child found" });
        }

        // If there's an active session, end it and update high score if necessary
        if (child.game.isActive) {
            if (child.highScore >= child.game.score) {
                child.game.isActive = false;
            } else {
                child.highScore = child.game.score;
                child.game.isActive = false;
            }
            msg = "Current game session ended successfully & ";
        }

        // Initialize new game session
        child.game.gameLevel = 0;
        child.game.score = 0;
        child.game.startedAt = new Date();
        child.game.isActive = true;
        child.game.lastUpdated = new Date();
        await parent.save();
        res.status(201).json({ message: msg + "Game session started successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * End the current game session for a child
 * Updates high score if the current session score is higher
 * @async
 * @function endGameSession
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.parentId - Parent's ID
 * @param {string} req.params.childId - Child's ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response confirming session termination or error
 */
export const endGameSession = async (req, res) => {
    try {
        const { parentId, childId } = req.params;
        const parent = await Parent.findById(parentId);
        if (!parent) {
            return res.status(404).json({ message: "No parent found" });
        }
        const child = parent.children.id(childId);
        if (!child) {
            return res.status(404).json({ message: "No child found" });
        }
        if (!child.game.isActive) {
            return res.status(400).json({ message: "No active game session found" });
        }

        // Update high score if current session score is higher
        if (child.highScore < child.game.score) {
            child.highScore = child.game.score;
        }

        child.game.isActive = false;
        child.game.lastUpdated = new Date();
        await parent.save();
        res.status(200).json({ message: "Game session ended successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Update the current active game session
 * Updates game level, score, or other session data
 * @async
 * @function updateCurrentGame
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.parentId - Parent's ID
 * @param {string} req.params.childId - Child's ID
 * @param {Object} req.body - Updated game session data
 * @param {Object} res - Express response object
 * @returns {Object} JSON response confirming update or error
 */
export const updateCurrentGame = async (req, res) => {
    try {
        const { parentId, childId } = req.params;
        const gameUpdateData = req.body;

        const parent = await Parent.findById(parentId);
        if (!parent) {
            return res.status(404).json({ message: "No parent found" });
        }
        const child = parent.children.id(childId);
        if (!child) {
            return res.status(404).json({ message: "No child found" });
        }
        if (!child.game.isActive) {
            return res.status(400).json({ message: "No active game session found" });
        }

        Object.assign(child.game, gameUpdateData);
        child.game.lastUpdated = new Date();

        await parent.save();
        res.status(200).json({ message: "Game session updated successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}