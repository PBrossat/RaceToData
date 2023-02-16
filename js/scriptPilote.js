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
  mapPilote();
  recupererInfosPilotes();
});

//------------------------------ Création des containers ----------------

function afficherStatsPilotes() {
  const StatsPilotes = document.querySelector("#stats");

  const sectionStatsPilotes = document.createElement("section");
  sectionStatsPilotes.innerHTML +=
    "<h2>Analyse des données relatives aux Pilotes</h2>";

  const divMapEtInfos = document.createElement("div");
  divMapEtInfos.id = "divMapEtInfosPilotes";

  StatsPilotes.appendChild(sectionStatsPilotes);
  sectionStatsPilotes.appendChild(divMapEtInfos);
}

//---------------------------------GESTION DES GRAPHES--------------------------------------

function grapheDriverPointMoyenParGPRadar() {
  const nomPilote = getNomPilote();
  const nbMoyenPointsParGpParPilote = getNbMoyenPointsParGP();

  const configuration = {
    type: "radar",
    data: {
      labels: nomPilote,

      datasets: [
        {
          label: "Points moyen par Grand Prix ",
          data: nbMoyenPointsParGpParPilote,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(0, 0, 0)",
          pointBackgroundColor: "rgb(255,0,0)",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
      ],
    },
    options: {
      responsive: false,
    },
  };

  const graphique = document.getElementById("CanvaIdGauche");
  const chart = new Chart(graphique, configuration);
}

// fonction permettant d'afficher un graphe bâton
function grapheDriverPointMoyenParGPBaton() {
  //création d'un tableau de couleurs aléatoires
  var tabCouleurs = [];
  for (var i = 0; i < globalTabData.length; i++) {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    tabCouleurs.push(`rgba(${r}, ${g}, ${b}, 0.9)`);
  }

  const nomPilote = getNomPilote();
  const nbMoyenPointsParGpParPilote = getNbMoyenPointsParGP();

  const configuration = {
    type: "bar",
    data: {
      labels: nomPilote,
      datasets: [
        {
          label: "Points moyen par Grand Prix ",
          data: nbMoyenPointsParGpParPilote,
          backgroundColor: tabCouleurs,
          borderColor: "rgb(0, 0, 0)",
        },
      ],
    },
    options: {
      responsive: false,
    },
  };

  const graphique = document.getElementById("CanvaIdDroite");
  const chart = new Chart(graphique, configuration);
}

//---------------------------------GESTION DE LA MAP--------------------------------------

function mapPilote() {
  //création des div Map et Infos
  const MapEtInfos = document.querySelector("#divMapEtInfosPilotes");
  const boutonDezoom = document.createElement("button");
  boutonDezoom.className = "bouton";
  MapEtInfos.appendChild(boutonDezoom);
  boutonDezoom.textContent = "DeZoom";
  const SelecteurPilote = document.createElement("select");
  SelecteurPilote.className = "select";
  MapEtInfos.appendChild(SelecteurPilote);
  //--Selecteur Pilote
  const tabNomPilote = [];
  for (var i = 0; i < tabGlobalDataPilotes.length; i++) {
    tabNomPilote[i] = tabGlobalDataPilotes[i].Name;
  }

  tabNomPilote.forEach((pilote) => {
    const option = document.createElement("option");
    option.value = pilote;
    option.text = pilote;
    SelecteurPilote.appendChild(option);
  });

  //--Map

  const divMapPilotes = document.createElement("div");
  divMapPilotes.id = "divMapPilotes";

  MapEtInfos.appendChild(divMapPilotes);

  //--Infos
  const divInfosPilotes = document.createElement("div");
  divInfosPilotes.id = "divInfosPilotes";

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
  const mapPilote = L.map("divMapPilotes").setView(
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
        const existeDivInfosPilotes =
          document.querySelector("#divInfosPilotes");
        if (existeDivInfosPilotes) {
          existeDivInfosPilotes.remove();
        }
        const divInfosPilotes = document.createElement("div");
        divInfosPilotes.id = "divInfosPilotes";
        MapEtInfos.appendChild(divInfosPilotes);
        const cartePiloteContent = document.createElement("div");
        cartePiloteContent.id = "cardPilote";
        divInfosPilotes.appendChild(cartePiloteContent);

        //PARTIE FRONT
        const divInfosPiloteFront = document.createElement("div");
        divInfosPiloteFront.id = "divInfosFront";
        cartePiloteContent.appendChild(divInfosPiloteFront);
        divInfosPiloteFront.style.backgroundImage =
          "url(" + tabGlobalDataPilotes[i].Image + ")";
        divInfosPiloteFront.style.backgroundSize = "cover";

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
