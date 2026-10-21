# FrigoMalin
FrigoMalin est une application web qui aide les particuliers à gérer leurs aliments, à éviter le gaspillage alimentaire et à trouver des recettes adaptées aux ingrédients qu'ils ont déjà chez eux.# FrigoMalin

## Utilisateur cible
Les particuliers, notamment les étudiants, les jeunes actifs et les familles qui souhaitent économiser de l'argent, mieux organiser leur réfrigérateur et réduire le gaspillage alimentaire. Ils oublient souvent les aliments qu'ils possèdent, ne savent pas toujours lesquels consommer en priorité et manquent parfois d'idées de repas.

## Fonctionnalités

### Indispensable (Must Have)
- Fonctionnalité 1 : Gestion du frigo — ajouter, modifier, supprimer et consulter des aliments avec leur nom, leur quantité, leur catégorie et leur date de péremption.
- Fonctionnalité 2 : Suivi des dates — identifier les aliments à consommer prochainement grâce à des indicateurs visuels priorité haute ( rouge ) , priorité moyenne (jaune) , priorité basse ( verte )
- Fonctionnalité 3 : Suggestions de recettes — proposer des recettes à partir des ingrédients disponibles dans le frigo.
- Fonctionnalité 4 : Tableau de bord — afficher un résumé du frigo, les aliments à consommer en priorité et des suggestions de recettes.
  
### Souhaitable (Should Have)
- Fonctionnalité 5 : Liste de courses — ajouter, cocher et supprimer des produits, et ajouter les ingrédients manquants d'une recette.

### Possible (Could Have)
- Fonctionnalité 6 : Profil et préférences — personnaliser les préférences alimentaires et le nombre de personnes au foyer.

## Modèle de données
- **Aliment** : identifiant, nom, quantité, unité, catégorie, date de péremption, date d'ajout.
- **Recette** : identifiant, titre, description, ingrédients (liste), étapes de préparation (liste), temps de préparation, catégorie, image.
- **Article de courses** : identifiant, nom, quantité, catégorie, statut acheté ou non acheté.
- **Profil** : préférences alimentaires, nombre de personnes au foyer.

## Stack technique
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Déployé sur Vercel

## Design
Le lien Figma viendra ici.

Le design sera moderne, minimaliste et chaleureux, avec une palette de couleurs vert sauge, blanc cassé et beige. L'application sera responsive et comportera cinq pages : Accueil, Mon frigo, Mes recettes, Liste de courses et Mon profil.

## Démo en ligne
L'URL Vercel viendra ici après le déploiement.
