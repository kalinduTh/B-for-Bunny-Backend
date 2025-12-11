/**
 * Heart API Routes
 * 
 * API endpoints for proxying external Heart API requests
 * Base path: /api/heart
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import express from 'express'
import { getHeartData } from '../controllers/heartAPIController.js';

const router = express.Router();

/**
 * @route GET /api/heart
 * @desc Proxy request to Marc Conrad's Heart API
 * @access Public
 */
router.get('/', getHeartData);

export default router;