import { useEffect, useState } from "react";

const T = {
  h2: "text-3xl md:text-4xl font-bold leading-tight tracking-tight mt-12 mb-6 scroll-mt-24",
  h3: "text-2xl md:text-3xl font-semibold leading-snug mt-8 mb-4",
  p: "text-base md:text-lg text-muted-foreground leading-relaxed mb-4",
  list: "space-y-2 ml-6 list-disc mb-6",
  alert: "border-l-4 border-primary pl-4 py-3 bg-primary/5 rounded-r mb-6",
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
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          {section.content.map((para, paraIndex) => {
            const { text, style } = para;

            // Titre H2
            if (style === 'Heading 2') {
              return (
                <h2 key={paraIndex} className={T.h2}>
                  {text}
                </h2>
              );
            }

            // Titre H3
            if (style === 'Heading 3') {
              return (
                <h3 key={paraIndex} className={T.h3}>
                  {text}
                </h3>
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
                <ul key={paraIndex} className={T.list}>
                  {listItems.map((item, i) => (
                    <li key={i} className="text-muted-foreground">
                      {item}
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
                    <p className={T.p}>{text}</p>
                  </div>
                );
              }

              return (
                <p key={paraIndex} className={T.p}>
                  {text}
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
