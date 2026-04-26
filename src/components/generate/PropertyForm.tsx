"use client";
import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { PropertyFormData } from "@/lib/openai";

const PROPERTY_TYPES = [
  { value: "", label: "Sélectionner le type..." },
  { value: "Single-Family Home", label: "Maison individuelle" },
  { value: "Condo / Apartment", label: "Appartement / Studio" },
  { value: "Townhouse", label: "Maison de ville" },
  { value: "Multi-Family", label: "Immeuble" },
  { value: "Commercial", label: "Local commercial" },
  { value: "Land / Lot", label: "Terrain" },
  { value: "Vacation Rental", label: "Location saisonnière" },
  { value: "Luxury Estate", label: "Propriété de luxe" },
];

const TONES = [
  { value: "", label: "Sélectionner le ton..." },
  { value: "Professional & Elegant", label: "Professionnel & Élégant" },
  { value: "Warm & Inviting", label: "Chaleureux & Accueillant" },
  { value: "Luxury & Prestigious", label: "Luxe & Prestige" },
  { value: "Modern & Minimalist", label: "Moderne & Minimaliste" },
  { value: "Family-Friendly", label: "Familial" },
  { value: "Enthusiastic & Energetic", label: "Enthousiaste & Dynamique" },
  { value: "Investment-Focused", label: "Investissement" },
];

const AUDIENCES = [
  { value: "", label: "Sélectionner l'audience..." },
  { value: "General buyers", label: "Acheteurs généraux" },
  { value: "Luxury buyers", label: "Acheteurs luxe" },
  { value: "First-time homebuyers", label: "Primo-accédants" },
  { value: "Young professionals", label: "Jeunes actifs" },
  { value: "Families with children", label: "Familles avec enfants" },
  { value: "Retirees", label: "Retraités" },
  { value: "Real estate investors", label: "Investisseurs" },
];

const LANGUAGES = [
  { value: "French", label: "🇫🇷 Français" },
  { value: "English", label: "🇬🇧 English" },
  { value: "Spanish", label: "🇪🇸 Español" },
  { value: "German", label: "🇩🇪 Deutsch" },
  { value: "Italian", label: "🇮🇹 Italiano" },
  { value: "Portuguese", label: "🇵🇹 Português" },
  { value: "Dutch", label: "🇳🇱 Nederlands" },
  { value: "Arabic", label: "🇦🇪 العربية" },
];

interface PropertyFormProps {
  onGenerate: (data: PropertyFormData) => void;
  isLoading: boolean;
}

export default function PropertyForm({ onGenerate, isLoading }: PropertyFormProps) {
  const [form, setForm] = useState<PropertyFormData>({
    propertyType: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    keyFeatures: "",
    uniqueSelling: "",
    targetAudience: "",
    tone: "",
    language: "French",
  });

  const update = (field: keyof PropertyFormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(form);
  };

  const isValid = form.propertyType && form.location && form.tone;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informations du bien */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.12em] mb-4">
          Informations du bien
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Select label="Type de bien *" options={PROPERTY_TYPES} value={form.propertyType} onChange={(e) => update("propertyType", e.target.value)} required />
          <Input label="Localisation *" placeholder="ex. Lyon 6ème, Paris 16ème..." value={form.location} onChange={(e) => update("location", e.target.value)} required />
          <Input label="Chambres" type="number" placeholder="ex. 3" min="0" value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} />
          <Input label="Salles de bain" type="number" placeholder="ex. 2" min="0" step="0.5" value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)} />
          <Input label="Surface" placeholder="ex. 85 m²" value={form.squareFootage} onChange={(e) => update("squareFootage", e.target.value)} />
        </div>
      </div>

      <div className="border-t border-white/[0.06]" />

      {/* Points forts */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.12em] mb-4">
          Points forts
        </h3>
        <div className="space-y-4">
          <Textarea label="Caractéristiques principales" placeholder="ex. Cuisine équipée, parquet chêne, double vitrage, cave, parking..." rows={3} value={form.keyFeatures} onChange={(e) => update("keyFeatures", e.target.value)} />
          <Textarea label="Argument de vente unique" placeholder="ex. Vue panoramique, proche écoles, immeuble haussmannien, terrasse sud..." rows={2} value={form.uniqueSelling} onChange={(e) => update("uniqueSelling", e.target.value)} />
        </div>
      </div>

      <div className="border-t border-white/[0.06]" />

      {/* Style, Audience & Langue */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.12em] mb-4">
          Style & Langue
        </h3>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Audience cible" options={AUDIENCES} value={form.targetAudience} onChange={(e) => update("targetAudience", e.target.value)} />
            <Select label="Ton de rédaction *" options={TONES} value={form.tone} onChange={(e) => update("tone", e.target.value)} required />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 mb-3">Langue de la description</p>
            <div className="grid grid-cols-4 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.value}
                  type="button"
                  onClick={() => update("language", lang.value)}
                  className={
                    form.language === lang.value
                      ? "text-xs px-3 py-2.5 rounded-xl border border-amber-500/60 bg-amber-500/10 text-amber-400 transition-all font-medium"
                      : "text-xs px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-300 transition-all"
                  }
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" loading={isLoading} disabled={!isValid} className="w-full">
        {isLoading ? "Génération en cours..." : "Générer la description"}
        {!isLoading && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2l6 6-6 6M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </Button>

      <p className="text-center text-xs text-slate-600">1 crédit utilisé par génération</p>
    </form>
  );
}
