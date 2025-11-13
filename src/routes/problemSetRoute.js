import express from "express"
import { addProblemSet, getProblemSet } from "../controllers/problemSetController.js";

const router = express.Router();

router.get("/", getProblemSet);
router.post("/add", addProblemSet);

export default router;