/**
 * Parent Controller
 * 
 * Handles all parent-related operations including authentication and profile management
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import Parent from "../models/parentModel.js";
import { ENV } from "../config/env.js";

/**
 * Register a new parent account
 * @async
 * @function parentSignUp
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - Parent's email address
 * @param {string} req.body.password - Parent's password
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success message or error
 */
export const parentSignUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingParent = await Parent.findOne({ email });
        if (existingParent) {
            return res.status(400).json({ message: "Existing parent!" });
        }
        const parent = new Parent({ email, password });
        await parent.save();
        res.status(201).json({ message: "Parent Sign-Up successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Authenticate parent and generate JWT token
 * @async
 * @function parentLogin
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - Parent's email address
 * @param {string} req.body.password - Parent's password
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with JWT token or error
 */
export const parentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingParent = await Parent.findOne({ email }).select('+password');
        if (!existingParent) {
            return res.status(404).json({ message: "No parent found!" });
        }

        const correctPassword = await bcrypt.compare(password, existingParent.password);
        if (!correctPassword) {
            return res.status(401).json({ message: "Invalid Password!" });
        }

        const token = jwt.sign({ id: existingParent._id }, ENV.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/**
 * Delete a parent account by ID
 * @async
 * @function parentDelete
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.id - Parent's ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response confirming deletion or error
 */
export const parentDelete = async (req, res) => {
    try {
        const { id } = req.params;
        await Parent.findByIdAndDelete(id);
        res.status(204).json("Parent Deleted Successfully!");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Retrieve parent information by ID
 * @async
 * @function getParentInfo
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.id - Parent's ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with parent data or error
 */
export const getParentInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const parent = await Parent.findById(id);
        if (!parent) {
            return res.status(404).json({ message: "No Parent Found!" });
        }
        res.status(200).json(parent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}