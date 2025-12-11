/**
 * Parent Routes
 * 
 * API endpoints for parent authentication and profile management
 * Base path: /api/parent
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import express from 'express'
import { getParentInfo, parentDelete, parentLogin, parentSignUp } from '../controllers/parentController.js';

const router = express.Router();

/**
 * @route POST /api/parent/sign-up
 * @desc Register a new parent account
 * @access Public
 */
router.post("/sign-up", parentSignUp);

/**
 * @route POST /api/parent/login
 * @desc Authenticate parent and get JWT token
 * @access Public
 */
router.post("/login", parentLogin);

/**
 * @route DELETE /api/parent/:id
 * @desc Delete parent account by ID
 * @access Private
 */
router.delete("/:id", parentDelete);

/**
 * @route GET /api/parent/:id
 * @desc Get parent information by ID
 * @access Private
 */
router.get("/:id", getParentInfo);

export default router;