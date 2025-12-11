/**
 * Child Controller
 * 
 * Handles all child-related operations including CRUD operations for children profiles
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import Parent from "../models/parentModel.js";

/**
 * Retrieve all children for a specific parent
 * @async
 * @function getChildren
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.parentId - Parent's ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with array of children or error
 */
export const getChildren = async (req, res) => {
    try {
        const { parentId } = req.params;

        const parent = await Parent.findById(parentId);

        if (!parent) {
            return res.status(404).json({ message: "No parent found" });
        }

        res.status(200).json(parent.children);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Retrieve a specific child by ID
 * @async
 * @function getChildById
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.parentId - Parent's ID
 * @param {string} req.params.childId - Child's ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with child data or error
 */
export const getChildById = async (req, res) => {
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

        res.status(200).json(child);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Add a new child to a parent's account
 * Generates a gender-appropriate avatar using DiceBear API
 * @async
 * @function addChild
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.parentId - Parent's ID
 * @param {Object} req.body - Request body
 * @param {string} req.body.name - Child's name
 * @param {string} req.body.gender - Child's gender (Male/Female)
 * @param {Date} req.body.DOB - Child's date of birth
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with created child data or error
 */
export const addChild = async (req, res) => {
    try {
        const { parentId } = req.params;
        const { name, gender, DOB } = req.body;

        // Generate random seed for unique avatar
        const getRandomSeed = () => Math.random().toString(36).substring(2, 10);

        // Generate gender-specific avatar URL using DiceBear API
        const MaleAvatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${getRandomSeed()}&backgroundRotation=360&eyes=variant26,variant21,variant10,variant01&features=blush,birthmark,freckles&featuresProbability=0&glasses[]&glassesProbability=0&hair=short14,short11,short10,short07&hairColor=e5d7a3,transparent,0e0e0e&mouth=variant24,variant25,variant26,variant27,variant28,variant29,variant30&skinColor=ecad80,f2d3b1&backgroundColor=b6e3f4,ffdfbf`;
        const FemaleAvatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${getRandomSeed()}&backgroundRotation=360&eyes=variant26,variant21,variant10,variant01&features=blush,birthmark,freckles&featuresProbability=0&glasses[]&glassesProbability=0&hair=long03,long18,long08&hairColor=e5d7a3,transparent,0e0e0e&mouth=variant24,variant25,variant26,variant27,variant28,variant29,variant30&skinColor=ecad80,f2d3b1&backgroundColor=c0aede,ffd5dc,d1d4f9`;

        const image = gender === 'Male' ? MaleAvatar: FemaleAvatar;
        
        const parent = await Parent.findById(parentId);

        if (!parent) {
            return res.status(404).json({ message: "No parent found" });
        }

        const childData = { name, gender, DOB, image };

        parent.children.push(childData);
        await parent.save();
        res.status(201).json({ message: "Child added successfully", child: parent.children[parent.children.length - 1] });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Update a child's information by ID
 * @async
 * @function updateChildById
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.parentId - Parent's ID
 * @param {string} req.params.childId - Child's ID
 * @param {Object} req.body - Updated child data
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with updated child data or error
 */
export const updateChildById = async (req, res) => {
    try {
        const { parentId, childId } = req.params;
        const childUpdateData = req.body;

        const parent = await Parent.findById(parentId);
        if (!parent) {
            return res.status(404).json({ message: "No parent found" });
        }

        const child = parent.children.id(childId);
        if (!child) {
            return res.status(404).json({ message: "No child found" });
        }

        Object.assign(child, childUpdateData);
        await parent.save();
        res.status(200).json({ message: "Child updated successfully", child });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Delete a child by ID
 * @async
 * @function deleteChildById
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.parentId - Parent's ID
 * @param {string} req.params.childId - Child's ID
 * @param {Object} res - Express response object
 * @returns {Object} JSON response confirming deletion or error
 */
export const deleteChildById = async (req, res) => {
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
        await child.deleteOne();
        await parent.save();
        res.status(200).json({ message: "Child deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}