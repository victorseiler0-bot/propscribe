"use client";
import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ProductFormData } from "@/lib/openai";
const CATS=[{value:"",label:"Catégorie..."},{value:"Vêtements",label:"Vêtements & Mode"},{value:"Chaussures",label:"Chaussures"},{value:"Bijoux",label:"Bijoux & Accessoires"},{value:"Electronique",label:"Électronique"},{value:"Beaute",label:"Beauté & Cosmétiques"},{value:"Maison",label:"Maison & Déco"},{value:"Sport",label:"Sport & Fitness"},{value:"Alim",label:"Alimentation"},{value:"Jouets",label:"Jouets & Enfants"},{value:"Sante",label:"Santé"},{value:"Autre",label:"Autre"}];
const TONES=[{value:"",label:"Ton..."},{value:"Professionnel",label:"Professionnel"},{value:"Décontracté",label:"Décontracté"},{value:"Luxe",label:"Luxe & Premium"},{value:"Écologique",label:"Écologique"},{value:"Dynamique",label:"Dynamique"},{value:"Technique",label:"Technique"}];
const AUDS=[{value:"",label:"Audience (optionnel)..."},{value:"Femmes",label:"Femmes"},{value:"Hommes",label:"Hommes"},{value:"Ados",label:"Adolescents"},{value:"Parents",label:"Parents"},{value:"Pros",label:"Professionnels"},{value:"Tout public",label:"Tout public"}];
const LANGS=[{v:"French",l:"🇫🇷 Français"},{v:"English",l:"🇬🇧 English"},{v:"Spanish",l:"🇪🇸 Español"},{v:"German",l:"🇩🇪 Deutsch"},{v:"Italian",l:"🇮🇹 Italiano"},{v:"Portuguese",l:"🇵🇹 Português"},{v:"Dutch",l:"🇳🇱 Nederlands"},{v:"Arabic",l:"🇦🇪 العربية"}];
interface Props{onGenerate:(d:ProductFormData)=>void;isLoading:boolean;}
export default function ProductForm({onGenerate,isLoading}:Props){
  const[form,setForm]=useState<ProductFormData>({productName:"",category:"",features:"",uniqueSelling:"",targetBuyer:"",tone:"",language:"French"});
  const up=(f:keyof ProductFormData,v:string)=>setForm(p=>({...p,[f]:v}));
  const ok=form.productName&&form.category&&form.tone;
  return(
    <form onSubmit={e=>{e.preventDefault();onGenerate(form);}} className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.12em] mb-4">Ton produit</h3>
        <div className="space-y-4">
          <Input label="Nom du produit *" placeholder="ex. Montre connectée Sport Pro X3" value={form.productName} onChange={e=>up("productName",e.target.value)} required/>
          <Select label="Catégorie *" options={CATS} value={form.category} onChange={e=>up("category",e.target.value)} required/>
          <Textarea label="Caractéristiques *" placeholder="ex. Écran AMOLED, batterie 7j, étanche 50m, GPS, bracelet silicone..." rows={3} value={form.features} onChange={e=>up("features",e.target.value)}/>
          <Textarea label="Ce qui le rend unique" placeholder="ex. Seul sous 100EUR avec ECG, design primé, garanti 3 ans..." rows={2} value={form.uniqueSelling} onChange={e=>up("uniqueSelling",e.target.value)}/>
        </div>
      </div>
      <div className="border-t border-white/[0.06]"/>
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.12em] mb-4">Style & Langue</h3>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Audience" options={AUDS} value={form.targetBuyer} onChange={e=>up("targetBuyer",e.target.value)}/>
            <Select label="Ton *" options={TONES} value={form.tone} onChange={e=>up("tone",e.target.value)} required/>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 mb-3">Langue de la fiche produit</p>
            <div className="grid grid-cols-4 gap-2">
              {LANGS.map(lang=>(
                <button key={lang.v} type="button" onClick={()=>up("language",lang.v)}
                  className={form.language===lang.v?"text-xs px-3 py-2.5 rounded-xl border border-amber-500/60 bg-amber-500/10 text-amber-400 transition-all font-medium":"text-xs px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20 transition-all"}>
                  {lang.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Button type="submit" variant="primary" size="lg" loading={isLoading} disabled={!ok} className="w-full">
        {isLoading?"Rédaction en cours...": "Générer la fiche produit"}
        {!isLoading&&<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l6 6-6 6M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </Button>
      <p className="text-center text-xs text-slate-600">1 crédit utilisé par génération</p>
    </form>
  );
}