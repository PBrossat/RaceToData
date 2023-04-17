import { afficherMapGP } from "./mapGP.js";
import { gestionFormulaireGP, afficherIntroductionGP } from "./simulationGP.js";

//Requete API pour avoir des infos sur les GP
async function recupererInfosGpAPI() {
  let response = await fetch("http://localhost:3000/infosGpAPI");
  response = await response.json();
  return response["MRData"]["CircuitTable"]["Circuits"];
}
//Requete pour avoir les infos sur les GP contenues dans notre fichier json
async function recupererInfosGpJSON() {
  let response = await fetch("http://localhost:3000/infosGpJSON");
  response = await response.json();
  return response["Circuits"];
}

// Recuperer les infos sur les GP
let tabGlobalDataGpAPI;
let tabGlobalDataGpJSON;
export let tabGlobalDataGP = [];
tabGlobalDataGpAPI = await recupererInfosGpAPI();
tabGlobalDataGpJSON = await recupererInfosGpJSON();

//Fusionner les deux fichiers JSON
for (let i = 0; i < tabGlobalDataGpAPI.length; i++) {
  tabGlobalDataGP[i] = Object.assign(
    {},
    tabGlobalDataGpAPI[i],
    tabGlobalDataGpJSON[i]
  );
}

//-------------------------------Gestion du click sur le bouton de la card des grands-prix--------------------------------------------------

const boutonDecouvrirStatsGrandsPrix = document.querySelector(
  ".btn-decouvrir-stats-grands-prix"
);
boutonDecouvrirStatsGrandsPrix.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherMapGP();
  afficherIntroductionGP();
  gestionFormulaireGP();
});
