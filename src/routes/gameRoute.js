/**
 * Game Routes
 * 
 * API endpoints for game session management
 * Base path: /api/parent/:parentId/children/:childId/game
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import express from "express"
import { createGameSession, endGameSession, getCurrentGameSession, updateCurrentGame } from "../controllers/gameController.js";
import { getProblemSet } from "../controllers/problemController.js";

const router = express.Router({ mergeParams: true });

/**
 * @route GET /api/parent/:parentId/children/:childId/game/current-session
 * @desc Get current active game session
 * @access Private
 */
router.get("/current-session", getCurrentGameSession);

/**
 * @route POST /api/parent/:parentId/children/:childId/game/start-session
 * @desc Start a new game session
 * @access Private
 */
router.post("/start-session", createGameSession);

/**
 * @route POST /api/parent/:parentId/children/:childId/game/end-session
 * @desc End current game session
 * @access Private
 */
router.post("/end-session", endGameSession);

/**
 * @route PUT /api/parent/:parentId/children/:childId/game/update-session
 * @desc Update current game session data
 * @access Private
 */
router.put("/update-session", updateCurrentGame);

/**
 * @route GET /api/parent/:parentId/children/:childId/game/problemset
 * @desc Get a set of 10 problems for the game
 * @access Private
 */
router.get("/problemset", getProblemSet)

export default router;