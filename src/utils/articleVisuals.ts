// Système de visuels colorés pour les articles
// Chaque catégorie a son propre gradient

export const CATEGORY_VISUALS = {
  'n8n-outils': {
    gradient: 'from-blue-500 to-cyan-500',
    icon: '⚙️',
    color: 'bg-blue-500'
  },
  'ia-innovation': {
    gradient: 'from-purple-500 to-pink-500',
    icon: '🤖',
    color: 'bg-purple-500'
  },
  'workflow-processus': {
    gradient: 'from-green-500 to-emerald-500',
    icon: '🔄',
    color: 'bg-green-500'
  },
  'gestion-crm': {
    gradient: 'from-orange-500 to-red-500',
    icon: '👥',
    color: 'bg-orange-500'
  },
  'marketing-communication': {
    gradient: 'from-pink-500 to-rose-500',
    icon: '📢',
    color: 'bg-pink-500'
  },
  'automatisation-generale': {
    gradient: 'from-indigo-500 to-blue-500',
    icon: '⚡',
    color: 'bg-indigo-500'
  }
};

export function getCategoryVisual(category: string) {
  return CATEGORY_VISUALS[category as keyof typeof CATEGORY_VISUALS] || CATEGORY_VISUALS['automatisation-generale'];
}

export function getArticleVisual(article: { category: string; title: string }) {
  const visual = getCategoryVisual(article.category);

  return {
    gradient: visual.gradient,
    icon: visual.icon,
    color: visual.color,
    title: article.title
  };
}
