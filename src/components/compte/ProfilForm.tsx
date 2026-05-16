"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, type SelectOption } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import type {
  AccesExterieur,
  AutresAnimaux,
  Enfants,
  ExperienceChats,
  PrefAge,
  PrefSexe,
  PresenceMaison,
  ProfilAdoptant,
  TypeLogement,
} from "@/types/strapi";

const TYPE_LOGEMENT_OPTIONS: SelectOption<TypeLogement>[] = [
  { value: "maison", label: "Maison" },
  { value: "appartement", label: "Appartement" },
  { value: "studio", label: "Studio" },
];
const ACCES_OPTIONS: SelectOption<AccesExterieur>[] = [
  { value: "jardin", label: "Jardin sécurisé" },
  { value: "balcon", label: "Balcon sécurisé" },
  { value: "aucun", label: "Aucun" },
];
const PRESENCE_OPTIONS: SelectOption<PresenceMaison>[] = [
  { value: "tout_le_temps", label: "Présent toute la journée" },
  { value: "partiel", label: "Mi-temps / en alternance" },
  { value: "bureau", label: "Bureau plein temps" },
];
const ANIMAUX_OPTIONS: SelectOption<AutresAnimaux>[] = [
  { value: "aucun", label: "Aucun" },
  { value: "chats", label: "Chat(s)" },
  { value: "chiens", label: "Chien(s)" },
  { value: "chats_et_chiens", label: "Chats et chiens" },
  { value: "autres", label: "Autres animaux" },
];
const ENFANTS_OPTIONS: SelectOption<Enfants>[] = [
  { value: "aucun", label: "Aucun" },
  { value: "moins_6_ans", label: "Moins de 6 ans" },
  { value: "plus_6_ans", label: "Plus de 6 ans" },
  { value: "mixte", label: "Les deux" },
];
const EXPERIENCE_OPTIONS: SelectOption<ExperienceChats>[] = [
  { value: "jamais", label: "Première adoption" },
  { value: "passee", label: "Déjà eu un chat dans le passé" },
  { value: "actuelle", label: "J'ai actuellement un chat" },
  { value: "fa", label: "Expérience en FA" },
];
const PREF_AGE_OPTIONS: SelectOption<PrefAge>[] = [
  { value: "aucune", label: "Aucune préférence" },
  { value: "chaton", label: "Chaton (< 1 an)" },
  { value: "jeune", label: "Jeune (1-3 ans)" },
  { value: "adulte", label: "Adulte (3-8 ans)" },
  { value: "senior", label: "Senior (8+ ans)" },
];
const PREF_SEXE_OPTIONS: SelectOption<PrefSexe>[] = [
  { value: "aucune", label: "Aucune préférence" },
  { value: "femelle", label: "Femelle" },
  { value: "male", label: "Mâle" },
];

interface Props {
  profil: ProfilAdoptant;
}

const inputCls =
  "mt-1 w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base text-text outline-none focus:border-primary";

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
        <FieldLabel label="Téléphone">
          <input
            type="tel"
            value={data.telephone ?? ""}
            onChange={(e) => update("telephone", e.target.value || null)}
            className={inputCls}
            autoComplete="tel"
          />
        </FieldLabel>
        <FieldLabel label="Date de naissance">
          <DatePicker
            value={data.dateNaissance ?? null}
            onChange={(iso) => update("dateNaissance", iso)}
            ariaLabel="Date de naissance"
          />
        </FieldLabel>
        <FieldLabel label="Ville">
          <input
            type="text"
            value={data.ville ?? ""}
            onChange={(e) => update("ville", e.target.value || null)}
            className={inputCls}
            autoComplete="address-level2"
          />
        </FieldLabel>
        <FieldLabel label="Code postal">
          <input
            type="text"
            maxLength={5}
            inputMode="numeric"
            value={data.codePostal ?? ""}
            onChange={(e) => update("codePostal", e.target.value || null)}
            className={inputCls}
            autoComplete="postal-code"
          />
        </FieldLabel>
      </Section>

      <Section title="Mon logement" subtitle="Pour te proposer un chat adapté à ton cadre de vie.">
        <FieldLabel label="Type de logement">
          <SelectWrap
            value={data.typeLogement ?? null}
            options={TYPE_LOGEMENT_OPTIONS}
            onChange={(v) => update("typeLogement", v)}
            placeholder="Type de logement"
          />
        </FieldLabel>
        <FieldLabel label="Accès extérieur">
          <SelectWrap
            value={data.accesExterieur ?? null}
            options={ACCES_OPTIONS}
            onChange={(v) => update("accesExterieur", v)}
            placeholder="Accès extérieur"
          />
        </FieldLabel>
        <FieldLabel label="Présence à la maison">
          <SelectWrap
            value={data.presenceMaison ?? null}
            options={PRESENCE_OPTIONS}
            onChange={(v) => update("presenceMaison", v)}
            placeholder="Présence à la maison"
          />
        </FieldLabel>
      </Section>

      <Section title="Mon foyer" subtitle="Pour vérifier les ententes possibles avec le chat.">
        <FieldLabel label="Autres animaux">
          <SelectWrap
            value={data.autresAnimaux ?? null}
            options={ANIMAUX_OPTIONS}
            onChange={(v) => update("autresAnimaux", v)}
            placeholder="Autres animaux"
          />
        </FieldLabel>
        <FieldLabel label="Enfants au foyer">
          <SelectWrap
            value={data.enfants ?? null}
            options={ENFANTS_OPTIONS}
            onChange={(v) => update("enfants", v)}
            placeholder="Enfants"
          />
        </FieldLabel>
        <FieldLabel label="Expérience avec les chats">
          <SelectWrap
            value={data.experienceChats ?? null}
            options={EXPERIENCE_OPTIONS}
            onChange={(v) => update("experienceChats", v)}
            placeholder="Expérience"
          />
        </FieldLabel>
      </Section>

      <Section title="Mes préférences" subtitle="Optionnel — utilisé pour le matching intelligent.">
        <FieldLabel label="Âge préféré">
          <SelectWrap
            value={data.prefAge ?? null}
            options={PREF_AGE_OPTIONS}
            onChange={(v) => update("prefAge", v)}
            placeholder="Âge préféré"
          />
        </FieldLabel>
        <FieldLabel label="Sexe préféré">
          <SelectWrap
            value={data.prefSexe ?? null}
            options={PREF_SEXE_OPTIONS}
            onChange={(v) => update("prefSexe", v)}
            placeholder="Sexe préféré"
          />
        </FieldLabel>
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

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold text-text">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-text-secondary">{subtitle}</p> : null}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-text">{label}</span>
      {children}
    </label>
  );
}

/**
 * Wrapper autour de <Select> qui :
 * - autorise une valeur nulle (avant que l'utilisateur ait choisi)
 * - ajoute le `mt-1` et la largeur 100% pour matcher les autres champs
 */
function SelectWrap<T extends string>({
  value,
  options,
  onChange,
  placeholder,
}: {
  value: T | null;
  options: SelectOption<T>[];
  onChange: (v: T) => void;
  placeholder: string;
}) {
  return (
    <div className="mt-1 block w-full">
      <Select<T>
        value={value as T}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        ariaLabel={placeholder}
        className="w-full"
        buttonClassName="w-full justify-between py-2.5"
      />
    </div>
  );
}
