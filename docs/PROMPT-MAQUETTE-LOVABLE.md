# Prompt master — Maquette prospect Fluxa

Usage : remplir le BLOC VARIABLES, copier-coller l'intégralité dans un **nouveau projet Lovable**.
Objectif : une home page one-shot, effet waouh, à montrer avant devis.

---

## 1. BLOC VARIABLES (à remplir avant chaque envoi)

```
NOM_ENTREPRISE   : [ex. Menuiserie Berthet]
MÉTIER           : [ex. menuisier agenceur]
VILLE / ZONE     : [ex. Chambéry et Savoie]
ANCIENNETÉ       : [ex. depuis 2011 / 12 ans d'expérience]
PROMESSE         : [ce qu'il fait de mieux, en une phrase, ses mots à lui]
PREUVES          : [3 chiffres réels : chantiers, années, délai, garantie, note Google]
SERVICES         : [3 à 5 prestations concrètes]
ACTION VOULUE    : [appel / devis / prise de RDV]
TÉLÉPHONE        : [numéro réel ou 04 XX XX XX XX]
AMBIANCE         : [voir §2 — choisir une ligne]
SITE ACTUEL      : [URL, ou "aucun" / "page Facebook uniquement"]
```

---

## 2. AMBIANCE — choisir UNE ligne selon le métier

| Métier | Fond | Accent | Display / Body | Matière |
|---|---|---|---|---|
| Menuisier, ébéniste | `#14100C` | `#C8863C` ambre | Fraunces / Inter | grain bois, chaleur |
| Plombier, chauffagiste | `#F7F9FB` clair | `#0B6BCB` bleu franc | Sora / Inter | net, clinique, fiable |
| Électricien | `#0B0F14` | `#F2B705` jaune | Sora / Inter | contraste, précision |
| Paysagiste | `#0E1410` | `#5C9A5C` vert | Fraunces / Inter | organique, respirant |
| Maçon, terrassier | `#12100E` | `#B7410E` rouille | Archivo / Inter | brut, massif |
| Coiffeur, esthétique | `#FAF7F5` clair | `#8C6A5D` taupe | Cormorant / Inter | doux, éditorial |
| Restaurant, boulanger | `#1A1310` | `#D4A017` doré | Fraunces / Inter | appétissant, texturé |
| Consultant, expert-comptable | `#0A0F1A` | `#3B82F6` bleu | Sora / Inter | sobre, tech, sérieux |

Règle : **3 couleurs maximum** (fond, accent, texte) + neutres. Aucune autre teinte.

---

## 3. LE PROMPT (copier à partir d'ici)

> Tu es directeur artistique senior. Tu conçois **une seule page** : la home de `NOM_ENTREPRISE`, `MÉTIER` à `VILLE`.
> Ce n'est pas un template rempli. C'est une page dessinée pour cette entreprise et pour elle seule.
>
> **Stack** : React + TypeScript + Tailwind. Une page unique, aucune route. Zéro dépendance UI externe. Animations en CSS pur ou framer-motion uniquement.
>
> **Direction artistique — non négociable**
> - Fond `[FOND]`, accent `[ACCENT]`, texte neutre. Trois couleurs, pas une de plus. L'accent apparaît sur moins de 10% de la surface : c'est ce qui fait cher.
> - Typo : `[DISPLAY]` pour les titres (Google Fonts), `[BODY]` pour le texte courant. Jamais Inter ni Roboto en titre.
> - H1 en `clamp(48px, 8vw, 92px)`, `font-weight: 800`, `letter-spacing: -0.04em`, `line-height: 1.05`.
> - Respiration : sections à `120px` de padding vertical desktop, `72px` mobile. Le vide fait partie du design.
> - Radius cohérent partout : `14px` boutons, `20px` cartes. Jamais de mélange.
> - Motion qui chuchote : apparition `translateY(20px) + blur(8px) → 0` en stagger de 120ms au scroll, une seule fois. Rien qui clignote, rien qui rebondit, aucun carrousel automatique.
> - Aucune stock photo générique. Utiliser des blocs de couleur, du grain, des dégradés maîtrisés, ou des placeholders `[PHOTO CLIENT : description]` clairement identifiés.
>
> **Structure de la page — dans cet ordre exact**
>
> 1. **Hero plein écran.** Micro-badge (`MÉTIER · VILLE`). H1 = la PROMESSE en 4 à 7 mots, pas un slogan creux. Sous-titre d'une phrase. Deux boutons : `[ACTION VOULUE]` en primaire, "Voir nos réalisations" en secondaire. Sous les boutons, une ligne discrète : les 3 PREUVES séparées par des points.
> 2. **Bande de réassurance.** Les 3 PREUVES en gros chiffres. Desktop : 3 colonnes. Mobile : scroll horizontal au doigt, une carte visible à la fois, snap. Jamais une grille écrasée.
> 3. **Services.** Les SERVICES en cartes. Titre + une phrase concrète chacun. Une icône trait fin, jamais d'emoji.
> 4. **Réalisations.** Grille de 3 à 6 placeholders `[PHOTO CLIENT]` en ratio cohérent, légende métier au survol. Bord fin, pas d'ombre lourde.
> 5. **L'entreprise.** ANCIENNETÉ et zone d'intervention. Ton humain, à la première personne. Placeholder `[PHOTO DU DIRIGEANT]`. Court : 3 phrases maximum.
> 6. **Contact.** Formulaire nom / téléphone / message, plus le TÉLÉPHONE en clic-to-call visible. Sur mobile, le bouton d'appel reste accessible en bas d'écran.
> 7. **Footer.** Sobre. Nom, ville, téléphone, mentions légales.
>
> **Rédaction**
> - Français. Vouvoiement. Phrases courtes.
> - **Jamais de tiret long (—) dans un texte visible.** Ça sonne IA.
> - Zéro superlatif creux : pas de "solutions innovantes", pas d'"excellence", pas de "passion". On dit ce que l'entreprise fait, concrètement.
> - Les chiffres portent la crédibilité, pas les adjectifs.
>
> **Mobile**
> Le mobile est dessiné, pas rétréci. Décisions propres : le hero tient sans scroll, la réassurance devient un swipe, les cartes passent pleine largeur, le CTA d'appel est toujours atteignable au pouce.
>
> **Technique invisible**
> HTML sémantique (`header`, `main`, `section`, `footer`, un seul `h1`). Contraste WCAG AA minimum partout. `<title>` et `meta description` réels contenant `MÉTIER` et `VILLE`. Aucune image lourde. Objectif : chargement sous 2 secondes.
>
> **Ce que je refuse**
> Template Bootstrap déguisé. Dégradé arc-en-ciel. Ombres portées violentes. AOS fade-up sur chaque élément. Carrousel de témoignages. Icônes emoji. Lorem ipsum. Section "Nos valeurs" avec trois icônes creuses.
>
> Livre la page complète en un seul fichier React. Un designer doit la regarder sans lever les yeux au ciel.

---

## 4. Après génération — passe de contrôle

Vérifier avant d'envoyer au prospect ($10K Checklist) :

- [ ] Parti pris assumé, pas un template
- [ ] Typo display intentionnelle, pas Inter en titre
- [ ] 3 couleurs maximum, accent < 10% de la surface
- [ ] Ça respire (120px de section, hiérarchie nette)
- [ ] Aucune stock photo générique
- [ ] Motion subtile, une seule fois, jamais en boucle
- [ ] Mobile pensé (swipe, CTA au pouce), pas compressé
- [ ] Sous 2s, contraste AA, HTML sémantique, vraies meta
- [ ] Aucun tiret long dans les textes visibles
- [ ] Le prospect se reconnaît : son métier, sa ville, ses chiffres

---

## 5. Pitch d'envoi au prospect

> Bonjour [Prénom],
>
> J'ai pris une heure pour maquetter ce que pourrait donner votre site. Rien n'est figé, c'est une base de discussion : [LIEN]
>
> Si la direction vous parle, on l'affine ensemble avant de parler devis.
>
> [Signature]

La maquette est offerte. C'est elle qui vend, pas le devis.
