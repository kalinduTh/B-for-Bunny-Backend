/**
 * Admin Routes
 * 
 * API endpoints for admin authentication and management
 * Base path: /api/admin
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import express from "express"
import { addAdmin, adminLogin } from "../controllers/adminController.js";

const router = express.Router();

/**
 * @route POST /api/admin/add
 * @desc Register a new admin account
 * @access Private (Admin only)
 */
router.post("/add", addAdmin);

/**
 * @route POST /api/admin/login
 * @desc Authenticate admin and get JWT token
 * @access Public
 */
router.post("/login", adminLogin);

export default router;