import express from 'express'
import { parentDelete, parentLogin, parentSignUp } from '../controllers/parentController.js';

const router = express.Router();

router.post("/sign-up", parentSignUp);
router.post("/login", parentLogin);
router.delete("/:id", parentDelete);

export default router;