import express from "express"
import { addChild, deleteChildById, getChildById, getChildren, updateChildById } from "../controllers/childController.js";

const router = express.Router({mergeParams: true});

router.get("/", getChildren);
router.post("/add", addChild);
router.get("/:childId", getChildById);
router.delete("/:childId", deleteChildById);
router.put("/:childId", updateChildById);


export default router;