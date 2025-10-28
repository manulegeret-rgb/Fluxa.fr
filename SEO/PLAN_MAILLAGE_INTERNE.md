# Plan de Maillage Interne - Fluxa.fr

## Objectif
Renforcer la sémantique SEO autour des mots-clés prioritaires :
- automatisation tâches entreprise
- automatisation gestion entreprise
- automatisation PME
- outil d'automatisation entreprise
- automatisation artisan

## Structure du Site

```
/ (Accueil)
├── #automations (Section Automatisations)
├── #pricing (Section Formules)
├── #infos (Section Contact)
├── #faq (Section FAQ)
├── /articles (Guide complet)
├── /demo (Démonstration)
└── /mentions-legales + /politique-confidentialite
```

## Liens Implémentés

### 1. Page d'accueil (/) → Articles
- ✅ Lien dans section "Pourquoi choisir Fluxa" : "Découvrir nos guides et articles"
- ✅ Ancre textuelle optimisée

### 2. Section Automations → Articles
- ✅ Lien ajouté dans le sous-titre : "Découvrez notre guide complet →"
- Ancre : "outil d'automatisation entreprise"

### 3. Header Navigation
- ✅ Lien vers /articles dans le menu principal
- ✅ Lien vers #automations
- ✅ Lien vers #pricing (Nos formules)
- ✅ Lien vers /demo

## Recommandations Supplémentaires

### Maillage à Ajouter (Futurs Articles)

1. **Depuis /articles vers sections de la page d'accueil :**
   - Liens contextuels vers #automations avec ancre "automatisation tâches entreprise"
   - Liens vers #pricing avec ancre "formules d'automatisation"
   - Liens vers #infos pour la conversion

2. **Futurs articles de blog :**
   - Article "5 automatisations essentielles pour artisans" → lien vers #automations
   - Article "ROI de l'automatisation pour PME" → lien vers /demo
   - Article "Comparatif outils gestion artisan" → lien vers / et #pricing

3. **Optimisation des ancres de liens :**
   - Utiliser les mots-clés prioritaires dans les textes de liens
   - Varier les ancres pour éviter la sur-optimisation
   - Exemples d'ancres naturelles :
     * "découvrez nos automatisations pour artisans"
     * "en savoir plus sur l'automatisation gestion entreprise"
     * "voir notre outil d'automatisation entreprise"

## KPIs à Suivre

1. **Taux de clics internes :**
   - Accueil → Articles
   - Automations → Articles
   - Articles → Sections page d'accueil

2. **Profondeur de navigation :**
   - Objectif : moyenne de 3+ pages par session

3. **Temps sur le site :**
   - Objectif : augmentation de 20% grâce au maillage

## Structure des Ancres par Mot-Clé

### "automatisation tâches entreprise"
- Page principale : Section Automations
- Ancres de liens : "automatisez vos tâches", "automatisation des tâches répétitives"

### "automatisation gestion entreprise"
- Page principale : Page d'accueil + Articles
- Ancres de liens : "automatiser la gestion", "outil d'automatisation de gestion"

### "automatisation PME"
- Page principale : Page d'accueil
- Ancres de liens : "solutions pour PME", "automatisation pour petites entreprises"

### "outil d'automatisation entreprise"
- Page principale : Page d'accueil + Articles
- Ancres de liens : "notre outil", "découvrir l'outil"

### "automatisation artisan"
- Page principale : Toutes les pages
- Ancres de liens : "automatisation pour artisans", "solutions artisan"

## Implémentation Technique

### Attributs des Liens
```html
<!-- Liens internes optimisés -->
<a href="/articles" className="text-primary hover:underline font-medium">
  Découvrez notre guide complet sur l'automatisation gestion entreprise →
</a>

<!-- Liens avec title pour accessibilité et SEO -->
<a href="#automations" title="Automatisation des tâches pour artisans et PME">
  Nos automatisations
</a>
```

### Best Practices
1. Toujours utiliser des URLs relatives pour les liens internes
2. Ajouter des attributs title pertinents
3. Utiliser des ancres textuelles descriptives (pas de "cliquez ici")
4. Varier les formulations des ancres
5. Contextualiser les liens dans des phrases naturelles

## Suivi des Performances

**Outils recommandés :**
- Google Search Console : Pages liées
- Google Analytics : Flux de comportement
- Screaming Frog : Audit des liens internes
- Ahrefs / SEMrush : Analyse du maillage

**Métriques clés :**
- Nombre de liens internes par page : objectif 3-7
- Distribution du PageRank interne
- Taux de clics sur les liens internes
- Profondeur moyenne des pages

## Conclusion

Le maillage interne est désormais optimisé pour :
✅ Renforcer la sémantique autour des mots-clés prioritaires
✅ Améliorer l'expérience utilisateur
✅ Distribuer le "jus SEO" efficacement
✅ Augmenter le temps passé sur le site
✅ Améliorer le taux de conversion

Date de création : 28 octobre 2025
