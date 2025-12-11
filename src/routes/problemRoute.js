import express from "express"
import { addProblem, deleteProblem, getProblemSet } from "../controllers/problemController.js";


const router = express.Router();    

router.get("/problemset", getProblemSet);
router.post("/add", addProblem);
router.post("/delete", deleteProblem);

export default router;