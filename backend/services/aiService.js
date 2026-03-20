import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
// console.log(process.env.GEMINI_API_KEY)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateVenueProposal = async (query) => {
  try {
    const prompt = `
You are an AI Event Concierge.

A user will describe a corporate offsite or event in natural language.

Return ONLY valid JSON in this exact format:
{
  "venueName": "string",
  "location": "string",
  "estimatedCost": "string",
  "whyItFits": "string"
}

Rules:
- Do not add markdown
- Do not wrap in triple backticks
- Do not add explanation before or after JSON
- Keep estimatedCost human readable
- whyItFits should be concise but useful

User request:
${query}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const content = response?.text?.trim();
    console.log(content);

    console.log("Gemini raw response:", content);

    if (!content) {
      throw new Error("Empty response from Gemini");
    }

    const cleanedContent = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedContent);
  } catch (error) {
    console.error("Gemini AI service error:", error);

    if (error?.message?.toLowerCase().includes("quota")) {
      throw new Error("Gemini API free tier quota exhausted. Please try again later.");
    }

    if (error?.message?.toLowerCase().includes("api key")) {
      throw new Error("Gemini API key is invalid or missing.");
    }

    if (error?.message?.toLowerCase().includes("parse")) {
      throw new Error("Gemini returned an invalid JSON response.");
    }

    throw new Error(error.message || "Failed to generate venue proposal");
  }
};