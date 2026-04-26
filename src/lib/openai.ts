export interface ProductFormData {
  productName: string;
  category: string;
  features: string;
  uniqueSelling: string;
  targetBuyer: string;
  tone: string;
  language: string;
}

export async function generateWithGroq(prompt: string): Promise<string> {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.GROQ_API_KEY,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are an expert e-commerce copywriter. Write compelling, SEO-optimized product descriptions that convert. Output ONLY the description." },
        { role: "user", content: prompt },
      ],
      max_tokens: 600,
      temperature: 0.8,
    }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error((err as any)?.error?.message || ("Groq API error " + response.status));
  }
  const data = await response.json() as { choices: { message: { content: string } }[] };
  return data.choices[0]?.message?.content?.trim() ?? "";
}

export function buildPrompt(data: ProductFormData): string {
  let p = "Write an SEO-optimized e-commerce product description in " + data.language + ". ";
  p += "Product: " + data.productName + ". Category: " + data.category + ". ";
  if (data.features) p += "Features: " + data.features + ". ";
  if (data.uniqueSelling) p += "Unique value: " + data.uniqueSelling + ". ";
  if (data.targetBuyer) p += "Target buyer: " + data.targetBuyer + ". ";
  p += "Tone: " + data.tone + ". ";
  p += "Rules: write entirely in " + data.language + ", hook the reader immediately, weave in SEO keywords naturally, highlight benefits over features, create desire, end with a subtle CTA, 100-180 words, output ONLY the description.";
  return p;
}