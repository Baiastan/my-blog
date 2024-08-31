import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import aiResumeRoute from "./routes/ai-resume.js";
import resumeAnalysisRoute from "./routes/resume-jd-analysis.js";

const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", aiResumeRoute);
app.use("/api", resumeAnalysisRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
