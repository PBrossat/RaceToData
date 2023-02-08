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

  const divBoutonRetour = document.createElement("div");
  divMapEtInfosEcuries.appendChild(divBoutonRetour);
  divBoutonRetour.id = "boutonEcuries";

  const divCarteEcuries = document.createElement("div");
  divMapEtInfosEcuries.appendChild(divCarteEcuries);
  divCarteEcuries.id = "carteEcuries";

  const boutonDecouvrirStatsEcuries = document.querySelector("#boutonEcuries");
  boutonDecouvrirStatsEcuries.addEventListener("click", function () {
    mapEcuries.flyTo([48.866667, 2.333333], mapEcuries.getMinZoom());
  });

  //Création de la map
  let mapEcuries = L.map("mapEcuries", {
    center: [48.866667, -0.333333],
    zoom: 4,
  });
  const layerPrincipale = L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 8,
      minZoom: 2,

      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }
  );
  layerPrincipale.addTo(mapEcuries);
  //Création des limites de la map
  let sudOuest = L.latLng(-90, -180),
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

  L.marker([44.907266, 11.16862], {
    icon: markerEcuries,
  })
    .addTo(mapEcuries)
    .on("click", function () {
      mapEcuries.flyTo([44.907266, 11.16862], mapEcuries.getMaxZoom());
      const existeDivInfosEcuries = document.querySelector("#divInfosEcuries");
      if (existeDivInfosEcuries) {
        existeDivInfosEcuries.remove();
      }
      const divInfosEcuries = document.createElement("div");
      divInfosEcuries.id = "divInfosEcuries";
      divMapEtInfosEcuries.appendChild(divInfosEcuries);
      const imgEcuries = document.createElement("img");
      divInfosEcuries.appendChild(imgEcuries);
      imgEcuries.src = "data/ecuries/Ferrari.png";
    }); //Ferrari

  L.marker([42.907266, 12.96862], {
    icon: markerEcuries,
  })
    .addTo(mapEcuries)
    .on("click", function () {
      mapEcuries.flyTo([42.907266, 12.96862], mapEcuries.getMaxZoom());
      const existeDivInfosEcuries = document.querySelector("#divInfosEcuries");
      if (existeDivInfosEcuries) {
        existeDivInfosEcuries.remove();
      }
      const divInfosEcuries = document.createElement("div");
      divInfosEcuries.id = "divInfosEcuries";
      divMapEtInfosEcuries.appendChild(divInfosEcuries);
      const imgEcuries = document.createElement("img");
      divInfosEcuries.appendChild(imgEcuries);
      imgEcuries.src = "data/ecuries/AlphaTauri.png";
    }); //AlphaTauri

  L.marker([46.807266, 8.6862], {
    icon: markerEcuries,
  })
    .addTo(mapEcuries)
    .on("click", function () {
      mapEcuries.flyTo([46.807266, 8.6862], mapEcuries.getMaxZoom());
      const existeDivInfosEcuries = document.querySelector("#divInfosEcuries");
      if (existeDivInfosEcuries) {
        existeDivInfosEcuries.remove();
      }
      const divInfosEcuries = document.createElement("div");
      divInfosEcuries.id = "divInfosEcuries";
      divMapEtInfosEcuries.appendChild(divInfosEcuries);
      const imgEcuries = document.createElement("img");
      divInfosEcuries.appendChild(imgEcuries);
      imgEcuries.src = "data/ecuries/AlfaRomeo.png";
    }); //Alfa Romeo

  L.marker([48.07266, 15.196862], {
    icon: markerEcuries,
  })
    .addTo(mapEcuries)
    .on("click", function () {
      mapEcuries.flyTo([48.07266, 15.196862], mapEcuries.getMaxZoom());
      const existeDivInfosEcuries = document.querySelector("#divInfosEcuries");
      if (existeDivInfosEcuries) {
        existeDivInfosEcuries.remove();
      }
      const divInfosEcuries = document.createElement("div");
      divInfosEcuries.id = "divInfosEcuries";
      divMapEtInfosEcuries.appendChild(divInfosEcuries);
      const imgEcuries = document.createElement("img");
      divInfosEcuries.appendChild(imgEcuries);
      imgEcuries.src = "data/ecuries/RedBull.png";
    }); //RedBull

  L.marker([51.507266, 10.196862], {
    icon: markerEcuries,
  })
    .addTo(mapEcuries)
    .on("click", function () {
      mapEcuries.flyTo([51.507266, 10.196862], mapEcuries.getMaxZoom());
      const existeDivInfosEcuries = document.querySelector("#divInfosEcuries");
      if (existeDivInfosEcuries) {
        existeDivInfosEcuries.remove();
      }
      const divInfosEcuries = document.createElement("div");
      divInfosEcuries.id = "divInfosEcuries";
      divMapEtInfosEcuries.appendChild(divInfosEcuries);
      const imgEcuries = document.createElement("img");
      divInfosEcuries.appendChild(imgEcuries);
      imgEcuries.src = "data/ecuries/Mercedes.png";
    }); //Mercedes

  L.marker([47.507266, 0.696862], {
    icon: markerEcuries,
  })
    .addTo(mapEcuries)
    .on("click", function () {
      mapEcuries.flyTo([47.507266, 0.696862], mapEcuries.getMaxZoom());
      const existeDivInfosEcuries = document.querySelector("#divInfosEcuries");
      if (existeDivInfosEcuries) {
        existeDivInfosEcuries.remove();
      }
      const divInfosEcuries = document.createElement("div");
      divInfosEcuries.id = "divInfosEcuries";
      divMapEtInfosEcuries.appendChild(divInfosEcuries);
      const imgEcuries = document.createElement("img");
      divInfosEcuries.appendChild(imgEcuries);
      imgEcuries.src = "data/ecuries/Alpine.png";
    }); //Alpine

  L.marker([51.507266, -1.196862], {
    icon: markerEcuries,
  })
    .addTo(mapEcuries)
    .on("click", function () {
      mapEcuries.flyTo([51.507266, -1.196862], mapEcuries.getMaxZoom());
      const existeDivInfosEcuries = document.querySelector("#divInfosEcuries");
      if (existeDivInfosEcuries) {
        existeDivInfosEcuries.remove();
      }
      const divInfosEcuries = document.createElement("div");
      divInfosEcuries.id = "divInfosEcuries";
      divMapEtInfosEcuries.appendChild(divInfosEcuries);
      const imgEcuries = document.createElement("img");
      divInfosEcuries.appendChild(imgEcuries);
      imgEcuries.src = "data/ecuries/McLaren.png";
    }); //McLaren

  L.marker([52.907266, -1.12], {
    icon: markerEcuries,
  })
    .addTo(mapEcuries)
    .on("click", function () {
      mapEcuries.flyTo([52.907266, -1.12], mapEcuries.getMaxZoom());
      const existeDivInfosEcuries = document.querySelector("#divInfosEcuries");
      if (existeDivInfosEcuries) {
        existeDivInfosEcuries.remove();
      }
      const divInfosEcuries = document.createElement("div");
      divInfosEcuries.id = "divInfosEcuries";
      divMapEtInfosEcuries.appendChild(divInfosEcuries);
      const imgEcuries = document.createElement("img");
      divInfosEcuries.appendChild(imgEcuries);
      imgEcuries.src = "data/ecuries/AstonMartin.jpg";
    }); //Aston Martin

  L.marker([51.907266, -2.011324], {
    icon: markerEcuries,
  })
    .addTo(mapEcuries)
    .on("click", function () {
      mapEcuries.flyTo([51.907266, -2.011324], mapEcuries.getMaxZoom());
      const existeDivInfosEcuries = document.querySelector("#divInfosEcuries");
      if (existeDivInfosEcuries) {
        existeDivInfosEcuries.remove();
      }
      const divInfosEcuries = document.createElement("div");
      divInfosEcuries.id = "divInfosEcuries";
      divMapEtInfosEcuries.appendChild(divInfosEcuries);
      const imgEcuries = document.createElement("img");
      divInfosEcuries.appendChild(imgEcuries);
      imgEcuries.src = "data/ecuries/Williams.jpg";
    }); //Williams

  L.marker([37.907266, -93.196862], {
    icon: markerEcuries,
  })
    .addTo(mapEcuries)
    .on("click", function () {
      mapEcuries.flyTo([37.907266, -93.196862], mapEcuries.getMaxZoom());
      const existeDivInfosEcuries = document.querySelector("#divInfosEcuries");
      if (existeDivInfosEcuries) {
        existeDivInfosEcuries.remove();
      }
      const divInfosEcuries = document.createElement("div");
      divInfosEcuries.id = "divInfosEcuries";
      divMapEtInfosEcuries.appendChild(divInfosEcuries);
      const imgEcuries = document.createElement("img");
      divInfosEcuries.appendChild(imgEcuries);
      imgEcuries.src = "data/ecuries/Haas.png";
    }); //Haas
}

//-----------------------------Cartes---------------------------------------------------------------------------------------------

function creationDivCarteEcuries() {
  const divCarteEcuries = document.querySelector("#divInfosEcuries");

  const carteEcuries = document.createElement("div");
  carteEcuries.id = "cardEcuries";

  const infosEcuries = document.createElement("div");
  infosEcuries.id = "infosEcuriesDansCarte";

  const nomEcuries = document.createElement("h1");
  nomEcuries.className = "nomEcuries";

  const nationalité = document.createElement("p");
  nationalité.className = "palmaresEcuries";
  nationalité.id = "nationalité";

  // const nbVictoires = document.createElement("p");
  // nbVictoires.className = "palmaresEcuries";
  // nbVictoires.id = "nbVictoires";

  // const nbPodiums = document.createElement("p");
  // nbPodiums.className = "palmaresEcuries";
  // nbPodiums.id = "nbPodiums";

  divCarteEcuries.appendChild(carteEcuries);
  carteEcuries.appendChild(infosEcuries);
  infosEcuries.appendChild(nomEcuries);
  infosEcuries.appendChild(nationalité);
  // infosEcuries.appendChild(nbVictoires);
  // infosEcuries.appendChild(nbPodiums);
}

function creationCarteEcuries(nameEcuries) {
  divInfosEcuriess.innerHTML = ""; //vide le container () parent
  creationDivCarteEcuriess(); //création du container carte
  //si il existe dejà des choses dans la carte => vider la carte sinon rien faire
  //! palmaresEcuries est remplie SSI la carte est remplie car on remplie tous les champs de la carte en même temps
  const palmaresEcuries = document.querySelector("#palmaresEcuries");
  const nomEcuries = document.querySelector(".nomEcuries");
  if (palmaresEcuries != null) {
    palmaresEcuries.innerHTML = "";
    nomEcuries.innerHTML = "";
  }
  console.log(tabGlobalDataEcuries);
  var cardEcuries = document.querySelector("#cardEcuries");
  cardEcuries.style.backgroundImage = `url("tabGlobalDataEcuriess[${nameEcuries}].Image")`;
  cardEcuries.style.backgroundSize = "cover";
  nomEcuries.innerHTML = `${nameEcuries}`;
  document.querySelector("#nationalité").innerHTML =
    tabGlobalDataEcuries[`${nameEcuries}`].Nationalité;
  // document.querySelector("#nbVictoires").innerHTML =
  //   tabGlobalDataEcuries[`${nameEcuries}`].nbVictoires;
  // document.querySelector("#nbPodiums").innerHTML =
  //   tabGlobalDataEcuries[`${nameEcuries}`].nbPodiums;
}

//-------------------------------Gestion du click sur le bouton de la carte des ecuries--------------------------------------------------

const boutonDecouvrirStatsEcuries = document.querySelector(
  ".btn-decouvrir-stats-ecuries"
);
boutonDecouvrirStatsEcuries.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherMapEcuries();
});

//--------------------------------------GET----------------------------------------------------------------

function getEcuries() {
  const nomEcurie = [];
  for (let i = 0; i < dataGlobalTab.length; i++) {
    nomEcurie.push(dataGlobalTab[i].Nom);
  }
  return nomEcurie;
}

function getNbVictoiresEcuries() {
  const nbVictoires = [];
  for (let i = 0; i < dataGlobalTab.length; i++) {
    nbVictoires.push(dataGlobalTab[i].nbVictoires);
  }
  return nbVictoires;
}

function getNbPolesEcuries() {
  const poleEcurie = [];
  for (let i = 0; i < dataGlobalTab.length; i++) {
    poleEcurie.push(dataGlobalTab[i].Poles);
  }
  return poleEcurie;
}

function getNbPointsEcuries() {
  const pointsEcurie = [];
  for (let i = 0; i < dataGlobalTab.length; i++) {
    pointsEcurie.push(dataGlobalTab[i].Points);
  }
  return pointsEcurie;
}

function getPositionEcuries() {
  const positionEcurie = [];
  for (let i = 0; i < dataGlobalTab.length; i++) {
    positionEcurie.push(dataGlobalTab[i].Position);
  }
  return positionEcurie;
}

function getNationaliteEcuries() {
  const nationaliteEcurie = [];
  for (let i = 0; i < dataGlobalTab.length; i++) {
    nationaliteEcurie.push(dataGlobalTab[i].Nationalite);
  }
  return nationaliteEcurie;
}

//---------------------------------GRAPHES--------------------------------------------------------------

function grapheEcurieRadarWinsPoles() {
  const nomEcurie = getEcuries();
  const nbVictoiresEcuries = getNbVictoiresEcuries();
  const nbPolesEcuries = getNbPolesEcuries();

  const configuration = {
    type: "radar",
    data: {
      labels: nomEcurie,

      datasets: [
        {
          label: "Nombre de poles positions par écurie",
          data: nbPolesEcuries,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
        {
          label: "Nombre de victoires par écurie",
          data: nbVictoiresEcuries,
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgb(54, 162, 235)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(54, 162, 235)",
        },
      ],
    },
  };

  const graphique = document.getElementById("CanvaId");
  const chart = new Chart(graphique, configuration);
}

function grapheEcurieRadarWinsPosition() {
  const nomEcurie = getEcuries();
  const nbVictoiresEcuries = getNbVictoiresEcuries();
  const positionEcuries = getPositionEcuries();

  const configuration = {
    type: "radar",
    data: {
      labels: nomEcurie,

      datasets: [
        {
          label: "Position au championnat par écurie",
          data: positionEcuries,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
        {
          label: "Nombre de victoires par écurie",
          data: nbVictoiresEcuries,
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgb(54, 162, 235)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(54, 162, 235)",
        },
      ],
    },
  };

  const graphique = document.getElementById("CanvaId");
  const chart = new Chart(graphique, configuration);
}

function grapheEcurieBatonPoints() {
  let tabCouleurs = [];
  for (let i = 0; i < dataGlobalTab.length; i++) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    tabCouleurs.push(`rgba(${r}, ${g}, ${b}, 0.9)`);
  }

  const nomEcurie = getEcuries();
  const nbPointsEcuries = getNbPointsEcuries();

  const configuration = {
    type: "bar",
    data: {
      labels: nomEcurie,

      datasets: [
        {
          label: "Nombre de points par écurie",
          data: nbPointsEcuries,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
      ],
    },
  };
  const graphique = document.getElementById("CanvaId");
  const chart = new Chart(graphique, configuration);
}

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
