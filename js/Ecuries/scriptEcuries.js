//----------------------------- Import des fonctions ----------------------------
import {
  // grapheEcuriesPoint,
  graphePie,
  grapheTest,
  grapheRace,
} from "./graphesEcuries.js";
// import { main } from "./creationJson.js";
import { mapEcuries } from "./mapEcuries.js";

//----------------------------Récuperation Infos Ecuries depuis fichier json-------------
async function recupererInfosEcuries() {
  let response = await fetch("../json/Ecuries/Ecuries.json");
  response = await response.json();
  return response;
}
let tabGlobalDataEcuries;
tabGlobalDataEcuries = await recupererInfosEcuries();

//-------------------- Action lorsqu'on clique sur le bouton Ecuries ---------------

const boutonDecouvrirStatsEcuries = document.querySelector(
  ".btn-decouvrir-stats-ecuries"
);
boutonDecouvrirStatsEcuries.addEventListener("click", async function () {
  document.querySelector("#stats").innerHTML = "";
  afficherStatsEcuries();
  recupererInfosEcuries();
  mapEcuries();
  creationNouvelleDiv();
  creationDivPie();
  creationDivMultipleBars();
  creationDivRace();
});

//------------------------------ Création des containers ----------------

//création d'une div pour la map
function afficherStatsEcuries() {
  const StatsEcuries = document.querySelector("#stats");

  const divMapEtInfos = document.createElement("div");
  divMapEtInfos.id = "divMapEtInfos";

  StatsEcuries.appendChild(divMapEtInfos);
}

//création d'une div pour les graphiques
function creationNouvelleDiv() {
  const StatsPilotes = document.querySelector("#stats");

  const nouvelleDiv = document.createElement("div");
  nouvelleDiv.className = "divGraphique";

  StatsPilotes.appendChild(nouvelleDiv);
}

//------------------- Création de la div pour le graphique de stats -------------------

function creationDivMultipleBars() {
  //Création container
  const divParent = document.querySelector(".divGraphique");
  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divAnalysePointsPilotes";
  divParent.appendChild(divAnalyse);
  divAnalyse.innerHTML = "";

  //Création Titre
  const Titre = document.createElement("h1");
  divAnalyse.appendChild(Titre);
  Titre.innerHTML = "Graphique Statistiques écuries";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "GraphiqueVictoires";
  divGraphique.className = "Graphique";
  divAnalyse.appendChild(divGraphique);

  const StatsAll = document.createElement("input");
  StatsAll.id = "inputChoix";
  StatsAll.type = "radio";
  StatsAll.name = "option";
  StatsAll.checked = true;
  divAnalyse.appendChild(StatsAll);

  const labelStatsAll = document.createElement("label");
  labelStatsAll.id = "labelChoix";
  labelStatsAll.innerHTML = "Statistiques depuis 1958 par écuries";
  divAnalyse.appendChild(labelStatsAll);

  const Stats = document.createElement("input");
  Stats.id = "inputChoix";
  Stats.type = "radio";
  Stats.name = "option";
  divAnalyse.appendChild(Stats);

  const labelStats = document.createElement("label");
  labelStats.id = "labelChoix";
  labelStats.innerHTML = "Satistiques saison 2022 par écuries";
  divAnalyse.appendChild(labelStats);

  const buttonMettreAJour = document.createElement("button");
  buttonMettreAJour.className = "buttonMettreAJour";
  buttonMettreAJour.innerHTML = "Mettre à jour";
  divAnalyse.appendChild(buttonMettreAJour);

  const seriesAll = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    seriesAll.push({
      name: tabGlobalDataEcuries[i].nom,
      data: [
        tabGlobalDataEcuries[i].wins_all,
        tabGlobalDataEcuries[i].pole_all,
        tabGlobalDataEcuries[i].podiums_all,
      ],
    });
  }

  const series = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    series.push({
      name: tabGlobalDataEcuries[i].nom,
      data: [
        tabGlobalDataEcuries[i].wins,
        tabGlobalDataEcuries[i].pole,
        tabGlobalDataEcuries[i].podium,
      ],
    });
  }

  let data = seriesAll;
  let annee = 1958;

  grapheTest(data, annee);

  buttonMettreAJour.addEventListener("click", function () {
    if (StatsAll.checked) {
      data = seriesAll;
      annee = 1958;
    } else if (Stats.checked) {
      data = series;
      annee = 2022;
    }
    grapheTest(data, annee);
  });
}

//------------------- Création de la div pour le graphique de titres -------------------
function creationDivPie() {
  //Création container
  const divParent = document.querySelector(".divGraphique");
  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divAnalysePointsPilotes";
  divParent.appendChild(divAnalyse);
  divAnalyse.innerHTML = "";

  //Création Titre
  const Titre = document.createElement("h1");
  divAnalyse.appendChild(Titre);
  Titre.innerHTML = "Graphique Titres Ecuries ";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "GraphiquePtEcuries";
  divGraphique.className = "Graphique";
  divAnalyse.appendChild(divGraphique);

  const titreConstructeurs = document.createElement("input");
  titreConstructeurs.id = "inputChoix";
  titreConstructeurs.type = "radio";
  titreConstructeurs.name = "option";
  titreConstructeurs.checked = true;
  divAnalyse.appendChild(titreConstructeurs);

  const labelTitreConstructeurs = document.createElement("label");
  labelTitreConstructeurs.id = "labelChoix";
  labelTitreConstructeurs.innerHTML =
    "Nombre de titres constructeurs par écuries";
  divAnalyse.appendChild(labelTitreConstructeurs);

  const titrePilotes = document.createElement("input");
  titrePilotes.id = "inputChoix";
  titrePilotes.type = "radio";
  titrePilotes.name = "option";
  divAnalyse.appendChild(titrePilotes);

  const labelTitrePilotes = document.createElement("label");
  labelTitrePilotes.id = "labelChoix";
  labelTitrePilotes.innerHTML = "Nombre de titres pilotes par écuries";
  divAnalyse.appendChild(labelTitrePilotes);

  const buttonMettreAJour = document.createElement("button");
  buttonMettreAJour.className = "buttonMettreAJour";
  buttonMettreAJour.innerHTML = "Mettre à jour";
  divAnalyse.appendChild(buttonMettreAJour);

  const Ecuries = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    Ecuries.push([
      tabGlobalDataEcuries[i].nom,
      tabGlobalDataEcuries[i].titre_ecurie,
    ]);
  }

  const Pilotes = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    Pilotes.push([
      tabGlobalDataEcuries[i].nom,
      tabGlobalDataEcuries[i].titre_pilote,
    ]);
  }

  let data = Ecuries;
  let type = "constructeurs";

  graphePie(data, type);

  buttonMettreAJour.addEventListener("click", function () {
    if (titreConstructeurs.checked) {
      data = Ecuries;
      type = "constructeurs";
    } else if (titrePilotes.checked) {
      data = Pilotes;
      type = "pilotes";
    }
    graphePie(data, type);
  });
}

//------------------- Création de la div pour le graphique race -------------------

function creationDivRace() {
  //Création container
  const divParent = document.querySelector(".divGraphique");
  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divAnalysePointsPilotes";
  divParent.appendChild(divAnalyse);
  divAnalyse.innerHTML = "";

  let data = "Points";

  //Création Titre
  const Titre = document.createElement("h1");
  divAnalyse.appendChild(Titre);
  Titre.innerHTML = "Graphique données all time écuries 2022";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "GraphiqueWinsAllTime";
  divGraphique.className = "Graphique";
  divAnalyse.appendChild(divGraphique);

  //Creation Bouton
  const divPlay = document.createElement("div");
  divPlay.id = "play-controls";
  divAnalyse.appendChild(divPlay);

  const Btn = document.createElement("button");
  Btn.id = "play-pause-button";
  Btn.className = "fa fa_play";
  Btn.title = "play";
  Btn.innerHTML = "PLAY";
  divPlay.appendChild(Btn);

  const year = document.createElement("input");
  year.id = "play-range";
  year.value = 1958;
  year.min = 1958;
  year.max = 2022;
  year.type = "range";
  divPlay.appendChild(year);

  const Points = document.createElement("input");
  Points.id = "inputChoix";
  Points.type = "radio";
  Points.name = "option";
  Points.checked = true;
  divAnalyse.appendChild(Points);

  const labelPoints = document.createElement("label");
  labelPoints.id = "labelChoix";
  labelPoints.innerHTML = "Evolution du nombre de points par écuries";
  divAnalyse.appendChild(labelPoints);

  const Victoires = document.createElement("input");
  Victoires.id = "inputChoix";
  Victoires.type = "radio";
  Victoires.name = "option";
  divAnalyse.appendChild(Victoires);

  const labelVictoires = document.createElement("label");
  labelVictoires.id = "labelChoix";
  labelVictoires.innerHTML = "Evolution du nombre de victoires par écuries";
  divAnalyse.appendChild(labelVictoires);

  const buttonMettreAJour = document.createElement("button");
  buttonMettreAJour.className = "buttonMettreAJour";
  buttonMettreAJour.innerHTML = "Mettre à jour";
  divAnalyse.appendChild(buttonMettreAJour);

  grapheRace(data, year);

  buttonMettreAJour.addEventListener("click", function () {
    if (Points.checked) {
      data = "Points";
      year.value = 1958;
    } else if (Victoires.checked) {
      data = "Victoires";
      year.value = 1958;
    }
    grapheRace(data, year);
  });
}

//------------------------------- Export des données -----------------------------

export { tabGlobalDataEcuries }; //export du tableau contenant les données des écuries
