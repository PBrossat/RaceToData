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
    "/pointsPiloteSaison/" + annee + "/" + nomPiloteMinuscule + ""
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
  const response = await fetch("/GPAnnee/" + annee + "");
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
  const response = await fetch("/pilotesSaison/" + annee + "");
  const data = await response.json();

  const pilotes = data.MRData.DriverTable.Drivers.map(
    (driver) => driver.familyName
  );

  return pilotes;
}

//-----------------------------------Graphique 1---------------------------
async function grapheDriverPoint(annee) {
  //Créations containers
  const divParent = document.querySelector(".divGraphique");

  const grapheEtExplication = document.createElement("div");
  grapheEtExplication.id = "grapheEtExplicationEvolutionPoints";
  grapheEtExplication.className = "grapheEtExplicationPilotes";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "GraphiquePtPilotes";
  divGraphique.className = "Graphique";
  grapheEtExplication.appendChild(divGraphique);

  //creation div où se trouve l'explication
  const divExplication = document.createElement("div");
  divExplication.id = "divExplicationPointsPilote2022";
  divExplication.className = "divExplicationPilotes";
  grapheEtExplication.appendChild(divExplication);

  divParent.appendChild(grapheEtExplication);

  //création loader
  //tant que le graphe n'est pas créé, on affiche le loader
  const chargement1 = document.createElement("img");
  chargement1.src = "../data/white_loader.svg";
  const chargement2 = document.createElement("img");
  chargement2.src = "../data/white_loader.svg";
  divGraphique.appendChild(chargement1);
  divExplication.appendChild(chargement2);

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

  //suppression de l'image chargement si elle existe déjà
  if (
    document.querySelector("#grapheEtExplicationEvolutionPoints img") != null
  ) {
    document.querySelector("#grapheEtExplicationEvolutionPoints img").remove();
  }

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
      height: "60%",
      marginBottom: 110,
      zoomType: "xy",
      panning: true,
      panKey: "shift",
    },

    //s'adapte à la taille de l'ecran lorsqu'on redimensionne avec la souris (addEventlistener resize)

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

  //Texte explicatif/analyse du graphique
  divExplication.innerHTML =
    "<p>Ce graphique représente l'évolution des points des pilotes de F1 durant la saison 2022. Un pilote gagne des points en fonction de sa position finale durant le grand prix.</p>" +
    "<p>Les points sont attribués de cette <span style='color:red;text-shadow:none;'>manière</span> :<br><br><img src='data/pointsGrandPrix.jpeg' alt='Image' class='image-hover'></p><br>" +
    "<p>On peut aussi gagner un point bonus si l'on fait le <span style='color:red;text-shadow:none;'>meilleur temps</span> en course et que l'on se trouve dans les 10 premiers à l'arrivée,</p>" +
    "<p>pour un maximum de <span class='highlighted'>26 points</span>. (25+1)</p><br>" +
    "<p>Dans ce graphique on peut voir clairement qu'à partir du GP d'Espagne,<span style='color:blue;text-shadow:none;'> Verstappen </span> a prit le dessus sur <span style='color:red;text-shadow:none;'>Leclerc</span><br> et n'a jamais rendu sa premiere place.</p>" +
    "<p>Cependant, <span style='color:blue;text-shadow:none;'> Verstappen </span> a effectué un mauvais début de saison car il n'a marqué son premier point de la saison qu'au GP de Jeddah.</p>" +
    "<p>Cela prouve qu'un mauvais début de saison n'est pas forcément fatal pour le championnat du monde. D'ailleurs, <span style='color:blue;text-shadow:none;'> Verstappen </span> a été primé champion du monde au GP du Japon soit 5 courses avant la fin de la saison.</p>" +
    "<p>On peut aussi voir que <span style='color:red;text-shadow:none;'>Leclerc</span> a fait quelques erreurs de pilotages durant toute la saison (comme au GP de France où il s'est crashé).<br> C'est en partie à cause de ces fautes qu'il n'est pas Champion du Monde aujourd'hui.</p>";
}

//-----------------------------------Graphique 2---------------------------
function graphePointsMoyenDriver() {
  //Créations containers
  const divParent = document.querySelector(".divGraphique");

  const grapheEtExplication = document.createElement("div");
  grapheEtExplication.id = "grapheEtExplication";
  grapheEtExplication.className = "grapheEtExplicationPilotes";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "GraphiquePtMoyen";
  divGraphique.className = "Graphique";
  grapheEtExplication.appendChild(divGraphique);

  const divExplication = document.createElement("div");
  divExplication.id = "divExplicationPointsMoyenPilotes";
  divExplication.className = "divExplicationPilotes";
  grapheEtExplication.appendChild(divExplication);

  divParent.appendChild(grapheEtExplication);

  //Texte explicatif/analyse du graphique

  divExplication.innerHTML =
    "<p>Ce graphique représente le nombre de points moyens que gagne chaque pilote lors d'un Grand Prix.</p>" +
    "<p>On peut constater que les trois seuls pilotes qui ont une moyenne de points supérieure à 10 pts/Grand Prix sont tous des champions du monde de Formule 1 :</p>" +
    "<p><span style='color: #0600EF;text-shadow:none;'>Max Verstappen</span>, <span style='color: #00D2BE;text-shadow:none;'>Lewis Hamilton</span> et <span style='color: #006F62;text-shadow:none;'>Sebastian Vettel</span>.</p>" +
    "<p>Ceci montre bien que pour remporter le championnat du monde de Formule 1, il est nécessaire de marquer des points de manière régulière tout au long de sa carrière.</p><br>" +
    "<p>En revanche, on peut également voir que la moyenne de points gagnés par les autres pilotes varie considérablement.</p>" +
    "<p>Certains pilotes ont des performances très irrégulières, avec des courses où ils ne marquent aucun point, tandis que d'autres ont une moyenne plus régulière, mais inférieure à 10 points par course.</p><br>" +
    "<p>Cette analyse met en évidence l'importance de la régularité dans les performances en Formule 1.<br> Bien que remporter une ou deux courses peut être gratifiant, cela ne suffit pas pour remporter le championnat du monde de Formule 1.<br>" +
    "<p>Il est important de marquer des points de manière régulière tout au long de la saison, en évitant les erreurs et en maximisant les performances lors de chaque course.</p>";

  const tabNomPilote = [];
  for (let i = 0; i < tabGlobalDataPilotes.length; i++) {
    tabNomPilote[i] = tabGlobalDataPilotes[i].Name;
  }

  const graphique = document.getElementById("GraphiquePtMoyen");

  Highcharts.chart(graphique, {
    chart: {
      polar: true,
      type: "line",
      backgroundColor: "#1b1b1b",
      height: "50%",
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
      size: "90%",
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
        color: "none", //couleur de l'area (sous la courbe)
        marker: {
          fillColor: "red", //couleur des points
        },
        data: tabGlobalDataPilotes.map(
          (pilote) => pilote["Nb points moyen/GP"]
        ),
        lineWidth: 3,
        lineColor: "#FFFFFF",
        pointPlacement: "on", // permet de centrer les points
      },
    ],

    legend: {
      itemStyle: {
        color: "white",
        fontWeight: "bold",
      },
    },
  });
}

//------------------------------- Export des données -----------------------------
export { grapheDriverPoint, graphePointsMoyenDriver };
