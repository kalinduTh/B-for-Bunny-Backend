import mongoose from "mongoose";
import {problemSchema} from './problemsModel.js'

const problemSetSchema = new mongoose.Schema({
    letter: {
        type: String,
        unique: true,
        uppercase: true,
        maxLength: 1,
        required: true
    },
    problems: [
        problemSchema
    ]
});

const ProblemSet = mongoose.model("ProblemSet", problemSetSchema);
export default ProblemSet;