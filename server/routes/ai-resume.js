import express from "express";
import { getAIResponseOnJD } from "../controllers/ai-resume-controller.js";
import { getResumeJdAnalysis } from "../controllers/resume-jd-analysis.js";

const router = express.Router();

router.post("/ai/resume-jd", getAIResponseOnJD);
router.post("/ai/resume-jd-analysis", getResumeJdAnalysis);

export default router;
