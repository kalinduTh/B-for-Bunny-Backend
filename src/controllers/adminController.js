/**
 * Admin Controller
 * 
 * Handles admin authentication and account management
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ENV } from "../config/env.js";
import Admin from "../models/adminModel.js";

/**
 * Register a new admin account
 * @async
 * @function addAdmin
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - Admin's email address
 * @param {string} req.body.password - Admin's password
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success message or error
 */
export const addAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists!" });
        }

        const newAdmin = new Admin({ email, password });
        await newAdmin.save();
        res.status(201).json({ message: "Admin added successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Authenticate admin and generate JWT token
 * @async
 * @function adminLogin
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - Admin's email address
 * @param {string} req.body.password - Admin's password
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with JWT token or error
 */
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingAdmin = await Admin.findOne({ email }).select('+password');
        if (!existingAdmin) {
            return res.status(400).json({ message: "Invalid email" });
        }
        const correctPassword = await bcrypt.compare(password, existingAdmin.password);
        if (!correctPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: existingAdmin._id }, ENV.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}