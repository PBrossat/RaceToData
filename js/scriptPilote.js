function afficherStatsPilotes() {
  const StatsPilotes = document.querySelector("#stats");

  const sectionStatsPilotes = document.createElement("section");
  sectionStatsPilotes.innerHTML +=
    "<h2>Analyse des données relatives aux Pilotes</h2>";

  const divMapEtInfos = document.createElement("div");
  divMapEtInfos.id = "divMapEtInfos";

  const divMapPilote = document.createElement("div");
  divMapPilote.id = "divMapPilote";
  divMapPilote.title = "Nationalité des Pilotes de F1";

  const divStatsPilotes1 = document.createElement("div");
  divStatsPilotes1.id = "divId1";

  const divStatsPilotes2 = document.createElement("div");
  divStatsPilotes2.id = "divId2";

  const graphique1 = document.createElement("canvas");
  graphique1.id = "CanvaIdGauche";

  const graphique2 = document.createElement("canvas");
  graphique2.id = "CanvaIdDroite";

  StatsPilotes.appendChild(sectionStatsPilotes);
  sectionStatsPilotes.appendChild(divMapEtInfos);
  divMapEtInfos.appendChild(divMapPilote);
  sectionStatsPilotes.appendChild(divStatsPilotes1);
  // divStatsPilotes1.appendChild(graphique1);
  divStatsPilotes1.appendChild(graphique2);
}

const boutonDecouvrirStatsPilotes = document.querySelector(
  ".btn-decouvrir-stats-pilotes"
);
boutonDecouvrirStatsPilotes.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherStatsPilotes();
  mapPilote();
  // grapheDriverPointMoyenParGPRadar();
  grapheDriverPointMoyenParGPBaton();
});

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

function mapPilote() {
  //centree sur Paris
  const centreMap = {
    lat: 48.866667,
    lng: 2.333333,
  };

  const zoomInitial = 1.5;
  const mapPilote = L.map("divMapPilote").setView(
    [centreMap.lat, centreMap.lng],
    zoomInitial
  );

  const layerPrincipale = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 15,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  );

  layerPrincipale.addTo(mapPilote);

  //Placement des markers représentant les pilotes sur la map

  const Hamilton = L.marker([51.907266, -0.196862]).addTo(mapPilote);
  Hamilton.bindPopup(`
  <h1>Lewis Hamilton</h1>
  <img src="data/Hamilton.jpeg" alt="Lewis Hamilton" style="width: 115%">
  `);

  const Verstappen = L.marker([52.3781, 4.9011]).addTo(mapPilote); // Netherlands
  Verstappen.bindPopup(`
    <h1>Max Verstappen</h1>
    <img src="data/Verstappen.jpeg" alt="Max Verstappen" style="width: 115%">
  `);

  const Perez = L.marker([19.4326, -99.1332]).addTo(mapPilote); // Mexico
  Perez.bindPopup(`
    <h1>Sergio Perez</h1>
    <img src="data/Perez.jpeg" alt="Sergio Perez" style="width: 115%">
  `);

  const Russell = L.marker([52.6369, -1.1398]).addTo(mapPilote); // United Kingdom
  Russell.bindPopup(`
    <h1>George Russell</h1>
    <img src="data/Russell.jpeg" alt="George Russell" style="width: 115%">
  `);

  const Leclerc = L.marker([43.7313, 7.4265]).addTo(mapPilote); // Monaco
  Leclerc.bindPopup(`
    <h1>Charles Leclerc</h1>
    <img src="data/Leclerc.jpeg" alt="Charles Leclerc" style="width: 115%">
  `);

  const Sainz = L.marker([43.3667, -5.85]).addTo(mapPilote); // Spain
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

  const Albon = L.marker([13.7563, 100.5018]).addTo(mapPilote); // United Kingdom
  Albon.bindPopup(`
  <h1>Alexander Albon</h1>
  <img src="data/Albon.jpeg" alt="Alexander Albon" style="width: 115%">
  `);

  const Magnussen = L.marker([55.6761, 12.5683]).addTo(mapPilote); // Denmark
  Magnussen.bindPopup(`
  <h1>Kevin Magnussen</h1>
  <img src="data/Magnussen.jpeg" alt="Kevin Magnussen" style="width: 115%">
  `);

  const Alonso = L.marker([43.3629, -8.4139]).addTo(mapPilote); // Spain
  Alonso.bindPopup(`
  <h1>Fernando Alonso</h1>
  <img src="data/Alonso.jpeg" alt="Fernando Alonso" style="width: 115%">
  `);

  const Schumacher = L.marker([50.1147, 8.6843]).addTo(mapPilote); // Mick Schumacher's location in Germany
  Schumacher.bindPopup(`
  <h1>Mick Schumacher</h1>
  <img src="data/Schumacher.jpeg" alt="Mick Schumacher" style="width: 115%">
  `);

  const Tsunoda = L.marker([35.6586, 139.7454]).addTo(mapPilote); // Yuki Tsunoda's location in Japan
  Tsunoda.bindPopup(`
  <h1>Yuki Tsunoda</h1>
  <img src="data/Tsunoda.jpeg" alt="Yuki Tsunoda" style="width: 115%">
  `);

  const Vettel = L.marker([48.7758, 9.1829]).addTo(mapPilote); // Sebastian Vettel's location in Germany
  Vettel.bindPopup(`
  <h1>Sebastian Vettel</h1>
  <img src="data/Vettel.jpeg" alt="Sebastian Vettel" style="width: 115%">
  `);

  const Bottas = L.marker([60.9518, 25.6667]).addTo(mapPilote); // Valtteri Bottas's location in Nastola, Finland
  Bottas.bindPopup(`
  <h1>Valtteri Bottas</h1>
  <img src="data/Bottas.jpeg" alt="Valtteri Bottas" style="width: 115%">
  `);

  const Stroll = L.marker([45.5, -73.5833]).addTo(mapPilote);
  Stroll.bindPopup(`
  <h1>Lance Stroll</h1>
  <img src="data/Stroll.jpeg" alt="Lance Stroll" style="width: 115%">
`);

  const Zhou = L.marker([31.2165, 121.4365]).addTo(mapPilote);
  Zhou.bindPopup(`
  <h1>Guanyu Zhou</h1>
  <img src="data/Zhou.jpeg" alt="Guanyu Zhou" style="width: 115%">
`);
}
