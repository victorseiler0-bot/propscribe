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
}

export function buildPrompt(data: PropertyFormData): string {
  return `You are PropScribe, an expert real estate copywriter. Generate a compelling, professional property listing description based on the following details.

Property Details:
- Type: ${data.propertyType}
- Location: ${data.location}
- Bedrooms: ${data.bedrooms}
- Bathrooms: ${data.bathrooms}
- Square Footage: ${data.squareFootage}
- Key Features: ${data.keyFeatures}
- Unique Selling Points: ${data.uniqueSelling}
- Target Audience: ${data.targetAudience}
- Tone: ${data.tone}

Write a captivating property description that:
1. Opens with a powerful hook that immediately captures attention
2. Highlights the most compelling features naturally within the narrative
3. Paints a vivid lifestyle picture for the target audience
4. Uses sensory language and emotional triggers appropriately
5. Ends with a strong call-to-action
6. Is between 150-250 words
7. Uses the specified tone throughout

Return only the property description, no preamble or meta-commentary.`;
}
