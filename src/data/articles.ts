// Métadonnées des articles Fluxa
// Création de sites vitrines pour artisans et TPE

export interface Article {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  categoryName: string;
  keywords: string[];
  readingTime: number;
  publishDate: string;
  author: string;
  image: string;
  filename: string;
}

export const ARTICLES: Article[] = [
  {
    "id": "pourquoi-un-site-vitrine-est-indispensable-pour-un-artisan-en-2025",
    "slug": "pourquoi-un-site-vitrine-est-indispensable-pour-un-artisan-en-2025",
    "title": "Pourquoi un site internet est indispensable pour un artisan en 2026",
    "metaDescription": "En 2026, un artisan sans site internet perd des clients chaque semaine. Visibilité, crédibilité, contacts : voici tout ce qu'un site vous apporte.",
    "excerpt": "En 2026, un artisan sans site internet passe à côté de nombreuses opportunités. La majorité de vos futurs clients commencent leurs recherches en ligne avant de vous contacter. Un site professionnel vous permet d'être trouvé, de présenter vos réalisations et d'inspirer confiance dès le premier contact...",
    "category": "site-vitrine",
    "categoryName": "Site internet",
    "keywords": ["site vitrine artisan", "présence en ligne", "site internet professionnel", "création site artisan"],
    "readingTime": 4,
    "publishDate": "2026-01-15",
    "author": "Emmanuel Légeret",
    "image": "/articles/site-vitrine-artisan.jpg",
    "filename": "site-vitrine-artisan-2025.docx"
  },
  {
    "id": "combien-coute-un-site-vitrine-professionnel-en-2025",
    "slug": "combien-coute-un-site-vitrine-professionnel-en-2025",
    "title": "Combien coûte un site internet professionnel en 2026 ?",
    "metaDescription": "Prix d'un site internet professionnel en 2026 : tarifs réels selon les prestataires, ce qui doit être inclus et comment éviter les mauvaises surprises.",
    "excerpt": "Le prix d'un site internet varie énormément selon les prestataires. Entre 500€ et plusieurs milliers d'euros, comment s'y retrouver ? Ce guide vous explique ce qui justifie les différences de tarifs, ce qui doit être inclus dans une offre sérieuse, et comment éviter les mauvaises surprises...",
    "category": "site-vitrine",
    "categoryName": "Site internet",
    "keywords": ["prix site vitrine", "coût site internet", "tarif création site web", "site vitrine clé en main"],
    "readingTime": 5,
    "publishDate": "2026-01-20",
    "author": "Emmanuel Légeret",
    "image": "/articles/cout-site-vitrine.jpg",
    "filename": "cout-site-vitrine-2025.docx"
  },
  {
    "id": "site-vitrine-vs-page-facebook-quelle-difference-pour-votre-activite",
    "slug": "site-vitrine-vs-page-facebook-quelle-difference-pour-votre-activite",
    "title": "Site internet vs page Facebook : quelle différence pour votre activité ?",
    "metaDescription": "Site internet ou page Facebook pour votre activité ? Comparatif honnête des deux options et pourquoi elles sont complémentaires plutôt que concurrentes.",
    "excerpt": "Beaucoup d'artisans et d'indépendants se demandent si une page Facebook suffit. La réponse courte : non. Un site et une page Facebook ont des rôles complémentaires mais très différents. Le site vous appartient, il est indexé sur Google, et il vous représente 24h/24...",
    "category": "site-vitrine",
    "categoryName": "Site internet",
    "keywords": ["site vitrine vs Facebook", "page Facebook artisan", "site internet vs réseaux sociaux"],
    "readingTime": 4,
    "publishDate": "2026-01-25",
    "author": "Emmanuel Légeret",
    "image": "/articles/site-vitrine-vs-facebook.jpg",
    "filename": "site-vitrine-vs-facebook.docx"
  },
  {
    "id": "seo-local-artisan-comment-apparaitre-dans-google-maps-et-les-recherches-locales",
    "slug": "seo-local-artisan-comment-apparaitre-dans-google-maps-et-les-recherches-locales",
    "title": "SEO local pour artisan : comment apparaître dans Google Maps et les recherches locales",
    "metaDescription": "Guide du référencement local pour artisans : Google Business Profile, avis, mots-clés géolocalisés et site optimisé pour apparaître près de chez vous.",
    "excerpt": "Quand un particulier tape 'plombier Paris' ou 'électricien Lyon' sur Google, il voit en premier les résultats locaux. Comment faire partie de ces résultats ? Le SEO local est la clé. Entre Google Business Profile, les avis clients et l'optimisation de votre site, voici comment gagner en visibilité près de chez vous...",
    "category": "seo-visibilite",
    "categoryName": "SEO & Visibilité",
    "keywords": ["SEO local artisan", "Google Maps artisan", "référencement local", "visibilité Google"],
    "readingTime": 5,
    "publishDate": "2026-02-01",
    "author": "Emmanuel Légeret",
    "image": "/articles/seo-local-artisan.jpg",
    "filename": "seo-local-artisan.docx"
  },
  {
    "id": "pourquoi-votre-site-doit-etre-responsive-mobile-en-2025",
    "slug": "pourquoi-votre-site-doit-etre-responsive-mobile-en-2025",
    "title": "Pourquoi votre site doit être responsive mobile en 2026",
    "metaDescription": "Plus de 70% des visites se font sur mobile. Découvrez pourquoi un site responsive est indispensable et comment il influence votre référencement Google.",
    "excerpt": "En 2026, la majorité des internautes naviguent depuis leur smartphone. Si votre site ne s'affiche pas correctement sur mobile, vous perdez des clients avant même qu'ils aient pu vous contacter. Google pénalise aussi les sites non-responsive dans ses résultats de recherche...",
    "category": "seo-visibilite",
    "categoryName": "SEO & Visibilité",
    "keywords": ["site responsive mobile", "design mobile-first", "site internet mobile artisan"],
    "readingTime": 3,
    "publishDate": "2026-02-05",
    "author": "Emmanuel Légeret",
    "image": "/articles/site-responsive-mobile.jpg",
    "filename": "site-responsive-mobile-2025.docx"
  },
  {
    "id": "comment-obtenir-des-avis-google-pour-son-activite-artisanale",
    "slug": "comment-obtenir-des-avis-google-pour-son-activite-artisanale",
    "title": "Comment obtenir des avis Google pour son activité artisanale",
    "metaDescription": "Les avis Google sont essentiels pour la crédibilité de votre activité. Découvrez comment obtenir plus d'avis clients facilement et booster votre référencement local.",
    "excerpt": "Les avis Google sont devenus le bouche-à-oreille numérique. Un artisan avec 50 avis 5 étoiles sera toujours plus rassurant qu'un concurrent sans avis. Comment demander des avis clients sans être intrusif ? Quelles sont les bonnes pratiques pour y répondre ?...",
    "category": "seo-visibilite",
    "categoryName": "SEO & Visibilité",
    "keywords": ["avis Google artisan", "avis clients", "réputation en ligne", "Google Business"],
    "readingTime": 4,
    "publishDate": "2026-02-10",
    "author": "Emmanuel Légeret",
    "image": "/articles/avis-google-artisan.jpg",
    "filename": "avis-google-artisan.docx"
  },
  {
    "id": "5-pages-indispensables-pour-un-site-vitrine-artisan-efficace",
    "slug": "5-pages-indispensables-pour-un-site-vitrine-artisan-efficace",
    "title": "5 pages indispensables pour un site d'artisan efficace",
    "metaDescription": "Quelles pages inclure dans le site d'un artisan pour convertir les visiteurs en clients ? Découvrez les 5 pages essentielles et leur contenu idéal.",
    "excerpt": "Un site d'artisan n'a pas besoin d'être complexe pour être efficace. Mais certaines pages sont absolument indispensables pour rassurer vos visiteurs et les inciter à vous contacter. Voici les 5 pages à absolument avoir, avec ce que chacune doit contenir pour convertir...",
    "category": "conseils-web",
    "categoryName": "Conseils pratiques",
    "keywords": ["pages site vitrine", "structure site artisan", "site internet artisan"],
    "readingTime": 5,
    "publishDate": "2026-02-15",
    "author": "Emmanuel Légeret",
    "image": "/articles/pages-site-vitrine.jpg",
    "filename": "pages-site-vitrine-artisan.docx"
  },
  {
    "id": "galerie-photos-realisations-comment-mettre-en-valeur-votre-travail-en-ligne",
    "slug": "galerie-photos-realisations-comment-mettre-en-valeur-votre-travail-en-ligne",
    "title": "Galerie photos de réalisations : comment mettre en valeur votre travail en ligne",
    "metaDescription": "Une belle galerie de réalisations est votre meilleur argument commercial. Voici comment photographier et présenter vos chantiers pour convaincre vos futurs clients.",
    "excerpt": "Pour un artisan, les photos de réalisations valent mieux que n'importe quel discours. Un chantier bien présenté, une cuisine rénovée, un jardin aménagé : vos photos montrent votre savoir-faire avant même le premier contact. Comment les présenter de façon professionnelle ?...",
    "category": "conseils-web",
    "categoryName": "Conseils pratiques",
    "keywords": ["galerie photos réalisations", "portfolio artisan", "photos travaux artisan"],
    "readingTime": 4,
    "publishDate": "2026-02-20",
    "author": "Emmanuel Légeret",
    "image": "/articles/galerie-realisations.jpg",
    "filename": "galerie-realisations-artisan.docx"
  },
  {
    "id": "prise-de-rendez-vous-en-ligne-pourquoi-et-comment-lajouter-a-votre-site",
    "slug": "prise-de-rendez-vous-en-ligne-pourquoi-et-comment-lajouter-a-votre-site",
    "title": "Prise de rendez-vous en ligne : pourquoi et comment l'ajouter à votre site",
    "metaDescription": "La prise de rendez-vous en ligne simplifie la vie de vos clients et remplit votre agenda. Découvrez ses avantages et comment l'intégrer à votre site internet.",
    "excerpt": "Combien de fois avez-vous échangé 5 messages pour trouver un créneau disponible ? La prise de rendez-vous en ligne règle ce problème : vos clients choisissent eux-mêmes un horaire selon vos disponibilités. Résultat : moins de friction, plus de réservations...",
    "category": "conseils-web",
    "categoryName": "Conseils pratiques",
    "keywords": ["prise de rendez-vous en ligne", "réservation en ligne artisan", "calendrier en ligne"],
    "readingTime": 4,
    "publishDate": "2026-02-25",
    "author": "Emmanuel Légeret",
    "image": "/articles/prise-rdv-en-ligne.jpg",
    "filename": "prise-rdv-en-ligne.docx"
  },
  {
    "id": "hebergement-web-nom-de-domaine-ce-quil-faut-savoir-pour-votre-site",
    "slug": "hebergement-web-nom-de-domaine-ce-quil-faut-savoir-pour-votre-site",
    "title": "Hébergement web et nom de domaine : ce qu'il faut savoir pour votre site",
    "metaDescription": "Hébergement, nom de domaine, certificat SSL : comprenez simplement ces notions essentielles pour choisir la bonne offre et éviter les mauvaises surprises.",
    "excerpt": "Hébergement, nom de domaine, certificat SSL… Ces termes techniques sont souvent source de confusion pour les artisans. Pourtant, ils sont fondamentaux pour votre site. On vous explique simplement ce que c'est, pourquoi c'est important, et ce qui doit être inclus dans une offre sérieuse...",
    "category": "conseils-web",
    "categoryName": "Conseils pratiques",
    "keywords": ["hébergement web", "nom de domaine", "certificat SSL", "site internet sécurisé"],
    "readingTime": 5,
    "publishDate": "2026-03-01",
    "author": "Emmanuel Légeret",
    "image": "/articles/hebergement-nom-domaine.jpg",
    "filename": "hebergement-nom-domaine.docx"
  },
  {
    "id": "comment-rediger-les-textes-de-votre-site-vitrine-pour-attirer-des-clients",
    "slug": "comment-rediger-les-textes-de-votre-site-vitrine-pour-attirer-des-clients",
    "title": "Comment rédiger les textes de votre site pour attirer des clients",
    "metaDescription": "Les textes de votre site web font la différence entre un visiteur et un client. Voici nos conseils pour bien les rédiger, même sans être rédacteur professionnel.",
    "excerpt": "Un bon design ne suffit pas si vos textes ne parlent pas à vos visiteurs. Vos clients potentiels veulent savoir qui vous êtes, ce que vous faites, et pourquoi vous choisir vous plutôt qu'un concurrent. Voici comment rédiger un contenu web efficace, même sans être rédacteur professionnel...",
    "category": "conseils-web",
    "categoryName": "Conseils pratiques",
    "keywords": ["rédiger textes site web", "contenu site vitrine", "copywriting artisan"],
    "readingTime": 5,
    "publishDate": "2026-03-05",
    "author": "Emmanuel Légeret",
    "image": "/articles/rediger-textes-site.jpg",
    "filename": "rediger-textes-site-vitrine.docx"
  },
  {
    "id": "maintenance-site-internet-pourquoi-cest-indispensable",
    "slug": "maintenance-site-internet-pourquoi-cest-indispensable",
    "title": "Maintenance d'un site internet : pourquoi c'est indispensable",
    "metaDescription": "Un site sans maintenance devient vite lent, obsolète ou vulnérable. Découvrez pourquoi l'entretien d'un site est essentiel et ce qu'il comprend concrètement.",
    "excerpt": "Beaucoup d'artisans pensent qu'une fois le site en ligne, c'est terminé. En réalité, un site web nécessite un entretien régulier : mises à jour de sécurité, sauvegardes, vérification des performances. Sans maintenance, votre site peut tomber en panne, être piraté, ou perdre des positions sur Google...",
    "category": "site-vitrine",
    "categoryName": "Site internet",
    "keywords": ["maintenance site internet", "entretien site web", "mise à jour site", "sécurité site web"],
    "readingTime": 4,
    "publishDate": "2026-03-10",
    "author": "Emmanuel Légeret",
    "image": "/articles/maintenance-site-internet.jpg",
    "filename": "maintenance-site-internet.docx"
  }
];

export const CATEGORIES = [
  {
    "slug": "site-vitrine",
    "name": "Site internet",
    "count": 4
  },
  {
    "slug": "seo-visibilite",
    "name": "SEO & Visibilité",
    "count": 3
  },
  {
    "slug": "conseils-web",
    "name": "Conseils pratiques",
    "count": 5
  }
];
