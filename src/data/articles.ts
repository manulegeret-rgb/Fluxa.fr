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
    "title": "Pourquoi un Site Vitrine est Indispensable pour un Artisan en 2025",
    "metaDescription": "Découvrez pourquoi chaque artisan doit avoir un site vitrine professionnel en 2025. Visibilité, crédibilité, nouveaux clients : tout ce que vous gagnez.",
    "excerpt": "En 2025, un artisan sans site internet passe à côté de nombreuses opportunités. La majorité de vos futurs clients commencent leurs recherches en ligne avant de vous contacter. Un site vitrine professionnel vous permet d'être trouvé, de présenter vos réalisations et d'inspirer confiance dès le premier contact...",
    "category": "site-vitrine",
    "categoryName": "Site Vitrine",
    "keywords": ["site vitrine artisan", "présence en ligne", "site internet professionnel", "création site artisan"],
    "readingTime": 4,
    "publishDate": "2025-01-15",
    "author": "Équipe Fluxa",
    "image": "/articles/site-vitrine-artisan.jpg",
    "filename": "site-vitrine-artisan-2025.docx"
  },
  {
    "id": "combien-coute-un-site-vitrine-professionnel-en-2025",
    "slug": "combien-coute-un-site-vitrine-professionnel-en-2025",
    "title": "Combien Coûte un Site Vitrine Professionnel en 2025 ?",
    "metaDescription": "Prix d'un site vitrine professionnel en 2025 : découvrez les tarifs réels, ce qui est inclus et comment choisir la meilleure offre pour votre budget.",
    "excerpt": "Le prix d'un site vitrine varie énormément selon les prestataires. Entre 500€ et plusieurs milliers d'euros, comment s'y retrouver ? Ce guide vous explique ce qui justifie les différences de tarifs, ce qui doit être inclus dans une offre sérieuse, et comment éviter les mauvaises surprises...",
    "category": "site-vitrine",
    "categoryName": "Site Vitrine",
    "keywords": ["prix site vitrine", "coût site internet", "tarif création site web", "site vitrine clé en main"],
    "readingTime": 5,
    "publishDate": "2025-01-20",
    "author": "Équipe Fluxa",
    "image": "/articles/cout-site-vitrine.jpg",
    "filename": "cout-site-vitrine-2025.docx"
  },
  {
    "id": "site-vitrine-vs-page-facebook-quelle-difference-pour-votre-activite",
    "slug": "site-vitrine-vs-page-facebook-quelle-difference-pour-votre-activite",
    "title": "Site Vitrine vs Page Facebook : Quelle Différence pour Votre Activité ?",
    "metaDescription": "Site vitrine ou page Facebook ? Découvrez les avantages de chaque option et pourquoi un site professionnel reste indispensable même si vous avez des réseaux sociaux.",
    "excerpt": "Beaucoup d'artisans et d'indépendants se demandent si une page Facebook suffit. La réponse courte : non. Un site vitrine et une page Facebook ont des rôles complémentaires mais très différents. Le site vous appartient, il est indexé sur Google, et il vous représente 24h/24...",
    "category": "site-vitrine",
    "categoryName": "Site Vitrine",
    "keywords": ["site vitrine vs Facebook", "page Facebook artisan", "site internet vs réseaux sociaux"],
    "readingTime": 4,
    "publishDate": "2025-01-25",
    "author": "Équipe Fluxa",
    "image": "/articles/site-vitrine-vs-facebook.jpg",
    "filename": "site-vitrine-vs-facebook.docx"
  },
  {
    "id": "seo-local-artisan-comment-apparaitre-dans-google-maps-et-les-recherches-locales",
    "slug": "seo-local-artisan-comment-apparaitre-dans-google-maps-et-les-recherches-locales",
    "title": "SEO Local pour Artisan : Comment Apparaître dans Google Maps et les Recherches Locales",
    "metaDescription": "Découvrez comment optimiser le référencement local de votre activité d'artisan pour apparaître dans Google Maps et attirer des clients près de chez vous.",
    "excerpt": "Quand un particulier tape 'plombier Paris' ou 'électricien Lyon' sur Google, il voit en premier les résultats locaux. Comment faire partie de ces résultats ? Le SEO local est la clé. Entre Google Business Profile, les avis clients et l'optimisation de votre site, voici comment gagner en visibilité près de chez vous...",
    "category": "seo-visibilite",
    "categoryName": "SEO & Visibilité",
    "keywords": ["SEO local artisan", "Google Maps artisan", "référencement local", "visibilité Google"],
    "readingTime": 5,
    "publishDate": "2025-02-01",
    "author": "Équipe Fluxa",
    "image": "/articles/seo-local-artisan.jpg",
    "filename": "seo-local-artisan.docx"
  },
  {
    "id": "pourquoi-votre-site-doit-etre-responsive-mobile-en-2025",
    "slug": "pourquoi-votre-site-doit-etre-responsive-mobile-en-2025",
    "title": "Pourquoi Votre Site Doit Être Responsive Mobile en 2025",
    "metaDescription": "Plus de 70% des recherches se font sur mobile. Découvrez pourquoi un site responsive est indispensable pour votre activité et comment cela impacte votre référencement.",
    "excerpt": "En 2025, la majorité des internautes naviguent depuis leur smartphone. Si votre site ne s'affiche pas correctement sur mobile, vous perdez des clients avant même qu'ils aient pu vous contacter. Google pénalise aussi les sites non-responsive dans ses résultats de recherche...",
    "category": "seo-visibilite",
    "categoryName": "SEO & Visibilité",
    "keywords": ["site responsive mobile", "design mobile-first", "site internet mobile artisan"],
    "readingTime": 3,
    "publishDate": "2025-02-05",
    "author": "Équipe Fluxa",
    "image": "/articles/site-responsive-mobile.jpg",
    "filename": "site-responsive-mobile-2025.docx"
  },
  {
    "id": "comment-obtenir-des-avis-google-pour-son-activite-artisanale",
    "slug": "comment-obtenir-des-avis-google-pour-son-activite-artisanale",
    "title": "Comment Obtenir des Avis Google pour Son Activité Artisanale",
    "metaDescription": "Les avis Google sont essentiels pour la crédibilité de votre activité. Découvrez comment obtenir plus d'avis clients facilement et booster votre référencement local.",
    "excerpt": "Les avis Google sont devenus le bouche-à-oreille numérique. Un artisan avec 50 avis 5 étoiles sera toujours plus rassurant qu'un concurrent sans avis. Comment demander des avis clients sans être intrusif ? Quelles sont les bonnes pratiques pour y répondre ?...",
    "category": "seo-visibilite",
    "categoryName": "SEO & Visibilité",
    "keywords": ["avis Google artisan", "avis clients", "réputation en ligne", "Google Business"],
    "readingTime": 4,
    "publishDate": "2025-02-10",
    "author": "Équipe Fluxa",
    "image": "/articles/avis-google-artisan.jpg",
    "filename": "avis-google-artisan.docx"
  },
  {
    "id": "5-pages-indispensables-pour-un-site-vitrine-artisan-efficace",
    "slug": "5-pages-indispensables-pour-un-site-vitrine-artisan-efficace",
    "title": "5 Pages Indispensables pour un Site Vitrine Artisan Efficace",
    "metaDescription": "Quelles pages inclure dans votre site vitrine pour convertir vos visiteurs en clients ? Découvrez les 5 pages essentielles et leur contenu optimal.",
    "excerpt": "Un site vitrine n'a pas besoin d'être complexe pour être efficace. Mais certaines pages sont absolument indispensables pour rassurer vos visiteurs et les inciter à vous contacter. Voici les 5 pages à absolument avoir, avec ce que chacune doit contenir pour convertir...",
    "category": "conseils-web",
    "categoryName": "Conseils Web",
    "keywords": ["pages site vitrine", "structure site artisan", "site internet artisan"],
    "readingTime": 5,
    "publishDate": "2025-02-15",
    "author": "Équipe Fluxa",
    "image": "/articles/pages-site-vitrine.jpg",
    "filename": "pages-site-vitrine-artisan.docx"
  },
  {
    "id": "galerie-photos-realisations-comment-mettre-en-valeur-votre-travail-en-ligne",
    "slug": "galerie-photos-realisations-comment-mettre-en-valeur-votre-travail-en-ligne",
    "title": "Galerie Photos Réalisations : Comment Mettre en Valeur Votre Travail en Ligne",
    "metaDescription": "Une belle galerie de réalisations est votre meilleur argument commercial. Découvrez comment présenter vos travaux en ligne pour convaincre vos futurs clients.",
    "excerpt": "Pour un artisan, les photos de réalisations valent mieux que n'importe quel discours. Un chantier bien présenté, une cuisine rénovée, un jardin aménagé : vos photos montrent votre savoir-faire avant même le premier contact. Comment les présenter de façon professionnelle ?...",
    "category": "conseils-web",
    "categoryName": "Conseils Web",
    "keywords": ["galerie photos réalisations", "portfolio artisan", "photos travaux artisan"],
    "readingTime": 4,
    "publishDate": "2025-02-20",
    "author": "Équipe Fluxa",
    "image": "/articles/galerie-realisations.jpg",
    "filename": "galerie-realisations-artisan.docx"
  },
  {
    "id": "prise-de-rendez-vous-en-ligne-pourquoi-et-comment-lajouter-a-votre-site",
    "slug": "prise-de-rendez-vous-en-ligne-pourquoi-et-comment-lajouter-a-votre-site",
    "title": "Prise de Rendez-vous en Ligne : Pourquoi et Comment l'Ajouter à Votre Site",
    "metaDescription": "La prise de rendez-vous en ligne simplifie la vie de vos clients et remplit votre agenda. Découvrez comment l'intégrer à votre site vitrine facilement.",
    "excerpt": "Combien de fois avez-vous échangé 5 messages pour trouver un créneau disponible ? La prise de rendez-vous en ligne règle ce problème : vos clients choisissent eux-mêmes un horaire selon vos disponibilités. Résultat : moins de friction, plus de réservations...",
    "category": "conseils-web",
    "categoryName": "Conseils Web",
    "keywords": ["prise de rendez-vous en ligne", "réservation en ligne artisan", "calendrier en ligne"],
    "readingTime": 4,
    "publishDate": "2025-02-25",
    "author": "Équipe Fluxa",
    "image": "/articles/prise-rdv-en-ligne.jpg",
    "filename": "prise-rdv-en-ligne.docx"
  },
  {
    "id": "hebergement-web-nom-de-domaine-ce-quil-faut-savoir-pour-votre-site",
    "slug": "hebergement-web-nom-de-domaine-ce-quil-faut-savoir-pour-votre-site",
    "title": "Hébergement Web et Nom de Domaine : Ce Qu'il Faut Savoir pour Votre Site",
    "metaDescription": "Hébergement web, nom de domaine, SSL : comprendre ces notions essentielles pour choisir la bonne offre et éviter les mauvaises surprises avec votre site.",
    "excerpt": "Hébergement, nom de domaine, certificat SSL… Ces termes techniques sont souvent source de confusion pour les artisans. Pourtant, ils sont fondamentaux pour votre site. On vous explique simplement ce que c'est, pourquoi c'est important, et ce qui doit être inclus dans une offre sérieuse...",
    "category": "conseils-web",
    "categoryName": "Conseils Web",
    "keywords": ["hébergement web", "nom de domaine", "certificat SSL", "site internet sécurisé"],
    "readingTime": 5,
    "publishDate": "2025-03-01",
    "author": "Équipe Fluxa",
    "image": "/articles/hebergement-nom-domaine.jpg",
    "filename": "hebergement-nom-domaine.docx"
  },
  {
    "id": "comment-rediger-les-textes-de-votre-site-vitrine-pour-attirer-des-clients",
    "slug": "comment-rediger-les-textes-de-votre-site-vitrine-pour-attirer-des-clients",
    "title": "Comment Rédiger les Textes de Votre Site Vitrine pour Attirer des Clients",
    "metaDescription": "Les textes de votre site vitrine jouent un rôle clé pour convertir les visiteurs en clients. Découvrez nos conseils pour bien rédiger votre contenu web.",
    "excerpt": "Un bon design ne suffit pas si vos textes ne parlent pas à vos visiteurs. Vos clients potentiels veulent savoir qui vous êtes, ce que vous faites, et pourquoi vous choisir vous plutôt qu'un concurrent. Voici comment rédiger un contenu web efficace, même sans être rédacteur professionnel...",
    "category": "conseils-web",
    "categoryName": "Conseils Web",
    "keywords": ["rédiger textes site web", "contenu site vitrine", "copywriting artisan"],
    "readingTime": 5,
    "publishDate": "2025-03-05",
    "author": "Équipe Fluxa",
    "image": "/articles/rediger-textes-site.jpg",
    "filename": "rediger-textes-site-vitrine.docx"
  },
  {
    "id": "maintenance-site-internet-pourquoi-cest-indispensable",
    "slug": "maintenance-site-internet-pourquoi-cest-indispensable",
    "title": "Maintenance Site Internet : Pourquoi C'est Indispensable",
    "metaDescription": "Un site sans maintenance devient rapidement obsolète, lent ou vulnérable. Découvrez pourquoi la maintenance est essentielle et ce qu'elle comprend concrètement.",
    "excerpt": "Beaucoup d'artisans pensent qu'une fois le site en ligne, c'est terminé. En réalité, un site web nécessite un entretien régulier : mises à jour de sécurité, sauvegardes, vérification des performances. Sans maintenance, votre site peut tomber en panne, être piraté, ou perdre des positions sur Google...",
    "category": "site-vitrine",
    "categoryName": "Site Vitrine",
    "keywords": ["maintenance site internet", "entretien site web", "mise à jour site", "sécurité site web"],
    "readingTime": 4,
    "publishDate": "2025-03-10",
    "author": "Équipe Fluxa",
    "image": "/articles/maintenance-site-internet.jpg",
    "filename": "maintenance-site-internet.docx"
  }
];

export const CATEGORIES = [
  {
    "slug": "site-vitrine",
    "name": "Site Vitrine",
    "count": 4
  },
  {
    "slug": "seo-visibilite",
    "name": "SEO & Visibilité",
    "count": 3
  },
  {
    "slug": "conseils-web",
    "name": "Conseils Web",
    "count": 5
  }
];
