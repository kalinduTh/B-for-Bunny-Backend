import mongoose from "mongoose";

export const game = new mongoose.Schema({
    gameLevel: {
        type: Number, 
        default: 0 
    },
    score: {
        type: Number, 
        default: 0 
    },
    isActive: {
        type: Boolean, 
        default: false 
    },
    startedAt: {
        type: Date, 
        default: ""
    },
    lastUpdated: {
        type: Date, 
        default: ""
    },
})