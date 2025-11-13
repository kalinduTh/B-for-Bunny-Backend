import express from "express"
import { addProblemToProblemSet, deleteProblemById, getAllProblemsInProblemSet } from "../controllers/problemController.js";


const router = express.Router();    

router.get("/:letter", getAllProblemsInProblemSet);
router.post("/add", addProblemToProblemSet);
router.delete("/delete", deleteProblemById);

export default router;