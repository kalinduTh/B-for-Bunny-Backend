import express from "express"
import { createGameSession, endGameSession, getCurrentGameSession, updateCurrentGame } from "../controllers/gameController.js";
import { getRandomProblem } from "../controllers/problemController.js";


const router = express.Router({mergeParams: true});

router.get("/current-session", getCurrentGameSession);
router.post("/start-session", createGameSession);
router.post("/end-session", endGameSession);
router.put("/update-session", updateCurrentGame);
router.post("/problem", getRandomProblem)

export default router;