/**
 * Admin Model
 * 
 * Mongoose schema for admin accounts
 * Includes password hashing and validation
 * 
 * @author Kalindu Tharanga
 * @studentNumber 2433317
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * Admin Schema
 * @typedef {Object} AdminSchema
 * @property {string} email - Admin's email address (unique, lowercase, trimmed)
 * @property {string} password - Hashed password (minimum 6 characters)
 */
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

/**
 * Pre-save middleware to hash password before saving
 * Only hashes if password is modified
 */
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

/**
 * Compare provided password with hashed password
 * @param {string} candidatePassword - Password to compare
 * @returns {Promise<boolean>} True if passwords match
 */
adminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;