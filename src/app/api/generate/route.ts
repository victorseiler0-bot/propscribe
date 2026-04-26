import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient, buildPrompt } from "@/lib/openai";
import { createServerSupabaseClient, createServiceClient } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Auth check
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  }

  // Credit check
  const service = createServiceClient();
  const { data: profile } = await service
    .from("profiles")
    .select("credits")
    .eq("id", user.id)
    .single();

  if (!profile || profile.credits < 1) {
    return NextResponse.json(
      { error: "Crédits insuffisants. Achetez des crédits pour continuer." },
      { status: 402 }
    );
  }

  try {
    const data = await req.json();

    if (!data.propertyType || !data.location || !data.tone) {
      return NextResponse.json(
        { error: "Type de bien, localisation et ton sont requis." },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(data);

    const completion = await getOpenAIClient().chat.completions.create({
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
        { error: "Échec de la génération. Réessaie." },
        { status: 500 }
      );
    }

    // Deduct 1 credit
    await service
      .from("profiles")
      .update({ credits: profile.credits - 1 })
      .eq("id", user.id);

    // Save generation
    await service.from("generations").insert({
      user_id: user.id,
      property_type: data.propertyType,
      location: data.location,
      output: description,
    });

    return NextResponse.json({ description, creditsLeft: profile.credits - 1 });
  } catch (error: unknown) {
    console.error("[generate]", error);
    const message =
      error instanceof Error ? error.message : "Une erreur inattendue s'est produite.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
