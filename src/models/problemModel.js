import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true,
        maxLength: 1,
    },
    answers: [{
        type: String,
        maxLength: 1,
        required: true,
    }]
});

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;