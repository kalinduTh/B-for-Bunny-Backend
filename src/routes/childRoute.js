/**
 * Child Routes
 * 
 * API endpoints for managing children profiles
 * Base path: /api/parent/:parentId/children
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import express from "express"
import { addChild, deleteChildById, getChildById, getChildren, updateChildById } from "../controllers/childController.js";

const router = express.Router({ mergeParams: true });

/**
 * @route GET /api/parent/:parentId/children
 * @desc Get all children for a parent
 * @access Private
 */
router.get("/", getChildren);

/**
 * @route POST /api/parent/:parentId/children/add
 * @desc Add a new child to parent account
 * @access Private
 */
router.post("/add", addChild);

/**
 * @route GET /api/parent/:parentId/children/:childId
 * @desc Get specific child by ID
 * @access Private
 */
router.get("/:childId", getChildById);

/**
 * @route DELETE /api/parent/:parentId/children/:childId
 * @desc Delete a child by ID
 * @access Private
 */
router.delete("/:childId", deleteChildById);

/**
 * @route PUT /api/parent/:parentId/children/:childId
 * @desc Update child information
 * @access Private
 */
router.put("/:childId", updateChildById);

export default router;