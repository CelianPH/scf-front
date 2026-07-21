"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select, type SelectOption } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import {
  ACCES_OPTIONS,
  ANIMAUX_OPTIONS,
  CARACTERE_OPTIONS,
  COMPOSITION_FOYER_OPTIONS,
  ENFANTS_OPTIONS,
  EXPERIENCE_OPTIONS,
  LIEU_VIE_OPTIONS,
  PREF_AGE_OPTIONS,
  PREF_SEXE_OPTIONS,
  PRESENCE_OPTIONS,
  TYPE_LOGEMENT_OPTIONS,
  TYPE_ZONE_OPTIONS,
} from "@/lib/profil-labels";
import type { ProfilAdoptant } from "@/types/strapi";

interface Props {
  profil: ProfilAdoptant;
  /** Champs du socle à mettre en évidence (renvoyés par le gating d'adoption). */
  manquants?: string[];
}

const inputCls =
  "mt-1 w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base text-text outline-none focus:border-primary";
const textareaCls = `${inputCls} min-h-[96px] resize-y`;

/** Numéro français : 10 chiffres démarrant par 0, ou +33 suivi de 9 chiffres. */
const TELEPHONE_FR = /^(0\d{9}|\+33[1-9]\d{8})$/;
const telephoneValide = (v: string) => TELEPHONE_FR.test(v.replace(/\s/g, ""));

export default function ProfilForm({ profil, manquants = [] }: Props) {
  const router = useRouter();
  // « Aucune préférence » (valeur "aucune") est la seule représentation de
  // l'absence de préférence : on normalise un éventuel null hérité, pour ne pas
  // laisser coexister null et "aucune" (deux façons de dire la même chose).
  const [initial, setInitial] = useState<Partial<ProfilAdoptant>>({
    ...profil,
    prefAge: profil.prefAge ?? "aucune",
    prefSexe: profil.prefSexe ?? "aucune",
  });
  const [data, setData] = useState<Partial<ProfilAdoptant>>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  // Le bouton reste inactif tant que rien n'a changé depuis le dernier
  // enregistrement (comparaison de forme, suffisante pour des valeurs simples).
  const modifie = JSON.stringify(data) !== JSON.stringify(initial);

  /**
   * Un champ signalé reste en évidence tant qu'il est vide : le surlignage
   * s'efface dès la saisie plutôt qu'au rechargement de la page.
   */
  const aSignaler = (cle: keyof ProfilAdoptant) => {
    if (!manquants.includes(cle as string)) return false;
    const v = data[cle];
    return v === null || v === undefined || v === "";
  };

  /**
   * Vide les champs que le formulaire n'affiche plus.
   *
   * Passer de « maison avec jardin » à « appartement » masque les questions sur
   * le jardin, mais leurs valeurs restaient dans l'état et repartaient au
   * serveur : le dossier transmis au bénévole annonçait un grillage de 1,80 m
   * pour quelqu'un vivant en appartement. On renvoie explicitement `null` pour
   * effacer la valeur enregistrée précédemment.
   */
  function nettoyerChampsSansObjet(d: Partial<ProfilAdoptant>) {
    const enAppart =
      d.typeLogement === "appartement" || d.typeLogement === "studio";
    const groupes: [boolean, (keyof ProfilAdoptant)[]][] = [
      [d.compositionFoyer !== "colocation", ["nbColocataires"]],
      [
        d.enfants == null || d.enfants === "aucun",
        ["nbEnfants", "agesEnfants"],
      ],
      [d.foyerDaccord !== false, ["foyerDesaccordDetail"]],
      [
        d.travaille !== true,
        ["profession", "heureDebutTravail", "heureFinTravail"],
      ],
      [
        !enAppart,
        ["etage", "fenetresSecurisees", "envisageSecuriserFenetres"],
      ],
      // Fenêtres déjà sécurisées : la question « J'envisage de les sécuriser »
      // n'est plus posée, sa valeur ne doit pas subsister.
      [d.fenetresSecurisees === true, ["envisageSecuriserFenetres"]],
      [
        d.accesExterieur !== "jardin",
        ["superficieJardin", "jardinGrillage", "hauteurGrillage"],
      ],
      [
        d.accesExterieur !== "balcon",
        ["superficieBalcon", "balconSecurise"],
      ],
      [
        d.autresAnimaux == null || d.autresAnimaux === "aucun",
        ["autresAnimauxDetail", "autresAnimauxDepuis", "autresAnimauxSterilises"],
      ],
    ];

    const nettoye = { ...d };
    for (const [sansObjet, cles] of groupes) {
      if (!sansObjet) continue;
      for (const cle of cles) nettoye[cle] = null as never;
    }

    // Le back n'accepte qu'un tableau d'entiers : on retire les âges non encore
    // saisis (null), et on renvoie null si aucun âge n'est renseigné.
    if (Array.isArray(nettoye.agesEnfants)) {
      const ages = (nettoye.agesEnfants as (number | null)[]).filter(
        (a): a is number => typeof a === "number"
      );
      nettoye.agesEnfants = (ages.length ? ages : null) as never;
    }
    return nettoye;
  }

  function update<K extends keyof ProfilAdoptant>(key: K, value: ProfilAdoptant[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setSaved(false);
    setErreur(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;

    // Le back rejette un téléphone mal formé (message générique) : on l'arrête
    // ici pour un retour ciblé, plutôt que de laisser partir la requête.
    if (data.telephone && !telephoneValide(data.telephone)) {
      setErreur("Vérifie le numéro de téléphone avant d'enregistrer.");
      document
        .getElementById("champ-telephone")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSaving(true);
    setErreur(null);

    try {
      const res = await fetch("/api/compte/profil", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nettoyerChampsSansObjet(data)),
      });

      // Sans ce test, une session expirée ou une erreur serveur affichait
      // « ✓ Enregistré » alors que rien n'avait été sauvegardé.
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setErreur(
          res.status === 401
            ? "Ta session a expiré. Reconnecte-toi pour enregistrer."
            : body?.error?.message ??
                "Ton profil n'a pas pu être enregistré. Réessaie."
        );
        return;
      }

      // Le profil enregistré devient la nouvelle référence : le bouton
      // redevient inactif jusqu'à la prochaine modification.
      setInitial(data);
      setSaved(true);
      router.refresh();
    } catch {
      setErreur("Connexion impossible. Vérifie ta connexion et réessaie.");
    } finally {
      setSaving(false);
    }
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

  // « Présent toute la journée » et un long temps seul quotidien se
  // contredisent, et l'algo lit les deux : on le signale sans bloquer.
  const presenceHeuresIncoherentes =
    data.presenceMaison === "tout_le_temps" &&
    (data.heuresSeulParJour ?? 0) >= 4;

  // Garde défensive : d'anciens profils stockaient `agesEnfants` en texte libre
  // (« 4 ans et 9 ans »). On ne conserve qu'un tableau ; toute autre forme est
  // repartie de zéro.
  const agesEnfants: (number | null)[] = Array.isArray(data.agesEnfants)
    ? (data.agesEnfants as (number | null)[])
    : [];

  /**
   * Ajuste le nombre d'enfants et redimensionne le tableau d'âges en
   * conséquence (troncature si on réduit, complétion par `null` si on augmente).
   */
  function setNbEnfants(n: number | null) {
    setData((d) => {
      const courant = Array.isArray(d.agesEnfants)
        ? (d.agesEnfants as (number | null)[])
        : [];
      if (n == null || n <= 0) {
        return { ...d, nbEnfants: n, agesEnfants: null };
      }
      const ages = Array.from({ length: n }, (_, i) => courant[i] ?? null);
      return { ...d, nbEnfants: n, agesEnfants: ages as ProfilAdoptant["agesEnfants"] };
    });
    setSaved(false);
    setErreur(null);
  }

  function setAgeEnfant(index: number, v: number | null) {
    setData((d) => {
      const courant = Array.isArray(d.agesEnfants)
        ? [...(d.agesEnfants as (number | null)[])]
        : [];
      courant[index] = v;
      return { ...d, agesEnfants: courant as ProfilAdoptant["agesEnfants"] };
    });
    setSaved(false);
    setErreur(null);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10 pb-4">
      <p className="rounded-md bg-bg-alt px-4 py-3 text-sm text-text-secondary">
        Les champs marqués d&apos;un{" "}
        <span className="font-semibold text-primary">*</span> sont nécessaires
        pour envoyer une demande d&apos;adoption. Le reste nous aide à mieux te
        connaître.
      </p>

      <Section
        title="Coordonnées"
        subtitle="Pour qu'on puisse te contacter au sujet d'une demande."
      >
        <FieldLabel label="Téléphone" required
          highlight={aSignaler("telephone")}
          anchor="champ-telephone">
          <input
            type="tel"
            value={data.telephone ?? ""}
            onChange={(e) => {
              // On limite la frappe aux caractères d'un numéro (chiffres, +,
              // espaces) : le format complet est vérifié plus bas.
              const filtre = e.target.value.replace(/[^\d+\s]/g, "");
              update("telephone", filtre || null);
            }}
            className={inputCls}
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={
              data.telephone ? !telephoneValide(data.telephone) : undefined
            }
          />
          {data.telephone && !telephoneValide(data.telephone) ? (
            <span className="mt-1 block text-xs text-red-700">
              Numéro français attendu (ex. 06 12 34 56 78 ou +33 6 12 34 56 78).
            </span>
          ) : null}
        </FieldLabel>
        <FieldLabel label="Date de naissance" required
          highlight={aSignaler("dateNaissance")}
          anchor="champ-dateNaissance">
          <DatePicker
            value={data.dateNaissance ?? null}
            onChange={(iso) => update("dateNaissance", iso)}
            ariaLabel="Date de naissance"
          />
        </FieldLabel>
        <FieldLabel label="Ville" required
          highlight={aSignaler("ville")}
          anchor="champ-ville">
          <input
            type="text"
            value={data.ville ?? ""}
            onChange={(e) => update("ville", e.target.value || null)}
            className={inputCls}
            autoComplete="address-level2"
          />
        </FieldLabel>
        <FieldLabel label="Code postal" required
          highlight={aSignaler("codePostal")}
          anchor="champ-codePostal">
          <input
            type="text"
            maxLength={5}
            inputMode="numeric"
            value={data.codePostal ?? ""}
            onChange={(e) => {
              // Un code postal français est exactement 5 chiffres : on écarte
              // toute autre saisie à la volée.
              const chiffres = e.target.value.replace(/\D/g, "").slice(0, 5);
              update("codePostal", chiffres || null);
            }}
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
        <FieldLabel label="Enfants au foyer" required
          highlight={aSignaler("enfants")}
          anchor="champ-enfants">
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
              onChange={(v) => setNbEnfants(v)}
              min={1}
            />
            <AgesEnfantsFields
              nbEnfants={data.nbEnfants ?? null}
              ages={agesEnfants}
              onChange={(index, v) => setAgeEnfant(index, v)}
            />
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
        <FieldLabel label="Présence à la maison" required
          highlight={aSignaler("presenceMaison")}
          anchor="champ-presenceMaison">
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
            <NumberField
              label="Heure de début"
              value={data.heureDebutTravail ?? null}
              onChange={(v) => update("heureDebutTravail", v)}
              min={0}
              max={23}
              suffix="h"
            />
            <NumberField
              label="Heure de fin"
              value={data.heureFinTravail ?? null}
              onChange={(v) => update("heureFinTravail", v)}
              min={0}
              max={23}
              suffix="h"
            />
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
        {presenceHeuresIncoherentes ? (
          <p
            role="status"
            className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-800 ring-1 ring-amber-200 sm:col-span-2"
          >
            Tu as indiqué être présent toute la journée, mais aussi{" "}
            {data.heuresSeulParJour} h seul par jour : vérifie que ces deux
            réponses sont cohérentes.
          </p>
        ) : null}
      </Section>

      <Section
        title="Mon logement"
        subtitle="Pour te proposer un chat adapté à ton cadre de vie."
      >
        <FieldLabel label="Type de logement" required
          highlight={aSignaler("typeLogement")}
          anchor="champ-typeLogement">
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
        <FieldLabel label="Accès extérieur" required
          highlight={aSignaler("accesExterieur")}
          anchor="champ-accesExterieur">
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
              <NumberField
                label="Hauteur du grillage"
                value={data.hauteurGrillage ?? null}
                onChange={(v) => update("hauteurGrillage", v)}
                min={0}
                max={10}
                step={0.1}
                suffix="m"
              />
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
        <FieldLabel label="Autres animaux" required
          highlight={aSignaler("autresAnimaux")}
          anchor="champ-autresAnimaux">
          <SelectWrap
            value={data.autresAnimaux ?? null}
            options={ANIMAUX_OPTIONS}
            onChange={(v) => update("autresAnimaux", v)}
            placeholder="Autres animaux"
          />
        </FieldLabel>
        <FieldLabel label="Expérience avec les chats" required
          highlight={aSignaler("experienceChats")}
          anchor="champ-experienceChats">
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
            <NumberField
              label="Depuis combien d'années ?"
              value={data.autresAnimauxDepuis ?? null}
              onChange={(v) => update("autresAnimauxDepuis", v)}
              min={0}
              max={50}
              suffix="ans"
            />
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
            value={data.prefAge ?? "aucune"}
            options={PREF_AGE_OPTIONS}
            onChange={(v) => update("prefAge", v)}
            placeholder="Aucune préférence"
          />
        </FieldLabel>
        <FieldLabel label="Sexe préféré">
          <SelectWrap
            value={data.prefSexe ?? "aucune"}
            options={PREF_SEXE_OPTIONS}
            onChange={(v) => update("prefSexe", v)}
            placeholder="Aucune préférence"
          />
        </FieldLabel>
        <CaracteresField
          value={data.prefCaracteres ?? null}
          onToggle={(trait) => {
            const courant = data.prefCaracteres ?? [];
            const liste = courant.includes(trait)
              ? courant.filter((t) => t !== trait)
              : [...courant, trait];
            update("prefCaracteres", liste.length ? liste : null);
          }}
        />
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

      <div className="sticky bottom-4 z-10 flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-lg shadow-black/10 sm:px-5">
        {erreur ? (
          <p role="alert" className="min-w-0 flex-1 truncate text-sm text-red-700">
            {erreur}
          </p>
        ) : saved ? (
          <p className="inline-flex min-w-0 flex-1 items-center gap-1.5 text-sm font-medium text-green-700">
            <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">
              <span className="sm:hidden">Enregistré</span>
              <span className="hidden sm:inline">Modifications enregistrées</span>
            </span>
          </p>
        ) : (
          <p className="min-w-0 flex-1 truncate text-sm text-text-secondary">
            {modifie ? (
              <>
                <span className="sm:hidden">Non enregistré</span>
                <span className="hidden sm:inline">
                  Modifications non enregistrées
                </span>
              </>
            ) : (
              "Profil à jour"
            )}
          </p>
        )}
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={saving || !modifie}
          iconLeft={saving ? Loader2 : Save}
          className={`shrink-0 ${saving ? "[&_svg]:animate-spin" : ""}`}
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </Button>
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
  required,
  highlight,
  anchor,
  children,
}: {
  label: string;
  hint?: string;
  full?: boolean;
  /** Champ du socle exigé pour envoyer une demande d'adoption. */
  required?: boolean;
  /** Champ bloquant une demande : encadré et annoncé. */
  highlight?: boolean;
  anchor?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      id={anchor}
      className={`block scroll-mt-24${full ? " sm:col-span-2" : ""}${
        highlight
          ? " rounded-xl bg-amber-50/70 p-3 ring-1 ring-amber-300"
          : ""
      }`}
    >
      <span className="text-sm font-semibold text-text">
        {label}
        {required ? (
          <span className="ml-0.5 text-primary" title="Requis pour adopter">
            *
          </span>
        ) : null}
      </span>
      {hint ? (
        <span className="ml-2 text-xs font-normal text-text-secondary">{hint}</span>
      ) : null}
      {highlight ? (
        <span className="ml-2 text-xs font-semibold text-amber-800">
          À compléter
        </span>
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
  step,
  suffix,
  full,
  hint,
}: {
  label: string;
  value: number | null;
  onChange: (v: number | null) => void;
  min?: number;
  max?: number;
  /** Pas de saisie ; un pas non entier active le clavier décimal. */
  step?: number;
  suffix?: string;
  full?: boolean;
  hint?: string;
}) {
  const decimal = step !== undefined && !Number.isInteger(step);
  return (
    <FieldLabel label={label} full={full} hint={hint}>
      <div className="relative">
        <input
          type="number"
          inputMode={decimal ? "decimal" : "numeric"}
          min={min}
          max={max}
          step={step}
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

/**
 * Un champ d'âge (input number, suffixe « ans ») par enfant déclaré.
 * Le nombre de champs suit `nbEnfants` ; les valeurs vivent dans le tableau
 * `ages` du parent.
 */
function AgesEnfantsFields({
  nbEnfants,
  ages,
  onChange,
}: {
  nbEnfants: number | null;
  ages: (number | null)[];
  onChange: (index: number, v: number | null) => void;
}) {
  if (!nbEnfants || nbEnfants <= 0) return null;
  return (
    <div className="block sm:col-span-2">
      <span className="text-sm font-semibold text-text">Âges des enfants</span>
      <div className="mt-1 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: nbEnfants }, (_, i) => (
          <div key={i} className="relative">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={25}
              value={ages[i] ?? ""}
              aria-label={`Âge de l'enfant ${i + 1}`}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === "") return onChange(i, null);
                const n = Number(raw);
                onChange(i, Number.isNaN(n) ? null : n);
              }}
              className={`${inputCls} pr-12`}
              placeholder={`N°${i + 1}`}
            />
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center pt-1 text-sm text-text-secondary">
              ans
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Sélection multiple des traits de caractère recherchés, sous forme de puces.
 * Le vocabulaire est fermé (`CARACTERE_OPTIONS`, miroir du back) pour que le
 * matching par caractères recoupe le même ensemble de valeurs côté chats.
 */
function CaracteresField({
  value,
  onToggle,
}: {
  value: string[] | null;
  onToggle: (trait: string) => void;
}) {
  const choisis = value ?? [];
  return (
    <div className="block sm:col-span-2">
      <span className="text-sm font-semibold text-text">
        Caractères recherchés
      </span>
      <span className="ml-2 text-xs font-normal text-text-secondary">
        Choisis ceux qui comptent pour toi.
      </span>
      <div className="mt-2 flex flex-wrap gap-2">
        {CARACTERE_OPTIONS.map((trait) => {
          const actif = choisis.includes(trait);
          return (
            <button
              key={trait}
              type="button"
              aria-pressed={actif}
              onClick={() => onToggle(trait)}
              className={
                actif
                  ? "rounded-full border border-primary bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition"
                  : "rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary transition hover:border-primary/50"
              }
            >
              {trait}
            </button>
          );
        })}
      </div>
    </div>
  );
}
