import express from "express";

import { getResumeJdAnalysis } from "../controllers/resume-jd-analysis.js";

const router = express.Router();

router.post("/system/resume-jd-analysis", getResumeJdAnalysis);

export default router;
