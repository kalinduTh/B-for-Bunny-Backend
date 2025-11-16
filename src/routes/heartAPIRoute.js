import express from 'express'
import axios from 'axios'
import { getHeartData } from '../controllers/heartAPIController.js';

const router = express.Router();

router.get('/heart-data', getHeartData);

export default router;