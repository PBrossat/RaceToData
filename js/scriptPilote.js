function afficherStatsPilotes() {
  const StatsPilotes = document.querySelector("#stats");
  const sectionStatsPilotes = document.createElement("section");
  sectionStatsPilotes.innerHTML +=
    "<h2>Analyse des données relatives aux Pilotes</h2>";
  const divStatsPilotes = document.createElement("div");
  divStatsPilotes.id = "divId";
  divStatsPilotes.innerHTML = `
    <select class="choixGraphique">
        <option value="">Type de graphique</option>
        <option value="radar">Radar</option>
        <option value="baton">Bâton</option>
    </select>
  `;
  const graphique = document.createElement("canvas");
  graphique.id = "CanvaId";

  StatsPilotes.appendChild(sectionStatsPilotes);
  sectionStatsPilotes.appendChild(divStatsPilotes);
  divStatsPilotes.appendChild(graphique);
}

const boutonDecouvrirStatsPilotes = document.querySelector(
  ".btn-decouvrir-stats-pilotes"
);
boutonDecouvrirStatsPilotes.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherStatsPilotes();

  // const selectGraphique = document.querySelector(".choixGraphique");
  // selectGraphique.addEventListener("click", function() {
  //     if (selectGraphique=="radar")
  //     {
  //         grapheDriverPointMoyenParGPRadar();
  //     }
  //     else if (selectGraphique=="baton")
  //     {
  //         grapheDriverPointMoyenParGPBaton();
  //     }
  //     else
  //     {
  //         alert("Veuillez selectionner un type de graphique")
  //     }

  // })
  grapheDriverPointMoyenParGPRadar();
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

// fonction permettant d'afficher un graphe
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
  };

  const graphique = document.getElementById("CanvaId");
  const chart = new Chart(graphique, configuration);
}

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
  };
  const graphique = document.getElementById("CanvaId");
  const chart = new Chart(graphique, configuration);
}
