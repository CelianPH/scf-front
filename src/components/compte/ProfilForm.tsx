"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, type SelectOption } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import type {
  AccesExterieur,
  AutresAnimaux,
  CompositionFoyer,
  Enfants,
  ExperienceChats,
  LieuVieAnimal,
  PrefAge,
  PrefSexe,
  PresenceMaison,
  ProfilAdoptant,
  TypeLogement,
  TypeZone,
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
const COMPOSITION_FOYER_OPTIONS: SelectOption<CompositionFoyer>[] = [
  { value: "seul", label: "Je vis seul(e)" },
  { value: "couple", label: "En couple" },
  { value: "colocation", label: "En colocation" },
  { value: "autre", label: "Autre situation" },
];
const LIEU_VIE_OPTIONS: SelectOption<LieuVieAnimal>[] = [
  { value: "interieur", label: "Uniquement à l'intérieur" },
  { value: "exterieur", label: "Uniquement à l'extérieur" },
  { value: "les_deux", label: "Les deux" },
  { value: "autre", label: "Autre" },
];
const TYPE_ZONE_OPTIONS: SelectOption<TypeZone>[] = [
  { value: "ville", label: "En ville" },
  { value: "campagne", label: "À la campagne" },
  { value: "lotissement", label: "En lotissement" },
  { value: "autre", label: "Autre" },
];

interface Props {
  profil: ProfilAdoptant;
}

const inputCls =
  "mt-1 w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base text-text outline-none focus:border-primary";
const textareaCls = `${inputCls} min-h-[96px] resize-y`;

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

  // --- Conditions d'affichage ---
  const enAppartement =
    data.typeLogement === "appartement" || data.typeLogement === "studio";
  const aUnJardin = data.accesExterieur === "jardin";
  const aUnBalcon = data.accesExterieur === "balcon";
  const enColocation = data.compositionFoyer === "colocation";
  const aDesEnfants = data.enfants != null && data.enfants !== "aucun";
  const foyerEnDesaccord = data.foyerDaccord === false;
  const travailleActuellement = data.travaille === true;
  const aDautresAnimaux =
    data.autresAnimaux != null && data.autresAnimaux !== "aucun";

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <Section
        title="Coordonnées"
        subtitle="Pour qu'on puisse te contacter au sujet d'une demande."
      >
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
        <FieldLabel label="Adresse postale" full>
          <textarea
            value={data.adressePostale ?? ""}
            onChange={(e) => update("adressePostale", e.target.value || null)}
            className={textareaCls}
            autoComplete="street-address"
            placeholder="Numéro, rue, complément d'adresse…"
          />
        </FieldLabel>
      </Section>

      <Section
        title="Mon foyer"
        subtitle="Adopter, c'est une décision de toute la maison."
      >
        <FieldLabel label="Composition du foyer">
          <SelectWrap
            value={data.compositionFoyer ?? null}
            options={COMPOSITION_FOYER_OPTIONS}
            onChange={(v) => update("compositionFoyer", v)}
            placeholder="Composition du foyer"
          />
        </FieldLabel>
        {enColocation ? (
          <NumberField
            label="Nombre de colocataires"
            value={data.nbColocataires ?? null}
            onChange={(v) => update("nbColocataires", v)}
            min={0}
          />
        ) : null}
        <FieldLabel label="Enfants au foyer">
          <SelectWrap
            value={data.enfants ?? null}
            options={ENFANTS_OPTIONS}
            onChange={(v) => update("enfants", v)}
            placeholder="Enfants"
          />
        </FieldLabel>
        {aDesEnfants ? (
          <>
            <NumberField
              label="Nombre d'enfants"
              value={data.nbEnfants ?? null}
              onChange={(v) => update("nbEnfants", v)}
              min={0}
            />
            <FieldLabel label="Âges des enfants">
              <input
                type="text"
                value={data.agesEnfants ?? ""}
                onChange={(e) => update("agesEnfants", e.target.value || null)}
                className={inputCls}
                placeholder="Ex. 4 ans et 9 ans"
              />
            </FieldLabel>
          </>
        ) : null}
        <BooleanField
          label="Tout le foyer est d'accord pour adopter"
          value={data.foyerDaccord ?? null}
          onChange={(v) => update("foyerDaccord", v)}
        />
        {foyerEnDesaccord ? (
          <FieldLabel label="Peux-tu nous en dire plus ?" full>
            <textarea
              value={data.foyerDesaccordDetail ?? ""}
              onChange={(e) =>
                update("foyerDesaccordDetail", e.target.value || null)
              }
              className={textareaCls}
              placeholder="Qui n'est pas d'accord, et pourquoi ?"
            />
          </FieldLabel>
        ) : null}
      </Section>

      <Section
        title="Mon quotidien"
        subtitle="Pour savoir combien de temps le chat passerait seul."
      >
        <BooleanField
          label="Je travaille actuellement"
          value={data.travaille ?? null}
          onChange={(v) => update("travaille", v)}
        />
        <FieldLabel label="Présence à la maison">
          <SelectWrap
            value={data.presenceMaison ?? null}
            options={PRESENCE_OPTIONS}
            onChange={(v) => update("presenceMaison", v)}
            placeholder="Présence à la maison"
          />
        </FieldLabel>
        {travailleActuellement ? (
          <>
            <FieldLabel label="Profession">
              <input
                type="text"
                value={data.profession ?? ""}
                onChange={(e) => update("profession", e.target.value || null)}
                className={inputCls}
                autoComplete="organization-title"
              />
            </FieldLabel>
            <FieldLabel label="Horaires de travail">
              <input
                type="text"
                value={data.horairesTravail ?? ""}
                onChange={(e) =>
                  update("horairesTravail", e.target.value || null)
                }
                className={inputCls}
                placeholder="Ex. 9h-17h du lundi au vendredi"
              />
            </FieldLabel>
          </>
        ) : null}
        <NumberField
          label="Heures seul par jour (estimation)"
          value={data.heuresSeulParJour ?? null}
          onChange={(v) => update("heuresSeulParJour", v)}
          min={0}
          max={24}
          suffix="h"
        />
      </Section>

      <Section
        title="Mon logement"
        subtitle="Pour te proposer un chat adapté à ton cadre de vie."
      >
        <FieldLabel label="Type de logement">
          <SelectWrap
            value={data.typeLogement ?? null}
            options={TYPE_LOGEMENT_OPTIONS}
            onChange={(v) => update("typeLogement", v)}
            placeholder="Type de logement"
          />
        </FieldLabel>
        <NumberField
          label="Superficie du logement"
          value={data.superficieLogement ?? null}
          onChange={(v) => update("superficieLogement", v)}
          min={0}
          suffix="m²"
        />
        <FieldLabel label="Type de zone">
          <SelectWrap
            value={data.typeZone ?? null}
            options={TYPE_ZONE_OPTIONS}
            onChange={(v) => update("typeZone", v)}
            placeholder="Type de zone"
          />
        </FieldLabel>
        <FieldLabel label="Où vivrait le chat ?">
          <SelectWrap
            value={data.lieuVieAnimal ?? null}
            options={LIEU_VIE_OPTIONS}
            onChange={(v) => update("lieuVieAnimal", v)}
            placeholder="Lieu de vie du chat"
          />
        </FieldLabel>
        <BooleanField
          label="Une route passante est proche du logement"
          value={data.proximiteRoutePassante ?? null}
          onChange={(v) => update("proximiteRoutePassante", v)}
        />
        <BooleanField
          label="Le chat pourrait sortir librement"
          value={data.sortiesAutorisees ?? null}
          onChange={(v) => update("sortiesAutorisees", v)}
        />
        {enAppartement ? (
          <>
            <NumberField
              label="Étage"
              value={data.etage ?? null}
              onChange={(v) => update("etage", v)}
              min={0}
            />
            <BooleanField
              label="Les fenêtres sont sécurisées"
              value={data.fenetresSecurisees ?? null}
              onChange={(v) => update("fenetresSecurisees", v)}
            />
            {data.fenetresSecurisees !== true ? (
              <BooleanField
                label="J'envisage de sécuriser les fenêtres"
                value={data.envisageSecuriserFenetres ?? null}
                onChange={(v) => update("envisageSecuriserFenetres", v)}
              />
            ) : null}
          </>
        ) : null}
      </Section>

      <Section
        title="Extérieur"
        subtitle="Pour vérifier que le chat serait en sécurité dehors."
      >
        <FieldLabel label="Accès extérieur">
          <SelectWrap
            value={data.accesExterieur ?? null}
            options={ACCES_OPTIONS}
            onChange={(v) => update("accesExterieur", v)}
            placeholder="Accès extérieur"
          />
        </FieldLabel>
        {aUnJardin ? (
          <>
            <NumberField
              label="Superficie du jardin"
              value={data.superficieJardin ?? null}
              onChange={(v) => update("superficieJardin", v)}
              min={0}
              suffix="m²"
            />
            <BooleanField
              label="Le jardin est grillagé"
              value={data.jardinGrillage ?? null}
              onChange={(v) => update("jardinGrillage", v)}
            />
            {data.jardinGrillage === true ? (
              <FieldLabel label="Hauteur du grillage">
                <input
                  type="text"
                  value={data.hauteurGrillage ?? ""}
                  onChange={(e) =>
                    update("hauteurGrillage", e.target.value || null)
                  }
                  className={inputCls}
                  placeholder="Ex. 1,80 m"
                />
              </FieldLabel>
            ) : null}
          </>
        ) : null}
        {aUnBalcon ? (
          <>
            <NumberField
              label="Superficie du balcon"
              value={data.superficieBalcon ?? null}
              onChange={(v) => update("superficieBalcon", v)}
              min={0}
              suffix="m²"
            />
            <BooleanField
              label="Le balcon est sécurisé (filet, grillage…)"
              value={data.balconSecurise ?? null}
              onChange={(v) => update("balconSecurise", v)}
            />
          </>
        ) : null}
      </Section>

      <Section
        title="Mes animaux"
        subtitle="Pour vérifier les ententes possibles avec le chat."
      >
        <FieldLabel label="Autres animaux">
          <SelectWrap
            value={data.autresAnimaux ?? null}
            options={ANIMAUX_OPTIONS}
            onChange={(v) => update("autresAnimaux", v)}
            placeholder="Autres animaux"
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
        {aDautresAnimaux ? (
          <>
            <FieldLabel label="Parle-nous de tes animaux" full>
              <textarea
                value={data.autresAnimauxDetail ?? ""}
                onChange={(e) =>
                  update("autresAnimauxDetail", e.target.value || null)
                }
                className={textareaCls}
                placeholder="Espèce, âge, caractère, entente avec les chats…"
              />
            </FieldLabel>
            <FieldLabel label="Depuis quand les as-tu ?">
              <input
                type="text"
                value={data.autresAnimauxDepuis ?? ""}
                onChange={(e) =>
                  update("autresAnimauxDepuis", e.target.value || null)
                }
                className={inputCls}
                placeholder="Ex. depuis 3 ans"
              />
            </FieldLabel>
            <BooleanField
              label="Ils sont tous stérilisés"
              value={data.autresAnimauxSterilises ?? null}
              onChange={(v) => update("autresAnimauxSterilises", v)}
            />
          </>
        ) : null}
      </Section>

      <Section
        title="Mes préférences"
        subtitle="Optionnel — utilisé pour le matching intelligent."
      >
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
        <FieldLabel
          label="Caractères recherchés"
          hint="Sépare-les par des virgules."
          full
        >
          <input
            type="text"
            value={(data.prefCaracteres ?? []).join(", ")}
            onChange={(e) => {
              const liste = e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
              update("prefCaracteres", liste.length ? liste : null);
            }}
            className={inputCls}
            placeholder="Ex. câlin, joueur, calme"
          />
        </FieldLabel>
      </Section>

      <Section
        title="Pour finir"
        subtitle="Tout ce que tu veux nous dire et qui n'entre pas dans les cases."
      >
        <FieldLabel label="Remarques" full>
          <textarea
            value={data.remarques ?? ""}
            onChange={(e) => update("remarques", e.target.value || null)}
            className={textareaCls}
            placeholder="Une question, un contexte particulier…"
          />
        </FieldLabel>
        <FieldLabel
          label="Notes personnelles"
          hint="Visible uniquement par toi."
          full
        >
          <textarea
            value={data.notesPersonnelles ?? ""}
            onChange={(e) =>
              update("notesPersonnelles", e.target.value || null)
            }
            className={textareaCls}
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

function FieldLabel({
  label,
  hint,
  full,
  children,
}: {
  label: string;
  hint?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block${full ? " sm:col-span-2" : ""}`}>
      <span className="text-sm font-semibold text-text">{label}</span>
      {hint ? (
        <span className="ml-2 text-xs font-normal text-text-secondary">{hint}</span>
      ) : null}
      {children}
    </label>
  );
}

/** Champ numérique tolérant le vide (valeur non renseignée = null). */
function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  suffix,
  full,
}: {
  label: string;
  value: number | null;
  onChange: (v: number | null) => void;
  min?: number;
  max?: number;
  suffix?: string;
  full?: boolean;
}) {
  return (
    <FieldLabel label={label} full={full}>
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value ?? ""}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") return onChange(null);
            const n = Number(raw);
            onChange(Number.isNaN(n) ? null : n);
          }}
          className={`${inputCls}${suffix ? " pr-12" : ""}`}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center pt-1 text-sm text-text-secondary">
            {suffix}
          </span>
        ) : null}
      </div>
    </FieldLabel>
  );
}

/**
 * Booléen à trois états : Oui / Non / non renseigné.
 * Recliquer sur l'option active la désélectionne (retour à null).
 */
function BooleanField({
  label,
  value,
  onChange,
  full,
}: {
  label: string;
  value: boolean | null;
  onChange: (v: boolean | null) => void;
  full?: boolean;
}) {
  return (
    <div className={`block${full ? " sm:col-span-2" : ""}`}>
      <span className="text-sm font-semibold text-text">{label}</span>
      <div role="group" aria-label={label} className="mt-1 flex gap-2">
        {[
          { v: true, l: "Oui" },
          { v: false, l: "Non" },
        ].map(({ v, l }) => {
          const active = value === v;
          return (
            <button
              key={l}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? null : v)}
              className={
                active
                  ? "rounded-md border border-primary bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary"
                  : "rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text-secondary hover:border-primary/50"
              }
            >
              {l}
            </button>
          );
        })}
        {value === null ? (
          <span className="self-center text-xs text-text-secondary">
            Non renseigné
          </span>
        ) : null}
      </div>
    </div>
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
