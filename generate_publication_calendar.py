#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Générateur de calendrier de publication multi-plateformes optimisé SEO
"""

import json
import csv
from datetime import datetime, timedelta

def load_optimizations():
    """Charge les données d'optimisation"""
    with open(r'C:\Users\Utilisateur\Documents\Applications personnalisées\fluxa-artisans-automations-main\Articles optimisés SEO\rapport_optimisations.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def calculate_seo_score(opt_data):
    """Calcule un score SEO"""
    score = 100
    if len(opt_data.get('issues_fixed', [])) > 0:
        score -= len(opt_data['issues_fixed']) * 5
    keyword_density = opt_data.get('keyword_density', {})
    good_keywords = sum(1 for kw, data in keyword_density.items() if data.get('count', 0) >= 3)
    score += good_keywords * 2
    score += min(len(opt_data.get('optimizations', [])), 10) * 1
    return min(max(score, 0), 100)

def categorize_article(filename, title):
    """Catégorise l'article pour déterminer les meilleures plateformes"""
    filename_lower = filename.lower()
    title_lower = title.lower()

    # Scoring par plateforme
    platforms = {
        'Blog Fluxa': 100,  # Toujours publier sur le blog
        'LinkedIn': 0,
        'Facebook': 0,
        'Instagram': 0
    }

    # Articles techniques/professionnels -> LinkedIn prioritaire
    if any(kw in filename_lower or kw in title_lower for kw in ['n8n', 'workflow', 'crm', 'ia', 'agent']):
        platforms['LinkedIn'] = 90
        platforms['Facebook'] = 60
        platforms['Instagram'] = 40

    # Articles accessibles/pratiques -> Facebook prioritaire
    elif any(kw in filename_lower or kw in title_lower for kw in ['comment', 'guide', 'debutant', 'facile']):
        platforms['LinkedIn'] = 70
        platforms['Facebook'] = 90
        platforms['Instagram'] = 70

    # Articles TPE/Artisans -> Toutes plateformes
    elif any(kw in filename_lower or kw in title_lower for kw in ['artisan', 'tpe', 'independant', 'pme']):
        platforms['LinkedIn'] = 85
        platforms['Facebook'] = 85
        platforms['Instagram'] = 80

    # Articles ROI/Business -> LinkedIn + Facebook
    elif any(kw in filename_lower or kw in title_lower for kw in ['cout', 'temps', 'gain', 'productivite']):
        platforms['LinkedIn'] = 95
        platforms['Facebook'] = 80
        platforms['Instagram'] = 50

    # Par défaut
    else:
        platforms['LinkedIn'] = 75
        platforms['Facebook'] = 75
        platforms['Instagram'] = 60

    return platforms

def get_best_days_for_platform(platform):
    """Retourne les meilleurs jours de la semaine pour chaque plateforme"""
    best_days = {
        'Blog Fluxa': [0, 3],  # Lundi et Jeudi (indexation Google optimale)
        'LinkedIn': [0, 1, 3],  # Lundi, Mardi, Jeudi (activité B2B)
        'Facebook': [2, 3, 4],  # Mercredi, Jeudi, Vendredi (engagement familial)
        'Instagram': [1, 3, 6]  # Mardi, Jeudi, Dimanche (engagement visuel)
    }
    return best_days.get(platform, [0, 2, 4])

def generate_publication_calendar(optimizations):
    """Génère le calendrier de publication optimisé"""

    # Préparer les articles avec scores
    articles_data = []
    for filename, data in optimizations.items():
        score = calculate_seo_score(data)
        title = next((p['text'] for p in data['paragraphs'] if 'Heading 1' in p['style']), filename)
        articles_data.append({
            'filename': filename.replace('.docx', ''),
            'title': title,
            'score': score,
            'data': data
        })

    # Trier par score SEO (meilleurs en premier)
    articles_data.sort(key=lambda x: x['score'], reverse=True)

    # Générer le calendrier
    calendar = []
    start_date = datetime.now()

    # Stratégie : 1 article = 1 semaine multi-plateformes
    for week_num, article in enumerate(articles_data):
        week_start = start_date + timedelta(weeks=week_num)

        # Déterminer les priorités de plateforme
        platform_scores = categorize_article(article['filename'], article['title'])

        # JOUR 1 (Lundi ou Jeudi) : Blog Fluxa (TOUJOURS EN PREMIER pour SEO)
        blog_day = week_start
        while blog_day.weekday() not in [0, 3]:  # Lundi ou Jeudi
            blog_day += timedelta(days=1)

        calendar.append({
            'Date': blog_day.strftime('%d/%m/%Y'),
            'Jour': blog_day.strftime('%A'),
            'Article': article['filename'],
            'Titre': article['title'][:60] + '...',
            'Plateforme': 'Blog Fluxa.fr',
            'Format': 'Article complet (800-1200 mots)',
            'Horaire': '08:00',
            'Priorite': 'CRITIQUE',
            'Objectif_SEO': 'Indexation Google + Référencement organique',
            'Actions': 'Publier article complet, optimiser URL, ajouter images, schema.org'
        })

        # JOUR 2 (Même jour + 2h) : LinkedIn (si score > 70)
        if platform_scores['LinkedIn'] >= 70:
            calendar.append({
                'Date': blog_day.strftime('%d/%m/%Y'),
                'Jour': blog_day.strftime('%A'),
                'Article': article['filename'],
                'Titre': article['title'][:60] + '...',
                'Plateforme': 'LinkedIn',
                'Format': 'Post long (1300 caractères) + lien blog',
                'Horaire': '10:00',
                'Priorite': 'HAUTE' if platform_scores['LinkedIn'] >= 85 else 'MOYENNE',
                'Objectif_SEO': 'Backlink + Trafic qualifié B2B',
                'Actions': 'Extraire intro + 2 points clés + conclusion + lien Fluxa.fr'
            })

        # JOUR 3 (Mercredi) : Facebook (si score > 60)
        if platform_scores['Facebook'] >= 60:
            fb_day = blog_day + timedelta(days=2)
            while fb_day.weekday() != 2:  # Mercredi
                fb_day += timedelta(days=1)

            calendar.append({
                'Date': fb_day.strftime('%d/%m/%Y'),
                'Jour': fb_day.strftime('%A'),
                'Article': article['filename'],
                'Titre': article['title'][:60] + '...',
                'Plateforme': 'Facebook',
                'Format': 'Post court (200 caractères) + visuel + lien',
                'Horaire': '14:00',
                'Priorite': 'HAUTE' if platform_scores['Facebook'] >= 85 else 'MOYENNE',
                'Objectif_SEO': 'Trafic social + Notoriété marque',
                'Actions': 'Créer visuel accrocheur + texte court + CTA + lien en commentaire'
            })

        # JOUR 4 (Jeudi ou Vendredi) : Instagram (si score > 50)
        if platform_scores['Instagram'] >= 50:
            insta_day = blog_day + timedelta(days=3)
            while insta_day.weekday() not in [3, 4]:  # Jeudi ou Vendredi
                insta_day += timedelta(days=1)

            calendar.append({
                'Date': insta_day.strftime('%d/%m/%Y'),
                'Jour': insta_day.strftime('%A'),
                'Article': article['filename'],
                'Titre': article['title'][:60] + '...',
                'Plateforme': 'Instagram',
                'Format': 'Carrousel (5-7 slides) + Stories',
                'Horaire': '17:00',
                'Priorite': 'HAUTE' if platform_scores['Instagram'] >= 75 else 'MOYENNE',
                'Objectif_SEO': 'Engagement + Notoriété + Trafic indirect',
                'Actions': 'Créer carrousel infographique + Stories avec swipe-up/lien bio'
            })

        # BONUS : Story Instagram le lendemain
        if platform_scores['Instagram'] >= 70:
            story_day = insta_day + timedelta(days=1)
            calendar.append({
                'Date': story_day.strftime('%d/%m/%Y'),
                'Jour': story_day.strftime('%A'),
                'Article': article['filename'],
                'Titre': article['title'][:60] + '...',
                'Plateforme': 'Instagram Stories',
                'Format': 'Stories interactives (3-5 slides)',
                'Horaire': '09:00',
                'Priorite': 'BASSE',
                'Objectif_SEO': 'Rappel + Engagement',
                'Actions': 'Quiz/Sondage + Lien swipe-up vers blog'
            })

    return calendar

def save_to_csv(calendar):
    """Sauvegarde le calendrier en CSV"""
    output_path = r'C:\Users\Utilisateur\Documents\Applications personnalisées\fluxa-artisans-automations-main\CALENDRIER_PUBLICATION_FLUXA.csv'

    fieldnames = ['Date', 'Jour', 'Horaire', 'Plateforme', 'Article', 'Titre',
                  'Format', 'Priorite', 'Objectif_SEO', 'Actions']

    with open(output_path, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter=';')
        writer.writeheader()
        writer.writerows(calendar)

    return output_path

def generate_markdown_table(calendar):
    """Génère un tableau Markdown lisible"""
    output_path = r'C:\Users\Utilisateur\Documents\Applications personnalisées\fluxa-artisans-automations-main\CALENDRIER_PUBLICATION_FLUXA.md'

    lines = []
    lines.append("# 📅 CALENDRIER DE PUBLICATION FLUXA - OPTIMISÉ SEO\n")
    lines.append(f"Généré le {datetime.now().strftime('%d/%m/%Y à %H:%M')}\n")
    lines.append("---\n")

    # Regrouper par semaine
    current_week = None
    week_counter = 1

    for entry in calendar:
        date_obj = datetime.strptime(entry['Date'], '%d/%m/%Y')
        week_num = date_obj.isocalendar()[1]

        if week_num != current_week:
            current_week = week_num
            lines.append(f"\n## 📌 SEMAINE {week_counter} (Semaine {week_num})\n")
            week_counter += 1

        # Format visuel par plateforme
        emoji = {
            'Blog Fluxa.fr': '🌐',
            'LinkedIn': '💼',
            'Facebook': '📘',
            'Instagram': '📸',
            'Instagram Stories': '📱'
        }

        platform_emoji = emoji.get(entry['Plateforme'], '📝')
        priority_emoji = '🔴' if entry['Priorite'] == 'CRITIQUE' else '🟠' if entry['Priorite'] == 'HAUTE' else '🟡'

        lines.append(f"### {priority_emoji} {entry['Date']} ({entry['Jour']}) - {entry['Horaire']}\n")
        lines.append(f"**{platform_emoji} {entry['Plateforme']}**\n")
        lines.append(f"- **Article** : `{entry['Article']}`\n")
        lines.append(f"- **Titre** : {entry['Titre']}\n")
        lines.append(f"- **Format** : {entry['Format']}\n")
        lines.append(f"- **Objectif SEO** : {entry['Objectif_SEO']}\n")
        lines.append(f"- **Actions** : {entry['Actions']}\n")
        lines.append("\n---\n")

    # Ajouter les statistiques
    lines.append("\n## 📊 STATISTIQUES DU CALENDRIER\n")

    platform_counts = {}
    for entry in calendar:
        platform = entry['Plateforme']
        platform_counts[platform] = platform_counts.get(platform, 0) + 1

    lines.append("\n### Publications par plateforme :\n")
    for platform, count in sorted(platform_counts.items(), key=lambda x: x[1], reverse=True):
        lines.append(f"- **{platform}** : {count} publications\n")

    lines.append(f"\n**TOTAL : {len(calendar)} publications sur {len(calendar) // 4} semaines**\n")

    # Conseils SEO
    lines.append("\n## 🎯 CONSEILS SEO IMPORTANTS\n")
    lines.append("""
### Avant chaque publication :

1. **Blog Fluxa.fr** (TOUJOURS EN PREMIER)
   - Publier 2h avant les réseaux sociaux minimum
   - Vérifier URL slug optimisée
   - Ajouter balises meta + Open Graph
   - Liens internes vers 2-3 autres articles

2. **LinkedIn**
   - Extraire intro (2-3 paragraphes) + conclusion
   - Ajouter lien Fluxa.fr dans le post (pas en commentaire)
   - Hashtags : #Automatisation #TPE #Artisans #N8N #Workflow
   - Répondre aux commentaires sous 2h

3. **Facebook**
   - Créer visuel accrocheur (Canva)
   - Texte court 150-200 caractères
   - Lien vers blog en commentaire
   - Publier aussi dans groupes pertinents

4. **Instagram**
   - Carrousel de 5-7 slides (infographie)
   - Texte caption 200-300 caractères
   - 10-15 hashtags dont #FluxaAutomation
   - Lien dans bio vers article

### Optimisation continue :
- Analyser Google Analytics chaque semaine
- Ajuster horaires selon engagement
- Tester A/B sur visuels Facebook/Instagram
- Créer backlinks depuis publications LinkedIn
""")

    with open(output_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    return output_path

def main():
    print("="*80)
    print("GENERATION DU CALENDRIER DE PUBLICATION MULTI-PLATEFORMES")
    print("="*80)

    print("\nChargement des donnees...")
    optimizations = load_optimizations()

    print(f"OK - {len(optimizations)} articles charges")
    print("\nGeneration du calendrier optimise SEO...")

    calendar = generate_publication_calendar(optimizations)

    print(f"OK - {len(calendar)} publications planifiees")

    # Sauvegarder CSV
    print("\nSauvegarde du calendrier CSV...")
    csv_path = save_to_csv(calendar)
    print(f"OK - CSV genere: {csv_path}")

    # Sauvegarder Markdown
    print("\nSauvegarde du calendrier Markdown...")
    md_path = generate_markdown_table(calendar)
    print(f"OK - Markdown genere: {md_path}")

    # Statistiques
    print("\n" + "="*80)
    print("STATISTIQUES DU CALENDRIER")
    print("="*80)

    platform_counts = {}
    for entry in calendar:
        platform = entry['Plateforme']
        platform_counts[platform] = platform_counts.get(platform, 0) + 1

    for platform, count in sorted(platform_counts.items(), key=lambda x: x[1], reverse=True):
        print(f"{platform}: {count} publications")

    print(f"\nTOTAL: {len(calendar)} publications sur {len(optimizations)} semaines")
    print("\nDuree estimee du plan: ~6 mois")
    print("\n" + "="*80)

if __name__ == "__main__":
    main()
