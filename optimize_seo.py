#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script d'optimisation SEO automatique pour les articles Fluxa
"""

import json
import re
from collections import defaultdict
from difflib import SequenceMatcher

def load_articles():
    """Charge les articles extraits"""
    with open('articles_extracted.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def detect_duplicates(articles):
    """Détecte les doublons et similitudes entre articles"""
    duplicates = []
    article_list = list(articles.items())

    for i, (name1, content1) in enumerate(article_list):
        for name2, content2 in article_list[i+1:]:
            # Comparer les titres H1
            h1_1 = next((p['text'] for p in content1['paragraphs'] if 'Heading 1' in p['style']), '')
            h1_2 = next((p['text'] for p in content2['paragraphs'] if 'Heading 1' in p['style']), '')

            # Calculer la similarité
            similarity = SequenceMatcher(None, content1['full_text'], content2['full_text']).ratio()

            if similarity > 0.4:  # Plus de 40% de similarité
                duplicates.append({
                    'article1': name1,
                    'article2': name2,
                    'similarity': similarity * 100,
                    'title1': h1_1,
                    'title2': h1_2
                })

    return duplicates

def count_keyword_density(text, keyword):
    """Calcule la densité d'un mot-clé"""
    text_lower = text.lower()
    keyword_lower = keyword.lower()
    count = text_lower.count(keyword_lower)
    total_words = len(text.split())

    return count, (count / total_words * 100) if total_words > 0 else 0

def analyze_seo_issues(article_content):
    """Analyse les problèmes SEO d'un article"""
    issues = []
    full_text = article_content['full_text']

    # 1. Détecter les CTAs marketing à supprimer
    bad_ctas = ['cliquez ici', 'essai gratuit', 'découvrez la démo gratuite',
                'essayez maintenant', 'profitez de', 'offre spéciale']

    for cta in bad_ctas:
        if cta.lower() in full_text.lower():
            issues.append(f"CTA marketing détecté : '{cta}'")

    # 2. Vérifier la densité des mots-clés principaux
    keywords = ['automatisation', 'workflow', 'artisan', 'tpe', 'indépendant', 'fluxa', 'n8n']

    for keyword in keywords:
        count, density = count_keyword_density(full_text, keyword)
        if count < 3:
            issues.append(f"Mot-clé '{keyword}' sous-utilisé ({count} occurrences)")

    # 3. Vérifier la présence de meta description
    meta = next((p['text'] for p in article_content['paragraphs']
                if 'meta' in p['text'].lower() and 'description' in p['text'].lower()), None)

    if not meta:
        issues.append("Aucune meta description trouvée")
    elif len(meta) < 120 or len(meta) > 160:
        issues.append(f"Meta description mal dimensionnée : {len(meta)} caractères (optimal: 120-160)")

    # 4. Vérifier la structure des titres
    headings = [p for p in article_content['paragraphs'] if 'Heading' in p['style']]

    if len(headings) < 4:
        issues.append(f"Structure faible : seulement {len(headings)} titres (recommandé: 5+)")

    return issues

def optimize_article_seo(article_content, filename):
    """Optimise un article selon les critères SEO"""
    optimized = {
        'filename': filename,
        'original_paragraphs': len(article_content['paragraphs']),
        'issues_found': [],
        'optimizations_applied': [],
        'paragraphs': []
    }

    # Analyse des problèmes
    issues = analyze_seo_issues(article_content)
    optimized['issues_found'] = issues

    # Copier et optimiser les paragraphes
    for para in article_content['paragraphs']:
        text = para['text']
        style = para['style']

        # 1. Supprimer les CTAs marketing
        bad_phrases = [
            'cliquez ici', 'essai gratuit', 'découvrez la démo gratuite',
            'essayez maintenant', 'profitez de', 'offre spéciale',
            'inscription gratuite', 'testez gratuitement'
        ]

        for phrase in bad_phrases:
            if phrase in text.lower():
                # Remplacer par un CTA plus neutre
                text = re.sub(phrase, 'En savoir plus sur Fluxa.fr', text, flags=re.IGNORECASE)
                optimized['optimizations_applied'].append(f"CTA supprimé: '{phrase}'")

        # 2. Enrichir le champ lexical (ajouter des synonymes)
        # Note: Cette partie pourrait être enrichie avec un modèle NLP plus sophistiqué

        optimized['paragraphs'].append({
            'text': text,
            'style': style
        })

    return optimized

def generate_report(articles, duplicates, optimizations):
    """Génère un rapport récapitulatif"""
    report = []

    report.append("=" * 80)
    report.append("RAPPORT D'OPTIMISATION SEO - FLUXA")
    report.append("=" * 80)
    report.append("")

    # Section 1: Statistiques générales
    report.append("1. STATISTIQUES GÉNÉRALES")
    report.append("-" * 40)
    report.append(f"Nombre d'articles analysés : {len(articles)}")
    report.append(f"Nombre de doublons détectés : {len(duplicates)}")
    report.append("")

    # Section 2: Doublons détectés
    if duplicates:
        report.append("2. DOUBLONS ET SIMILITUDES DÉTECTÉS")
        report.append("-" * 40)
        for dup in duplicates:
            report.append(f"• {dup['article1']} <-> {dup['article2']}")
            report.append(f"  Similarité: {dup['similarity']:.1f}%")
            report.append(f"  Titre 1: {dup['title1'][:60]}...")
            report.append(f"  Titre 2: {dup['title2'][:60]}...")
            report.append("")

    # Section 3: Problèmes SEO par article
    report.append("3. PROBLÈMES SEO IDENTIFIÉS PAR ARTICLE")
    report.append("-" * 40)
    for filename, opt in optimizations.items():
        if opt['issues_found']:
            report.append(f"\n{filename}:")
            for issue in opt['issues_found']:
                report.append(f"  - {issue}")

    report.append("")

    # Section 4: Optimisations appliquées
    report.append("4. OPTIMISATIONS APPLIQUÉES")
    report.append("-" * 40)
    total_optimizations = sum(len(opt['optimizations_applied']) for opt in optimizations.values())
    report.append(f"Total d'optimisations: {total_optimizations}")
    report.append("")

    # Section 5: Recommandations de publication
    report.append("5. RECOMMANDATIONS DE PUBLICATION (PAR PRIORITÉ SEO)")
    report.append("-" * 40)

    # Calculer un score SEO pour chaque article
    priority_articles = []
    for filename, opt in optimizations.items():
        score = 100 - (len(opt['issues_found']) * 5)  # Pénaliser les problèmes
        priority_articles.append((filename, score, opt))

    priority_articles.sort(key=lambda x: x[1], reverse=True)

    for i, (filename, score, opt) in enumerate(priority_articles[:10], 1):
        report.append(f"{i}. {filename} (Score SEO: {score}/100)")
        h1 = next((p['text'] for p in opt['paragraphs'] if 'Heading 1' in p['style']), 'N/A')
        report.append(f"   Titre: {h1[:70]}...")
        report.append("")

    return "\n".join(report)

def main():
    print("Chargement des articles...")
    articles = load_articles()

    print("Détection des doublons...")
    duplicates = detect_duplicates(articles)
    print(f"  -> {len(duplicates)} paires d'articles similaires trouvées")

    print("\nOptimisation SEO de chaque article...")
    optimizations = {}

    for filename, content in articles.items():
        print(f"  Traitement: {filename}")
        optimized = optimize_article_seo(content, filename)
        optimizations[filename] = optimized

    print("\nGénération du rapport...")
    report = generate_report(articles, duplicates, optimizations)

    # Sauvegarder le rapport
    with open('rapport_seo.txt', 'w', encoding='utf-8') as f:
        f.write(report)

    # Sauvegarder les optimisations
    with open('articles_optimized.json', 'w', encoding='utf-8') as f:
        json.dump(optimizations, f, ensure_ascii=False, indent=2)

    print("\n" + "="*80)
    print("OPTIMISATION TERMINÉE")
    print("="*80)
    print(f"Rapport sauvegardé: rapport_seo.txt")
    print(f"Données optimisées: articles_optimized.json")
    print("\nAperçu du rapport:")
    print("-"*80)
    print(report[:1500] + "\n[...]")

if __name__ == "__main__":
    main()
