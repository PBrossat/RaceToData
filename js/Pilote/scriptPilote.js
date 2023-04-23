//----------------------------- Import des fonctions/données ----------------------------
import { grapheDriverPoint, graphePointsMoyenDriver } from "./graphesPilote.js";
import { mapPilote } from "./mapPilote.js";
import {
  gestionFormulairePilote,
  creationSlider,
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
  creationDivAvecNom("#stats", "divMapEtInfos", "none", true, false);
  mapPilote();
  recupererInfosPilotes();
  creationDivAvecNom("#stats", "none", "divGraphique", false, true);
  grapheDriverPoint(2022);
  graphePointsMoyenDriver();
  creationSlider();
  await explicationComparaison();
  await creationDivFormulaire(
    document.querySelector("#divFormulaireEtSlider"), //container du slider et du formulaire
    tabGlobalDataPilotes,
    tabGlobalDataGP,
    "Comparaison !",
    "Comparez deux pilotes sur un Grand Prix"
  );
  await gestionFormulairePilote();
});

//------------------------------ Création des containers ----------------------------
function creationDivAvecNom(
  idDivParent,
  idNouvelleDiv,
  classNouvelleDiv,
  besoinId,
  besoinClassName
) {
  const container = document.querySelector(idDivParent);

  const nouvelleDiv = document.createElement("div");
  if (besoinId) {
    nouvelleDiv.id = idNouvelleDiv;
  }
  if (besoinClassName) {
    nouvelleDiv.className = classNouvelleDiv;
  }

  container.appendChild(nouvelleDiv);
}

//------------------------------- Export des données -----------------------------

export { tabGlobalDataPilotes }; //export du tableau contenant les données des pilotes
