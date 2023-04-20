//----------------------------- Import des fonctions ----------------------------
import {
  creationGraphePointPilote,
  graphePointsMoyenDriver,
} from "./graphesPilote.js";
import { mapPilote } from "./mapPilote.js";
import {
  gestionFormulairePilote,
  creationSlider,
  grahiquePositionComparaison,
  explicationComparaison,
} from "./comparaisonPilotes.js";
import { creationDivFormulaire } from "../SimulationGP/formulaireSimulation.js";
import { tabGlobalDataGP } from "../SimulationGP/scriptSimulation.js";

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
  creationSlider();
  await explicationComparaison();
  await creationDivFormulaire(
    document.querySelector("#divFormulaireEtSlider"), //container du slider et du formulaire
    tabGlobalDataPilotes,
    tabGlobalDataGP,
    "Comparer !",
    "Comparez deux pilotes sur un Grand Prix"
  );
  await gestionFormulairePilote();
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
