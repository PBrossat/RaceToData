//----------------------------- Import des fonctions ----------------------------
import {
  // grapheEcuriesPoint,
  graphePie,
  grapheTest,
  grapheCourse,
  //main,
} from "./graphesEcuries.js";
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
  // await grapheEcuriesPoint();
  creationBoutonPie();
  creationBoutonTest();
  grapheCourse();
});

//------------------------------ Création des containers ----------------

function afficherStatsEcuries() {
  const StatsEcuries = document.querySelector("#stats");

  const divMapEtInfos = document.createElement("div");
  divMapEtInfos.id = "divMapEtInfos";

  StatsEcuries.appendChild(divMapEtInfos);
}

function creationNouvelleDiv() {
  const StatsPilotes = document.querySelector("#stats");

  const nouvelleDiv = document.createElement("div");
  nouvelleDiv.className = "divGraphique";

  StatsPilotes.appendChild(nouvelleDiv);
}

function creationBoutonTest() {
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

  const Stats = document.createElement("input");
  Stats.type = "radio";
  Stats.name = "option";
  Stats.value = "base";
  divAnalyse.appendChild(Stats);

  const labelStats = document.createElement("label");
  labelStats.innerHTML = "Satistiques saison 2022 par écuries";
  divAnalyse.appendChild(labelStats);

  const StatsAll = document.createElement("input");
  StatsAll.type = "radio";
  StatsAll.name = "option";
  StatsAll.value = "All";
  StatsAll.checked = true;
  divAnalyse.appendChild(StatsAll);

  const labelStatsAll = document.createElement("label");
  labelStatsAll.innerHTML = "Statistiques depuis 1958 par écuries";
  divAnalyse.appendChild(labelStatsAll);

  const buttonMettreAJour = document.createElement("button");
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

  grapheTest(data);

  buttonMettreAJour.addEventListener("click", function () {
    const titreSeries = document.querySelector('input[value="base"]');
    const titreSeriesAll = document.querySelector('input[value="All"]');
    if (titreSeriesAll.checked) {
      data = seriesAll;
    } else if (titreSeries.checked) {
      data = series;
    }
    grapheTest(data);
  });
}

function creationBoutonPie() {
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
  titreConstructeurs.type = "radio";
  titreConstructeurs.name = "option";
  titreConstructeurs.value = "constructeurs";
  titreConstructeurs.checked = true;
  divAnalyse.appendChild(titreConstructeurs);

  const labelTitreConstructeurs = document.createElement("label");
  labelTitreConstructeurs.innerHTML =
    "Nombre de titres constructeurs par écuries";
  divAnalyse.appendChild(labelTitreConstructeurs);

  const titrePilotes = document.createElement("input");
  titrePilotes.type = "radio";
  titrePilotes.name = "option";
  titrePilotes.value = "pilotes";
  divAnalyse.appendChild(titrePilotes);

  const labelTitrePilotes = document.createElement("label");
  labelTitrePilotes.innerHTML = "Nombre de titres pilotes par écuries";
  divAnalyse.appendChild(labelTitrePilotes);

  const buttonMettreAJour = document.createElement("button");
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

  graphePie(data);

  buttonMettreAJour.addEventListener("click", function () {
    const titreEcuries = document.querySelector('input[value="constructeurs"]');
    const titrePilotes = document.querySelector('input[value="pilotes"]');
    if (titreEcuries.checked) {
      data = Ecuries;
    } else if (titrePilotes.checked) {
      data = Pilotes;
    }
    graphePie(data);
  });
}

//------------------------------- Export des données -----------------------------

export { tabGlobalDataEcuries }; //export du tableau contenant les données des écuries
