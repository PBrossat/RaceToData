<h1 align="center">🏎️ Race To Data 📊</h1>

# 🧐 About

Il s'agit d'un projet dans le cadre de l'UE LIFPROJET de l'Université Lyon 1.

- L'objectif du projet était de proposer une analyse visuelle des données de formule 1, en se concentrant sur trois parties principales : les pilotes, les écuries et les grands-Prix.
- Les pilotes : carte interactive, cartes avec différentes données, graphique spline, comparaison entre deux pilotes sur chaque GP
- Les écuries : carte interactive, cartes avec différentes données, graphiques avec des textes explicatifs, choix des données à afficher sur les graphiques
- Les grands-prix : carte interactive, cartes avec différentes données, comparaison entre deux pilotes sur un GP en visuel, comparaison des télémétries, analyse de graphiques

# 📓 Sujet

Le sujet du projet est disponible [ici](http://cazabetremy.fr/wiki/doku.php?id=projet:sujets).
Il s'agit du projet "RC1. Data Explorable".

# 🏁 Comment installer et run le projet

Ces instructions vous permettront d'obtenir une copie du projet et de le faire fonctionner sur votre machine locale.

- Cloner le répertoire

## Installer Python et Pip :

- Pour installer Python et Pip, suivez les instructions en fonction de votre système d'exploitation :

### Windows :

1. Téléchargez le programme d'installation Python à partir du site web officiel : https://www.python.org/downloads/windows/
2. Exécutez le programme d'installation et suivez les instructions à l'écran pour installer Python et Pip.

### macOS :

1. Téléchargez le programme d'installation Python à partir du site web officiel : https://www.python.org/downloads/mac-osx/
2. Exécutez le programme d'installation et suivez les instructions à l'écran pour installer Python et Pip.

### Linux :

1. Installez Python et Pip à partir des dépôts de votre distribution Linux en utilisant les commandes suivantes :
   - `sudo apt-get update`
   - `sudo apt-get install python python-pip`

## Installer fastf1 :

- Pour installer FastF1, ouvrez un terminal et exécutez la commande suivante : `pip install fastf1`

## Installer NodeJS :

- Pour installer NodeJS et npm, suivez les instructions en fonction de votre système d'exploitation :

### Windows :

1. Téléchargez le programme d'installation NodeJS à partir du site web officiel : https://nodejs.org/en/download/
2. Exécutez le programme d'installation et suivez les instructions à l'écran pour installer NodeJS et npm.

### macOS :

1. Téléchargez le programme d'installation NodeJS à partir du site web officiel : https://nodejs.org/en/download/
2. Exécutez le programme d'installation et suivez les instructions à l'écran pour installer NodeJS et npm.

### Linux :

1. Installez NodeJS et npm à partir des dépôts de votre distribution Linux en utilisant les commandes suivantes :
   - `sudo apt-get update`
   - `sudo apt-get install nodejs npm`

## Installer les dépendances :

- Pour finir d'installer les dépendances nécessaires, ouvrez un terminal dans le dossier du projet et exécutez la commande suivante : `npm install`

## Run le projet :

### IDE :

- Ouvrez le projet dans votre IDE.
- Entrez la commande `npm run start`

### Navigateur web :

- Ensuite, vous pouvez accéder au projet en allant sur http://localhost:3000 dans votre navigateur.

# Structure du projet

<details>
<summary>Arborescence du dossier</summary>

```
└── RaceToData/
    ├── css/
    ├── data/
    ├── js/
    │   ├── Ecuries/
    │   ├── Grands-Prix/
    │   ├── Pilote/
    │   ├── SimulationGP/
    │   └── index.js
    ├── json/
    │   ├── comparaisonPilote/
    │   ├── Ecuries/
    │   ├── simulationGP/
    │   ├── Driver.json
    │   └── Grands-prix.json
    ├── py/
    │   ├── cache/
    │   ├── analyseGP.py
    │   ├── comparaisonPilote.py
    │   └── simulationGP.py
    ├── index.html
    ├── package-lock.json
    ├── package.json
    └── README.md
```

</details>  
<br/>

# Organisation et explications de code

## css/

Le dossier "css" contient des fichiers CSS pour la mise en page du site web.

## data/

Le dossier "data" est destiné à stocker les images, vidéos utilisées dans le site web.

## js/

Le dossier "js" contient le code JavaScript de notre site web, qui est divisé en sous-dossiers pour les fonctionnalités relatives aux écuries, grands prix, pilotes et simulations de GP. Le fichier "index.js" dans ce dossier est le point d'entrée de notre site web.

## json/

Le dossier "json" contient des fichiers JSON, qui stockent les données de notre site web, telles que les fichiers de comparaison entre pilotes, ceux liés aux simulations de GP et les données des pilotes, des écuries et des Grands-Prix.

## py/

Le dossier "py" contient le code Python de notre site web. Le dossier "cache" stocke des fichiers temporaires, tels que les fichiers de cache de fastf1. Les fichiers Python "analyseGP.py", "comparaisonPilote.py" et "simulationGP.py" sont les fichiers principaux de notre site web pour récupérer les données de fastf1.

## index.html

Le fichier "index.html" est la page d'accueil de notre site web.

## package-lock.json

Le fichier "package-lock.json" contient des informations sur les packages installés et leurs dépendances.

## package.json

Le fichier "package.json" est un fichier de configuration pour notre projet, qui contient des informations sur notre site web, les dépendances de notre projet et les scripts de construction.

# Résultats

Le projet RaceToData permet d'obtenir une analyse visuelle des données de la course automobile, en se concentrant sur les pilotes, les écuries et les Grands-Prix. Les différentes fonctionnalités proposées permettent de comparer facilement différentes données et de visualiser les résultats de manière claire et concise.

# ✍️ Authors

- [Pierrick BROSSAT](https://forge.univ-lyon1.fr/p2002218) : p2002218
- [Matis BRUN](https://forge.univ-lyon1.fr/p2003969) : p2003969
- [Lucas FAUSTMANN](https://forge.univ-lyon1.fr/p2020351) : p2020351
