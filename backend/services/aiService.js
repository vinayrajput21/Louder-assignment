import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateVenueProposal = async (query) => {
  try {
    const prompt = `
You are an AI Event Concierge.

A user will describe a corporate offsite or event in natural language.

Your job is to return ONLY valid JSON in this exact format:
{
  "venueName": "string",
  "location": "string",
  "estimatedCost": "string",
  "whyItFits": "string"
}

Rules:
- Do not add markdown
- Do not wrap in \`\`\`
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

    if (!content) {
      throw new Error("Empty response from Gemini");
    }

    const cleanedContent = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleanedContent);
    } catch (parseError) {
      throw new Error(`Failed to parse Gemini response: ${cleanedContent}`);
    }
  } catch (error) {
    console.error("Gemini AI service error:", error.message);
    throw new Error("Failed to generate venue proposal");
  }
};