import express from "express"
import { addChild, getChildById, getChildren } from "../controllers/childController.js";

const router = express.Router({mergeParams: true});

router.get("/", getChildren);
router.post("/add", addChild);
router.get("/:childId", getChildById);


export default router;