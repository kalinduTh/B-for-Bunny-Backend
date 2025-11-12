import mongoose from "mongoose";

export const gameSchema = new mongoose.Schema({
    currentLevel: {
        type: Number, 
        default: 1 
    },
    score: {
        type: Number, 
        default: 0 
    },
    isActive: {
        type: Boolean, 
        default: true 
    },
    startedAt: {
        type: Date, 
        default: Date.now 
    },
    lastUpdated: {
        type: Date, 
        default: Date.now 
    },
    progressData: {
        type: Object, 
        default: {} 
    },
})