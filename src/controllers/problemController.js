import ProblemSet from "../models/problemSetModel.js";

//get all problems in a problemSet
export const getAllProblemsInProblemSet = async (req, res) => {
    try{
        const problemSet = req.params.letter;
        if(!problemSet){
            return res.status(404).json({ message: "No problem found for letter" });
        }
        const problemSetData = await ProblemSet.findOne({ letter: problemSet });
        if(!problemSetData){
            return res.status(404).json({ message: "Problem set not found" });
        }
        res.status(200).json(problemSetData.problems);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

//add a problem to problem set
export const addProblemToProblemSet = async (req, res) => {
    try{
        const {letter, img, answer=letter} = req.body;
        if(!letter){
            return res.status(404).json({ message: "No letter given" });
        }
        const problemSetData = await ProblemSet.findOne({ letter: letter });
        if(!problemSetData){
            return res.status(404).json({ message: "No problem set found for the given letter" });
        }
        const problem = { img, answer };
        problemSetData.problems.push(problem);
        await problemSetData.save();
        res.status(201).json(problemSetData);

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

//get a random problem for a letter
export const getRandomProblem = async (req, res) => {
    try{
        const {letter} = req.body;
        if(!letter){
            return res.status(404).json({ message: "No letter given" });
        }
        const problemSetData = await ProblemSet.findOne({ letter: letter });
        if(!problemSetData){
            return res.status(404).json({ message: "No problem set found for the given letter" });
        }
        const problems = problemSetData.problems;
        if(problems.length === 0){
            return res.status(404).json({ message: "No problems found for the given letter" });
        }
        const randomIndex = Math.floor(Math.random() * problems.length);
        const randomProblem = problems[randomIndex];
        res.status(200).json(randomProblem);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

//delete a problem by ID
export const deleteProblemById = async (req, res) => {
    try{
        const{problemID, problemSet} = req.body;
        const selectedProblem = await ProblemSet.findOne({ letter: problemSet });
        if(!selectedProblem){
            return res.status(404).json({ message: "No Problem Found" });
        }
        const problemIndex = selectedProblem.problems.findIndex(problem => problem._id.toString() === problemID);
        selectedProblem.problems.splice(problemIndex, 1);
        await selectedProblem.save();
        res.status(200).json({ message: "Problem deleted successfully" });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}