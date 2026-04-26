import { GoogleGenerativeAI } from "@google/generative-ai";

let _gemini: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (!_gemini) {
    _gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }
  return _gemini;
}

export interface PropertyFormData {
  propertyType: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  keyFeatures: string;
  uniqueSelling: string;
  targetAudience: string;
  tone: string;
  language: string;
}

export function buildPrompt(data: PropertyFormData): string {
  return `Generate a compelling, professional real estate property listing description based on the following details. Write the description in ${data.language}.

Property Details:
- Type: ${data.propertyType}
- Location: ${data.location}
- Bedrooms: ${data.bedrooms || "N/A"}
- Bathrooms: ${data.bathrooms || "N/A"}
- Square Footage: ${data.squareFootage || "N/A"}
- Key Features: ${data.keyFeatures || "N/A"}
- Unique Selling Points: ${data.uniqueSelling || "N/A"}
- Target Audience: ${data.targetAudience || "General buyers"}
- Tone: ${data.tone}

Write a captivating property description that:
1. Opens with a powerful hook that immediately captures attention
2. Highlights the most compelling features naturally within the narrative
3. Paints a vivid lifestyle picture for the target audience
4. Uses sensory language and emotional triggers appropriately
5. Ends with a strong call-to-action
6. Is between 150-250 words
7. Uses the specified tone throughout
8. Is written entirely in ${data.language}

Return only the property description, no preamble or meta-commentary.`;
}
