/**
 * Parent Model
 * 
 * Mongoose schema for parent accounts
 * Includes embedded children subdocuments and password hashing
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { childSchema } from "./childModel.js";

/**
 * Parent Schema
 * @typedef {Object} ParentSchema
 * @property {string} email - Parent's email address (unique)
 * @property {string} password - Hashed password (not selected by default)
 * @property {Array<Child>} children - Array of child subdocuments
 * @property {Date} createdAt - Auto-generated timestamp
 * @property {Date} updatedAt - Auto-generated timestamp
 */
const parentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    children: [
        childSchema
    ],
}, { timestamps: true })

/**
 * Pre-save middleware to hash password before saving
 * Only hashes if password is modified
 */
parentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

/**
 * Compare provided password with hashed password
 * @param {string} candidatePassword - Password to compare
 * @returns {Promise<boolean>} True if passwords match
 */
parentSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Parent = mongoose.model("Parent", parentSchema);
export default Parent;