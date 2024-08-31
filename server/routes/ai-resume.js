import express from "express";
import { getAIResponseOnJD } from "../controllers/ai-resume-controller.js";

const router = express.Router();

router.post("/ai/resume-jd", getAIResponseOnJD);

export default router;
