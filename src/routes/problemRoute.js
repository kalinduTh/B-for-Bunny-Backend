/**
 * Problem Routes
 * 
 * API endpoints for managing educational problems
 * Base paths: /api/admin/:adminId/problemset/problems and /api/problem
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import express from "express"
import { addProblem, deleteProblem, getProblemSet } from "../controllers/problemController.js";

const router = express.Router();

/**
 * @route GET /api/problem/problemset
 * @desc Get a set of 10 random problems
 * @access Public
 */
router.get("/problemset", getProblemSet);

/**
 * @route POST /api/problem/add
 * @desc Add a new problem to the database
 * @access Private (Admin only)
 */
router.post("/add", addProblem);

/**
 * @route POST /api/problem/delete
 * @desc Delete a problem by ID
 * @access Private (Admin only)
 */
router.post("/delete", deleteProblem);

export default router;