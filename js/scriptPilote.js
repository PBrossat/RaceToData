//----------------------------Récuperation Infos Pilotes-------------
async function recupererInfosPilotes() {
  let response = await fetch("json/Driver.json");
  response = await response.json();
  return response;
}

let tabGlobalDataPilotes;

tabGlobalDataPilotes = recupererInfosPilotes();

const VerstappenInfos = tabGlobalDataPilotes[0];
const NorrisInfos = tabGlobalDataPilotes[1];
const GaslyInfos = tabGlobalDataPilotes[2];
const PerezInfos = tabGlobalDataPilotes[3];
const AlonsoInfos = tabGlobalDataPilotes[4];
const LeclercInfos = tabGlobalDataPilotes[5];
const StrollInfos = tabGlobalDataPilotes[6];
const MagnussenInfos = tabGlobalDataPilotes[7];
const TsunodaInfos = tabGlobalDataPilotes[8];
const AlbonInfos = tabGlobalDataPilotes[9];
const ZhouInfos = tabGlobalDataPilotes[10];
const OconInfos = tabGlobalDataPilotes[11];
const HamiltonInfos = tabGlobalDataPilotes[12];
const SainzInfos = tabGlobalDataPilotes[13];
const RussellInfos = tabGlobalDataPilotes[14];
const BottasInfos = tabGlobalDataPilotes[15];
const VettelInfos = tabGlobalDataPilotes[16];
const RicciardoInfos = tabGlobalDataPilotes[18];
const LatifiInfos = tabGlobalDataPilotes[19];
const SchumacherInfos = tabGlobalDataPilotes[20];

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

  // const imagePilote = document.createElement("img");
  // imagePilote.id = "imagePilote";

  const infosPilote = document.createElement("div");
  infosPilote.id = "infosPiloteDansCarte";

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

  divCartePilotes.appendChild(cartePilote);
  // cartePilote.appendChild(imagePilote);
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

//---------------------------------GESTION DES GRAPHES--------------------------------------

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
  ); // Royaume Unis

  Hamilton.bindPopup(`
  <h1>Lewis Hamilton</h1>
  <img src="data/pilotes/Hamilton.jpeg" alt="Lewis Hamilton" style="width: 115%">
  `);

  Hamilton.on("click", function () {
    mapPilote.flyTo([51.907266, -0.196862], mapPilote.getMaxZoom()); //zoom sur l'emplacement
    // divInfosPilotes.innerHTML = ""; //vide le container () parent
    // creationDivCartePilotes(); //création du container carte
    // //si il existe dejà des choses dans la carte => vider la carte sinon rien faire
    // //! palmaresPilote est remplie SSI la carte est remplie car on remplie tous les champs de la carte en même temps
    // const palmaresPilote = document.querySelector("#palmaresPilote");
    // const nomPilote = document.querySelector(".nomPilote");
    // if (palmaresPilote != null) {
    //   palmaresPilote.innerHTML = "";
    //   nomPilote.innerHTML = "";
    //   imgPilote.innerHTML = "";
    // }
    // var cardPilote = document.querySelector("#cardPilote");
    // cardPilote.style.backgroundImage =
    //   "url('data/pilotes/HamiltonBackground.jpg')";
    // cardPilote.style.backgroundSize = "cover";
    // nomPilote.innerHTML = "Lewis Hamilton";
    // document.querySelector("#nationalité").innerHTML = "Grande Bretagne";
    // document.querySelector("#team").innerHTML = "Mercedes";
    // document.querySelector("#nbVictoires").innerHTML = "103";
    // document.querySelector("#nbGpDisputes").innerHTML = "310";
    // document.querySelector("#nbPodiums").innerHTML = "191";
    creationCartePilote("Hamilton");
  });

  const Verstappen = L.marker([52.3781, 4.9011], { icon: pneuMaker }).addTo(
    mapPilote
  ); // Pays Bas
  Verstappen.bindPopup(`
    <h1>Max Verstappen</h1>
    <img src="data/pilotes/Verstappen.jpeg" alt="Max Verstappen" style="width: 115%">
  `);

  const Perez = L.marker([19.4326, -99.1332], { icon: pneuMaker }).addTo(
    mapPilote
  ); // Mexico
  Perez.bindPopup(`
    <h1>Sergio Perez</h1>
    <img src="data/pilotes/Perez.jpeg" alt="Sergio Perez" style="width: 115%">
  `);

  const Russell = L.marker([52.6369, -1.1398], { icon: pneuMaker }).addTo(
    mapPilote
  ); // Royaume Uni
  Russell.bindPopup(`
    <h1>George Russell</h1>
    <img src="data/pilotes/Russell.jpeg" alt="George Russell" style="width: 115%">
  `);

  const Leclerc = L.marker([43.7313, 7.4265], { icon: pneuMaker }).addTo(
    mapPilote
  ); // Monaco
  Leclerc.bindPopup(`
    <h1>Charles Leclerc</h1>
    <img src="data/pilotes/Leclerc.jpeg" alt="Charles Leclerc" style="width: 115%">
  `);

  const Sainz = L.marker([43.3667, -5.85], { icon: pneuMaker }).addTo(
    mapPilote
  ); // Espagne
  Sainz.bindPopup(`
    <h1>Carlos Sainz</h1>
    <img src="data/pilotes/Sainz.jpeg" alt="Carlos Sainz" style="width: 115%">
  `);

  const Ocon = L.marker([49.0256, 1.2183], { icon: pneuMaker }).addTo(
    mapPilote
  ); // France
  Ocon.bindPopup(`
  <h1>Esteban Ocon</h1>
  <img src="data/pilotes/Ocon.jpeg" alt="Esteban Ocon" style="width: 115%">
  `);

  const Gasly = L.marker([49.4431, 1.0993], { icon: pneuMaker }).addTo(
    mapPilote
  ); // France
  Gasly.bindPopup(`
  <h1>Pierre Gasly</h1>
  <img src="data/pilotes/Gasly.jpeg" alt="Pierre Gasly" style="width: 115%">
  `);

  const Albon = L.marker([13.7563, 100.5018], { icon: pneuMaker }).addTo(
    mapPilote
  ); // Royaume Unis
  Albon.bindPopup(`
  <h1>Alexander Albon</h1>
  <img src="data/pilotes/Albon.jpeg" alt="Alexander Albon" style="width: 115%">
  `);

  const Magnussen = L.marker([55.6761, 12.5683], { icon: pneuMaker }).addTo(
    mapPilote
  ); // Danmark
  Magnussen.bindPopup(`
  <h1>Kevin Magnussen</h1>
  <img src="data/pilotes/Magnussen.jpeg" alt="Kevin Magnussen" style="width: 115%">
  `);

  const Alonso = L.marker([43.3629, -8.4139], { icon: pneuMaker }).addTo(
    mapPilote
  ); // Espagne
  Alonso.bindPopup(`
  <h1>Fernando Alonso</h1>
  <img src="data/pilotes/Alonso.jpeg" alt="Fernando Alonso" style="width: 115%">
  `);

  const Schumacher = L.marker([50.1147, 8.6843], { icon: pneuMaker }).addTo(
    mapPilote
  ); // Allemagne
  Schumacher.bindPopup(`
  <h1>Mick Schumacher</h1>
  <img src="data/pilotes/Schumacher.jpeg" alt="Mick Schumacher" style="width: 115%">
  `);

  const Tsunoda = L.marker([35.6586, 139.7454], { icon: pneuMaker }).addTo(
    mapPilote
  ); // Japon
  Tsunoda.bindPopup(`
  <h1>Yuki Tsunoda</h1>
  <img src="data/pilotes/Tsunoda.jpeg" alt="Yuki Tsunoda" style="width: 115%">
  `);

  const Vettel = L.marker([48.7758, 9.1829], { icon: pneuMaker }).addTo(
    mapPilote
  ); // Allemagne
  Vettel.bindPopup(`
  <h1>Sebastian Vettel</h1>
  <img src="data/pilotes/Vettel.jpeg" alt="Sebastian Vettel" style="width: 115%">
  `);

  const Bottas = L.marker([60.9518, 25.6667], { icon: pneuMaker }).addTo(
    mapPilote
  ); // Finland
  Bottas.bindPopup(`
  <h1>Valtteri Bottas</h1>
  <img src="data/pilotes/Bottas.jpeg" alt="Valtteri Bottas" style="width: 115%">
  `);

  const Stroll = L.marker([45.5, -73.5833], { icon: pneuMaker }).addTo(
    mapPilote
  ); // Canada
  Stroll.bindPopup(`
  <h1>Lance Stroll</h1>
  <img src="data/pilotes/Stroll.jpeg" alt="Lance Stroll" style="width: 115%">
  `);

  const Zhou = L.marker([31.2165, 121.4365], { icon: pneuMaker }).addTo(
    mapPilote
  ); // Chine
  Zhou.bindPopup(`
  <h1>Guanyu Zhou</h1>
  <img src="data/pilotes/Zhou.jpeg" alt="Guanyu Zhou" style="width: 115%">
  `);
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
    imgPilote.innerHTML = "";
  }
  console.log(tabGlobalDataPilotes);
  var cardPilote = document.querySelector("#cardPilote");
  cardPilote.style.backgroundImage = `url("data/pilotes/${namePilote}Background.jpg")`;
  cardPilote.style.backgroundSize = "cover";
  nomPilote.innerHTML = `${namePilote}`;
  document.querySelector("#nationalité").innerHTML =
    "HamiltonInfos.Nationalité";
  document.querySelector("#team").innerHTML = "Mercedes";
  document.querySelector("#nbVictoires").innerHTML = "103";
  document.querySelector("#nbGpDisputes").innerHTML = "310";
  document.querySelector("#nbPodiums").innerHTML = "191";
}
