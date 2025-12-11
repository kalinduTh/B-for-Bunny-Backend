import Problem from "../models/problemModel.js";

//add a problem
export const addProblem = async (req, res) => {
    try{
        const newProblem = new Problem(req.body);
        if(!newProblem){
            return res.status(400).json({ message: "Invalid problem data" });
        }
        await newProblem.save();
        res.status(201).json(newProblem);
    }catch{
        res.status(500).json({ message: "Failed to add problem" });
    }
}

//get a problem set of 10
export const getProblemSet = async (req, res) => {
    try{
        const problemSet = await Problem.find().limit(10);
        res.status(200).json(problemSet);
    }catch{
        res.status(500).json({ message: "Failed to get problem set" });
    }
}

//delete a problem
export const deleteProblem = async (req, res) => {
    try{
        const problem = await Problem.findByIdAndDelete(req.body.id);
        if(!problem){
            return res.status(404).json({ message: "Problem not found" });
        }
        res.status(200).json({ message: "Problem deleted successfully" });
    }catch{
        res.status(500).json({ message: "Failed to delete problem" });
    }
}