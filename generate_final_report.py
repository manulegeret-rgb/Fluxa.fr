#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Générateur de rapport final SEO pour Fluxa
"""

import json
from datetime import datetime, timedelta

def load_optimizations():
    """Charge les données d'optimisation"""
    with open(r'C:\Users\Utilisateur\Documents\Applications personnalisées\fluxa-artisans-automations-main\Articles optimisés SEO\rapport_optimisations.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def calculate_seo_score(opt_data):
    """Calcule un score SEO basé sur les optimisations"""
    score = 100

    # Pénalités
    if len(opt_data.get('issues_fixed', [])) > 0:
        score -= len(opt_data['issues_fixed']) * 5

    # Bonus pour densité de mots-clés
    keyword_density = opt_data.get('keyword_density', {})
    good_keywords = sum(1 for kw, data in keyword_density.items()
                        if data.get('count', 0) >= 3)
    score += good_keywords * 2

    # Bonus pour optimisations
    score += min(len(opt_data.get('optimizations', [])), 10) * 1

    return min(max(score, 0), 100)

def categorize_articles(optimizations):
    """Catégorise les articles par thème"""
    categories = {
        'N8N & Outils': [],
        'Automatisation Générale': [],
        'Gestion & CRM': [],
        'Marketing & Communication': [],
        'Workflow & Processus': [],
        'IA & Innovation': []
    }

    for filename, data in optimizations.items():
        title = next((p['text'] for p in data['paragraphs'] if 'Heading 1' in p['style']), filename)

        if 'n8n' in filename.lower():
            categories['N8N & Outils'].append((filename, title, data))
        elif 'ia' in filename.lower() or 'agent' in filename.lower():
            categories['IA & Innovation'].append((filename, title, data))
        elif 'workflow' in filename.lower():
            categories['Workflow & Processus'].append((filename, title, data))
        elif 'crm' in filename.lower() or 'client' in filename.lower():
            categories['Gestion & CRM'].append((filename, title, data))
        elif 'marketing' in filename.lower() or 'communication' in filename.lower() or 'reseaux' in filename.lower():
            categories['Marketing & Communication'].append((filename, title, data))
        else:
            categories['Automatisation Générale'].append((filename, title, data))

    return categories

def generate_publication_calendar(optimizations):
    """Génère un calendrier de publication optimisé"""
    articles_with_scores = []

    for filename, data in optimizations.items():
        score = calculate_seo_score(data)
        title = next((p['text'] for p in data['paragraphs'] if 'Heading 1' in p['style']), filename)
        articles_with_scores.append((filename, title, score, data))

    # Trier par score décroissant
    articles_with_scores.sort(key=lambda x: x[2], reverse=True)

    # Créer un calendrier sur 12 semaines (2-3 articles/semaine)
    calendar = []
    start_date = datetime.now()

    for i, (filename, title, score, data) in enumerate(articles_with_scores):
        # Publier 2-3 articles par semaine
        week_offset = i // 2
        day_in_week = (i % 2) * 3  # Lundi et jeudi

        pub_date = start_date + timedelta(weeks=week_offset, days=day_in_week)

        calendar.append({
            'date': pub_date.strftime('%d/%m/%Y'),
            'jour': pub_date.strftime('%A'),
            'filename': filename,
            'title': title[:70],
            'score': score,
            'priority': 'HAUTE' if score >= 95 else 'MOYENNE' if score >= 85 else 'NORMALE'
        })

    return calendar

def generate_report(optimizations):
    """Génère le rapport final"""
    report = []

    # En-tête
    report.append("="*100)
    report.append(" "*30 + "RAPPORT FINAL - OPTIMISATION SEO FLUXA")
    report.append("="*100)
    report.append(f"\nDate: {datetime.now().strftime('%d/%m/%Y %H:%M')}")
    report.append(f"Nombre d'articles optimises: {len(optimizations)}")
    report.append("\n")

    # 1. Statistiques globales
    report.append("-"*100)
    report.append("1. STATISTIQUES GLOBALES")
    report.append("-"*100)

    total_optimizations = sum(len(opt.get('optimizations', [])) for opt in optimizations.values())
    total_issues_fixed = sum(len(opt.get('issues_fixed', [])) for opt in optimizations.values())

    report.append(f"\nOptimisations appliquees: {total_optimizations}")
    report.append(f"Problemes corriges: {total_issues_fixed}")

    # CTAs marketing supprimés
    ctas_removed = [opt for opt in optimizations.values() if len(opt.get('issues_fixed', [])) > 0]
    report.append(f"Articles avec CTAs supprimes: {len(ctas_removed)}")

    # Score SEO moyen
    avg_score = sum(calculate_seo_score(opt) for opt in optimizations.values()) / len(optimizations)
    report.append(f"Score SEO moyen: {avg_score:.1f}/100")
    report.append("")

    # 2. Top 10 articles par score SEO
    report.append("-"*100)
    report.append("2. TOP 10 ARTICLES PAR SCORE SEO (A PUBLIER EN PRIORITE)")
    report.append("-"*100)
    report.append("")

    articles_scored = [(filename, calculate_seo_score(data), data)
                       for filename, data in optimizations.items()]
    articles_scored.sort(key=lambda x: x[1], reverse=True)

    for i, (filename, score, data) in enumerate(articles_scored[:10], 1):
        title = next((p['text'] for p in data['paragraphs'] if 'Heading 1' in p['style']), filename)
        report.append(f"{i}. {filename.replace('_SEO.docx', '')}")
        report.append(f"   Score: {score}/100")
        report.append(f"   Titre: {title[:80]}...")
        report.append(f"   Optimisations: {len(data.get('optimizations', []))}")
        report.append("")

    # 3. Catégorisation des articles
    report.append("-"*100)
    report.append("3. CATEGORISATION DES ARTICLES PAR THEME")
    report.append("-"*100)
    report.append("")

    categories = categorize_articles(optimizations)

    for category, articles in categories.items():
        if articles:
            report.append(f"\n{category} ({len(articles)} articles):")
            report.append("-" * 50)
            for filename, title, data in articles[:5]:  # Max 5 par catégorie
                report.append(f"  - {filename.replace('.docx', '')}")
                report.append(f"    {title[:70]}...")
            if len(articles) > 5:
                report.append(f"  ... et {len(articles) - 5} autres")
            report.append("")

    # 4. Calendrier de publication
    report.append("-"*100)
    report.append("4. CALENDRIER DE PUBLICATION RECOMMANDE (12 SEMAINES)")
    report.append("-"*100)
    report.append("\nRythme: 2-3 articles/semaine pour maximiser l'indexation Google")
    report.append("")

    calendar = generate_publication_calendar(optimizations)

    current_week = None
    for entry in calendar[:26]:  # Tous les articles
        # Afficher l'en-tête de semaine
        week_num = datetime.strptime(entry['date'], '%d/%m/%Y').isocalendar()[1]
        if week_num != current_week:
            current_week = week_num
            report.append(f"\n--- SEMAINE {week_num} ---")

        report.append(f"{entry['date']} ({entry['jour']}) - PRIORITE {entry['priority']}")
        report.append(f"  {entry['filename'].replace('.docx', '')}")
        report.append(f"  {entry['title']}... (Score: {entry['score']}/100)")
        report.append("")

    # 5. Recommandations stratégiques
    report.append("-"*100)
    report.append("5. RECOMMANDATIONS STRATEGIQUES DE DISTRIBUTION")
    report.append("-"*100)
    report.append("")

    report.append("SITE FLUXA.FR (Blog):")
    report.append("  - Publier l'article complet avec toutes les optimisations SEO")
    report.append("  - Ajouter des images/infographies pour ameliorer le temps de lecture")
    report.append("  - Activer les commentaires pour engagement")
    report.append("")

    report.append("LINKEDIN:")
    report.append("  - Extraire les 2-3 premiers paragraphes + conclusion")
    report.append("  - Ajouter un lien vers l'article complet sur Fluxa.fr")
    report.append("  - Utiliser 3-5 hashtags cibles: #Automatisation #TPE #Artisans #N8N #Workflow")
    report.append("")

    report.append("FACEBOOK & INSTAGRAM:")
    report.append("  - Creer une infographie resumant les points cles")
    report.append("  - Texte court (150-200 caracteres) + appel a l'action")
    report.append("  - Lien vers l'article complet en commentaire")
    report.append("")

    report.append("SEO ON-PAGE A VERIFIER:")
    report.append("  - URL slug optimisee (ex: /blog/automatisation-artisans-2025)")
    report.append("  - Balises alt sur les images")
    report.append("  - Liens internes vers autres articles Fluxa")
    report.append("  - Schema.org Article markup")
    report.append("  - Open Graph tags pour reseaux sociaux")
    report.append("")

    # 6. Mots-clés cibles par article
    report.append("-"*100)
    report.append("6. MOTS-CLES PRINCIPAUX PAR ARTICLE")
    report.append("-"*100)
    report.append("")

    for filename, data in list(optimizations.items())[:10]:
        title = next((p['text'] for p in data['paragraphs'] if 'Heading 1' in p['style']), filename)
        keyword_density = data.get('keyword_density', {})

        top_keywords = sorted(
            [(kw, info['count']) for kw, info in keyword_density.items()],
            key=lambda x: x[1],
            reverse=True
        )[:5]

        report.append(f"{filename.replace('.docx', '')}:")
        report.append(f"  Titre: {title[:70]}...")
        report.append(f"  Mots-cles: {', '.join([f'{kw} ({count}x)' for kw, count in top_keywords])}")
        report.append("")

    # Footer
    report.append("="*100)
    report.append("FIN DU RAPPORT")
    report.append("="*100)
    report.append(f"\nTous les articles optimises sont disponibles dans:")
    report.append(r"C:\Users\Utilisateur\Documents\Applications personnalisees\fluxa-artisans-automations-main\Articles optimises SEO")
    report.append("")

    return "\n".join(report)

def main():
    print("Generation du rapport final SEO...")

    optimizations = load_optimizations()
    report = generate_report(optimizations)

    # Sauvegarder le rapport
    output_path = r"C:\Users\Utilisateur\Documents\Applications personnalisées\fluxa-artisans-automations-main\RAPPORT_FINAL_SEO_FLUXA.txt"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(report)

    print(f"\nRapport genere: {output_path}")
    print("\n" + "="*80)
    print("Apercu du rapport:")
    print("="*80)
    print(report[:2000])
    print("\n[...]\n")
    print("Voir le fichier complet pour tous les details.")

if __name__ == "__main__":
    main()
