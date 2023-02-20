//----------------------------Récuperation Infos Ecuries depuis fichier json-------------
async function recupererInfosEcuries() {
  let response = await fetch("../json/Ecuries.json");
  response = await response.json();
  return response;
}
let tabGlobalDataEcuries;
tabGlobalDataEcuries = await recupererInfosEcuries();

//-------------------- Action lorsqu'on clique sur le bouton Ecuries ---------------

const boutonDecouvrirStatsEcuries = document.querySelector(
  ".btn-decouvrir-stats-ecuries"
);
boutonDecouvrirStatsEcuries.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherStatsEcuries();
  mapEcuries();
  recupererInfosEcuries();
});

//------------------------------ Création des containers ----------------

function afficherStatsEcuries() {
  const StatsEcuries = document.querySelector("#stats");

  const sectionStatsEcuries = document.createElement("section");
  sectionStatsEcuries.innerHTML +=
    "<h2>Analyse des données relatives aux Ecuries</h2>";

  const divMapEtInfos = document.createElement("div");
  divMapEtInfos.id = "divMapEtInfosEcuries";

  StatsEcuries.appendChild(sectionStatsEcuries);
  sectionStatsEcuries.appendChild(divMapEtInfos);
}

//---------------------------------GESTION DE LA MAP--------------------------------------

function mapEcuries() {
  //création des div Map et Infos
  //--Map
  const MapEtInfos = document.querySelector("#divMapEtInfosEcuries");

  const divMapEcuries = document.createElement("div");
  divMapEcuries.id = "divMapEcuries";
  MapEtInfos.appendChild(divMapEcuries);

  //--Infos
  const divInfosEcuries = document.createElement("div");
  divInfosEcuries.id = "divInfosEcuries";
  MapEtInfos.appendChild(divInfosEcuries);

  const boutonDezoom = document.createElement("button");
  boutonDezoom.className = "boutonEcuries";
  MapEtInfos.appendChild(boutonDezoom);
  boutonDezoom.innerHTML = "DeZoom";
  boutonDezoom.addEventListener("click", function () {
    mapEcuries.flyTo([48.866667, -18.333333], mapEcuries.getMinZoom());
  });

  const textIntro = document.createElement("h3");
  divInfosEcuries.appendChild(textIntro);
  textIntro.innerHTML =
    " Cliquez sur une ecurie pour obtenir sa carte, et survolez sa carte pour avoir encore plus d'informations !";

  //centree sur Paris
  const centreMap = {
    lat: 48.866667,
    lng: -18.333333,
  };

  const zoomInitial = 2.5;

  //création de la map
  const mapEcuries = L.map("divMapEcuries").setView(
    [centreMap.lat, centreMap.lng],
    zoomInitial
  );

  //ajout d'un layer (physique de la marque)
  const layerPrincipale = L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 8,
      minZoom: 3,

      //crédit de la map
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }
  );

  //ajout du layer à la map
  layerPrincipale.addTo(mapEcuries);

  //création de limite dans la map pour ne pas scroller à l'infini
  let sudOuest = L.latLng(-90, -180);
  let nordEst = L.latLng(90, 180);
  let limiteMap = L.latLngBounds(sudOuest, nordEst);

  mapEcuries.setMaxBounds(limiteMap);
  mapEcuries.on("drag", function () {
    mapEcuries.panInsideBounds(limiteMap, { animate: false });
  });

  //option des marker (taille, ombre)
  let LeafIcon = L.Icon.extend({
    options: {
      iconSize: [30, 30],
      shadowSize: [50, 64],
      iconAnchor: [20, 20],
      shadowAnchor: [4, 62],
    },
  });

  //création d'un nouveau marker
  let pneuMaker = new LeafIcon({
    iconUrl: "data/markerPneuMedium.png",
  });

  //Placement des markers représentant les Ecuries sur la map

  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    L.marker([tabGlobalDataEcuries[i].Lat, tabGlobalDataEcuries[i].Long], {
      icon: pneuMaker,
    })
      .addTo(mapEcuries)
      .on("click", function () {
        mapEcuries.flyTo(
          [tabGlobalDataEcuries[i].Lat, tabGlobalDataEcuries[i].Long],
          mapEcuries.getMaxZoom()
        );
        const existeDivInfosEcuries =
          document.querySelector("#divInfosEcuries");
        if (existeDivInfosEcuries) {
          existeDivInfosEcuries.remove();
        }
        const divInfosEcuries = document.createElement("div");
        divInfosEcuries.id = "divInfosEcuries";
        MapEtInfos.appendChild(divInfosEcuries);
        const carteEcuriesContent = document.createElement("div");
        carteEcuriesContent.id = "cardEcuries";
        divInfosEcuries.appendChild(carteEcuriesContent);

        //PARTIE FRONT
        const divInfosEcuriesFront = document.createElement("div");
        divInfosEcuriesFront.id = "divInfosFront";
        carteEcuriesContent.appendChild(divInfosEcuriesFront);
        divInfosEcuriesFront.style.backgroundImage =
          "url(" + tabGlobalDataEcuries[i].Image + ")";
        divInfosEcuriesFront.style.backgroundSize = "cover";

        //PARTIE BACK
        const divInfosEcuriesBack = document.createElement("div");
        divInfosEcuriesBack.id = "divInfosBack";
        carteEcuriesContent.appendChild(divInfosEcuriesBack);
        const nomEcuries = document.createElement("h1");
        const nationalité = document.createElement("p");
        const nbVictoires = document.createElement("p");
        const nbPoles = document.createElement("p");
        const nbPodiums = document.createElement("p");
        const nbPoints = document.createElement("p");
        const Position = document.createElement("p");
        const constructeur = document.createElement("p");
        const pilote = document.createElement("p");
        divInfosEcuriesBack.appendChild(nomEcuries);
        divInfosEcuriesBack.appendChild(nationalité);
        divInfosEcuriesBack.appendChild(nbVictoires);
        divInfosEcuriesBack.appendChild(nbPoles);
        divInfosEcuriesBack.appendChild(nbPodiums);
        divInfosEcuriesBack.appendChild(nbPoints);
        divInfosEcuriesBack.appendChild(Position);
        divInfosEcuriesBack.appendChild(constructeur);
        divInfosEcuriesBack.appendChild(pilote);
        nomEcuries.textContent = tabGlobalDataEcuries[i]["name"];
        nationalité.textContent =
          "Pays d'origine : " + tabGlobalDataEcuries[i]["nationality"];
        nbVictoires.textContent =
          "Nombre de Victoires : " + tabGlobalDataEcuries[i]["wins_all"];
        nbPoles.textContent =
          "Nombre de Poles Positions : " + tabGlobalDataEcuries[i]["pole_all"];
        nbPodiums.textContent =
          "Nombre de podiums : " + tabGlobalDataEcuries[i]["podiums_all"];
        nbPoints.textContent =
          "Nombre de points : " + tabGlobalDataEcuries[i]["points_all"];
        pilote.textContent =
          "Titres pilote : " + tabGlobalDataEcuries[i]["titre_pilote"];
        constructeur.textContent =
          "Titres constructeur : " + tabGlobalDataEcuries[i]["titre_ecurie"];
      });
  }
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
