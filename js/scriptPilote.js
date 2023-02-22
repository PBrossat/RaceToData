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
boutonDecouvrirStatsPilotes.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherStatsPilotes();
  recupererInfosPilotes();
  mapPilote();
  creationNouvelleDiv();
  grapheDriverPoint(2022);
});

//------------------------------ Création des containers ----------------

function afficherStatsPilotes() {
  const StatsPilotes = document.querySelector("#stats");

  const divMapEtInfos = document.createElement("div");
  divMapEtInfos.id = "divMapEtInfos";

  StatsPilotes.appendChild(divMapEtInfos);
}

function creationNouvelleDiv() {
  const StatsPilotes = document.querySelector("#stats");

  const nouvelleDiv = document.createElement("div");
  nouvelleDiv.className = "divGraphique";

  StatsPilotes.appendChild(nouvelleDiv);
}

//---------------------------------GESTION DE LA MAP--------------------------------------

function mapPilote() {
  //création des div Map et Infos
  const MapEtInfos = document.querySelector("#divMapEtInfos");
  const boutonDezoom = document.createElement("button");
  boutonDezoom.className = "bouton";
  MapEtInfos.appendChild(boutonDezoom);
  boutonDezoom.textContent = "DeZoom";

  //--Selecteur Pilote
  // const SelecteurPilote = document.createElement("select");
  // SelecteurPilote.className = "select";
  // MapEtInfos.appendChild(SelecteurPilote);
  // const tabNomPilote = [];
  // for (var i = 0; i < tabGlobalDataPilotes.length; i++) {
  //   tabNomPilote[i] = tabGlobalDataPilotes[i].Name;
  // }

  // tabNomPilote.forEach((pilote) => {
  //   const option = document.createElement("option");
  //   option.value = pilote;
  //   option.text = pilote;
  //   SelecteurPilote.appendChild(option);
  // });

  //--Map

  const divMapPilotes = document.createElement("div");
  divMapPilotes.id = "map";

  MapEtInfos.appendChild(divMapPilotes);

  //--Infos
  const divInfosPilotes = document.createElement("div");
  divInfosPilotes.id = "divInfos";

  MapEtInfos.appendChild(divInfosPilotes);
  const textIntro = document.createElement("h3");
  divInfosPilotes.appendChild(textIntro);
  textIntro.innerHTML =
    " Cliquez sur un pilote pour obtenir sa carte personnelle, et survolez sa carte pour avoir encore plus d'informations !";

  //centree sur Paris
  const centreMap = {
    lat: 48.866667,
    lng: 2.333333,
  };

  const zoomInitial = 1.5;

  //création de la map
  const mapPilote = L.map("map").setView(
    [centreMap.lat, centreMap.lng],
    zoomInitial
  );

  //ajout d'un layer (physique de la marque)
  const layerPrincipale = L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 8,
      minZoom: 1.5,

      //crédit de la map
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }
  );

  //ajout du layer à la map
  layerPrincipale.addTo(mapPilote);

  //création de limite dans la map pour ne pas scroller à l'infini
  var sudOuest = L.latLng(-90, -180);
  var nordEst = L.latLng(90, 180);
  var limiteMap = L.latLngBounds(sudOuest, nordEst);

  mapPilote.setMaxBounds(limiteMap);
  mapPilote.on("drag", function () {
    mapPilote.panInsideBounds(limiteMap, { animate: false });
  });

  //option des marker (taille, ombre)
  var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [30, 30],
      shadowSize: [50, 64],
      iconAnchor: [20, 20],
      shadowAnchor: [4, 62],
    },
  });

  //création d'un nouveau marker
  var pneuMaker = new LeafIcon({
    iconUrl: "data/markerPneu.png",
  });

  //Placement des markers représentant les pilotes sur la map

  for (let i = 0; i < tabGlobalDataPilotes.length; i++) {
    L.marker([tabGlobalDataPilotes[i].Lat, tabGlobalDataPilotes[i].Long], {
      icon: pneuMaker,
    })
      .addTo(mapPilote)
      .on("click", function () {
        mapPilote.flyTo(
          [tabGlobalDataPilotes[i].Lat, tabGlobalDataPilotes[i].Long],
          mapPilote.getMaxZoom()
        );
        //   const divInfosPilote = document.querySelector("#divInfosPilotes");
        const existeDivInfosPilotes = document.querySelector("#divInfos");
        if (existeDivInfosPilotes) {
          existeDivInfosPilotes.remove();
        }
        const divInfosPilotes = document.createElement("div");
        divInfosPilotes.id = "divInfos";
        MapEtInfos.appendChild(divInfosPilotes);
        const cartePiloteContent = document.createElement("div");
        cartePiloteContent.id = "divInfosContent";
        divInfosPilotes.appendChild(cartePiloteContent);

        //PARTIE FRONT
        const divInfosPiloteFront = document.createElement("div");
        divInfosPiloteFront.id = "divInfosFront";
        cartePiloteContent.appendChild(divInfosPiloteFront);
        divInfosPiloteFront.style.backgroundImage =
          "url(" + tabGlobalDataPilotes[i].Image + ")";
        divInfosPiloteFront.style.backgroundSize = "cover";
        divInfosPiloteFront.style.backgroundPosition = "center";

        //PARTIE BACK
        const divInfosPiloteBack = document.createElement("div");
        divInfosPiloteBack.id = "divInfosBack";
        cartePiloteContent.appendChild(divInfosPiloteBack);
        const nomPilote = document.createElement("h1");
        const nationalité = document.createElement("p");
        const team = document.createElement("p");
        const nbVictoires = document.createElement("p");
        const nbGpDisputes = document.createElement("p");
        const nbPodiums = document.createElement("p");
        divInfosPiloteBack.appendChild(nomPilote);
        divInfosPiloteBack.appendChild(nationalité);
        divInfosPiloteBack.appendChild(team);
        divInfosPiloteBack.appendChild(nbVictoires);
        divInfosPiloteBack.appendChild(nbGpDisputes);
        divInfosPiloteBack.appendChild(nbPodiums);
        nomPilote.textContent = tabGlobalDataPilotes[i].Name;
        nationalité.textContent =
          "Nationalité : " + tabGlobalDataPilotes[i].Nationalité;
        team.textContent = "Ecurie : " + tabGlobalDataPilotes[i].Team;
        nbVictoires.textContent =
          "Nombre de Victoires : " + tabGlobalDataPilotes[i]["Nb Victoires"];
        nbGpDisputes.textContent =
          "Nombre de Grand Prix : " + tabGlobalDataPilotes[i]["Nb GP disputés"];
        nbPodiums.textContent =
          "Nombre de podiums : " + tabGlobalDataPilotes[i]["Nb podiums"];
      });
  }

  boutonDezoom.addEventListener("click", function () {
    const maxDezoome = 3;
    if (mapPilote.getZoom() >= maxDezoome) {
      //récupère le centrage actuel du zoom
      var currentCenter = mapPilote.getCenter();

      //récupère les coordonnées du centre du zoom
      var currentLng = currentCenter.lng;
      var currentLat = currentCenter.lat;

      //dézoume à partir du zoom actuel
      mapPilote.flyTo([currentLat, currentLng], maxDezoome);
    }
  });
}

//---------------------------------GESTION DES GRAPHES--------------------------------------

async function recuperationPointsPilotePendantLaSaison(nomPilote, annee) {
  let nomPiloteMinuscule = nomPilote.toLowerCase();
  //cas particulier pour verstappen
  if (nomPiloteMinuscule == "verstappen") {
    nomPiloteMinuscule = "max_verstappen";
  }
  const response = await fetch(
    `https://ergast.com/api/f1/${annee}/drivers/${nomPiloteMinuscule}/results.json`
  );
  const data = await response.json();

  // Créez un tableau vide pour stocker les points de chaque course
  let pointsParCourse = [];
  let totalPoints = 0;

  // Parcourez le tableau de résultats et extrayez les points du pilote à chaque course
  data.MRData.RaceTable.Races.forEach((race) => {
    let result = race.Results.find(
      (result) => result.Driver.driverId === nomPiloteMinuscule
    );

    if (result && result.points) {
      let points = parseInt(result.points);
      totalPoints += points;
      pointsParCourse.push(totalPoints);
    }
  });
  return pointsParCourse;
}

async function recuperationGPsaison(annee) {
  const url = `https://cors-anywhere.herokuapp.com/https://ergast.com/api/f1/${annee}/races.json`;
  const response = await fetch(url);
  const data = await response.json();

  const grandPrix = data.MRData.RaceTable.Races.map((race) => race.raceName);

  return grandPrix;
}

async function grapheDriverPoint(annee) {
  const divParent = document.querySelector(".divGraphique");
  const divGraphique = document.createElement("div");
  divGraphique.id = "divGraphique";
  divParent.appendChild(divGraphique);

  //permet de creer un tableau de tableau de points selon le nom des pilote et l'année passée en paramatre
  const tabDataPointsPilote = [];
  for (let i = 0; i < tabGlobalDataPilotes.length; i++) {
    tabDataPointsPilote[i] = await recuperationPointsPilotePendantLaSaison(
      tabGlobalDataPilotes[i].Name,
      annee
    );
  }

  //permet de creer un tableau avec les noms des pilotes
  const tabNomPilote = [];
  for (let i = 0; i < tabGlobalDataPilotes.length; i++) {
    tabNomPilote[i] = tabGlobalDataPilotes[i].Name;
  }

  //permet de créer chaque lignes RPZ points/pilote
  let series = [];
  let period = 500;
  for (let i = 0; i < tabGlobalDataPilotes.length; i++) {
    series.push({
      name: tabNomPilote[i],
      data: tabDataPointsPilote[i],
      animation: {
        defer: period * i, //les lignes apparaissent une par une toute les 500ms
        duration: 12000, //en ms
      },
    });
  }

  const graphique = document.getElementById("divGraphique");

  const styleText = { color: "#FFFFFF", fontWeight: "bold" };

  Highcharts.chart(graphique, {
    chart: {
      type: "spline",
      backgroundColor: "#1b1b1b",
      marginBottom: 40,
    },
    title: {
      text: "Evolution des points des pilotes de F1 durant la saison 2022 ",
      style: {
        color: "#FFFFFF",
        fontWeight: "bold",
      },
    },

    yAxis: {
      gridLineWidth: 0,
      tickInterval: 1,
      startOnTick: false,
      endOnTick: false,
      labels: {
        style: styleText,
      },
      title: {
        text: null,
      },
    },

    xAxis: {
      offset: 10,
      labels: {
        style: styleText,
      },
    },

    legend: {
      align: "right",
      layout: "proximate",
      itemStyle: styleText,
      style: {
        fontSize: "2", // Taille de la police en pixels
      },
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        marker: {
          enabled: false,
          symbol: "diamond",
        },
      },
    },

    series: series,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });
}
