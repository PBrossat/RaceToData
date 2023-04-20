import { tabGlobalDataGP } from "./scriptSimulation.js";

export function afficherMapGP() {
  //Création des div nécessaires
  const sectionStats = document.querySelector("#stats");
  const divMapEtInfosGP = document.createElement("div");
  divMapEtInfosGP.id = "map-et-infos-gp";
  sectionStats.appendChild(divMapEtInfosGP);
  const divMapGP = document.createElement("div");
  divMapEtInfosGP.appendChild(divMapGP);
  divMapGP.id = "map";
  //Création du texte d'introduction pour dire à l'utilisateur comment voir les infos gràace à la carte
  const divInfosGP = document.createElement("div");
  divInfosGP.id = "divInfos";
  divMapEtInfosGP.appendChild(divInfosGP);
  const textIntro = document.createElement("h3");
  divInfosGP.appendChild(textIntro);
  textIntro.innerHTML =
    " Cliquez sur un circuit pour avoir son tracé, et survolez sa carte pour avoir encore plus d'informations !";

  const boutonDezoom = document.createElement("button");
  boutonDezoom.className = "bouton";
  divMapEtInfosGP.appendChild(boutonDezoom);
  boutonDezoom.textContent = "DeZoom";

  //Création de la map
  let mapGP = L.map("map", {
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
        const existeDivInfosGP = document.querySelector("#divInfos");
        if (existeDivInfosGP) {
          existeDivInfosGP.remove();
        }
        const divInfosGP = document.createElement("div");
        divInfosGP.id = "divInfos";
        divMapEtInfosGP.appendChild(divInfosGP);
        const divInfosGPContent = document.createElement("div");
        divInfosGPContent.id = "divInfosContent";
        divInfosGP.appendChild(divInfosGPContent);

        //PARTIE FRONT
        const divInfosGPFront = document.createElement("div");
        divInfosGPFront.id = "divInfosFront";
        divInfosGPContent.appendChild(divInfosGPFront);
        const titreGP = document.createElement("h1");
        const imgGP = document.createElement("img");
        divInfosGPFront.appendChild(titreGP);
        divInfosGPFront.appendChild(imgGP);
        titreGP.textContent = tabGlobalDataGP[i].circuitName;
        imgGP.src = tabGlobalDataGP[i].Image;

        //PARTIE BACK
        const divInfosGPBack = document.createElement("div");
        divInfosGPBack.id = "divInfosBack";
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
  //Gestion du bouton dezoom
  boutonDezoom.addEventListener("click", function () {
    const maxDezoome = 3;
    if (mapGP.getZoom() >= maxDezoome) {
      //récupère le centrage actuel du zoom
      var currentCenter = mapGP.getCenter();

      //récupère les coordonnées du centre du zoom
      var currentLng = currentCenter.lng;
      var currentLat = currentCenter.lat;

      //dézoume à partir du zoom actuel
      mapGP.flyTo([currentLat, currentLng], maxDezoome);
    }
  });
}
