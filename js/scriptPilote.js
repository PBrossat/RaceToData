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

  // Création de la div Carte
  creationDivCartePilotes();
}

const boutonDecouvrirStatsPilotes = document.querySelector(
  ".btn-decouvrir-stats-pilotes"
);
boutonDecouvrirStatsPilotes.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherStatsPilotes();
  mapPilote();
});

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

  const cartePilote = document.createElement("div");
  cartePilote.id = "cardPilote";

  const imagePilote = document.createElement("img");
  imagePilote.id = "imagePilote";

  const infosPilote = document.createElement("div");
  infosPilote.id = "infosPiloteDansCarte";

  const nomPilote = document.createElement("h1");
  nomPilote.className = "nomPilote";

  const nationalité = document.createElement("p");
  nationalité.className = "palmaresPilote";

  const team = document.createElement("p");
  team.className = "palmaresPilote";

  const nbVictoires = document.createElement("p");
  nbVictoires.className = "palmaresPilote";

  const nbGpDisputes = document.createElement("p");
  nbGpDisputes.className = "palmaresPilote";

  const nbPodiums = document.createElement("p");
  nbPodiums.className = "palmaresPilote";

  divCartePilotes.appendChild(cartePilote);
  cartePilote.appendChild(imagePilote);
  cartePilote.appendChild(infosPilote);
  infosPilote.appendChild(nomPilote);
  infosPilote.appendChild(nationalité);
  infosPilote.appendChild(team);
  infosPilote.appendChild(nbVictoires);
  infosPilote.appendChild(nbGpDisputes);
  infosPilote.appendChild(nbPodiums);
}

//Récuperer les données dans un tableau globalTabData accessible partout dans le script
let globalTabData;
fetch("json/Driver.json")
  .then((response) => response.json())
  .then((data) => {
    const piloteData = data;
    const tabData = piloteData.map((pilote) => {
      return {
        Nom: pilote["Name"],
        Age: pilote["âge"],
        nbMoyenPointsParGP: pilote["Nb points moyen/GP"],
        nbVictoires: pilote["Nb Victoires"],
        nbPodiums: pilote["Nb podiums"],
        nbDNF: pilote["Nb DNF"],
        nbDnfMoyenParSaison: pilote["Pourcent DNF moyen/GP"],
        nbGpDisputes: pilote["NB GP disputés"],
      };
    });
    globalTabData = tabData;
    return tabData;
  });

// Création de fonctions permettants de récuperer (à partir de globalTabData) des informations et de les stockers dans des tableaux
function getNomPilote() {
  const nomPilote = [];
  for (var i = 0; i < globalTabData.length; i++) {
    nomPilote.push(globalTabData[i].Nom);
  }
  return nomPilote;
}

function getAgePilote() {
  const agePilote = [];
  for (var i = 0; i < globalTabData.length; i++) {
    agePilote.push(globalTabData[i].Age);
  }
  return agePilote;
}

function getNbMoyenPointsParGP() {
  const nbMoyenPointsParGP = [];
  for (var i = 0; i < globalTabData.length; i++) {
    nbMoyenPointsParGP.push(globalTabData[i].nbMoyenPointsParGP);
  }
  return nbMoyenPointsParGP;
}

function getNbVictoires() {
  const nbVictoires = [];
  for (var i = 0; i < globalTabData.length; i++) {
    nbVictoires.push(globalTabData[i].nbVictoires);
  }
  return nbVictoires;
}

function getNbPodiums() {
  const nbPodiums = [];
  for (var i = 0; i < globalTabData.length; i++) {
    nbPodiums.push(globalTabData[i].nbPodiums);
  }
  return nbPodiums;
}

function getNbDNF() {
  const nbDNF = [];
  for (var i = 0; i < globalTabData.length; i++) {
    nbDNF.push(globalTabData[i].nbDNF);
  }
  return nbDNF;
}

function getNbDnfMoyenParSaison() {
  const nbDnfMoyenParSaison = [];
  for (var i = 0; i < globalTabData.length; i++) {
    nbDnfMoyenParSaison.push(globalTabData[i].nbDnfMoyenParSaison);
  }
  return nbDnfMoyenParSaison;
}

function getNbGpDisputes() {
  const nbGpDisputes = [];
  for (var i = 0; i < globalTabData.length; i++) {
    nbGpDisputes.push(globalTabData[i].nbGpDisputes);
  }
  return nbGpDisputes;
}

// fonction permettant d'afficher un graphe radar
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
function mapPilote() {
  //centree sur Paris
  const centreMap = {
    lat: 48.866667,
    lng: 2.333333,
  };

  const zoomInitial = 1.5;
  const mapPilote = L.map("divMapPilotes").setView(
    [centreMap.lat, centreMap.lng],
    zoomInitial
  );

  const layerPrincipale = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 15,
      minZoom: 1.5,

      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  );

  layerPrincipale.addTo(mapPilote);

  //création de limite dans la map pour ne pas scroller à l'infini
  var sudOuest = L.latLng(-90, -180),
    nordEst = L.latLng(90, 180),
    limiteMap = L.latLngBounds(sudOuest, nordEst);

  mapPilote.setMaxBounds(limiteMap);
  mapPilote.on("drag", function () {
    mapPilote.panInsideBounds(limiteMap, { animate: false });
  });

  //Placement des markers représentant les pilotes sur la map

  const Hamilton = L.marker([51.907266, -0.196862]).addTo(mapPilote); // Royaume Unis
  Hamilton.bindPopup(`
  <h1>Lewis Hamilton</h1>
  <img src="data/Hamilton.jpeg" alt="Lewis Hamilton" style="width: 115%">
  `);

  const Verstappen = L.marker([52.3781, 4.9011]).addTo(mapPilote); // Pays Bas
  Verstappen.bindPopup(`
    <h1>Max Verstappen</h1>
    <img src="data/Verstappen.jpeg" alt="Max Verstappen" style="width: 115%">
  `);

  const Perez = L.marker([19.4326, -99.1332]).addTo(mapPilote); // Mexico
  Perez.bindPopup(`
    <h1>Sergio Perez</h1>
    <img src="data/Perez.jpeg" alt="Sergio Perez" style="width: 115%">
  `);

  const Russell = L.marker([52.6369, -1.1398]).addTo(mapPilote); // Royaume Uni
  Russell.bindPopup(`
    <h1>George Russell</h1>
    <img src="data/Russell.jpeg" alt="George Russell" style="width: 115%">
  `);

  const Leclerc = L.marker([43.7313, 7.4265]).addTo(mapPilote); // Monaco
  Leclerc.bindPopup(`
    <h1>Charles Leclerc</h1>
    <img src="data/Leclerc.jpeg" alt="Charles Leclerc" style="width: 115%">
  `);

  const Sainz = L.marker([43.3667, -5.85]).addTo(mapPilote); // Espagne
  Sainz.bindPopup(`
    <h1>Carlos Sainz</h1>
    <img src="data/Sainz.jpeg" alt="Carlos Sainz" style="width: 115%">
  `);

  const Ocon = L.marker([49.0256, 1.2183]).addTo(mapPilote); // France
  Ocon.bindPopup(`
  <h1>Esteban Ocon</h1>
  <img src="data/Ocon.jpeg" alt="Esteban Ocon" style="width: 115%">
  `);

  const Gasly = L.marker([49.4431, 1.0993]).addTo(mapPilote); // France
  Gasly.bindPopup(`
  <h1>Pierre Gasly</h1>
  <img src="data/Gasly.jpeg" alt="Pierre Gasly" style="width: 115%">
  `);

  const Albon = L.marker([13.7563, 100.5018]).addTo(mapPilote); // Royaume Unis
  Albon.bindPopup(`
  <h1>Alexander Albon</h1>
  <img src="data/Albon.jpeg" alt="Alexander Albon" style="width: 115%">
  `);

  const Magnussen = L.marker([55.6761, 12.5683]).addTo(mapPilote); // Danmark
  Magnussen.bindPopup(`
  <h1>Kevin Magnussen</h1>
  <img src="data/Magnussen.jpeg" alt="Kevin Magnussen" style="width: 115%">
  `);

  const Alonso = L.marker([43.3629, -8.4139]).addTo(mapPilote); // Espagne
  Alonso.bindPopup(`
  <h1>Fernando Alonso</h1>
  <img src="data/Alonso.jpeg" alt="Fernando Alonso" style="width: 115%">
  `);

  const Schumacher = L.marker([50.1147, 8.6843]).addTo(mapPilote); // Allemagne
  Schumacher.bindPopup(`
  <h1>Mick Schumacher</h1>
  <img src="data/Schumacher.jpeg" alt="Mick Schumacher" style="width: 115%">
  `);

  const Tsunoda = L.marker([35.6586, 139.7454]).addTo(mapPilote); // Japon
  Tsunoda.bindPopup(`
  <h1>Yuki Tsunoda</h1>
  <img src="data/Tsunoda.jpeg" alt="Yuki Tsunoda" style="width: 115%">
  `);

  const Vettel = L.marker([48.7758, 9.1829]).addTo(mapPilote); // Allemagne
  Vettel.bindPopup(`
  <h1>Sebastian Vettel</h1>
  <img src="data/Vettel.jpeg" alt="Sebastian Vettel" style="width: 115%">
  `);

  const Bottas = L.marker([60.9518, 25.6667]).addTo(mapPilote); // Finland
  Bottas.bindPopup(`
  <h1>Valtteri Bottas</h1>
  <img src="data/Bottas.jpeg" alt="Valtteri Bottas" style="width: 115%">
  `);

  const Stroll = L.marker([45.5, -73.5833]).addTo(mapPilote); // Canada
  Stroll.bindPopup(`
  <h1>Lance Stroll</h1>
  <img src="data/Stroll.jpeg" alt="Lance Stroll" style="width: 115%">
`);

  const Zhou = L.marker([31.2165, 121.4365]).addTo(mapPilote); // Chine
  Zhou.bindPopup(`
  <h1>Guanyu Zhou</h1>
  <img src="data/Zhou.jpeg" alt="Guanyu Zhou" style="width: 115%">
  `);

  return {
    Hamilton,
    Verstappen,
    Perez,
    Russell,
    Leclerc,
    Sainz,
    Ocon,
    Gasly,
    Albon,
    Magnussen,
    Alonso,
    Schumacher,
    Tsunoda,
    Vettel,
    Bottas,
    Stroll,
    Zhou,
  };
}

const tousLesMarkers = mapPilote();

const clickMarkerFonction = function (nomPiloteCliquee) {
  return function () {
    const tabNomPilotes = getNomPilote();

    const nomTrouve = tabNomPilotes.find((nom) => nom === nomPiloteCliquee);
    document.getElementsByClassName("nomPilote")[0].innerHTML = nomTrouve;
  };
};

tousLesMarkers.Hamilton.on("click", clickMarkerFonction("Hamilton"));
