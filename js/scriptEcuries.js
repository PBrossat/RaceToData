//Requete API pour avoir des infos sur les GP
async function recupererInfosEcuries() {
  let response = await fetch(
    "https://ergast.com/api/f1/2022/constructors.json"
  );
  response = await response.json();
  return response["MRData"]["ConstructorTable"]["Constructors"];
}

//! window.localStorage

let tabGlobalDataEcuries;

tabGlobalDataEcuries = await recupererInfosEcuries();

//console.log(tabGlobalDataEcuries);

const AlfaRomeo = tabGlobalDataEcuries[0];
const AlphaTauri = tabGlobalDataEcuries[1];
const Alpine = tabGlobalDataEcuries[2];
const AstonMartin = tabGlobalDataEcuries[3];
const Ferrari = tabGlobalDataEcuries[4];
const Haas = tabGlobalDataEcuries[5];
const McLaren = tabGlobalDataEcuries[6];
const Mercedes = tabGlobalDataEcuries[7];
const RedBull = tabGlobalDataEcuries[8];
const Williams = tabGlobalDataEcuries[9];

//---------------------------------GESTION DE LA MAP--------------------------------------

function afficherMapEcuries() {
  //Création des div nécessaires
  const sectionStats = document.querySelector("#stats");
  const divMapEtInfosEcuries = document.createElement("div");
  divMapEtInfosEcuries.id = "map-et-infos-Ecuries";
  sectionStats.appendChild(divMapEtInfosEcuries);
  const divMapEcuries = document.createElement("div");
  divMapEtInfosEcuries.appendChild(divMapEcuries);
  divMapEcuries.id = "mapEcuries";
  //Création de la map
  var mapEcuries = L.map("mapEcuries", {
    center: [48.866667, 2.333333],
    zoom: 1.5,
  });
  const layerPrincipale = L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 12,
      minZoom: 1.5,

      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }
  );
  layerPrincipale.addTo(mapEcuries);
  //Création des limites de la map
  var sudOuest = L.latLng(-90, -180),
    nordEst = L.latLng(90, 180),
    limiteMap = L.latLngBounds(sudOuest, nordEst);
  mapEcuries.setMaxBounds(limiteMap);
  mapEcuries.on("drag", function () {
    mapEcuries.panInsideBounds(limiteMap, { animate: false });
  });

  const markerEcuries = L.icon({
    iconUrl: "data/markerPneuMedium.png",
    iconSize: [30, 30],
  });

  //Création des markers

  L.marker([51.907266, -0.196862], {
    icon: markerEcuries,
  })
    .addTo(mapEcuries)
    .on("click", function () {
      mapEcuries.flyTo([51.907266, -0.196862], mapEcuries.getMaxZoom());
    });
}

//-------------------------------Gestion du click sur le bouton de la carte des grands-prix--------------------------------------------------

const boutonDecouvrirStatsEcuries = document.querySelector(
  ".btn-decouvrir-stats-ecuries"
);
boutonDecouvrirStatsEcuries.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherMapEcuries();
});

// -------------------------------------Méthode P---------------------------------------------------

// function afficherStatsEcuries() {
//   const StatsEcuries = document.querySelector("#stats");

//   const sectionStatsEcuries = document.createElement("section");
//   sectionStatsEcuries.innerHTML +=
//     "<h2>Analyse des données relatives aux Ecuries</h2>";

//   // const divStatsEcuries = document.createElement("div");
//   // divStatsEcuries.id = "divStatsEcuries";
//   const divMapEtInfos = document.createElement("div");
//   divMapEtInfos.id = "divMapEtInfosEcuries";

//   // const graphique = document.createElement("canvas");
//   // graphique.id = "CanvaId";

//   StatsEcuries.appendChild(sectionStatsEcuries);
//   // sectionStatsEcuries.appendChild(divStatsEcuries);
//   sectionStatsEcuries.appendChild(divMapEtInfos);
//   // divStatsEcuries.appendChild(graphique);

//   creationDivCarteEcuries();
//   creationDivInfosEcuries();
// }

// const boutonDecouvrirStatsEcuries = document.querySelector(
//   ".btn-decouvrir-stats-ecuries"
// );
// boutonDecouvrirStatsEcuries.addEventListener("click", function () {
//   document.querySelector("#stats").innerHTML = "";
//   afficherStatsEcuries();
//   mapEcuries();
//   // grapheEcurieRadarWinsPoles();
//   // grapheEcurieRadarWinsPosition();
//   // grapheEcurieBatonPoints();
// });

// function creationDivMapEcuries() {
//   const MapEtInfos = document.querySelector("#divMapEtInfosEcuries");

//   const divMapEcuries = document.createElement("div");
//   divMapEcuries.id = "divMapEcuries";

//   MapEtInfos.appendChild(divMapEcuries);
// }

// function creationDivInfosEcuries() {
//   const MapEtInfos = document.querySelector("#divMapEtInfosEcuries");

//   const divInfosEcuries = document.createElement("div");
//   divInfosEcuries.id = "divInfosEcuries";

//   MapEtInfos.appendChild(divInfosEcuries);
// }

// function creationDivCarteEcuries() {
//   const divCarteEcuries = document.querySelector("#divInfosEcuries");

//   const carteEcuries = document.createElement("div");
//   carteEcuries.id = "cardEcuries";

//   const imageEcuries = document.createElement("img");
//   imageEcuries.id = "imageEcuries";

//   const infosEcuries = document.createElement("div");
//   infosEcuries.id = "infosEcuriesDansCarte";

//   const nomEcuries = document.createElement("h1");
//   nomEcuries.className = "nomEcuries";

//   const nationalité = document.createElement("p");
//   nationalité.className = "palmaresEcuries";
//   nationalité.id = "nationalité";

//   const team = document.createElement("p");
//   team.className = "palmaresEcuries";
//   team.id = "team";

//   const nbVictoires = document.createElement("p");
//   nbVictoires.className = "palmaresEcuries";
//   nbVictoires.id = "nbVictoires";

//   const nbPoles = document.createElement("p");
//   nbPoles.className = "palmaresEcuries";
//   nbPoles.id = "nbPoles";

//   const nbPodiums = document.createElement("p");
//   nbPodiums.className = "palmaresEcuries";
//   nbPodiums.id = "nbPodiums";

//   divCarteEcuries.appendChild(carteEcuries);
//   carteEcuries.appendChild(imageEcuries);
//   carteEcuries.appendChild(infosEcuries);
//   infosEcuries.appendChild(nomEcuries);
//   infosEcuries.appendChild(nationalité);
//   infosEcuries.appendChild(team);
//   infosEcuries.appendChild(nbVictoires);
//   infosEcuries.appendChild(nbPoles);
//   infosEcuries.appendChild(nbPodiums);
//   console.log(nbVictoires);
// }

// let dataGlobalTab;
// fetch("json/Ecuries.json")
//   .then((response) => response.json())
//   .then((json) => {
//     const ecurieData = json;
//     const tabData = ecurieData.map((ecurie) => {
//       return {
//         Points: ecurie["points"],
//         nbVictoires: ecurie["wins"],
//         Poles: ecurie["pole"],
//         Nom: ecurie.Constructor["name"],
//         Nationalite: ecurie.Constructor["nationality"],
//         Position: ecurie["position"],
//       };
//     });
//     dataGlobalTab = tabData;
//     return tabData;
//   });

// //--------------------------------------GET----------------------------------------------------------------

// function getEcuries() {
//   const nomEcurie = [];
//   for (let i = 0; i < dataGlobalTab.length; i++) {
//     nomEcurie.push(dataGlobalTab[i].Nom);
//   }
//   return nomEcurie;
// }

// function getNbVictoiresEcuries() {
//   const nbVictoires = [];
//   for (let i = 0; i < dataGlobalTab.length; i++) {
//     nbVictoires.push(dataGlobalTab[i].nbVictoires);
//   }
//   return nbVictoires;
// }

// function getNbPolesEcuries() {
//   const poleEcurie = [];
//   for (let i = 0; i < dataGlobalTab.length; i++) {
//     poleEcurie.push(dataGlobalTab[i].Poles);
//   }
//   return poleEcurie;
// }

// function getNbPointsEcuries() {
//   const pointsEcurie = [];
//   for (let i = 0; i < dataGlobalTab.length; i++) {
//     pointsEcurie.push(dataGlobalTab[i].Points);
//   }
//   return pointsEcurie;
// }

// function getPositionEcuries() {
//   const positionEcurie = [];
//   for (let i = 0; i < dataGlobalTab.length; i++) {
//     positionEcurie.push(dataGlobalTab[i].Position);
//   }
//   return positionEcurie;
// }

// function getNationaliteEcuries() {
//   const nationaliteEcurie = [];
//   for (let i = 0; i < dataGlobalTab.length; i++) {
//     nationaliteEcurie.push(dataGlobalTab[i].Nationalite);
//   }
//   return nationaliteEcurie;
// }

// //---------------------------------GRAPHES--------------------------------------------------------------

// function grapheEcurieRadarWinsPoles() {
//   const nomEcurie = getEcuries();
//   const nbVictoiresEcuries = getNbVictoiresEcuries();
//   const nbPolesEcuries = getNbPolesEcuries();

//   const configuration = {
//     type: "radar",
//     data: {
//       labels: nomEcurie,

//       datasets: [
//         {
//           label: "Nombre de poles positions par écurie",
//           data: nbPolesEcuries,
//           fill: true,
//           backgroundColor: "rgba(255, 99, 132, 0.2)",
//           borderColor: "rgb(255, 99, 132)",
//           pointBackgroundColor: "rgb(255, 99, 132)",
//           pointBorderColor: "#fff",
//           pointHoverBackgroundColor: "#fff",
//           pointHoverBorderColor: "rgb(255, 99, 132)",
//         },
//         {
//           label: "Nombre de victoires par écurie",
//           data: nbVictoiresEcuries,
//           fill: true,
//           backgroundColor: "rgba(54, 162, 235, 0.2)",
//           borderColor: "rgb(54, 162, 235)",
//           pointBackgroundColor: "rgb(54, 162, 235)",
//           pointBorderColor: "#fff",
//           pointHoverBackgroundColor: "#fff",
//           pointHoverBorderColor: "rgb(54, 162, 235)",
//         },
//       ],
//     },
//   };

//   const graphique = document.getElementById("CanvaId");
//   const chart = new Chart(graphique, configuration);
// }

// function grapheEcurieRadarWinsPosition() {
//   const nomEcurie = getEcuries();
//   const nbVictoiresEcuries = getNbVictoiresEcuries();
//   const positionEcuries = getPositionEcuries();

//   const configuration = {
//     type: "radar",
//     data: {
//       labels: nomEcurie,

//       datasets: [
//         {
//           label: "Position au championnat par écurie",
//           data: positionEcuries,
//           fill: true,
//           backgroundColor: "rgba(255, 99, 132, 0.2)",
//           borderColor: "rgb(255, 99, 132)",
//           pointBackgroundColor: "rgb(255, 99, 132)",
//           pointBorderColor: "#fff",
//           pointHoverBackgroundColor: "#fff",
//           pointHoverBorderColor: "rgb(255, 99, 132)",
//         },
//         {
//           label: "Nombre de victoires par écurie",
//           data: nbVictoiresEcuries,
//           fill: true,
//           backgroundColor: "rgba(54, 162, 235, 0.2)",
//           borderColor: "rgb(54, 162, 235)",
//           pointBackgroundColor: "rgb(54, 162, 235)",
//           pointBorderColor: "#fff",
//           pointHoverBackgroundColor: "#fff",
//           pointHoverBorderColor: "rgb(54, 162, 235)",
//         },
//       ],
//     },
//   };

//   const graphique = document.getElementById("CanvaId");
//   const chart = new Chart(graphique, configuration);
// }

// function grapheEcurieBatonPoints() {
//   let tabCouleurs = [];
//   for (let i = 0; i < dataGlobalTab.length; i++) {
//     let r = Math.floor(Math.random() * 256);
//     let g = Math.floor(Math.random() * 256);
//     let b = Math.floor(Math.random() * 256);
//     tabCouleurs.push(`rgba(${r}, ${g}, ${b}, 0.9)`);
//   }

//   const nomEcurie = getEcuries();
//   const nbPointsEcuries = getNbPointsEcuries();

//   const configuration = {
//     type: "bar",
//     data: {
//       labels: nomEcurie,

//       datasets: [
//         {
//           label: "Nombre de points par écurie",
//           data: nbPointsEcuries,
//           fill: true,
//           backgroundColor: "rgba(255, 99, 132, 0.2)",
//           borderColor: "rgb(255, 99, 132)",
//           pointBackgroundColor: "rgb(255, 99, 132)",
//           pointBorderColor: "#fff",
//           pointHoverBackgroundColor: "#fff",
//           pointHoverBorderColor: "rgb(255, 99, 132)",
//         },
//       ],
//     },
//   };
//   const graphique = document.getElementById("CanvaId");
//   const chart = new Chart(graphique, configuration);
// }

// //---------------------------------MAP---------------------------------------------------------------

// let nomEcuriesCliquee;

// function mapEcuries() {
//   //centree sur Paris
//   const centreMap = {
//     lat: 48.866667,
//     lng: 2.333333,
//   };

//   const zoomInitial = 1.5;

//   //création de la map
//   const mapEcuries = L.map("divMapEcuries").setView(
//     [centreMap.lat, centreMap.lng],
//     zoomInitial
//   );

//   //ajout d'un layer (physique de la marque)
//   const layerPrincipale = L.tileLayer(
//     "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png",
//     {
//       maxZoom: 8,
//       minZoom: 1.5,

//       //crédit de la map
//       attribution:
//         'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
//     }
//   );

//   //ajout du layer à la map
//   layerPrincipale.addTo(mapEcuries);

//   //création de limite dans la map pour ne pas scroller à l'infini
//   let sudOuest = L.latLng(-90, -180);
//   nordEst = L.latLng(90, 180);
//   limiteMap = L.latLngBounds(sudOuest, nordEst);

//   mapEcuries.setMaxBounds(limiteMap);
//   mapEcuries.on("drag", function () {
//     mapEcuries.panInsideBounds(limiteMap, { animate: false });
//   });

//   //option des marker (taille, ombre)
//   let LeafIcon = L.Icon.extend({
//     options: {
//       iconSize: [40, 40],
//       shadowSize: [50, 64],
//       iconAnchor: [20, 20],
//       shadowAnchor: [4, 62],
//     },
//   });

//   //création d'un nouveau marker
//   let pneuMaker = new LeafIcon({
//     iconUrl: "data/markerPneuMedium.png",
//   });

//   //Placement des markers représentant les ecuries sur la map

//   const Ferrari = L.marker([51.907266, -0.196862], { icon: pneuMaker }).addTo(
//     mapEcuries
//   ); // Italie Maranello

//   Ferrari.bindPopup(`
//   <h1>Scuderia Ferrari</h1>
//   <img src="data/ecuries/Ferrari.png" alt="Ferrari" style="width: 115%">
//   `);

//   Ferrari.on("click", function () {
//     mapEcuries.flyTo([51.907266, -0.196862], mapEcuries.getMaxZoom()); //zoom sur l'emplacement
//     divInfosEcuries.innerHTML = ""; //vide le container () parent
//     creationDivCarteecuries(); //création du container carte
//     //si il existe dejà des choses dans la carte => vider la carte sinon rien faire
//     //! palmaresEcuries est remplie SSI la carte est remplie car on remplie tous les champs de la carte en même temps
//     const palmaresEcuries = document.querySelector("#palmaresEcuries");
//     const nomEcuries = document.querySelector(".nomEcuries");
//     const imgEcuries = document.querySelector("#imageEcuries");
//     // if (palmaresEcuries != null) {
//     //   palmaresEcuries.innerHTML = "";
//     //   nomEcuries.innerHTML = "";
//     //   imgEcuries.innerHTML = "";
//     // }
//     nomEcuries.innerHTML = "Ferrari";
//     document.querySelector("#nationalité").innerHTML = "Italie";
//     document.querySelector("#team").innerHTML = "Ferrari";
//     document.querySelector("#nbVictoires").innerHTML = "242";
//     document.querySelector("#nbPoles").innerHTML = "237";
//     document.querySelector("#nbPodiums").innerHTML = "789";
//   });

//   const RedBull = L.marker([52.3781, 4.9011], { icon: pneuMaker }).addTo(
//     mapEcuries
//   ); // Autriche
//   RedBull.bindPopup(`
//     <h1>RedBull Racing Limited</h1>
//     <img src="data/ecuries/RedBull.png" alt="RedBull" style="width: 115%">
//   `);

//   const Mercedes = L.marker([30.4326, -99.1332], { icon: pneuMaker }).addTo(
//     mapEcuries
//   ); // Allemagne
//   Mercedes.bindPopup(`
//     <h1>Mercedes-AMG Petronas F1 Team</h1>
//     <img src="data/ecuries/Mercedes.png" alt="Mercedes" style="width: 115%">
//   `);

//   const Alpine = L.marker([58.4326, -99.1332], { icon: pneuMaker }).addTo(
//     mapEcuries
//   ); // France Viry-Chatillon
//   Alpine.bindPopup(`
//     <h1>Alpine F1 Team</h1>
//     <img src="data/ecuries/Alpine.png" alt="Alpine" style="width: 115%">
//   `);

//   const McLaren = L.marker([24.4326, -99.1332], { icon: pneuMaker }).addTo(
//     mapEcuries
//   ); // Angleterre Surrey
//   McLaren.bindPopup(`
//     <h1>McLaren F1 Team</h1>
//     <img src="data/ecuries/McLaren.png" alt="McLaren" style="width: 115%">
//   `);

//   const AstonMartin = L.marker([1.4326, -9.1332], { icon: pneuMaker }).addTo(
//     mapEcuries
//   ); // Angleterre Silverstone
//   AstonMartin.bindPopup(`
//     <h1>Aston Martin Aramco Cognizant F1 Team</h1>
//     <img src="data/ecuries/AstonMartin.jpg" alt="AstonMartin" style="width: 115%">
//   `);

//   const AlfaRomeo = L.marker([9.4326, -9.1332], { icon: pneuMaker }).addTo(
//     mapEcuries
//   ); // Italie
//   AlfaRomeo.bindPopup(`
//     <h1>Alfa Romeo F1 Team</h1>
//     <img src="data/ecuries/AlfaRomeo.png" alt="AlfaRomeo" style="width: 115%">
//   `);

//   const AlphaTauri = L.marker([1.4326, -99.1332], { icon: pneuMaker }).addTo(
//     mapEcuries
//   ); // Faenza Italie
//   AlphaTauri.bindPopup(`
//     <h1>Scuderia Alpha Tauri</h1>
//     <img src="data/ecuries/AlphaTauri.png" alt="AlphaTauri" style="width: 115%">
//   `);

//   const Haas = L.marker([9.4326, -99.1332], { icon: pneuMaker }).addTo(
//     mapEcuries
//   ); // USA Kannapolis
//   Haas.bindPopup(`
//     <h1>Haas F1 Team</h1>
//     <img src="data/ecuries/Haas.png" alt="Haas" style="width: 115%">
//   `);

//   const Williams = L.marker([19.4326, -9.1332], { icon: pneuMaker }).addTo(
//     mapEcuries
//   ); // Angleterre
//   Williams.bindPopup(`
//     <h1>Williams Racing</h1>
//     <img src="data/ecuries/Williams.jpg" alt="Williams" style="width: 115%">
//   `);

//   return {
//     RedBull,
//     Ferrari,
//     Mercedes,
//     McLaren,
//     Alpine,
//     AlfaRomeo,
//     AstonMartin,
//     Haas,
//     AlphaTauri,
//     Williams,
//   };
// }

// -----------------------------------------XML-----------------------------------------------------------------

// fetch("https://ergast.com/api/f1/2022/constructorStandings")
//   .then((response) => response.text())
//   .then((str) => {
//     const parser = new DOMParser();
//     const xml = parser.parseFromString(str, "text/xml");
//     const json = xmlToJson(xml);
//     const values = json.map((element) => element.points);
//     console.log(values);
//   });

// function xmlToJson(xml) {
//   let obj = [];
//   if (xml.nodeType === 1) {
//     if (xml.attributes.length > 0) {
//       obj["@attributes"] = {};
//       for (let j = 0; j < xml.attributes.length; j++) {
//         const attribute = xml.attributes.item(j);
//         obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
//       }
//     }
//   } else if (xml.nodeType === 3) {
//     obj = xml.nodeValue;
//   }
//   if (xml.hasChildNodes()) {
//     for (let i = 0; i < xml.childNodes.length; i++) {
//       const item = xml.childNodes.item(i);
//       const nodeName = item.nodeName;
//       if (typeof obj[nodeName] === "undefined") {
//         obj[nodeName] = xmlToJson(item);
//       } else {
//         if (typeof obj[nodeName].push === "undefined") {
//           const old = obj[nodeName];
//           obj[nodeName] = [];
//           obj[nodeName].push(old);
//         }
//         obj[nodeName].push(xmlToJson(item));
//       }
//     }
//   }
//   return obj;
// }

// let xmlString = "https://ergast.com/api/f1/2022/constructorStandings";

// parse the XML string into an XML document
// let parser = new DOMParser();
// let xmlDoc = parser.parseFromString(xmlString, "text/xml");

// extract data from the XML document and convert it to JSON
// let jsonData = {};
// let points = xmlDoc.getElementsByTagName("points")[0];

// if (points) {
//   jsonData.points = points.textContent;
// }

// const xml2js = require("xml2js");
// const request = require("request");

// // URL de l'emplacement du fichier XML
// const url = "https://ergast.com/api/f1/2022/constructorStandings";

// // Récupérer le contenu du fichier XML depuis l'URL
// request(url, (err, xml) => {
//   if (err) throw err;

//   // Convertir le contenu XML en objet JSON
//   xml2js.parseString(xml, (err, result) => {
//     if (err) throw err;

//     // Le contenu XML est maintenant disponible sous forme d'objet JSON
//     const json = result;

//     // Extraire les données nécessaires
//     const donnee =
//       json.StandingsTable.StandingsLists.ConstructorStandings["points"];
//     console.log(donnee);
//   });
// });
