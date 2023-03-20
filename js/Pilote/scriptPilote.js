//----------------------------- Import des fonctions ----------------------------
import {
  creationGraphePointPilote,
  graphePointsMoyenDriver,
} from "./graphesPilote.js";
import { mapPilote } from "./mapPilote.js";
import { creationDivFormulaire } from "./comparaisonPilotes.js";

//----------------------------Récuperation Infos Pilotes depuis fichier json-------------
async function recupererInfosPilotes() {
  let response = await fetch("../json/Driver.json");
  response = await response.json();
  return response;
}
let tabGlobalDataPilotes;
tabGlobalDataPilotes = await recupererInfosPilotes();

//-------------------- Action lorsqu'on clique sur le bouton Pilote ---------------
const boutonDecouvrirStatsPilotes = document.querySelector(
  ".btn-decouvrir-stats-pilotes"
);
boutonDecouvrirStatsPilotes.addEventListener("click", async function () {
  document.querySelector("#stats").innerHTML = "";
  afficherStatsPilotes();
  recupererInfosPilotes();
  mapPilote();
  creationNouvelleDiv();
  creationGraphePointPilote(2022);
  graphePointsMoyenDriver();
  creationDivFormulaire();
});

//------------------------------ Création des containers ----------------

function afficherStatsPilotes() {
  const StatsPilotes = document.querySelector("#stats");

  const divMapEtInfos = document.createElement("div");
  divMapEtInfos.id = "divMapEtInfos";

  StatsPilotes.appendChild(divMapEtInfos);
}

function creationNouvelleDiv() {
  const StatsPilotes = document.querySelector("#stats");

  const nouvelleDiv = document.createElement("div");
  nouvelleDiv.className = "divGraphique";

  StatsPilotes.appendChild(nouvelleDiv);
}

//------------------------------- Export des données -----------------------------

export { tabGlobalDataPilotes }; //export du tableau contenant les données des pilotes
