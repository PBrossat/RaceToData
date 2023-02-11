//Requete API pour avoir des infos sur les GP
async function recupererInfosGpAPI() {
  let response = await fetch("http://localhost:3000/infosGpAPI");
  response = await response.json();
  return response["MRData"]["CircuitTable"]["Circuits"];
}

async function recupererInfosGpJSON() {
  let response = await fetch("http://localhost:3000/infosGpJSON");
  response = await response.json();
  return response["Circuits"];
}

//! window.localStorage

let tabGlobalDataGpAPI;
let tabGlobalDataGpJSON;
let tabGlobalDataGP = [];

tabGlobalDataGpAPI = await recupererInfosGpAPI();
tabGlobalDataGpJSON = await recupererInfosGpJSON();

// 0: Melbourne
// 1: Austin
// 2: Bahrain
// 3: Baku
// 4: Barcelone
// 5: Hungaroring
// 6: Imola
// 7: Bresil
// 8: Jeddah
// 9: Singapour
// 10: Miami
// 11: Monaco
// 12: Monza
// 13: Red Bull Ring
// 14: Castellet
// 15: Mexique
// 16: Silverstone
// 17: Spa Francorchamps
// 18: Suzuka
// 19: Canada
// 20: Abu Dhabi
// 21: Zandvoort

//Fusionner les deux fichiers JSON
for (let i = 0; i < tabGlobalDataGpAPI.length; i++) {
  tabGlobalDataGP[i] = Object.assign(
    {},
    tabGlobalDataGpAPI[i],
    tabGlobalDataGpJSON[i]
  );
}
console.log(tabGlobalDataGP);

//---------------------------------GESTION DE LA MAP--------------------------------------

function afficherMapGP() {
  //Création des div nécessaires
  const sectionStats = document.querySelector("#stats");
  const divMapEtInfosGP = document.createElement("div");
  divMapEtInfosGP.id = "map-et-infos-gp";
  sectionStats.appendChild(divMapEtInfosGP);
  const divMapGP = document.createElement("div");
  divMapEtInfosGP.appendChild(divMapGP);
  divMapGP.id = "mapGP";
  //Création de la map
  var mapGP = L.map("mapGP", {
    center: [48.866667, 2.333333],
    zoom: 1.5,
  });
  const layerPrincipale = L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 8,
      minZoom: 1.5,

      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }
  );
  layerPrincipale.addTo(mapGP);
  //Création des limites de la map
  var sudOuest = L.latLng(-90, -180),
    nordEst = L.latLng(90, 180),
    limiteMap = L.latLngBounds(sudOuest, nordEst);
  mapGP.setMaxBounds(limiteMap);
  mapGP.on("drag", function () {
    mapGP.panInsideBounds(limiteMap, { animate: false });
  });

  const markerGP = L.icon({
    iconUrl: "data/markerPneu.png",
    iconSize: [30, 30],
  });

  //Création des markers

  for (let i = 0; i < tabGlobalDataGP.length; i++) {
    L.marker(
      [tabGlobalDataGP[i].Location.lat, tabGlobalDataGP[i].Location.long],
      {
        icon: markerGP,
      }
    )
      .addTo(mapGP)
      .on("click", function () {
        mapGP.flyTo(
          [tabGlobalDataGP[i].Location.lat, tabGlobalDataGP[i].Location.long],
          mapGP.getMaxZoom()
        );
        const existeDivInfosGP = document.querySelector("#divInfosGP");
        if (existeDivInfosGP) {
          existeDivInfosGP.remove();
        }
        const divInfosGP = document.createElement("div");
        divInfosGP.id = "divInfosGP";
        divMapEtInfosGP.appendChild(divInfosGP);
        const divInfosGPContent = document.createElement("div");
        divInfosGPContent.id = "divInfosGPContent";
        divInfosGP.appendChild(divInfosGPContent);

        //PARTIE FRONT
        const divInfosGPFront = document.createElement("div");
        divInfosGPFront.id = "divInfosGPFront";
        divInfosGPContent.appendChild(divInfosGPFront);
        const titreGP = document.createElement("h1");
        const imgGP = document.createElement("img");
        divInfosGPFront.appendChild(titreGP);
        divInfosGPFront.appendChild(imgGP);
        titreGP.textContent = tabGlobalDataGP[i].circuitName;
        imgGP.src = tabGlobalDataGP[i].Image;

        //PARTIE BACK
        const divInfosGPBack = document.createElement("div");
        divInfosGPBack.id = "divInfosGPBack";
        divInfosGPContent.appendChild(divInfosGPBack);
        const firstGP = document.createElement("p");
        const numberLaps = document.createElement("p");
        const circuitLength = document.createElement("p");
        const raceDistance = document.createElement("p");
        const lapRecord = document.createElement("p");
        const recordHolder = document.createElement("p");
        divInfosGPBack.appendChild(firstGP);
        divInfosGPBack.appendChild(numberLaps);
        divInfosGPBack.appendChild(circuitLength);
        divInfosGPBack.appendChild(raceDistance);
        divInfosGPBack.appendChild(lapRecord);
        divInfosGPBack.appendChild(recordHolder);
        firstGP.textContent =
          "Premier Grand Prix : " + tabGlobalDataGP[i].FirstGP;
        numberLaps.textContent =
          "Nombre de tours : " + tabGlobalDataGP[i].NumberLaps;
        circuitLength.textContent =
          "Longueur du circuit : " + tabGlobalDataGP[i].CircuitLength + " km";
        raceDistance.textContent =
          "Distance de la course : " + tabGlobalDataGP[i].RaceDistance + " km";
        lapRecord.textContent =
          "Record du tour : " + tabGlobalDataGP[i].LapRecord;
        recordHolder.textContent =
          "Recordman : " + tabGlobalDataGP[i].RecordHolder;
      });
  }
}

//-------------------------------Gestion du click sur le bouton de la carte des grands-prix--------------------------------------------------

const boutonDecouvrirStatsGrandsPrix = document.querySelector(
  ".btn-decouvrir-stats-grands-prix"
);
boutonDecouvrirStatsGrandsPrix.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherMapGP();
});
