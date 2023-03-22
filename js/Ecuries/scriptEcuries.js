//----------------------------- Import des fonctions ----------------------------
import {
  grapheEcuriesPoint,
  graphePie,
  grapheTest,
  grapheCourse,
  // tabPointsEcuriesAllTime,
} from "./graphesEcuries.js";
import { mapEcuries } from "./mapEcuries.js";

//------------------------------creation du json----------------------------------

// const data = await tabPointsEcuriesAllTime(1958, 2022);

// // Convertir les données en chaîne JSON
// const jsonData = JSON.stringify(data);

// console.log("json: ", jsonData);

//----------------------------Récuperation Infos Ecuries depuis fichier json-------------
async function recupererInfosEcuries() {
  let response = await fetch("../json/Ecuries.json");
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
  graphePie();
  grapheTest();
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

//------------------------------- Export des données -----------------------------

export { tabGlobalDataEcuries }; //export du tableau contenant les données des écuries
