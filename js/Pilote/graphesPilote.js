//import des données des pilotes
import { tabGlobalDataPilotes } from "./scriptPilote.js";

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
function creationBoutonChoixSaison() {
  //Si la div n'existe pas => creéation div + création bouton
  const divBoutonexiste = document.querySelector("#divBoutonChoix");
  if (divBoutonexiste == null) {
    const divParent = document.querySelector("#divAnalysePointsPilotes");
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
  //sinon on ne crée rien
}

//-----------------------------------Graphique 1---------------------------
async function grapheDriverPoint(annee) {
  //Création container
  const divParent = document.querySelector(".divGraphique");
  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divAnalysePointsPilotes";
  divParent.appendChild(divAnalyse);
  divAnalyse.innerHTML = "";

  //Création Titre
  const Titre = document.createElement("h1");
  divAnalyse.appendChild(Titre);
  Titre.innerHTML = "Graphique Points Pilotes ";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "GraphiquePtPilotes";
  divGraphique.className = "Graphique";
  divAnalyse.appendChild(divGraphique);

  //création loader
  const chargement = document.createElement("img");
  chargement.src = "../data/white_loader.svg";
  divAnalyse.appendChild(chargement);

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

  const graphique = document.getElementById("GraphiquePtPilotes");

  const styleText = { color: "#FFFFFF", fontWeight: "bold" };

  var screenWidth = window.innerWidth;
  var legendFontSize = "16px";

  if (screenWidth <= 600) {
    legendFontSize = "12px"; //Taille de la police pour les écrans de 600px ou moins
  } else if (screenWidth <= 1024) {
    legendFontSize = "14px"; //Taille de la police pour les écrans de 1024px ou moins
  }

  //Création du graphique
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
}

//fonction permettant de créer le graphique puis les boutons
async function creationGraphePointPilote(annee) {
  //on attend que le graphe soit crée pour créer les boutons
  await grapheDriverPoint(annee);
  creationBoutonChoixSaison();

  //Event sur les boutons
  document.querySelector("#bouton2021").addEventListener("click", function () {
    creationGraphePointPilote(2021);
  });

  document.querySelector("#bouton2022").addEventListener("click", function () {
    creationGraphePointPilote(2022);
  });
}

//-----------------------------------Graphique 2---------------------------
function graphePointsMoyenDriver() {
  //Création container
  const divParent = document.querySelector(".divGraphique");
  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divAnalysePointsMoyenPilotes";
  divParent.appendChild(divAnalyse);
  divAnalyse.innerHTML = "";

  //Création Titre
  const Titre = document.createElement("h1");
  divAnalyse.appendChild(Titre);
  Titre.innerHTML = "Graphique Points Moyens pilotes par GP ";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "GraphiquePtMoyen";
  divGraphique.className = "Graphique";
  divAnalyse.appendChild(divGraphique);

  const tabNomPilote = [];
  for (let i = 0; i < tabGlobalDataPilotes.length; i++) {
    tabNomPilote[i] = tabGlobalDataPilotes[i].Name;
  }

  const series = [];
  for (let i = 0; i < tabGlobalDataPilotes.length; i++) {
    series.push({
      name: [tabGlobalDataPilotes[i].Name],
      data: [tabGlobalDataPilotes[i]["Nb points moyen/GP"]],
      color: tabGlobalDataPilotes[i].Color,
    });
  }

  const graphique = document.getElementById("GraphiquePtMoyen");

  Highcharts.chart(graphique, {
    chart: {
      polar: true,
      type: "line",
      backgroundColor: "#1b1b1b",
    },
    title: {
      text: "Points moyens des pilotes de F1 marqués par GP",
      style: {
        color: "#FF2A2A",
        textShadow: "5px 5px 2px rgba(100,98,98,0.4)",
        fontWeight: "bold",
        fontSize: "30px",
      },
    },

    pane: {
      size: "100%",
    },

    xAxis: {
      categories: tabNomPilote,
      tickmarkPlacement: "on",
      lineWidth: 0,
      labels: {
        style: {
          color: "#FFFFFF",
          textShadow: "5px 5px 2px rgba(100,98,98,0.4)",
          fontWeight: "bold",
        },
      },
    },

    yAxis: {
      gridLineInterpolation: "polygon",
    },

    series: [
      {
        name: "Points moyens par GP",
        type: "area",
        data: tabGlobalDataPilotes.map(function (pilote) {
          return pilote["Nb points moyen/GP"];
        }),
        pointPlacement: "on",
      },
    ],
  });
}

//------------------------------- Export des données -----------------------------
export { creationGraphePointPilote, graphePointsMoyenDriver };
