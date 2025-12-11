import express from "express"
import { createGameSession, endGameSession, getCurrentGameSession, updateCurrentGame } from "../controllers/gameController.js";
import { getProblemSet } from "../controllers/problemController.js";


const router = express.Router({mergeParams: true});

router.get("/current-session", getCurrentGameSession);
router.post("/start-session", createGameSession);
router.post("/end-session", endGameSession);
router.put("/update-session", updateCurrentGame);
router.get("/problemset", getProblemSet)

export default router;