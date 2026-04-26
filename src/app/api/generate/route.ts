import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, buildPrompt } from "@/lib/openai";
import { createServerSupabaseClient, createServiceClient } from "@/lib/supabase-server";

export const runtime = "nodejs";

const ADMIN_EMAILS = ["victorseiler0@gmail.com"];

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  }

  const isAdmin = ADMIN_EMAILS.includes(user.email ?? "");
  const service = createServiceClient();

  let currentCredits = 0;

  if (!isAdmin) {
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
    currentCredits = profile.credits;
  }

  try {
    const data = await req.json();

    if (!data.propertyType || !data.location || !data.tone) {
      return NextResponse.json(
        { error: "Type de bien, localisation et ton sont requis." },
        { status: 400 }
      );
    }

    if (!data.language) data.language = "French";

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

    if (!isAdmin) {
      await service
        .from("profiles")
        .update({ credits: currentCredits - 1 })
        .eq("id", user.id);
    }

    await service.from("generations").insert({
      user_id: user.id,
      property_type: data.propertyType,
      location: data.location,
      output: description,
    });

    const creditsLeft = isAdmin ? 9999 : currentCredits - 1;
    return NextResponse.json({ description, creditsLeft });
  } catch (error: unknown) {
    console.error("[generate]", error);
    const message =
      error instanceof Error ? error.message : "Une erreur inattendue s'est produite.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
