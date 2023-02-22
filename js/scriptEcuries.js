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
  grapheTest();
  // grapheEcurieRadarWinsPoles();
  // grapheEcurieBarPosition();
  // grapheEcurieDoughnutPoints();
});

//------------------------------ Création des containers ----------------

function afficherStatsEcuries() {
  const StatsEcuries = document.querySelector("#stats");
  StatsEcuries.innerHTML +=
    "<h2>Analyse des données relatives aux Ecuries</h2>";

  const divMapEtInfos = document.createElement("div");
  divMapEtInfos.id = "divMapEtInfos";
  StatsEcuries.appendChild(divMapEtInfos);

  const divTest = document.createElement("div");
  divTest.id = "test";
  StatsEcuries.appendChild(divTest);

  // const divStatsPilotes1 = document.createElement("div");
  // divStatsPilotes1.id = "divId";
  // divStatsPilotes1.innerHTML +=
  //   "<h3>Graphe montrant que le nombre de victoires d'une écurie est souvent dû au nombre de poles positions.</h3>";
  // StatsEcuries.appendChild(divStatsPilotes1);
  // const GrapheEcuries1 = document.createElement("canvas");
  // GrapheEcuries1.id = "CanvaIdGauche";
  // divStatsPilotes1.appendChild(GrapheEcuries1);

  // const divStatsPilotes2 = document.createElement("div");
  // divStatsPilotes2.id = "divId";
  // divStatsPilotes2.innerHTML +=
  //   "<h3>Graphe des positions des écuries au championnat du monde de Formule 1 2022 .</h3>";
  // StatsEcuries.appendChild(divStatsPilotes2);
  // const GrapheEcuries2 = document.createElement("canvas");
  // GrapheEcuries2.id = "CanvaIdDroite";
  // divStatsPilotes2.appendChild(GrapheEcuries2);

  // const divStatsPilotes3 = document.createElement("div");
  // divStatsPilotes3.id = "divId";
  // divStatsPilotes3.innerHTML +=
  //   "<h3>Graphe du nombre de points inscris par chaque écuries.</h3>";
  // StatsEcuries.appendChild(divStatsPilotes3);
  // const GrapheEcuries3 = document.createElement("canvas");
  // GrapheEcuries3.id = "CanvaId";
  // divStatsPilotes3.appendChild(GrapheEcuries3);
}

//---------------------------------GESTION DE LA MAP--------------------------------------

function mapEcuries() {
  //création des div Map et Infos
  //--Map
  const MapEtInfos = document.querySelector("#divMapEtInfos");

  const divMapEcuries = document.createElement("div");
  divMapEcuries.id = "map";
  MapEtInfos.appendChild(divMapEcuries);

  //--Infos
  const divInfosEcuries = document.createElement("div");
  divInfosEcuries.id = "divInfos";
  MapEtInfos.appendChild(divInfosEcuries);

  const boutonDezoom = document.createElement("button");
  boutonDezoom.className = "bouton";
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
  const mapEcuries = L.map("map").setView(
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

  for (let i = 0; i < 10; i++) {
    L.marker([tabGlobalDataEcuries[i].Lat, tabGlobalDataEcuries[i].Long], {
      icon: pneuMaker,
    })
      .addTo(mapEcuries)
      .on("click", function () {
        mapEcuries.flyTo(
          [tabGlobalDataEcuries[i].Lat, tabGlobalDataEcuries[i].Long],
          mapEcuries.getMaxZoom()
        );
        const existeDivInfosEcuries = document.querySelector("#divInfos");
        if (existeDivInfosEcuries) {
          existeDivInfosEcuries.remove();
        }
        const divInfosEcuries = document.createElement("div");
        divInfosEcuries.id = "divInfos";
        MapEtInfos.appendChild(divInfosEcuries);
        const carteEcuriesContent = document.createElement("div");
        carteEcuriesContent.id = "divInfosContent";
        divInfosEcuries.appendChild(carteEcuriesContent);

        //PARTIE FRONT
        const divInfosEcuriesFront = document.createElement("div");
        divInfosEcuriesFront.id = "divInfosFront";
        carteEcuriesContent.appendChild(divInfosEcuriesFront);
        divInfosEcuriesFront.style.backgroundImage =
          "url(" + tabGlobalDataEcuries[i].ImageFront + ")";
        divInfosEcuriesFront.style.backgroundSize = "cover";
        divInfosEcuriesFront.style.backgroundPosition = "center";

        //PARTIE BACK
        const divInfosEcuriesBack = document.createElement("div");
        divInfosEcuriesBack.id = "divInfosBack";
        carteEcuriesContent.appendChild(divInfosEcuriesBack);
        // divInfosEcuriesBack.style.backgroundImage =
        //   "url(" + tabGlobalDataEcuries[i].ImageBack + ")";
        // divInfosEcuriesBack.style.backgroundSize = "cover";
        // divInfosEcuriesBack.style.backgroundPosition = "center";
        divInfosEcuriesBack.style.opacity = "0.7";
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
          "Victoires : " + tabGlobalDataEcuries[i]["wins_all"];
        nbPoles.textContent =
          "Poles Positions : " + tabGlobalDataEcuries[i]["pole_all"];
        nbPodiums.textContent =
          "Podiums : " + tabGlobalDataEcuries[i]["podiums_all"];
        nbPoints.textContent =
          "Points : " + tabGlobalDataEcuries[i]["points_all"];
        pilote.textContent =
          "Titres pilote : " + tabGlobalDataEcuries[i]["titre_pilote"];
        constructeur.textContent =
          "Titres constructeur : " + tabGlobalDataEcuries[i]["titre_ecurie"];
      });
  }
}

function getEcuries() {
  const nameEcurie = [];
  for (let i = 0; i < 10; i++) {
    nameEcurie.push(tabGlobalDataEcuries[i]["name"]);
  }
  return nameEcurie;
}

function getNbPolesEcuries() {
  const poleEcurie = [];
  for (let i = 0; i < 10; i++) {
    poleEcurie.push(tabGlobalDataEcuries[i]["pole_all"]);
  }
  return poleEcurie;
}

function getNbVictoireAllEcuries() {
  const victoireAllEcurie = [];
  for (let i = 0; i < 10; i++) {
    victoireAllEcurie.push(tabGlobalDataEcuries[i]["wins_all"]);
  }
  return victoireAllEcurie;
}

function getNbVictoireEcuries() {
  const victoireEcurie = [];
  for (let i = 0; i < 10; i++) {
    victoireEcurie.push(tabGlobalDataEcuries[i]["wins"]);
  }
  return victoireEcurie;
}

function getNbPositionsEcuries() {
  const positionEcurie = [];
  for (let i = 0; i < 10; i++) {
    positionEcurie.push(tabGlobalDataEcuries[i]["position"]);
  }
  return positionEcurie;
}

function getNbPointsEcuries() {
  const pointsEcurie = [];
  for (let i = 0; i < 10; i++) {
    pointsEcurie.push(tabGlobalDataEcuries[i]["points"]);
  }
  return pointsEcurie;
}

//---------------------------------GRAPHES--------------------------------------------------------------

function grapheEcurieRadarWinsPoles() {
  const nomEcurie = getEcuries();
  const nbVictoiresEcuries = getNbVictoireAllEcuries();
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
    options: {
      scales: {
        r: {
          grid: {
            color: "red",
          },
          angleLines: {
            color: "red",
            lineWidth: 8,
          },
          pointLabels: {
            color: "red",
          },
          ticks: {
            color: "red",
          },
        },
      },
    },
  };

  const graphique = document.getElementById("CanvaIdGauche");
  const chart = new Chart(graphique, configuration);
}

function grapheEcurieBarPosition() {
  const nomEcurie = getEcuries();
  const positionEcuries = getNbPositionsEcuries();

  const configuration = {
    type: "bar",
    data: {
      labels: nomEcurie,
      datasets: [
        {
          label: "Position au championnat par écurie",
          data: positionEcuries,
          backgroundColor: [
            "rgba(9, 9, 255,0.2)",
            "rgba(255, 9, 6,0.2)",
            "rgba(28, 25, 20,0.2)",
            "rgba(255, 12, 192,0.2)",
            "rgba(255, 155, 18,0.2)",
            "rgba(253, 102, 105,0.2)",
            "rgba(7, 54, 28,0.2)",
            "rgba(91, 93, 97,0.2)",
            "rgba(21, 203, 247,0.2)",
            "rgba(204, 205, 206,0.2)",
          ],
          borderColor: [
            "rgb(9, 9, 255)",
            "rgb(255, 9, 6)",
            "rgb(28, 25, 20)",
            "rgb(255, 12, 192)",
            "rgb(255, 155, 18)",
            "rgb(253, 102, 105)",
            "rgb(7, 54, 28)",
            "rgb(91, 93, 97)",
            "rgb(21, 203, 247)",
            "rgb(204, 205, 206)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              position: "bottom",
              reverse: true,
            },
          },
        ],
        elements: {
          bar: {
            reverse: true,
          },
        },
      },
    },
  };

  const graphique = document.getElementById("CanvaIdDroite");
  const chart = new Chart(graphique, configuration);
}

function grapheEcurieDoughnutPoints() {
  const nomEcurie = getEcuries();
  const nbPointsEcuries = getNbPointsEcuries();

  const configuration = {
    type: "doughnut",
    data: {
      labels: nomEcurie,

      datasets: [
        {
          label: "Nombre de points par écurie",
          data: nbPointsEcuries,
          fill: true,
          backgroundColor: [
            "rgb(9, 9, 255)",
            "rgb(255, 9, 6)",
            "rgb(28, 25, 20)",
            "rgb(255, 12, 192)",
            "rgb(255, 155, 18)",
            "rgb(253, 102, 105)",
            "rgb(7, 54, 28)",
            "rgb(91, 93, 97)",
            "rgb(21, 203, 247)",
            "rgb(204, 205, 206)",
          ],
          hoverOffset: 4,
          borderColor: "rgb(255, 255, 255)",
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

//--------------------------------Tests_Highcharts---------------------------------------------

function grapheTest() {
  const nomEcurie = getEcuries();
  const victoireEcurie = getNbVictoireEcuries();
  const divTest = document.querySelector("#test");
  Highcharts.chart(divTest, {
    chart: {
      type: "column",
    },
    title: {
      text: "Victoires par écuries",
    },
    subtitle: {
      text: "Source: tqt",
    },
    xAxis: {
      categories: nomEcurie,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Nombre de victoires",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "nomEcurie",
        data: victoireEcurie,
      },
    ],
  });
}
