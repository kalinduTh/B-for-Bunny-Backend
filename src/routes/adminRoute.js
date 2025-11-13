import express from "express"
import { addAdmin, adminLogin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/add", addAdmin);
router.post("/login", adminLogin);

export default router;