import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, buildPrompt } from "@/lib/openai";
import { createServerSupabaseClient, createServiceClient } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  }

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

    const model = getGeminiClient().getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction:
        "You are PropScribe, an expert real estate copywriter. You generate compelling, professional property descriptions that sell. Your output is always polished, engaging, and ready to publish.",
    });

    const result = await model.generateContent(prompt);
    const description = result.response.text().trim();

    if (!description) {
      return NextResponse.json(
        { error: "Échec de la génération. Réessaie." },
        { status: 500 }
      );
    }

    await service
      .from("profiles")
      .update({ credits: profile.credits - 1 })
      .eq("id", user.id);

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
