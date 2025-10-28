import { useEffect, useState } from "react";

// Fonction pour rendre le texte avec Markdown (gras, italique)
function renderMarkdown(text: string) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  // Regex pour détecter **gras** et *italique*
  const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Ajouter le texte avant le match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const matched = match[0];
    if (matched.startsWith('**') && matched.endsWith('**')) {
      // Gras
      parts.push(<strong key={key++} className="font-bold text-foreground">{matched.slice(2, -2)}</strong>);
    } else if (matched.startsWith('*') && matched.endsWith('*')) {
      // Italique
      parts.push(<em key={key++} className="italic">{matched.slice(1, -1)}</em>);
    }

    lastIndex = regex.lastIndex;
  }

  // Ajouter le reste du texte
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

const T = {
  h1: "text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mt-8 mb-6 text-foreground",
  h2: "text-2xl md:text-3xl font-bold leading-tight mt-12 mb-4 text-foreground border-b border-border pb-2",
  h3: "text-xl md:text-2xl font-semibold leading-snug mt-8 mb-3 text-foreground",
  h4: "text-lg md:text-xl font-semibold leading-snug mt-6 mb-2 text-foreground/90",
  p: "text-base md:text-lg text-muted-foreground leading-relaxed mb-4",
  list: "space-y-3 ml-0 pl-6 mb-6 text-base md:text-lg text-muted-foreground",
  listItem: "leading-relaxed pl-2",
  alert: "border-l-4 border-primary pl-4 py-3 bg-primary/10 rounded-r mb-6",
  section: "mb-10",
};

interface ArticleParagraph {
  text: string;
  style: string;
}

interface ArticleContentProps {
  filename: string;
}

export default function ArticleContent({ filename }: ArticleContentProps) {
  const [paragraphs, setParagraphs] = useState<ArticleParagraph[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger le contenu depuis articles_extracted.json
    fetch('/articles_extracted.json')
      .then(res => res.json())
      .then(data => {
        const articleData = data[filename];
        if (articleData) {
          setParagraphs(articleData.paragraphs);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement article:', err);
        setLoading(false);
      });
  }, [filename]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (paragraphs.length === 0) {
    return (
      <div className={T.alert}>
        <p className={T.p}>Contenu en cours de chargement...</p>
      </div>
    );
  }

  // Grouper les paragraphes en sections
  const sections: Array<{type: string; content: ArticleParagraph[]}> = [];
  let currentSection: ArticleParagraph[] = [];
  let currentType = 'intro';

  paragraphs.forEach((para, index) => {
    const style = para.style;
    const text = para.text;

    // Ignorer meta description et titre H1
    if (text.toLowerCase().includes('meta description') || style === 'Heading 1') {
      return;
    }

    // Nouvelle section sur H2
    if (style === 'Heading 2') {
      if (currentSection.length > 0) {
        sections.push({ type: currentType, content: currentSection });
      }
      currentSection = [para];
      currentType = 'section';
    } else {
      currentSection.push(para);
    }
  });

  // Ajouter la dernière section
  if (currentSection.length > 0) {
    sections.push({ type: currentType, content: currentSection });
  }

  return (
    <div className="max-w-none">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className={T.section}>
          {section.content.map((para, paraIndex) => {
            const { text, style } = para;

            // Titre H1
            if (style === 'Heading 1') {
              return (
                <h1 key={paraIndex} className={T.h1}>
                  {renderMarkdown(text)}
                </h1>
              );
            }

            // Titre H2
            if (style === 'Heading 2') {
              return (
                <h2 key={paraIndex} className={T.h2}>
                  {renderMarkdown(text)}
                </h2>
              );
            }

            // Titre H3
            if (style === 'Heading 3') {
              return (
                <h3 key={paraIndex} className={T.h3}>
                  {renderMarkdown(text)}
                </h3>
              );
            }

            // Titre H4
            if (style === 'Heading 4') {
              return (
                <h4 key={paraIndex} className={T.h4}>
                  {renderMarkdown(text)}
                </h4>
              );
            }

            // Liste à puces
            if (text.match(/^[•\-●◦▪]\s/)) {
              // Regrouper les items de liste consécutifs
              const listItems = [text.replace(/^[•\-●◦▪]\s*/, '')];
              let nextIndex = paraIndex + 1;

              while (nextIndex < section.content.length) {
                const nextPara = section.content[nextIndex];
                if (nextPara.text.match(/^[•\-●◦▪]\s/)) {
                  listItems.push(nextPara.text.replace(/^[•\-●◦▪]\s*/, ''));
                  nextIndex++;
                } else {
                  break;
                }
              }

              // Skip les items déjà traités
              if (paraIndex > 0) {
                const prevPara = section.content[paraIndex - 1];
                if (prevPara.text.match(/^[•\-●◦▪]\s/)) {
                  return null;
                }
              }

              return (
                <ul key={paraIndex} className={`${T.list} list-none`}>
                  {listItems.map((item, i) => (
                    <li key={i} className={`${T.listItem} flex items-start gap-3`}>
                      <span className="text-primary font-bold mt-1 flex-shrink-0">•</span>
                      <span className="flex-1">{renderMarkdown(item)}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            // Paragraphe normal (éviter les paragraphes vides)
            if (text.trim().length > 0 && !text.match(/^[•\-●◦▪]\s/)) {
              // Détecter les alertes/encadrés
              if (text.includes('💡') || text.includes('✅') || text.includes('⚠️') || text.includes('📌')) {
                return (
                  <div key={paraIndex} className={T.alert}>
                    <p className="text-sm md:text-base text-foreground leading-relaxed mb-0">{renderMarkdown(text)}</p>
                  </div>
                );
              }

              return (
                <p key={paraIndex} className={T.p}>
                  {renderMarkdown(text)}
                </p>
              );
            }

            return null;
          })}
        </div>
      ))}
    </div>
  );
}
