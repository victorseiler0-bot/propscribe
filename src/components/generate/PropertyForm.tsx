"use client";
import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { PropertyFormData } from "@/lib/openai";

const PROPERTY_TYPES = [
  { value: "", label: "Select property type..." },
  { value: "Single-Family Home", label: "Single-Family Home" },
  { value: "Condo / Apartment", label: "Condo / Apartment" },
  { value: "Townhouse", label: "Townhouse" },
  { value: "Multi-Family", label: "Multi-Family" },
  { value: "Commercial", label: "Commercial" },
  { value: "Land / Lot", label: "Land / Lot" },
  { value: "Vacation Rental", label: "Vacation Rental" },
  { value: "Luxury Estate", label: "Luxury Estate" },
];

const TONES = [
  { value: "", label: "Select tone..." },
  { value: "Professional & Elegant", label: "Professional & Elegant" },
  { value: "Warm & Inviting", label: "Warm & Inviting" },
  { value: "Luxury & Prestigious", label: "Luxury & Prestigious" },
  { value: "Modern & Minimalist", label: "Modern & Minimalist" },
  { value: "Family-Friendly", label: "Family-Friendly" },
  { value: "Enthusiastic & Energetic", label: "Enthusiastic & Energetic" },
  { value: "Investment-Focused", label: "Investment-Focused" },
];

const AUDIENCES = [
  { value: "", label: "Select target audience..." },
  { value: "General buyers", label: "General Buyers" },
  { value: "Luxury buyers", label: "Luxury Buyers" },
  { value: "First-time homebuyers", label: "First-Time Homebuyers" },
  { value: "Young professionals", label: "Young Professionals" },
  { value: "Families with children", label: "Families with Children" },
  { value: "Retirees", label: "Retirees" },
  { value: "Real estate investors", label: "Real Estate Investors" },
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
      {/* Section 1: Basics */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.12em] mb-4">
          Property Basics
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Select
            label="Property Type *"
            options={PROPERTY_TYPES}
            value={form.propertyType}
            onChange={(e) => update("propertyType", e.target.value)}
            required
          />
          <Input
            label="Location *"
            placeholder="e.g. Pacific Heights, San Francisco, CA"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            required
          />
          <Input
            label="Bedrooms"
            type="number"
            placeholder="e.g. 4"
            min="0"
            value={form.bedrooms}
            onChange={(e) => update("bedrooms", e.target.value)}
          />
          <Input
            label="Bathrooms"
            type="number"
            placeholder="e.g. 2.5"
            min="0"
            step="0.5"
            value={form.bathrooms}
            onChange={(e) => update("bathrooms", e.target.value)}
          />
          <Input
            label="Square Footage"
            placeholder="e.g. 2,450 sq ft"
            value={form.squareFootage}
            onChange={(e) => update("squareFootage", e.target.value)}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.06]" />

      {/* Section 2: Features */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.12em] mb-4">
          Selling Points
        </h3>
        <div className="space-y-4">
          <Textarea
            label="Key Features"
            placeholder="e.g. Chef's kitchen with marble countertops, hardwood floors, vaulted ceilings, two-car garage, updated HVAC..."
            rows={3}
            value={form.keyFeatures}
            onChange={(e) => update("keyFeatures", e.target.value)}
          />
          <Textarea
            label="Unique Selling Proposition"
            placeholder="e.g. Panoramic bay views, income-generating ADU, steps from top-rated schools, historic Victorian architecture..."
            rows={2}
            value={form.uniqueSelling}
            onChange={(e) => update("uniqueSelling", e.target.value)}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.06]" />

      {/* Section 3: Tone */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.12em] mb-4">
          Audience & Tone
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Select
            label="Target Audience"
            options={AUDIENCES}
            value={form.targetAudience}
            onChange={(e) => update("targetAudience", e.target.value)}
          />
          <Select
            label="Writing Tone *"
            options={TONES}
            value={form.tone}
            onChange={(e) => update("tone", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isLoading}
        disabled={!isValid}
        className="w-full"
      >
        {isLoading ? "Generating your description..." : "Generate Description"}
        {!isLoading && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2l6 6-6 6M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </Button>

      <p className="text-center text-xs text-slate-600">
        1 credit will be used · You have{" "}
        <span className="text-amber-400 font-medium">5 free credits</span> remaining
      </p>
    </form>
  );
}
