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

  // Création de deux div enfants de divMapEtInfosPilotes
  creationDivMapPilotes();
  creationDivInfosPilotes();
}

function creationDivMapPilotes() {
  const MapEtInfos = document.querySelector("#divMapEtInfosPilotes");

  const divMapPilotes = document.createElement("div");
  divMapPilotes.id = "divMapPilotes";

  MapEtInfos.appendChild(divMapPilotes);
}

function creationDivInfosPilotes() {
  const MapEtInfos = document.querySelector("#divMapEtInfosPilotes");

  const divInfosPilotes = document.createElement("div");
  divInfosPilotes.id = "divInfosPilotes";

  MapEtInfos.appendChild(divInfosPilotes);
}

function creationDivCartePilotes() {
  const divCartePilotes = document.querySelector("#divInfosPilotes");

  const cartePiloteRectoVerso = document.createElement("div");
  cartePiloteRectoVerso.className = "cardPilote";

  const cartePiloteFace = document.createElement("div");
  cartePiloteFace.className = "side front--side";

  const cartePiloteDos = document.createElement("div");
  cartePiloteDos.className = "side back--side";

  // const infosPilote = document.createElement("div");
  // infosPilote.id = "infosPiloteDansCarte";

  const nomPilote = document.createElement("h1");
  nomPilote.className = "nomPilote";

  const nationalité = document.createElement("p");
  nationalité.className = "palmaresPilote";
  nationalité.id = "nationalité";

  const team = document.createElement("p");
  team.className = "palmaresPilote";
  team.id = "team";

  const nbVictoires = document.createElement("p");
  nbVictoires.className = "palmaresPilote";
  nbVictoires.id = "nbVictoires";

  const nbGpDisputes = document.createElement("p");
  nbGpDisputes.className = "palmaresPilote";
  nbGpDisputes.id = "nbGpDisputes";

  const nbPodiums = document.createElement("p");
  nbPodiums.className = "palmaresPilote";
  nbPodiums.id = "nbPodiums";

  divCartePilotes.appendChild(cartePiloteRectoVerso);
  cartePiloteRectoVerso.appendChild(cartePiloteFace);
  cartePiloteRectoVerso.appendChild(cartePiloteDos);
  // cartePiloteDos.appendChild(infosPilote);
  cartePiloteDos.appendChild(nomPilote);
  cartePiloteDos.appendChild(nationalité);
  cartePiloteDos.appendChild(team);
  cartePiloteDos.appendChild(nbVictoires);
  cartePiloteDos.appendChild(nbGpDisputes);
  cartePiloteDos.appendChild(nbPodiums);
}

//----------------------------Récuperation Infos Pilotes depuis fichier json-------------

let tabGlobalDataPilotes = {};
function recupererInfosPilotes() {
  fetch("json/Driver.json")
    .then((response) => response.json())
    .then((data) => {
      const piloteData = data;
      const tabData = piloteData.map((pilote) => {
        return {
          Nom: pilote["Name"],
          Ecurie: pilote["Team"],
          Naissance: pilote["Naissance"],
          Age: pilote["âge"],
          Nationalité: pilote["Nationalité"],
          nbPoints: pilote["Nb points"],
          nbMoyenPointsParGP: pilote["Nb points moyen/GP"],
          nbVictoires: pilote["Nb Victoires"],
          nbChampion: pilote["Nb Champion"],
          nbPodiums: pilote["Nb podiums"],
          nbPolesPositions: pilote["Nb pôle Position"],
          nbMeilleursTours: pilote["Nb meilleurs tours"],
          nbDNF: pilote["Nb DNF"],
          nbDnfMoyenParSaison: pilote["Pourcent DNF moyen/GP"],
          nbGpDisputes: pilote["Nb GP disputés"],
          Image: pilote["Image"],
        };
      });
      tabGlobalDataPilotesTemp = tabData;
      for (pilote in tabGlobalDataPilotesTemp) {
        objetPilote = tabGlobalDataPilotesTemp[pilote];
        tabGlobalDataPilotes[objetPilote.Nom] = objetPilote;
      }
    });
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

//variable global permettant de recuper le nom du pilote lorsqu'on clique sur son marker
let nomPiloteCliquee;

//---------------------------------GESTION DE LA MAP--------------------------------------

function mapPilote() {
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
  nordEst = L.latLng(90, 180);
  limiteMap = L.latLngBounds(sudOuest, nordEst);

  mapPilote.setMaxBounds(limiteMap);
  mapPilote.on("drag", function () {
    mapPilote.panInsideBounds(limiteMap, { animate: false });
  });

  //option des marker (taille, ombre)
  var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [40, 40],
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

  const Hamilton = L.marker([51.907266, -0.196862], { icon: pneuMaker }).addTo(
    mapPilote
  );

  Hamilton.on("click", function () {
    mapPilote.flyTo([51.907266, -0.196862], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Hamilton");
  });

  const Verstappen = L.marker([52.3781, 4.9011], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Verstappen.on("click", function () {
    mapPilote.flyTo([52.3781, 4.9011], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Verstappen");
  });

  const Perez = L.marker([19.4326, -99.1332], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Perez.on("click", function () {
    mapPilote.flyTo([19.4326, -99.1332], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Perez");
  });

  const Russell = L.marker([52.6369, -1.1398], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Russell.on("click", function () {
    mapPilote.flyTo([52.6369, -1.1398], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Russell");
  });

  const Leclerc = L.marker([43.7313, 7.4265], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Leclerc.on("click", function () {
    mapPilote.flyTo([43.7313, 7.4265], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Leclerc");
  });

  const Sainz = L.marker([43.3667, -5.85], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Sainz.on("click", function () {
    mapPilote.flyTo([43.3667, -5.85], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Sainz");
  });

  const Ocon = L.marker([49.0256, 1.2183], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Ocon.on("click", function () {
    mapPilote.flyTo([49.0256, 1.2183], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Ocon");
  });

  const Gasly = L.marker([49.4431, 1.0993], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Gasly.on("click", function () {
    mapPilote.flyTo([49.4431, 1.0993], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Gasly");
  });

  const Albon = L.marker([13.7563, 100.5018], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Albon.on("click", function () {
    mapPilote.flyTo([13.7563, 100.5018], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Albon");
  });

  const Magnussen = L.marker([55.6761, 12.5683], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Magnussen.on("click", function () {
    mapPilote.flyTo([55.6761, 12.5683], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Magnussen");
  });

  const Alonso = L.marker([43.3629, -8.4139], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Alonso.on("click", function () {
    mapPilote.flyTo([43.3629, -8.4139], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Alonso");
  });

  const Schumacher = L.marker([50.1147, 8.6843], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Schumacher.on("click", function () {
    mapPilote.flyTo([50.1147, 8.6843], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Schumacher");
  });

  const Tsunoda = L.marker([35.6586, 139.7454], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Tsunoda.on("click", function () {
    mapPilote.flyTo([35.6586, 139.7454], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Tsunoda");
  });

  const Vettel = L.marker([48.7758, 9.1829], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Vettel.on("click", function () {
    mapPilote.flyTo([48.7758, 9.1829], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Vettel");
  });

  const Bottas = L.marker([60.9518, 25.6667], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Bottas.on("click", function () {
    mapPilote.flyTo([60.9518, 25.6667], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Bottas");
  });

  const Stroll = L.marker([45.5, -73.5833], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Stroll.on("click", function () {
    mapPilote.flyTo([45.5, -73.5833], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Stroll");
  });

  const Zhou = L.marker([31.2165, 121.4365], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Zhou.on("click", function () {
    mapPilote.flyTo([31.2165, 121.4365], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Zhou");
  });

  const Ricciardo = L.marker([-31.935, 115.8111], { icon: pneuMaker }).addTo(
    mapPilote
  );
  Ricciardo.on("click", function () {
    mapPilote.flyTo([-31.935, 115.8111], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Ricciardo");
  });

  const Latifi = L.marker([43.7, -79.4], { icon: pneuMaker }).addTo(mapPilote);
  Latifi.on("click", function () {
    mapPilote.flyTo([43.7, -79.4], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    creationCartePilote("Latifi");
  });
}

function creationCartePilote(namePilote) {
  divInfosPilotes.innerHTML = ""; //vide le container () parent
  creationDivCartePilotes(); //création du container carte
  //si il existe dejà des choses dans la carte => vider la carte sinon rien faire
  //! palmaresPilote est remplie SSI la carte est remplie car on remplie tous les champs de la carte en même temps
  const palmaresPilote = document.querySelector("#palmaresPilote");
  const nomPilote = document.querySelector(".nomPilote");
  if (palmaresPilote != null) {
    palmaresPilote.innerHTML = "";
    nomPilote.innerHTML = "";
  }
  var cardPiloteFace = document.querySelector(".side.front--side");
  var cardPiloteDos = document.querySelector(".side.back--side");
  cardPiloteFace.style.backgroundImage = `url(${tabGlobalDataPilotes[namePilote].Image})`;
  cardPiloteFace.style.backgroundSize = "cover";
  nomPilote.innerHTML = `${namePilote}`;
  cardPiloteDos.querySelector("#nationalité").innerHTML =
    tabGlobalDataPilotes[`${namePilote}`].Nationalité;
  cardPiloteDos.querySelector("#team").innerHTML =
    tabGlobalDataPilotes[`${namePilote}`].Ecurie;
  cardPiloteDos.querySelector("#nbVictoires").innerHTML =
    tabGlobalDataPilotes[`${namePilote}`].nbVictoires;
  cardPiloteDos.querySelector("#nbGpDisputes").innerHTML =
    tabGlobalDataPilotes[`${namePilote}`].nbGpDisputes;
  cardPiloteDos.querySelector("#nbPodiums").innerHTML =
    tabGlobalDataPilotes[`${namePilote}`].nbPodiums;
}

function creationCartePiloteVerso() {}
