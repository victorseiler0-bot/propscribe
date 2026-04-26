import { NextRequest, NextResponse } from "next/server";
import { openai, buildPrompt, PropertyFormData } from "@/lib/openai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const data: PropertyFormData = await req.json();

    if (!data.propertyType || !data.location || !data.tone) {
      return NextResponse.json(
        { error: "Property type, location, and tone are required." },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(data);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are PropScribe, an expert real estate copywriter. You generate compelling, professional property descriptions that sell. Your output is always polished, engaging, and ready to publish.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    const description = completion.choices[0]?.message?.content?.trim();

    if (!description) {
      return NextResponse.json(
        { error: "Failed to generate description. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ description });
  } catch (error: unknown) {
    console.error("[generate]", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
