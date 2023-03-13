import { afficherMapGP } from "./mapGP.js";
import { afficherSimulationGP } from "./simulationGP.js";

//Creation de scale pour afficher le tracé du circuit
var xScale = d3.scaleLinear().domain([-20000, 20000]).range([-800, 1400]);
var yScale = d3.scaleLinear().domain([-20000, 20000]).range([-800, 1200]);

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
//Requete pour avoir les infos sur le driver 1
async function recupererInfosDriver1() {
  let response = await fetch("http://localhost:3000/infosGpDriver1");
  response = await response.json();
  return response;
}
//Requete pour avoir les infos sur le driver 2
async function recupererInfosDriver2() {
  let response = await fetch("http://localhost:3000/infosGpDriver2");
  response = await response.json();
  return response;
}

//! window.localStorage

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

//Recuperer les infos sur les drivers
export let dataDriver1 = await recupererInfosDriver1();
export let dataDriver2 = await recupererInfosDriver2();

//Mettre les données à la bonne échelle
for (let i = 0; i < dataDriver1.length; i++) {
  dataDriver1[i].positionX = xScale(dataDriver1[i].positionX);
  dataDriver1[i].positionY = yScale(dataDriver1[i].positionY);
}
for (let i = 0; i < dataDriver2.length; i++) {
  dataDriver2[i].positionX = xScale(dataDriver2[i].positionX);
  dataDriver2[i].positionY = yScale(dataDriver2[i].positionY);
}

//-------------------------------Gestion du click sur le bouton de la card des grands-prix--------------------------------------------------

const boutonDecouvrirStatsGrandsPrix = document.querySelector(
  ".btn-decouvrir-stats-grands-prix"
);
boutonDecouvrirStatsGrandsPrix.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherMapGP();
  afficherSimulationGP();
});
