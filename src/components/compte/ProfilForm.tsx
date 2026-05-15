"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ProfilAdoptant } from "@/types/strapi";

const TYPE_LOGEMENT_OPTIONS = [
  { v: "maison", l: "Maison" },
  { v: "appartement", l: "Appartement" },
  { v: "studio", l: "Studio" },
];
const ACCES_OPTIONS = [
  { v: "jardin", l: "Jardin sécurisé" },
  { v: "balcon", l: "Balcon sécurisé" },
  { v: "aucun", l: "Aucun" },
];
const PRESENCE_OPTIONS = [
  { v: "tout_le_temps", l: "Présent toute la journée" },
  { v: "partiel", l: "Mi-temps / en alternance" },
  { v: "bureau", l: "Bureau plein temps" },
];
const ANIMAUX_OPTIONS = [
  { v: "aucun", l: "Aucun" },
  { v: "chats", l: "Chat(s)" },
  { v: "chiens", l: "Chien(s)" },
  { v: "chats_et_chiens", l: "Chats et chiens" },
  { v: "autres", l: "Autres animaux" },
];
const ENFANTS_OPTIONS = [
  { v: "aucun", l: "Aucun" },
  { v: "moins_6_ans", l: "Moins de 6 ans" },
  { v: "plus_6_ans", l: "Plus de 6 ans" },
  { v: "mixte", l: "Les deux" },
];
const EXPERIENCE_OPTIONS = [
  { v: "jamais", l: "Première adoption" },
  { v: "passee", l: "Déjà eu un chat dans le passé" },
  { v: "actuelle", l: "J'ai actuellement un chat" },
  { v: "fa", l: "Expérience en FA" },
];
const PREF_AGE_OPTIONS = [
  { v: "aucune", l: "Aucune préférence" },
  { v: "chaton", l: "Chaton (< 1 an)" },
  { v: "jeune", l: "Jeune (1-3 ans)" },
  { v: "adulte", l: "Adulte (3-8 ans)" },
  { v: "senior", l: "Senior (8+ ans)" },
];
const PREF_SEXE_OPTIONS = [
  { v: "aucune", l: "Aucune préférence" },
  { v: "femelle", l: "Femelle" },
  { v: "male", l: "Mâle" },
];

interface Props {
  profil: ProfilAdoptant;
}

export default function ProfilForm({ profil }: Props) {
  const router = useRouter();
  const [data, setData] = useState<Partial<ProfilAdoptant>>(profil);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function update<K extends keyof ProfilAdoptant>(key: K, value: ProfilAdoptant[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/compte/profil", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <Section title="Coordonnées" subtitle="Pour qu'on puisse te contacter au sujet d'une demande.">
        <Field label="Téléphone" name="telephone">
          <input
            type="tel"
            value={data.telephone ?? ""}
            onChange={(e) => update("telephone", e.target.value || null)}
            className={inputCls}
          />
        </Field>
        <Field label="Date de naissance" name="dateNaissance">
          <input
            type="date"
            value={data.dateNaissance ?? ""}
            onChange={(e) => update("dateNaissance", e.target.value || null)}
            className={inputCls}
          />
        </Field>
        <Field label="Ville" name="ville">
          <input
            type="text"
            value={data.ville ?? ""}
            onChange={(e) => update("ville", e.target.value || null)}
            className={inputCls}
          />
        </Field>
        <Field label="Code postal" name="codePostal">
          <input
            type="text"
            maxLength={5}
            value={data.codePostal ?? ""}
            onChange={(e) => update("codePostal", e.target.value || null)}
            className={inputCls}
          />
        </Field>
      </Section>

      <Section title="Mon logement" subtitle="Pour te proposer un chat adapté à ton cadre de vie.">
        <SelectField label="Type de logement" options={TYPE_LOGEMENT_OPTIONS} value={data.typeLogement} onChange={(v) => update("typeLogement", v as any)} />
        <SelectField label="Accès extérieur" options={ACCES_OPTIONS} value={data.accesExterieur} onChange={(v) => update("accesExterieur", v as any)} />
        <SelectField label="Présence à la maison" options={PRESENCE_OPTIONS} value={data.presenceMaison} onChange={(v) => update("presenceMaison", v as any)} />
      </Section>

      <Section title="Mon foyer" subtitle="Pour vérifier les ententes possibles avec le chat.">
        <SelectField label="Autres animaux" options={ANIMAUX_OPTIONS} value={data.autresAnimaux} onChange={(v) => update("autresAnimaux", v as any)} />
        <SelectField label="Enfants au foyer" options={ENFANTS_OPTIONS} value={data.enfants} onChange={(v) => update("enfants", v as any)} />
        <SelectField label="Expérience avec les chats" options={EXPERIENCE_OPTIONS} value={data.experienceChats} onChange={(v) => update("experienceChats", v as any)} />
      </Section>

      <Section title="Mes préférences" subtitle="Optionnel — utilisé pour le matching intelligent.">
        <SelectField label="Âge préféré" options={PREF_AGE_OPTIONS} value={data.prefAge} onChange={(v) => update("prefAge", v as any)} />
        <SelectField label="Sexe préféré" options={PREF_SEXE_OPTIONS} value={data.prefSexe} onChange={(v) => update("prefSexe", v as any)} />
      </Section>

      <div className="sticky bottom-4 flex items-center justify-end gap-3 rounded-xl bg-surface px-5 py-4 shadow-lg ring-1 ring-border">
        {saved ? (
          <span className="text-sm font-medium text-primary">✓ Enregistré</span>
        ) : null}
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-gradient-to-r from-primary to-primary-vif px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-50"
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "mt-1 w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base text-text outline-none focus:border-primary";

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-text">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-text-secondary">{subtitle}</p> : null}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({ label, name, children }: { label: string; name: string; children: React.ReactNode }) {
  return (
    <label htmlFor={name} className="block">
      <span className="text-sm font-semibold text-text">{label}</span>
      {children}
    </label>
  );
}

function SelectField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { v: string; l: string }[];
  value: string | null | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-text">{label}</span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      >
        <option value="">— Choisir —</option>
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
    </label>
  );
}
