import React from "react";
import HomeLogoOverlay from "@/components/HomeLogoOverlay";
import PageSEO from "@/components/PageSEO";

/**
 * Politique de confidentialité — Fluxa
 * Responsable de traitement : Emmanuel Légeret (Entrepreneur individuel)
 * RGPD / CNIL
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
  legalForm: "Entrepreneur individuel",
  tradeName: "Fluxa",
  companyAddress: "36 rue des Criquets, 73160 Cognin",
  country: "France",
  companyId: {
    siret: "83014496000044",
    siren: "830144960",
    rcs: "",
    vat: "Non assujetti — franchise en base art. 293B CGI",
  },
  websiteUrl: "https://www.fluxa.fr",
  contactEmail: "fluxa.contact@gmail.com",
  dpoEmail: "",
  dataControllerName: "Emmanuel Légeret",

  // Hébergement
  hosting: {
    provider: "IONOS SARL",
    location: "France (7, place de la Gare, BP 70109, 57201 Sarreguemines Cedex)",
    address: "7, place de la Gare, BP 70109, 57201 Sarreguemines Cedex",
  },

  // Finalités & bases légales
  purposes: [
    { title: "Présentation des services et réponse aux demandes de contact", legalBasis: "Intérêt légitime (art. 6.1.f RGPD)" },
    { title: "Fourniture du service commandé (création de site vitrine)", legalBasis: "Exécution du contrat (art. 6.1.b RGPD)" },
    { title: "Facturation & obligations comptables", legalBasis: "Obligation légale (art. 6.1.c RGPD)" },
    { title: "Statistiques d'audience (si activées)", legalBasis: "Consentement (art. 6.1.a RGPD)" },
  ],

  // Catégories de données traitées
  dataCategories: [
    "Identité (nom, prénom, nom de l'entreprise le cas échéant)",
    "Coordonnées (email, téléphone, adresse si fournie)",
    "Données relatives à la prestation (projet, échanges, documents partagés)",
    "Données de facturation (montants, coordonnées de facturation)",
    "Données techniques (adresse IP, device, pages consultées)",
  ],

  // Durées de conservation
  retention: [
    { item: "Données de contact (formulaire, échanges email)", duration: "3 ans à compter du dernier contact" },
    { item: "Documents contractuels (devis, contrats)", duration: "5 ans à compter de la fin du contrat" },
    { item: "Factures & pièces comptables", duration: "10 ans (obligation légale française)" },
    { item: "Données techniques (logs)", duration: "12 mois" },
  ],

  // Sous-traitants
  processors: [
    {
      name: "IONOS SARL",
      service: "Hébergement web",
      purpose: "Hébergement du site www.fluxa.fr",
      dataTypes: ["Logs techniques", "IP", "URLs"],
      location: "UE (France / Allemagne)",
      dpaUrl: "https://www.ionos.fr/terms-gtc/politique-de-confidentialite/",
    },
  ] as Processor[],

  // Cookies (site vitrine sans tracking — aucun cookie non essentiel)
  cookies: [
    {
      name: "Aucun cookie de traçage",
      provider: "Fluxa",
      purpose: "Le site ne dépose aucun cookie publicitaire ou analytique",
      type: "essential",
      duration: "—",
    },
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
    "Pour exercer vos droits (accès, rectification, effacement, limitation, opposition, portabilité), contactez : fluxa.contact@gmail.com.",
  complaintAuthority: "CNIL — https://www.cnil.fr/fr/plaintes",

  // Date d'effet et mises à jour
  effectiveDate: "17/03/2026",
  lastUpdateDate: "17/03/2026",
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
      {/* SEO optimisé */}
      <PageSEO
        title="Politique de confidentialité — Fluxa"
        description="Politique de confidentialité de Fluxa, agence web création sites vitrines. Protection des données personnelles, traitement RGPD et vos droits (accès, rectification, suppression)."
        canonicalPath="/politique-confidentialite"
        noindex={false}
      />

      <HomeLogoOverlay
        logoSrc="/logo transparent.png"
        href="/"
        size={110}
        topInsteadOfCenter={true}
        hideOnDesktop={false}
      />

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
          {c.companyId.siren && <ListItem label="SIREN" value={c.companyId.siren} />}
          {c.companyId.siret && <ListItem label="SIRET" value={c.companyId.siret} />}
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
          Le site <strong>www.fluxa.fr</strong> ne dépose aucun cookie de suivi, publicitaire ou
          analytique. Aucun outil de mesure d'audience n'est actif. En cas d'activation future de
          tels outils, la présente politique sera mise à jour et un bandeau de consentement sera
          affiché conformément aux recommandations de la CNIL.
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