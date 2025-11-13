import ProblemSet from "../models/problemSetModel.js";

//add problem set
export const addProblemSet = async (req, res) => {
    try{
        const { letter, problems } = req.body;
        const newProblemSet = new ProblemSet({ letter, problems });
        const savedProblemSet = await newProblemSet.save();
        res.status(201).json(savedProblemSet);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

//get full problem set
export const getProblemSet = async (req, res) => {
    try{
        const problemSets = await ProblemSet.find();
        if(!problemSets){
            res.status(404).json({ message: "No problem sets found" });
        }
        res.status(200).json(problemSets);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}