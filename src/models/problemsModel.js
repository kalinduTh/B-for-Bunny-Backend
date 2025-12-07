import mongoose from "mongoose";

export const problemSchema = new mongoose.Schema({
    img:{
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});