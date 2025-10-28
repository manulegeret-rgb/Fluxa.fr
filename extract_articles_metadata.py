#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extrait les métadonnées des 26 articles pour le site web
"""

import json
import re

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

def categorize_article(filename, title):
    """Catégorise un article"""
    filename_lower = filename.lower()
    title_lower = title.lower()

    if 'n8n' in filename_lower or 'n8n' in title_lower:
        return 'n8n-outils'
    elif 'ia' in filename_lower or 'agent' in filename_lower or 'intelligence artificielle' in title_lower:
        return 'ia-innovation'
    elif 'workflow' in filename_lower or 'workflow' in title_lower:
        return 'workflow-processus'
    elif 'crm' in filename_lower or 'client' in filename_lower or 'communication' in filename_lower:
        return 'gestion-crm'
    elif 'marketing' in filename_lower or 'seo' in filename_lower or 'leads' in filename_lower:
        return 'marketing-communication'
    else:
        return 'automatisation-generale'

def get_category_name(category_slug):
    """Retourne le nom complet de la catégorie"""
    categories = {
        'n8n-outils': 'N8N & Outils',
        'ia-innovation': 'IA & Innovation',
        'workflow-processus': 'Workflow & Processus',
        'gestion-crm': 'Gestion & CRM',
        'marketing-communication': 'Marketing & Communication',
        'automatisation-generale': 'Automatisation Générale'
    }
    return categories.get(category_slug, 'Autre')

def extract_intro(paragraphs):
    """Extrait l'introduction (premiers paragraphes après meta)"""
    intro_parts = []
    skip_meta = False

    for para in paragraphs:
        text = para['text'].strip()
        style = para['style']

        # Ignorer meta description et titres
        if 'meta' in text.lower() and 'description' in text.lower():
            skip_meta = True
            continue

        if 'Heading' in style:
            continue

        # Prendre les 2-3 premiers paragraphes normaux
        if skip_meta and text and len(text) > 50:
            intro_parts.append(text)
            if len(intro_parts) >= 2:
                break

    return ' '.join(intro_parts)[:280] + '...' if intro_parts else ''

def estimate_reading_time(paragraphs):
    """Estime le temps de lecture (250 mots/min)"""
    total_words = sum(len(p['text'].split()) for p in paragraphs)
    minutes = max(1, round(total_words / 250))
    return minutes

def extract_keywords(paragraphs, category):
    """Extrait ou génère des mots-clés"""
    # Mots-clés par catégorie
    category_keywords = {
        'n8n-outils': ['n8n', 'workflow', 'automatisation', 'outil', 'intégration'],
        'ia-innovation': ['intelligence artificielle', 'IA', 'agent', 'GPT', 'automatisation'],
        'workflow-processus': ['workflow', 'processus', 'automatisation', 'optimisation'],
        'gestion-crm': ['CRM', 'gestion client', 'fidélisation', 'relation client'],
        'marketing-communication': ['marketing', 'communication', 'SEO', 'leads', 'réseaux sociaux'],
        'automatisation-generale': ['automatisation', 'artisan', 'TPE', 'indépendant', 'gestion']
    }

    return category_keywords.get(category, ['automatisation', 'artisan', 'TPE'])

def main():
    # Charger les articles extraits
    with open('articles_extracted.json', 'r', encoding='utf-8') as f:
        articles = json.load(f)

    articles_metadata = []

    for filename, article_data in articles.items():
        # Extraire le H1 (titre)
        title = next((p['text'] for p in article_data['paragraphs'] if 'Heading 1' in p['style']), filename.replace('.docx', ''))

        # Extraire la meta description
        meta = next((p['text'] for p in article_data['paragraphs']
                    if 'meta' in p['text'].lower() and 'description' in p['text'].lower()), None)

        if meta:
            # Nettoyer complètement la meta
            meta = re.sub(r'^_*meta\s+description\s*:\s*_*', '', meta, flags=re.IGNORECASE).strip()
            meta = meta.strip('_').strip()
        else:
            meta = title[:160]

        # Générer le slug
        slug = slugify(title)

        # Catégoriser
        category = categorize_article(filename, title)

        # Extraire intro
        intro = extract_intro(article_data['paragraphs'])

        # Temps de lecture
        reading_time = estimate_reading_time(article_data['paragraphs'])

        # Mots-clés
        keywords = extract_keywords(article_data['paragraphs'], category)

        # Date de publication (utiliser ordre de priorité SEO)
        # Articles avec meilleur score SEO en premier
        # Simplification : ordre actuel

        metadata = {
            'id': slug,
            'slug': slug,
            'title': title,
            'metaDescription': meta,
            'excerpt': intro,
            'category': category,
            'categoryName': get_category_name(category),
            'keywords': keywords,
            'readingTime': reading_time,
            'publishDate': '2025-01-15',  # À ajuster selon calendrier
            'author': 'Équipe Fluxa',
            'image': f'/articles/{slug}.jpg',  # Image à créer
            'filename': filename.replace('.docx', '_SEO.docx')
        }

        articles_metadata.append(metadata)

    # Trier par catégorie puis par titre
    articles_metadata.sort(key=lambda x: (x['category'], x['title']))

    # Sauvegarder en JSON
    output_path = 'articles_metadata.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(articles_metadata, f, ensure_ascii=False, indent=2)

    # Sauvegarder en TypeScript
    ts_output = "// Métadonnées des articles Fluxa\n"
    ts_output += "// Généré automatiquement depuis les articles optimisés SEO\n\n"
    ts_output += "export interface Article {\n"
    ts_output += "  id: string;\n"
    ts_output += "  slug: string;\n"
    ts_output += "  title: string;\n"
    ts_output += "  metaDescription: string;\n"
    ts_output += "  excerpt: string;\n"
    ts_output += "  category: string;\n"
    ts_output += "  categoryName: string;\n"
    ts_output += "  keywords: string[];\n"
    ts_output += "  readingTime: number;\n"
    ts_output += "  publishDate: string;\n"
    ts_output += "  author: string;\n"
    ts_output += "  image: string;\n"
    ts_output += "  filename: string;\n"
    ts_output += "}\n\n"
    ts_output += "export const ARTICLES: Article[] = " + json.dumps(articles_metadata, ensure_ascii=False, indent=2) + ";\n\n"

    # Catégories
    categories = {}
    for article in articles_metadata:
        cat = article['category']
        if cat not in categories:
            categories[cat] = {
                'slug': cat,
                'name': article['categoryName'],
                'count': 0
            }
        categories[cat]['count'] += 1

    ts_output += "export const CATEGORIES = " + json.dumps(list(categories.values()), ensure_ascii=False, indent=2) + ";\n"

    with open(r'C:\Users\Utilisateur\Documents\Applications personnalisées\fluxa-artisans-automations-main\src\data\articles.ts', 'w', encoding='utf-8') as f:
        f.write(ts_output)

    print(f"OK - {len(articles_metadata)} articles extraits")
    print(f"OK - Metadata JSON: {output_path}")
    print(f"OK - TypeScript data: src/data/articles.ts")
    print(f"\nCategories:")
    for cat, info in categories.items():
        print(f"  - {info['name']}: {info['count']} articles")

if __name__ == "__main__":
    main()
