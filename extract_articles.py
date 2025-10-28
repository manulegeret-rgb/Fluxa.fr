#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script d'extraction des articles .docx pour optimisation SEO
"""

import os
import json
from docx import Document
from pathlib import Path

def extract_text_from_docx(docx_path):
    """Extrait le texte et la structure d'un fichier .docx"""
    doc = Document(docx_path)

    content = {
        "filename": os.path.basename(docx_path),
        "paragraphs": [],
        "full_text": "",
        "headings": []
    }

    full_text_parts = []

    for para in doc.paragraphs:
        text = para.text.strip()
        if text:
            style = para.style.name

            # Détecter les titres
            if "Heading" in style or "Titre" in style:
                content["headings"].append({
                    "text": text,
                    "level": style
                })

            content["paragraphs"].append({
                "text": text,
                "style": style
            })

            full_text_parts.append(text)

    content["full_text"] = "\n\n".join(full_text_parts)

    return content

def main():
    # Chemins
    articles_dir = r"C:\Users\Utilisateur\Documents\Applications personnalisées\fluxa-artisans-automations-main\Articles optimisés SEO"
    output_json = r"C:\Users\Utilisateur\Documents\Applications personnalisées\fluxa-artisans-automations-main\public\articles_extracted.json"

    articles_data = {}

    # Lire tous les fichiers .docx
    for filename in os.listdir(articles_dir):
        if filename.endswith('.docx') and not filename.startswith('~'):
            filepath = os.path.join(articles_dir, filename)
            print(f"Extraction de : {filename}")

            try:
                content = extract_text_from_docx(filepath)
                articles_data[filename] = content
                print(f"  OK - {len(content['paragraphs'])} paragraphes extraits")
            except Exception as e:
                print(f"  ERREUR : {e}")

    # Sauvegarder en JSON
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(articles_data, f, ensure_ascii=False, indent=2)

    print(f"\n>> {len(articles_data)} articles extraits dans : {output_json}")

if __name__ == "__main__":
    main()
