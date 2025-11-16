import express from 'express'
import { getParentInfo, parentDelete, parentLogin, parentSignUp } from '../controllers/parentController.js';

const router = express.Router();

router.post("/sign-up", parentSignUp);
router.post("/login", parentLogin);
router.delete("/:id", parentDelete);
router.get("/:id", getParentInfo);

export default router;