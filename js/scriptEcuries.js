//Requete API pour avoir des infos sur les Ecuries
let tabGlobalDataEcuries = {};
let Ecuries = [];
function recupererInfosEcuries() {
  fetch("json/Ecuries.json")
    .then((response) => response.json())
    .then((data) => {
      const EcuriesData = data;
      const tabData = EcuriesData.map((Ecuries) => {
        return {
          Nom: Ecuries["name"],
          Nationalité: Ecuries["nationality"],
          nbPoints: Ecuries["points"],
          nbPoints_Totales: Ecuries["points_all"],
          nbVictoires: Ecuries["wins"],
          nbVictoiresTotales: Ecuries["wins_all"],
          nbTitresPilote: Ecuries["titre_pilote"],
          nbTitresonstructeur: Ecuries["titre_constructeur"],
          nbPodiums: Ecuries["podium"],
          nbPodiumsTotales: Ecuries["podium_all"],
          nbPolesPositions: Ecuries["pole"],
          nbPolesPositionsTotales: Ecuries["pole_all"],
          Image: Ecuries["Image"],
        };
      });
      let tabGlobalDataEcuriesTemp = tabData;
      for (Ecuries in tabGlobalDataEcuriesTemp) {
        let objetEcuries = tabGlobalDataEcuriesTemp[Ecuries];
        tabGlobalDataEcuries[objetEcuries.Nom] = objetEcuries;
      }
    });
}

function afficherStatsEcuries() {
  const StatsEcuries = document.querySelector("#stats");

  const sectionStatsEcuries = document.createElement("section");
  sectionStatsEcuries.innerHTML +=
    "<h2>Analyse des données relatives aux Ecuries</h2>";

  const divMapEtInfos = document.createElement("div");
  divMapEtInfos.id = "divMapEtInfosEcuries";

  StatsEcuries.appendChild(sectionStatsEcuries);
  sectionStatsEcuries.appendChild(divMapEtInfos);

  // Création de deux div enfants de divMapEtInfosEcuries
  creationDivMapEcuries();
  creationDivInfosEcuries();
}

function creationDivMapEcuries() {
  const MapEtInfos = document.querySelector("#divMapEtInfosEcuries");

  const divMapEcuries = document.createElement("div");
  divMapEcuries.id = "divMapEcuries";

  MapEtInfos.appendChild(divMapEcuries);
}

function creationDivInfosEcuries() {
  const MapEtInfos = document.querySelector("#divMapEtInfosEcuries");

  const divInfosEcuries = document.createElement("div");
  divInfosEcuries.id = "divInfosEcuries";

  MapEtInfos.appendChild(divInfosEcuries);
}

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
      creationCarteEcuries("Ferrari");
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
      creationCarteEcuries("AlphaTauri");
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
      creationCarteEcuries("Alfa Romeo");
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
      creationCarteEcuries("Red Bull");
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
      creationCarteEcuries("Mercedes");
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
      creationCarteEcuries("Alpine");
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
      creationCarteEcuries("McLaren");
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
      creationCarteEcuries("Aston Martin");
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
      creationCarteEcuries("Williams");
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
      creationCarteEcuries("Haas");
    }); //Haas
}

//-----------------------------Cartes---------------------------------------------------------------------------------------------

function creationDivCarteEcuries() {
  const divCarteEcuries = document.querySelector("#divInfosEcuries");

  const carteEcuriesRectoVerso = document.createElement("div");
  carteEcuriesRectoVerso.className = "cardEcuries";

  const carteEcuriesFace = document.createElement("div");
  carteEcuriesFace.className = "side front--side";

  const carteEcuriesDos = document.createElement("div");
  carteEcuriesDos.className = "side back--side";

  const nomEcuries = document.createElement("h1");
  nomEcuries.className = "nomEcuries";

  const nationalité = document.createElement("p");
  nationalité.className = "palmaresEcuries";
  nationalité.id = "nationalité";

  const nbPoints = document.createElement("p");
  nbPoints.className = "palmaresEcuries";
  nbPoints.id = "nbPoints";

  const nbVictoires = document.createElement("p");
  nbVictoires.className = "palmaresEcuries";
  nbVictoires.id = "nbVictoires";

  const nbPodiums = document.createElement("p");
  nbPodiums.className = "palmaresEcuries";
  nbPodiums.id = "nbPodiums";

  const nbPolesPositions = document.createElement("p");
  nbPolesPositions.className = "palmaresEcuries";
  nbPolesPositions.id = "nbPolesPositions";

  divCarteEcuries.appendChild(carteEcuriesRectoVerso);
  carteEcuriesRectoVerso.appendChild(carteEcuriesFace);
  carteEcuriesRectoVerso.appendChild(carteEcuriesDos);
  carteEcuriesDos.appendChild(nomEcuries);
  carteEcuriesDos.appendChild(nationalité);
  carteEcuriesDos.appendChild(nbPoints);
  carteEcuriesDos.appendChild(nbVictoires);
  carteEcuriesDos.appendChild(nbPodiums);
  carteEcuriesDos.appendChild(nbPolesPositions);
}

function creationCarteEcuries(nameEcuries) {
  divInfosEcuries.innerHTML = ""; //vide le container () parent
  creationDivCarteEcuries(); //création du container carte
  //si il existe dejà des choses dans la carte => vider la carte sinon rien faire
  //! palmaresEcuries est remplie SSI la carte est remplie car on remplie tous les champs de la carte en même temps
  const palmaresEcuries = document.querySelector("#palmaresEcuries");
  const nomEcuries = document.querySelector(".nomEcuries");
  if (palmaresEcuries != null) {
    palmaresEcuries.innerHTML = "";
    nomEcuries.innerHTML = "";
  }
  let cardEcuriesFace = document.querySelector(".side.front--side");
  let cardEcuriesDos = document.querySelector(".side.back--side");
  cardEcuriesFace.style.backgroundImage = `url(${tabGlobalDataEcuries[nameEcuries].Image})`;
  cardEcuriesFace.style.backgroundSize = "cover";
  nomEcuries.innerHTML = `${nameEcuries}`;
  cardEcuriesDos.querySelector("#nationalité").innerHTML =
    tabGlobalDataEcuries[`${nameEcuries}`].Nationalité;
  cardEcuriesDos.querySelector("#nbPoints").innerHTML =
    tabGlobalDataEcuries[`${nameEcuries}`].nbPoints;
  cardEcuriesDos.querySelector("#nbVictoires").innerHTML =
    tabGlobalDataEcuries[`${nameEcuries}`].nbVictoires;
  cardEcuriesDos.querySelector("#nbPodiums").innerHTML =
    tabGlobalDataEcuries[`${nameEcuries}`].nbPodiums;
  cardEcuriesDos.querySelector("#nbPolesPositions").innerHTML =
    tabGlobalDataEcuries[`${nameEcuries}`].nbPolesPositions;
}

//-------------------------------Gestion du click sur le bouton de la carte des ecuries--------------------------------------------------

const boutonDecouvrirStatsEcuries = document.querySelector(
  ".btn-decouvrir-stats-ecuries"
);
boutonDecouvrirStatsEcuries.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherStatsEcuries();
  afficherMapEcuries();
  recupererInfosEcuries();
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
