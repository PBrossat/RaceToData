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
  grapheDriverPoint(2022);
  graphePointsMoyenDriver();
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

//Permet de récuperer les points du pilote au fil de la saison passée en paramaetre
async function recuperationPointsPilotePendantLaSaison(nomPilote, annee) {
  let nomPiloteMinuscule = nomPilote.toLowerCase();
  //cas particuliers
  if (nomPiloteMinuscule == "verstappen") {
    nomPiloteMinuscule = "max_verstappen";
  }

  switch (nomPiloteMinuscule) {
    case "verstappen":
      nomPiloteMinuscule = "max_verstappen";
      break;

    case "magnussen":
      nomPiloteMinuscule = "kevin_magnussen";
      break;

    case "schumacher":
      nomPiloteMinuscule = "mick_schumacher";
      break;

    default:
      break;
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

//Permet de récuperer les noms des Gp de l'année passée en parametre
async function recuperationGPsaison(annee) {
  const url = `https://ergast.com/api/f1/${annee}/races.json`;
  const response = await fetch(url);
  const data = await response.json();

  const grandPrix = data.MRData.RaceTable.Races.map((race) => race.raceName);

  //remplace "Grand Prix" par "GP"
  for (let i = 0; i < grandPrix.length; i++) {
    grandPrix[i] = grandPrix[i].replace("Grand Prix", "GP");
  }
  return grandPrix;
}

// Permet de récuperer les noms des pilotes de l'année passée en parametre grâce
//  à l'API Ergast (utilisée uniquement quand annee!=2022 )
async function recuperationPilotesSaison(annee) {
  const url = `https://ergast.com/api/f1/${annee}/drivers.json`;
  const response = await fetch(url);
  const data = await response.json();

  const pilotes = data.MRData.DriverTable.Drivers.map(
    (driver) => driver.familyName
  );

  return pilotes;
}

//Création des boutons pour choisir l'années pour le graphique 1
async function creationBoutonChoixSaison() {
  const divParent = document.querySelector(".divGraphique");
  const divBouton = document.createElement("div");
  divBouton.id = "divBoutonChoix";
  divParent.appendChild(divBouton);

  const bouton2021 = document.createElement("button");
  bouton2021.id = "bouton2021";
  const bouton2022 = document.createElement("button");
  bouton2022.id = "bouton2022";
  bouton2021.className = "bouton";
  bouton2022.className = "bouton";
  bouton2021.textContent = "2021";
  bouton2022.textContent = "2022";
  divBouton.appendChild(bouton2021);
  divBouton.appendChild(bouton2022);
}

//Création d'un graphe
async function grapheDriverPoint(annee) {
  creationNouvelleDiv();
  //Création container
  const divParent = document.querySelector(".divGraphique");
  divParent.innerHTML = "";

  //Création Titre
  const Titre = document.createElement("h1");
  divParent.appendChild(Titre);
  Titre.innerHTML = "Graphique Points Pilotes ";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "Graphique";
  divParent.appendChild(divGraphique);

  //création loader
  const chargement = document.createElement("img");
  chargement.src = "../data/white_loader.svg";
  divParent.appendChild(chargement);

  const tabNomPiloteSaison = await recuperationPilotesSaison(annee);

  //permet de creer un tableau de tableau de points selon le nom des pilote et l'année passée en paramatre
  const tabDataPointsPilote = [];
  for (let i = 0; i < tabGlobalDataPilotes.length; i++) {
    //cas particulier pour l'année 2022 pour avoir accès aux couleurs des écuries (data dans Driver.json)
    if (annee == 2022) {
      tabDataPointsPilote[i] = await recuperationPointsPilotePendantLaSaison(
        tabGlobalDataPilotes[i].Name,
        annee
      );
    }
    //sinon on utilise tabNomPiloteSaison crée plus tôt
    else {
      tabDataPointsPilote[i] = await recuperationPointsPilotePendantLaSaison(
        tabNomPiloteSaison[i],
        annee
      );
    }
  }

  //Suppression du loader
  chargement.parentNode.removeChild(chargement);

  //Tableau avec le noms des GP de l'année
  const pays = await recuperationGPsaison(annee);

  //permet de créer chaque lignes RPZ points/pilote
  let series = [];

  //cas particulier pour l'année 2022
  if (annee == 2022) {
    for (let i = 0; i < tabGlobalDataPilotes.length; i++) {
      series.push({
        name: tabGlobalDataPilotes[i].Name,
        data: tabDataPointsPilote[i],
        color: tabGlobalDataPilotes[i].Color,
        animation: {
          duration: 8000, //en ms
        },
      });
    }
  }
  //sinon on utilise les données de l'API (couleur non cohérentes)
  else {
    for (let i = 0; i < tabNomPiloteSaison.length; i++) {
      series.push({
        name: tabNomPiloteSaison[i],
        data: tabDataPointsPilote[i],
        animation: {
          duration: 8000, //en ms
        },
      });
    }
  }

  const graphique = document.getElementById("Graphique");

  const styleText = { color: "#FFFFFF", fontWeight: "bold" };

  var screenWidth = window.innerWidth;
  var legendFontSize = "16px";

  if (screenWidth <= 600) {
    legendFontSize = "12px"; //Taille de la police pour les écrans de 600px ou moins
  } else if (screenWidth <= 1024) {
    legendFontSize = "14px"; //Taille de la police pour les écrans de 1024px ou moins
  }

  Highcharts.chart(graphique, {
    chart: {
      type: "spline",
      backgroundColor: "#1b1b1b",
      marginBottom: 110,
      height: "55%",
      zoomType: "xy",
      panning: true,
      panKey: "shift",
    },
    title: {
      text: "Evolution des points des pilotes de F1 durant la saison " + annee,

      style: {
        color: "#FF2A2A",
        textShadow: "5px 5px 2px rgba(100,98,98,0.4)",
        fontWeight: "bold",
        fontSize: "30px",
      },
    },

    yAxis: {
      gridLineWidth: 0,
      tickInterval: 20,
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
        rotation: -45,
      },
      categories: pays,
    },

    legend: {
      align: "right",
      layout: "proximate",
      itemStyle: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: legendFontSize,
      },
      width: "12%",
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
  });

  creationBoutonChoixSaison();

  //Event sur les boutons
  document.querySelector("#bouton2021").addEventListener("click", function () {
    grapheDriverPoint(2021);
  });

  document.querySelector("#bouton2022").addEventListener("click", function () {
    grapheDriverPoint(2022);
  });
}

function graphePointsMoyenDriver() {
  creationNouvelleDiv();
}
