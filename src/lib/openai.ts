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
        { role: "system", content: "Tu es un expert copywriter e-commerce senior avec 15 ans experience. Tes fiches produits generent 3x plus de conversions. Chaque fiche est UNIQUE, jamais les memes formules. Tu commences TOUJOURS par une accroche emotionnelle surprenante, jamais Decouvrez ou Voici. Tu fais RESSENTIR le produit avant de lister les caracteristiques. Mots-cles SEO integres naturellement. Respecte exactement le format demande. Pas de titre, commentaire ou meta-texte en sortie." },
        { role: "user", content: prompt },
      ],
      max_tokens: 900,
      temperature: 0.85,
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
  const lang = data.language;
  const parts: string[] = [
    "Redige une fiche produit professionnelle en " + lang + " pour le produit suivant.",
    "",
    "=== INFORMATIONS PRODUIT ===",
    "Produit : " + data.productName,
    "Categorie : " + data.category,
  ];
  if (data.features) parts.push("Caracteristiques : " + data.features);
  if (data.uniqueSelling) parts.push("Ce qui le differencie : " + data.uniqueSelling);
  if (data.targetBuyer) parts.push("Client cible : " + data.targetBuyer);
  parts.push("Ton editorial : " + data.tone);
  parts.push("");
  parts.push("=== FORMAT DE SORTIE (suivre EXACTEMENT) ===");
  parts.push("");
  parts.push("[ACCROCHE]");
  parts.push("1 phrase courte, percutante, emotionnelle. Jamais Decouvrez/Voici/Presentation.");
  parts.push("");
  parts.push("[PARAGRAPHE IMMERSIF]");
  parts.push("3-4 phrases. Fais vivre le produit : sensations, images, benefices ressentis. Pas de liste.");
  parts.push("");
  parts.push("[POINTS CLES]");
  parts.push("5 lignes commencant par une coche symbole check, chacune = 1 caracteristique + son benefice concret.");
  parts.push("");
  parts.push("[POURQUOI CE PRODUIT]");
  parts.push("2-3 phrases. Ce qui rend ce produit irreplacable. Pas de repetition des points cles.");
  parts.push("");
  parts.push("[CALL TO ACTION]");
  parts.push("1 phrase finale qui donne envie d agir maintenant.");
  parts.push("");
  parts.push("Longueur totale : 250 a 350 mots. Integre 3 a 5 mots-cles SEO naturellement.");
  parts.push("Ecris entierement en " + lang + ". Ne reproduis pas les titres entre crochets dans ta reponse.");
  return parts.join(String.fromCharCode(10));
}