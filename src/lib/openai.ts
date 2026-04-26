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

export async function generateWithGroq(prompt: string): Promise<string> {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are PropScribe, an expert real estate copywriter. Output ONLY the description — no title, no preamble.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 600,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(err?.error?.message || ("Groq API error " + response.status));
  }

  const data = await response.json() as { choices: { message: { content: string } }[] };
  return data.choices[0]?.message?.content?.trim() ?? "";
}

export function buildPrompt(data: PropertyFormData): string {
  let p = "Write a real estate description in " + data.language + ". ";
  p += "Property: " + data.propertyType + " in " + data.location + ". ";
  if (data.bedrooms) p += "Bedrooms: " + data.bedrooms + ". ";
  if (data.bathrooms) p += "Bathrooms: " + data.bathrooms + ". ";
  if (data.squareFootage) p += "Size: " + data.squareFootage + ". ";
  if (data.keyFeatures) p += "Features: " + data.keyFeatures + ". ";
  if (data.uniqueSelling) p += "Highlights: " + data.uniqueSelling + ". ";
  if (data.targetAudience) p += "Target: " + data.targetAudience + ". ";
  p += "Tone: " + data.tone + ". ";
  p += "Rules: write entirely in " + data.language + ", open with a powerful hook, weave features into a narrative (no bullet points), paint a lifestyle picture, end with a call-to-action, 150-220 words, output ONLY the description.";
  return p;
}