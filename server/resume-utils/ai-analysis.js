import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

import { myResume } from "./data/resume";

export const aiAnalysis = async (messages) => {
  const result = await streamText({
    model: openai("gpt-4-turbo", {
      apiKey: process.env.OPENAI_API_KEY,
    }),
    messages,
  });
  const stream = new ReadableStream({
    async start(controller) {
      // Reading from the result stream
      for await (const chunk of result) {
        const textChunk = new TextEncoder().encode(chunk);
        controller.enqueue(textChunk);
      }
      controller.close();
    },
    cancel() {
      console.log("Stream cancelled");
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
};
