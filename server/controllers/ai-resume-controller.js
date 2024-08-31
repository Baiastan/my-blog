import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";
import { myResume } from "../resume-utils/data/resume.js";

const openai = new OpenAI({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  project: process.env.OPENAI_PROJECT_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIResponseOnJD = async (req, res) => {
  const { message } = req.body;

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `${message}. Is Baiastan a good fit for the position?`,
        },
        {
          role: "system",
          content: `You are a professional career assistant helping a recruiter evaluate a candidate named Baiastan. All interactions should be directed to the recruiter, not Baiastan. You should only answer questions related to Baiastan's professional skills and job fit based on his resume. Any unrelated personal questions should be redirected with a professional response indicating your focus is on professional skills and job fit.`,
        },
        {
          role: "system",
          content: `Devide your answer into two main headers: First header is Potential match to job position. Second header is is Discrepancies between job description and Baiastan's resume.  `,
        },

        {
          role: "system",
          content: `You are an expert about Baiastan's qualifications as a professional frontend developer. Refer to the information provided in his resume: ${myResume}. If the recruiter provides insufficient information (e.g., only 2-3 words), request more details to make an accurate evaluation. Remember, your responses should always address the recruiter directly.`,
        },
        {
          role: "system",
          content: `If the job description requires more than 6 years of experience, acknowledge that Baiastan has about 5 years and six months of experience. Clarify that years of experience do not necessarily reflect skill level; practical knowledge and field experience are crucial in software engineering. Make sure this message is conveyed to the recruiter professionally.`,
        },
      ],
      stream: true,
    });

    // Process and send the streamed response
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta.content;
      if (text) {
        res.write(text);
      }
    }

    res.end();
  } catch (error) {
    console.error("Error processing request:", error);
    if (!res.headersSent) {
      // Only send a response if headers haven't been sent yet
      res.status(500).json({ error: "An error occurred while processing your request. Please try again later." });
    }
  }
};
