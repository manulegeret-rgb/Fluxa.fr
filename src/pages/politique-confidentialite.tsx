import React from "react";
import HomeLogoOverlay from "@/components/HomeLogoOverlay";

/**
 * Politique de confidentialité — Fluxa (projet individuel)
 * Responsable de traitement : Emmanuel Légeret (Particulier)
 * RGPD / CNIL — Version prête à publier
 *
 * ☐ Tu peux ajuster les valeurs ci-dessous si besoin.
 */
type Processor = {
  name: string;
  service: string;
  purpose: string;
  dataTypes: string[];
  location: string; // e.g., "UE (France)", "UE (Irlande)", "Hors UE (USA)"
  dpaUrl?: string;
  safeguards?: string; // ex: "Clauses Contractuelles Types (CCT) 2021"
};

type Cookie = {
  name: string;
  provider: string;
  purpose: string;
  type: "essential" | "analytics" | "marketing" | "functional";
  duration: string; // ex: "Session", "13 mois"
};

const CONFIG = {
  // Identité & contact
  companyName: "Emmanuel Légeret",
  legalForm: "Particulier (responsable de traitement à titre individuel)",
  tradeName: "Fluxa",
  companyAddress: "Cognin, France",
  country: "France",
  companyId: {
    siret: "",
    rcs: "",
    vat: "",
  },
  websiteUrl: "https://fluxa.fr",
  contactEmail: "fluxa.contact@gmail.com",
  dpoEmail: "",
  dataControllerName: "Emmanuel Légeret",

  // Hébergement (à confirmer selon ton déploiement)
  hosting: {
    provider: "Vercel",
    location: "UE (selon région de déploiement : Allemagne / Irlande)",
    address: "",
  },

  // Finalités & bases légales
  purposes: [
    { title: "Fourniture du service (site / app)", legalBasis: "Exécution du contrat (art. 6.1.b RGPD)" },
    { title: "Gestion de compte et support", legalBasis: "Intérêt légitime / Exécution du contrat" },
    { title: "Facturation & obligations légales (si applicable)", legalBasis: "Obligation légale (art. 6.1.c RGPD)" },
    { title: "Statistiques d'audience (si activées)", legalBasis: "Consentement (art. 6.1.a RGPD)" },
    { title: "Prospection/communications (newsletter, emails)", legalBasis: "Consentement (ou intérêt légitime en B2B)" },
  ],

  // Catégories de données traitées
  dataCategories: [
    "Identité (nom, prénom, société le cas échéant)",
    "Coordonnées (email, téléphone, adresse si fournie)",
    "Données de compte (identifiants, journaux d'activité si compte/app)",
    "Données de facturation (si applicable : paiements, TVA, historique)",
    "Contenus saisis dans l'app (clients, RDV, devis/factures, messages) si tu utilises l'app",
    "Données techniques (adresse IP, device, pages vues, cookies)",
  ],

  // Durées de conservation (à adapter au besoin)
  retention: [
    { item: "Compte & données liées au service", duration: "pendant la relation contractuelle + 3 ans" },
    { item: "Factures & pièces comptables (si facturation)", duration: "10 ans (obligation légale française)" },
    { item: "Prospection (leads)", duration: "3 ans à compter du dernier contact" },
    { item: "Cookies analytiques (si activés)", duration: "13 mois (et 25 mois pour données associées)" },
  ],

  // Sous-traitants (exemples — complète si tu ajoutes d'autres outils)
  processors: [
    {
      name: "Vercel",
      service: "Hébergement / CI",
      purpose: "Hébergement de l'application et du site",
      dataTypes: ["Logs techniques", "IP", "URLs"],
      location: "UE/EEE (selon datacenter choisi)",
      dpaUrl: "https://vercel.com/legal/dpa",
    },
    // Dé-commente et adapte si tu actives des analytics :
    // {
    //   name: "Plausible (ou Matomo / Google Analytics)",
    //   service: "Mesure d'audience",
    //   purpose: "Statistiques d'utilisation",
    //   dataTypes: ["Cookies/ID (selon outil)", "IP (souvent anonymisée)", "Pages vues"],
    //   location: "UE (Plausible/Matomo auto-hébergé) / Hors UE (GA selon config)",
    //   dpaUrl: "https://plausible.io/data-policy (ou doc de l'outil)",
    //   safeguards: "Consentement + mesures adaptées si transfert",
    // },
    // Paiement si tu ajoutes Stripe :
    // {
    //   name: "Stripe",
    //   service: "Paiement",
    //   purpose: "Traitement des paiements",
    //   dataTypes: ["Coordonnées paiement", "Email", "Montants"],
    //   location: "UE / Hors UE (USA)",
    //   dpaUrl: "https://stripe.com/dpa",
    //   safeguards: "CCT + mesures complémentaires",
    // },
  ] as Processor[],

  // Cookies (ne liste ici que ceux réellement utilisés)
  cookies: [
    {
      name: "__host_session",
      provider: "Fluxa",
      purpose: "Session essentielle pour rester connecté",
      type: "essential",
      duration: "Session",
    },
    // Analytics si activés :
    // {
    //   name: "_pk_id / _pk_ses (Matomo) OU _ga (GA4) OU plausible_local_storage",
    //   provider: "Outil d'analytics choisi",
    //   purpose: "Mesure d'audience (avec consentement)",
    //   type: "analytics",
    //   duration: "13 mois",
    // },
  ] as Cookie[],

  // Mineurs / Âge minimum
  agePolicy:
    "Le service s'adresse à des utilisateurs majeurs (18+). Aucune collecte sciemment réalisée auprès de mineurs.",

  // Transferts hors UE
  internationalTransfers:
    "En cas de recours à des prestataires situés hors de l'Union européenne, des garanties appropriées sont mises en place (Clauses Contractuelles Types 2021 de la Commission européenne et mesures complémentaires si nécessaire).",

  // Sécurité (résume tes mesures)
  securityMeasures:
    "Chiffrement en transit (TLS), contrôles d'accès, principe du moindre privilège, sauvegardes régulières, surveillance des journaux.",

  // Droits RGPD & réclamations (CNIL)
  dataSubjectRightsContact:
    "Pour exercer vos droits (accès, rectification, effacement, limitation, opposition, portabilité), contactez : contact@fluxa.fr.",
  complaintAuthority: "CNIL — https://www.cnil.fr/fr/plaintes",

  // Date d'effet et mises à jour
  effectiveDate: "17/10/2025",
  lastUpdateDate: "17/10/2025",
};

const Section: React.FC<{ title: string; id: string; children: React.ReactNode }> = ({
  title,
  id,
  children,
}) => (
  <section id={id} className="max-w-3xl mx-auto mb-10 scroll-mt-24">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    <div className="prose prose-invert max-w-none">{children}</div>
  </section>
);

const ListItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <li className="mb-1">
    <span className="font-medium">{label} : </span>
    <span>{value}</span>
  </li>
);

const Table: React.FC<{ headers: string[]; rows: string[][] }> = ({ headers, rows }) => (
  <div className="overflow-x-auto border border-white/10 rounded-xl">
    <table className="w-full text-left text-sm">
      <thead className="bg-white/5">
        <tr>
          {headers.map((h) => (
            <th key={h} className="px-4 py-3 font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="odd:bg-white/0 even:bg-white/[0.03]">
            {r.map((c, j) => (
              <td key={j} className="px-4 py-3 align-top whitespace-pre-wrap">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TocLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a className="text-blue-400 hover:underline" href={href}>
    {children}
  </a>
);

const PrivacyPolicy: React.FC = () => {
  const c = CONFIG;

  return (
    <main className="px-6 md:px-8 py-12 text-gray-100">
      {/* ⬇️ LOGO FLUXA CLIQUABLE */}
      <HomeLogoOverlay
        logoSrc="/logo transparent.png"
        href="/"
        size={110}
        topInsteadOfCenter={true}
        hideOnDesktop={false}
      />
      {/* ⬆️ FIN AJOUT */}

      <header className="max-w-3xl mx-auto mb-10 mt-32 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Politique de confidentialité</h1>
        <p className="text-sm mt-2 opacity-80">
          Date d'effet : {c.effectiveDate} • Dernière mise à jour : {c.lastUpdateDate}
        </p>
        <p className="mt-4">
          La présente politique explique comment <strong>{c.dataControllerName}</strong> (
          {c.legalForm}) — opérant sous le nom commercial <strong>{c.tradeName}</strong> — traite vos
          données à caractère personnel conformément au Règlement (UE) 2016/679 (RGPD) et à la loi
          Informatique & Libertés.
        </p>
      </header>

      <section className="max-w-3xl mx-auto mb-8">
        <nav className="text-sm space-x-3 space-y-2">
          <TocLink href="#identite">1. Identité & contact</TocLink>
          <TocLink href="#donnees">2. Données collectées</TocLink>
          <TocLink href="#finalites">3. Finalités & bases légales</TocLink>
          <TocLink href="#destinataires">4. Destinataires / sous-traitants</TocLink>
          <TocLink href="#transferts">5. Transferts hors UE</TocLink>
          <TocLink href="#conservation">6. Durées de conservation</TocLink>
          <TocLink href="#securite">7. Sécurité</TocLink>
          <TocLink href="#cookies">8. Cookies</TocLink>
          <TocLink href="#droits">9. Vos droits</TocLink>
          <TocLink href="#contact">10. Nous contacter</TocLink>
          <TocLink href="#maj">11. Mises à jour</TocLink>
        </nav>
      </section>

      <Section id="identite" title="1. Identité du responsable & contact">
        <ul className="list-disc ml-5">
          <ListItem label="Responsable de traitement" value={`${c.dataControllerName} (${c.legalForm})`} />
          <ListItem label="Nom commercial" value={c.tradeName} />
          <ListItem label="Adresse" value={`${c.companyAddress} — ${c.country}`} />
          <ListItem label="Site" value={c.websiteUrl} />
          <ListItem label="Email de contact" value={c.contactEmail} />
          {c.dpoEmail && <ListItem label="DPO" value={c.dpoEmail} />}
          {c.companyId.siret && <ListItem label="SIRET" value={c.companyId.siret} />}
          {c.companyId.rcs && <ListItem label="RCS" value={c.companyId.rcs} />}
          {c.companyId.vat && <ListItem label="TVA" value={c.companyId.vat} />}
          <ListItem label="Hébergeur" value={`${c.hosting.provider} — ${c.hosting.location}`} />
        </ul>
      </Section>

      <Section id="donnees" title="2. Données que nous collectons">
        <ul className="list-disc ml-5">
          {c.dataCategories.map((d) => (
            <li key={d} className="mb-1">
              {d}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm opacity-80">
          Le caractère obligatoire de certaines données est indiqué lors de la collecte. À défaut, le
          service pourrait être limité ou indisponible.
        </p>
      </Section>

      <Section id="finalites" title="3. Finalités & bases légales">
        <Table headers={["Finalité", "Base légale"]} rows={c.purposes.map((p) => [p.title, p.legalBasis])} />
      </Section>

      <Section id="destinataires" title="4. Destinataires & sous-traitants">
        <p className="mb-4">
          Vos données peuvent être accessibles à l'éditeur ({c.dataControllerName}) et à des sous-traitants
          dûment encadrés (contrats conformes art. 28 RGPD) strictement nécessaires à la fourniture du service.
        </p>
        <Table
          headers={["Prestataire", "Service", "Finalité", "Données traitées", "Localisation / garanties", "DPA"]}
          rows={c.processors.map((p) => [
            p.name,
            p.service,
            p.purpose,
            p.dataTypes.join(", "),
            `${p.location}${p.safeguards ? ` — ${p.safeguards}` : ""}`,
            p.dpaUrl ? p.dpaUrl : "—",
          ])}
        />
      </Section>

      <Section id="transferts" title="5. Transferts hors UE">
        <p>{c.internationalTransfers}</p>
      </Section>

      <Section id="conservation" title="6. Durées de conservation">
        <Table headers={["Catégorie", "Durée"]} rows={c.retention.map((r) => [r.item, r.duration])} />
      </Section>

      <Section id="securite" title="7. Sécurité">
        <p>{c.securityMeasures}</p>
      </Section>

      <Section id="cookies" title="8. Cookies">
        <p className="mb-4">
          Nous utilisons des cookies nécessaires au fonctionnement du site et, avec votre consentement, des
          cookies de mesure d'audience si ceux-ci sont activés.
        </p>
        <Table
          headers={["Nom", "Fournisseur", "Finalité", "Type", "Durée"]}
          rows={c.cookies.map((ck) => [ck.name, ck.provider, ck.purpose, ck.type, ck.duration])}
        />
        <p className="mt-4 text-sm opacity-80">
          Vous pouvez gérer vos préférences via notre bandeau de consentement à tout moment.
        </p>
      </Section>

      <Section id="droits" title="9. Vos droits (RGPD)">
        <ul className="list-disc ml-5">
          <li>Accès, rectification, effacement, limitation, opposition, portabilité.</li>
          <li>Retrait du consentement à tout moment pour les traitements fondés sur le consentement.</li>
          <li>Droit de définir des directives relatives au sort de vos données après décès.</li>
        </ul>
        <p className="mt-4">{c.dataSubjectRightsContact}</p>
        <p className="mt-2">
          Vous pouvez également introduire une réclamation auprès de l'autorité de contrôle : {c.complaintAuthority}.
        </p>
      </Section>

      <Section id="contact" title="10. Nous contacter">
        <ul className="list-disc ml-5">
          <ListItem label="Support / RGPD" value={c.contactEmail} />
          {c.dpoEmail && <ListItem label="DPO" value={c.dpoEmail} />}
          <ListItem label="Adresse postale" value={`${c.companyAddress} — ${c.country}`} />
        </ul>
      </Section>

      <Section id="maj" title="11. Mises à jour">
        <p>
          Nous pouvons modifier la présente politique pour refléter des évolutions légales, techniques ou
          opérationnelles. La version applicable est celle publiée à la date indiquée en en-tête. En cas de
          changements majeurs, une information spécifique pourra être diffusée.
        </p>
      </Section>

      <footer className="max-w-3xl mx-auto text-xs opacity-70">
        © {new Date().getFullYear()} {CONFIG.tradeName}. Tous droits réservés.
      </footer>
    </main>
  );
};

export default PrivacyPolicy