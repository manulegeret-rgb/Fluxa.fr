#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extrait le contenu complet des articles optimisés en format React/TypeScript
"""

import json
import re
import os
from docx import Document

def slugify(text):
    """Convertit un texte en slug URL"""
    text = text.lower()
    text = re.sub(r'[àáâãäå]', 'a', text)
    text = re.sub(r'[èéêë]', 'e', text)
    text = re.sub(r'[ìíîï]', 'i', text)
    text = re.sub(r'[òóôõö]', 'o', text)
    text = re.sub(r'[ùúûü]', 'u', text)
    text = re.sub(r'[ç]', 'c', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = re.sub(r'-+', '-', text)
    text = text.strip('-')
    return text

def extract_article_content(docx_path):
    """Extrait le contenu d'un article avec structure"""
    doc = Document(docx_path)

    content = {
        'title': '',
        'metaDescription': '',
        'sections': []
    }

    current_section = None

    for para in doc.paragraphs:
        text = para.text.strip()
        if not text:
            continue

        style = para.style.name

        # Titre principal (H1)
        if 'Heading 1' in style:
            content['title'] = text

        # Meta description
        elif 'meta' in text.lower() and 'description' in text.lower():
            meta = re.sub(r'^_*meta\s+description\s*:\s*_*', '', text, flags=re.IGNORECASE).strip()
            content['metaDescription'] = meta.strip('_').strip()

        # Sous-titres H2
        elif 'Heading 2' in style:
            if current_section:
                content['sections'].append(current_section)
            current_section = {
                'type': 'h2',
                'title': text,
                'content': []
            }

        # Sous-titres H3
        elif 'Heading 3' in style:
            if current_section:
                current_section['content'].append({
                    'type': 'h3',
                    'text': text
                })

        # Paragraphes normaux
        else:
            if current_section:
                # Détecter les listes
                if text.startswith(('•', '-', '●', '◦', '▪')):
                    # C'est un item de liste
                    text = re.sub(r'^[•\-●◦▪]\s*', '', text)

                    # Vérifier si on a déjà une liste en cours
                    if current_section['content'] and current_section['content'][-1].get('type') == 'list':
                        current_section['content'][-1]['items'].append(text)
                    else:
                        current_section['content'].append({
                            'type': 'list',
                            'items': [text]
                        })
                else:
                    # Paragraphe normal
                    current_section['content'].append({
                        'type': 'p',
                        'text': text
                    })

    # Ajouter la dernière section
    if current_section:
        content['sections'].append(current_section)

    return content

def generate_tsx_content(article_content, slug):
    """Génère le contenu TypeScript pour un article"""

    tsx = []

    # Générer les sections
    for section in article_content['sections']:
        tsx.append(f"        {{/* {section['title']} */}}")
        tsx.append(f"        <section className=\"space-y-6\">")
        tsx.append(f"          <h2 className={{T.h2}}>{section['title']}</h2>")

        for item in section['content']:
            if item['type'] == 'h3':
                tsx.append(f"          <h3 className={{T.h3}}>{item['text']}</h3>")
            elif item['type'] == 'p':
                # Échapper les accolades et guillemets
                text = item['text'].replace('{', '{{').replace('}', '}}').replace('"', '\\"')
                tsx.append(f"          <p className={{T.p}}>{item['text']}</p>")
            elif item['type'] == 'list':
                tsx.append(f"          <ul className=\"space-y-2 ml-6 list-disc\">")
                for list_item in item['items']:
                    tsx.append(f"            <li className={{T.p}}>{list_item}</li>")
                tsx.append(f"          </ul>")

        tsx.append(f"        </section>\n")

    return '\n'.join(tsx)

def main():
    # Charger les métadonnées
    with open('articles_metadata.json', 'r', encoding='utf-8') as f:
        articles_meta = json.load(f)

    articles_dir = r"C:\Users\Utilisateur\Documents\Applications personnalisées\fluxa-artisans-automations-main\Articles optimisés SEO"
    content_dir = r"C:\Users\Utilisateur\Documents\Applications personnalisées\fluxa-artisans-automations-main\src\content\articles"

    # Créer le dossier content si nécessaire
    os.makedirs(content_dir, exist_ok=True)

    # Extraire le contenu de chaque article
    articles_content = {}

    for meta in articles_meta:
        filename = meta['filename']
        slug = meta['slug']
        docx_path = os.path.join(articles_dir, filename)

        if not os.path.exists(docx_path):
            print(f"ATTENTION: Fichier non trouvé: {filename}")
            continue

        print(f"Extraction: {filename}")

        try:
            content = extract_article_content(docx_path)
            articles_content[slug] = content

            # Générer le fichier TypeScript pour chaque article
            tsx_content = generate_tsx_content(content, slug)

            # Sauvegarder dans un fichier .tsx
            tsx_file = os.path.join(content_dir, f"{slug}.tsx")
            with open(tsx_file, 'w', encoding='utf-8') as f:
                f.write(f"// Contenu de l'article: {content['title']}\n\n")
                f.write("const T = {\n")
                f.write("  h2: \"text-3xl md:text-4xl font-bold leading-tight tracking-tight mt-12 mb-6\",\n")
                f.write("  h3: \"text-2xl md:text-3xl font-semibold leading-snug mt-8 mb-4\",\n")
                f.write("  p: \"text-base md:text-lg text-muted-foreground leading-relaxed mb-4\",\n")
                f.write("};\n\n")
                f.write("export default function ArticleContent() {\n")
                f.write("  return (\n")
                f.write("    <div className=\"space-y-8\">\n")
                f.write(tsx_content)
                f.write("    </div>\n")
                f.write("  );\n")
                f.write("}\n")

            print(f"  OK - Généré: {slug}.tsx")

        except Exception as e:
            print(f"  ERREUR: {e}")

    # Sauvegarder tous les contenus en JSON
    with open('articles_full_content.json', 'w', encoding='utf-8') as f:
        json.dump(articles_content, f, ensure_ascii=False, indent=2)

    print(f"\nOK - {len(articles_content)} articles extraits")
    print(f"OK - Contenus sauvegardés dans: {content_dir}")

if __name__ == "__main__":
    main()
