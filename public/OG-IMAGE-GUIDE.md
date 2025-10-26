# Guide - Création de l'image Open Graph (og-image.png)

## 📐 Spécifications techniques

**Nom du fichier :** `og-image.png`
**Emplacement :** `/public/og-image.png`
**Dimensions :** 1200 x 630 pixels
**Format :** PNG ou JPG
**Poids max recommandé :** 1 MB (idéalement < 500 KB)

## 🎨 Contenu recommandé

### Éléments visuels à inclure :
1. **Logo Fluxa** (en haut à gauche ou centré)
2. **Titre accrocheur :**
   - "Fluxa - Outil de gestion sur mesure"
   - "pour artisans & indépendants"
3. **Message clé :**
   - "Automatisez vos rappels, relances et factures"
   - "Gagnez 6-12h par semaine"
4. **Visuel du dashboard** (mockup en arrière-plan avec opacité réduite)
5. **Call-to-action :** "fluxa.fr"

### Style visuel :
- Fond sombre (cohérent avec le site : #0b0b0b ou gradient)
- Texte blanc ou clair pour contraste
- Accent bleu primary (#3B82F6) pour les éléments importants
- Design moderne, épuré, professionnel

## 🛠️ Outils de création

### Option 1 : Canva (Recommandé - Gratuit)
1. Créer un design personnalisé 1200x630px
2. Utiliser les templates "Open Graph" ou "Social Media"
3. Importer votre logo et mockup
4. Exporter en PNG

### Option 2 : Figma (Professionnel)
1. Créer un frame 1200x630px
2. Designer selon les specs ci-dessus
3. Exporter en PNG @2x puis redimensionner

### Option 3 : Photoshop / GIMP
1. Nouveau document 1200x630px, 72 DPI
2. Composer les éléments
3. Exporter pour le web (PNG-24)

## ✅ Checklist avant export

- [ ] Dimensions exactes : 1200 x 630 pixels
- [ ] Texte lisible même en petit (prévisualisation à 50%)
- [ ] Logo Fluxa visible
- [ ] Message clair et concis
- [ ] Poids < 500 KB
- [ ] Test sur [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test sur [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## 📍 Placement du fichier

Une fois créée, placez l'image ici :
```
/public/og-image.png
```

Le fichier sera automatiquement accessible à l'URL :
```
https://fluxa.fr/og-image.png
```

## 🔄 Mise à jour

Après avoir ajouté l'image :
1. Vérifier qu'elle s'affiche : https://fluxa.fr/og-image.png
2. Tester le partage sur Facebook/LinkedIn/Twitter
3. Utiliser le [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) pour forcer le rafraîchissement du cache

## 💡 Exemple de composition

```
┌─────────────────────────────────────────────────────┐
│  [Logo Fluxa]                                       │
│                                                     │
│         Fluxa                                       │
│    Outil de gestion sur mesure                     │
│    pour artisans & indépendants                    │
│                                                     │
│    ✓ Automatisation des rappels et relances        │
│    ✓ Gagnez 6-12h par semaine                      │
│    ✓ Devis personnalisé sous 24-48h                │
│                                                     │
│    [Mockup du dashboard en transparence]           │
│                                                     │
│                              fluxa.fr               │
└─────────────────────────────────────────────────────┘
```

## 🚀 Alternative temporaire

Si vous n'avez pas le temps de créer une image custom immédiatement :
- Utilisez une capture d'écran optimisée de votre dashboard
- Ajoutez un titre/overlay avec un outil simple comme Canva
- Mettez à jour dès que possible avec un design professionnel
