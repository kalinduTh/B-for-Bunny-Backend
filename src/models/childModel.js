import mongoose from "mongoose";
import { game } from "./gameModel.js";

export const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    highScore:{
        type: Number,
        required: true,
        default: 0
    },
    game:{
        type: game,
        required: false
    }

});