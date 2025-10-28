# 🚀 Guide de Déploiement IONOS - Fluxa

## 📋 Méthode 1 : FTP/SFTP (Recommandé)

### Étape 1 : Accéder à vos identifiants FTP

1. **Connectez-vous à votre espace client IONOS**
   - URL : https://www.ionos.fr/
   - Cliquez sur "Connexion" en haut à droite
   - Entrez vos identifiants

2. **Accédez à vos données FTP**
   - Cliquez sur "Contrats" dans le menu
   - Sélectionnez votre hébergement web
   - Allez dans "Hébergement" > "Accès FTP"
   - Notez vos identifiants :
     ```
     Serveur FTP : ftp.votredomaine.com (ou IP)
     Nom d'utilisateur : votre_login
     Mot de passe : [cliquez sur "Afficher"]
     ```

### Étape 2 : Télécharger FileZilla (gratuit)

1. **Téléchargez FileZilla Client**
   - URL : https://filezilla-project.org/download.php?type=client
   - Choisissez votre système (Windows)
   - Installez le logiciel

2. **Lancez FileZilla**

### Étape 3 : Configurer la connexion FTP dans FileZilla

1. **Ouvrir le Gestionnaire de Sites**
   - Cliquez sur "Fichier" > "Gestionnaire de sites"
   - Cliquez sur "Nouveau site"
   - Nommez-le "Fluxa IONOS"

2. **Entrez vos informations**
   ```
   Hôte : ftp.votredomaine.com (ou l'IP fournie par IONOS)
   Port : 21 (ou 22 pour SFTP)
   Protocole : FTP - File Transfer Protocol (ou SFTP si disponible)
   Chiffrement : Utiliser FTP explicite sur TLS si disponible
   Type d'authentification : Normale
   Identifiant : votre_login_ftp
   Mot de passe : votre_mot_de_passe
   ```

3. **Cliquez sur "Connexion"**

### Étape 4 : Naviguer vers le bon dossier sur le serveur

Sur IONOS, le dossier racine de votre site est généralement :
```
/
ou
/htdocs/
ou
/public_html/
ou
/html/
```

**Trouvez le bon dossier** en cherchant où se trouve votre `index.html` actuel.

### Étape 5 : Déployer le contenu du dossier `dist/`

1. **Sur votre ordinateur (panneau gauche de FileZilla)**
   - Naviguez vers :
   ```
   C:\Users\Utilisateur\Documents\Applications personnalisées\fluxa-artisans-automations-main\dist
   ```

2. **Sur le serveur (panneau droit)**
   - Allez dans le dossier racine de votre site (ex: `/htdocs/`)

3. **Sélectionnez TOUT le contenu du dossier `dist/`**
   - Clic droit > Sélectionner tout
   - Ou Ctrl+A

4. **Téléchargez les fichiers**
   - Clic droit sur la sélection
   - Choisir "Téléverser"
   - ⚠️ **IMPORTANT** : Choisissez "Écraser" si des fichiers existent déjà

### Structure finale sur le serveur :

```
/htdocs/  (ou votre dossier racine)
├── index.html
├── .htaccess
├── favicon.ico
├── logo.png
├── articles_extracted.json
├── assets/
│   ├── index.html
│   ├── index-DiMkHqih.js
│   ├── index-Bw3OYy1S.css
│   └── images/
│       ├── logo-BnWRKBUy.webp
│       └── dashboard-mockup-DHAtCtbE.webp
├── articles/
│   └── index.html
└── images/
    └── index.html
```

---

## 📋 Méthode 2 : File Manager IONOS (Interface Web)

### Étape 1 : Accéder au File Manager

1. **Connectez-vous à IONOS**
2. **Allez dans votre hébergement**
3. **Cliquez sur "File Manager"** ou "Gestionnaire de fichiers"

### Étape 2 : Naviguer vers le dossier racine

- Trouvez le dossier `/htdocs/` ou `/public_html/`

### Étape 3 : Téléverser les fichiers

1. **Sélectionnez tous les fichiers dans `dist/` sur votre PC**
2. **Glissez-déposez** dans le File Manager
3. Ou utilisez le bouton **"Upload"** / "Téléverser"

⚠️ **Attention** : Le File Manager web peut être lent pour beaucoup de fichiers. **FileZilla est recommandé.**

---

## 📋 Méthode 3 : Git Deploy (Avancé)

Si vous avez accès SSH sur IONOS (hébergements premium) :

```bash
# Se connecter en SSH
ssh votre_login@votredomaine.com

# Naviguer vers le dossier web
cd /htdocs/

# Cloner votre repo (si sur GitHub/GitLab)
git clone https://github.com/votre-compte/fluxa.git .

# Installer les dépendances
npm install

# Build en production
npm run build

# Déplacer les fichiers
mv dist/* .
```

---

## ✅ Vérifications Post-Déploiement

### 1. Testez votre site

Ouvrez dans votre navigateur :
```
https://fluxa.fr
```

### 2. Vérifiez les headers de cache

Ouvrez la console développeur (F12) :
- Onglet "Network"
- Rechargez la page
- Cliquez sur une image
- Vérifiez la présence de :
  ```
  Cache-Control: public, max-age=31536000, immutable
  ```

### 3. Testez le directory listing

Essayez d'accéder à :
```
https://fluxa.fr/images/
https://fluxa.fr/assets/
```

Vous devriez voir **"403 Forbidden"** ✅

### 4. Testez le SEO

Utilisez ces outils :
- https://pagespeed.web.dev/
- https://www.seobility.net/

Vous devriez maintenant avoir **100/100** ! 🎉

---

## 🔧 Problèmes Courants

### ❌ "Le site ne s'affiche pas"

**Solution** : Vérifiez que vous avez bien copié le contenu **du dossier dist/** et non le dossier lui-même.

✅ Correct :
```
/htdocs/
  ├── index.html
  └── assets/
```

❌ Incorrect :
```
/htdocs/
  └── dist/
      ├── index.html
      └── assets/
```

### ❌ "Les images ne se chargent pas"

**Solution** : Vérifiez que le dossier `assets/images/` est bien présent et contient vos images.

### ❌ ".htaccess ne fonctionne pas"

**Solution** :
1. Vérifiez que le fichier `.htaccess` est bien à la racine
2. Parfois Windows cache les fichiers commençant par `.`
3. Dans FileZilla, activez "Afficher les fichiers cachés" : Serveur > Forcer l'affichage des fichiers cachés

### ❌ "403 Forbidden sur tout le site"

**Solution** : Vérifiez que `index.html` est bien présent à la racine.

---

## 📞 Support IONOS

Si vous rencontrez des problèmes :

**Téléphone** : 09 70 80 89 11
**Email** : support@ionos.fr
**Chat** : Disponible dans votre espace client

Posez-leur la question :
> "Je dois déployer mon site React dans le dossier racine. Quel est le chemin FTP exact ?"

---

## 🎯 Checklist Finale

Avant de déployer :
- [ ] `npm run build` exécuté avec succès
- [ ] Dossier `dist/` créé et contient tous les fichiers
- [ ] Identifiants FTP IONOS récupérés
- [ ] FileZilla installé et configuré

Pendant le déploiement :
- [ ] Connexion FTP réussie
- [ ] Dossier racine identifié (ex: `/htdocs/`)
- [ ] **Contenu** du dossier `dist/` téléversé (pas le dossier lui-même)
- [ ] Fichier `.htaccess` bien présent à la racine

Après le déploiement :
- [ ] Site accessible sur https://fluxa.fr
- [ ] Images chargées correctement
- [ ] Headers de cache configurés
- [ ] Directory listing bloqué (403 Forbidden)
- [ ] SEO score testé (100/100 attendu)

---

## 🚀 Temps Estimé

- **Première fois** : 15-20 minutes
- **Mises à jour suivantes** : 2-3 minutes

---

📅 Guide créé le : 28/10/2025
🔧 Par : Claude Code
