//import des données des écuries
import { tabGlobalDataEcuries } from "./scriptEcuries.js";

//--------------------------------GRAPHES_Highcharts---------------------------------------------

async function recuperationPointsEcuriesPendantLaSaison(nomEcuries) {
  let nomEcuriesMinuscule = nomEcuries.toLowerCase();
  // Cas particuliers
  if (nomEcuriesMinuscule === "redbull") {
    nomEcuriesMinuscule = "red_bull";
  }
  if (nomEcuriesMinuscule === "aston martin") {
    nomEcuriesMinuscule = "aston_martin";
  }
  if (nomEcuriesMinuscule === "alfa romeo") {
    nomEcuriesMinuscule = "alfa";
  }

  const pointsEcuries = [];

  const response = await fetch(
    `https://ergast.com/api/f1/2022/Constructors/${nomEcuriesMinuscule}/results.json?limit=100`
  );
  const data = await response.json();

  let cpt = 0;

  data.MRData.RaceTable.Races.forEach((race) => {
    race.Results.forEach((result) => {
      const constructorId = result.Constructor.constructorId;
      const points = parseInt(result.points);
      const round = race.round;
      // console.log("pts vide: ", pointsEcuries[constructorId]);

      if (!pointsEcuries[constructorId]) {
        pointsEcuries[constructorId] = [];
      }

      if (!pointsEcuries[constructorId][round]) {
        pointsEcuries[constructorId][round] = cpt;
      }

      pointsEcuries[constructorId][round] += points;
      cpt = pointsEcuries[constructorId][round];

      // console.log("test");
      // console.log("round: ", round);
      // console.log("points: ", points);
      // console.log("team: ", constructorId);
      // console.log("pts team: ", pointsEcuries[constructorId][round]);
      // ça marche mais impossible de l'afficher
    });
  });
  // console.log(pointsEcuries);

  return pointsEcuries;
}

//Permet de récuperer les noms des Gp
async function recuperationGPsaison() {
  const url = `https://ergast.com/api/f1/2022/races.json`;
  const response = await fetch(url);
  const data = await response.json();

  const grandPrix = data.MRData.RaceTable.Races.map((race) => race.raceName);

  //remplace "Grand Prix" par "GP"
  for (let i = 0; i < grandPrix.length; i++) {
    grandPrix[i] = grandPrix[i].replace("Grand Prix", "GP");
  }
  return grandPrix;
}

//------------------------------G1--------------------------------------

//Création d'un graphe
async function grapheEcuriesPoint() {
  //Création container
  const divParent = document.querySelector(".divGraphique");
  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divAnalysePointsPilotes";
  divParent.appendChild(divAnalyse);
  divAnalyse.innerHTML = "";

  //Création Titre
  const Titre = document.createElement("h1");
  divAnalyse.appendChild(Titre);
  Titre.innerHTML = "Graphique Points Moyens écuries par GP ";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "GraphiquePtMoyen";
  divGraphique.className = "Graphique";
  divAnalyse.appendChild(divGraphique);

  //création loader
  const chargement = document.createElement("img");
  chargement.src = "../data/white_loader.svg";
  divParent.appendChild(chargement);

  // permet de creer un tableau de tableau de points selon le nom des pilote et l'année passée en paramatre
  const tabDataPointsEcuries = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    tabDataPointsEcuries[i] = await recuperationPointsEcuriesPendantLaSaison(
      tabGlobalDataEcuries[i].nom
    );
  }

  //Suppression du loader
  chargement.parentNode.removeChild(chargement);

  //Tableau avec le noms des GP de l'année
  const pays = await recuperationGPsaison();

  //permet de créer chaque lignes RPZ points/pilote
  let serie = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    serie.push({
      name: tabGlobalDataEcuries[i].nom,
      data: tabDataPointsEcuries[i],
      color: tabGlobalDataEcuries[i].color,
      animation: {
        duration: 8000, //en ms
      },
    });
    console.log(serie);
  }
  // series: [
  //   {
  //     name: "Tokyo",
  //     data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, 22.8, 17.5, 12.1, 7.6],
  //   },
  //   {
  //     name: "Bergen",
  //     data: [1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6],
  //   },
  // ];

  const graphique = document.getElementById("GraphiquePtMoyen");

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
      text: "Evolution des points des pilotes de F1 durant la saison 2022",

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
    series: serie,
  });
}
// tous marche mais ça s'affiche pas j'vais péter mon crâne

//------------------------------G2---------------------------------------

async function graphePie() {
  //Création container
  const divParent = document.querySelector(".divGraphique");
  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divAnalysePointsPilotes";
  divParent.appendChild(divAnalyse);
  divAnalyse.innerHTML = "";

  //Création Titre
  const Titre = document.createElement("h1");
  divAnalyse.appendChild(Titre);
  Titre.innerHTML = "Graphique Titres Ecuries ";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "GraphiquePtEcuries";
  divGraphique.className = "Graphique";
  divAnalyse.appendChild(divGraphique);

  const colors = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    colors.push(tabGlobalDataEcuries[i].color);
  }

  const graphique = document.getElementById("GraphiquePtEcuries");

  Highcharts.chart(graphique, {
    chart: {
      type: "pie",
      backgroundColor: "#1b1b1b",
      marginBottom: 110,
      height: "55%",
      zoomType: "xy",
      panning: true,
      panKey: "shift",
    },
    title: {
      text: "Nombre de titres constructeurs par écuries",
      style: {
        color: "#FF2A2A",
        textShadow: "5px 5px 2px rgba(100,98,98,0.4)",
        fontWeight: "bold",
        fontSize: "30px",
      },
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
      },
    },
    colors: colors,
    series: [
      {
        name: "Titres écuries",
        data: [
          ["Ferrari", 16],
          ["RedBull", 5],
          ["Mercedes", 8],
          ["Alpine", 2],
          ["McLaren", 8],
          ["Alfa Romeo", 0],
          ["Aston Martin", 0],
          ["Haas", 0],
          ["AlphaTauri", 0],
          ["Williams", 9],
        ],
      },
    ],
  });
}

//---------------------------------G3-----------------------------------

async function grapheTest() {
  //Création container
  const divParent = document.querySelector(".divGraphique");
  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divAnalysePointsPilotes";
  divParent.appendChild(divAnalyse);
  divAnalyse.innerHTML = "";

  //Création Titre
  const Titre = document.createElement("h1");
  divAnalyse.appendChild(Titre);
  Titre.innerHTML = "Graphique Statistiques écuries";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "GraphiqueVictoires";
  divGraphique.className = "Graphique";
  divAnalyse.appendChild(divGraphique);

  const colors = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    colors.push(tabGlobalDataEcuries[i].color);
  }

  const series = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    series.push({
      name: tabGlobalDataEcuries[i].nom,
      data: [
        tabGlobalDataEcuries[i].wins_all,
        tabGlobalDataEcuries[i].pole_all,
        tabGlobalDataEcuries[i].podiums_all,
      ],
    });
  }

  const divTest = document.getElementById("GraphiqueVictoires");

  Highcharts.chart(divTest, {
    chart: {
      type: "column",
      backgroundColor: "#1b1b1b",
    },
    title: {
      text: "Statistiques des écuries de F1 depuis 1950",

      style: {
        color: "#FF2A2A",
        textShadow: "5px 5px 2px rgba(100,98,98,0.4)",
        fontWeight: "bold",
        fontSize: "30px",
      },
    },
    xAxis: {
      categories: ["Victoires All Time", "Poles All Time", "Podiums All Time"],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color:
            // theme
            (Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "white",
          textOutline: "none",
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} </b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "darkgrey",
      borderColor: "#CCC",
      borderWidth: 1,
      shadow: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: series,
    colors: colors,
  });
}

//-----------------------------------JSON-----------------------------------------------------

async function tabPointsEcuriesAllTime(startYear, endYear) {
  const newJson = {};

  // Parcourir chaque année de startYear à endYear
  for (let year = startYear; year <= endYear; year++) {
    // Obtenir les données JSON pour l'année en cours
    const response = await fetch(
      `https://ergast.com/api/f1/${year}/constructorStandings.json`
    );
    const data = await response.json();

    let cpt = 0;

    // Ajouter une nouvelle entrée au nouveau JSON pour chaque écurie pour chaque année
    data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.forEach(
      (cs) => {
        const constructorId = cs.Constructor.constructorId;
        const points = parseInt(cs.points);

        if (!newJson[constructorId]) {
          newJson[constructorId] = {};
        }

        // Si c'est la première année, initialiser le total des points de l'écurie
        if (!newJson[constructorId].totalPoints) {
          newJson[constructorId].totalPoints = 0;
        }

        // Ajouter les points de l'écurie pour l'année en cours
        if (!newJson[constructorId][year]) {
          newJson[constructorId][year] = 0;
        }
        // Ajouter les points de l'écurie pour toutes les années précédentes
        newJson[constructorId].totalPoints += points;
        cpt = newJson[constructorId].totalPoints;

        newJson[constructorId][year] += cpt;
      }
    );
  }

  return newJson;
}

//--------------------------------------G4------------------------------------------------------------
async function grapheCourse() {
  //Création container
  const divParent = document.querySelector(".divGraphique");
  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divAnalysePointsPilotes";
  divParent.appendChild(divAnalyse);
  divAnalyse.innerHTML = "";

  //Création Titre
  const Titre = document.createElement("h1");
  divAnalyse.appendChild(Titre);
  Titre.innerHTML = "Graphique points all time écuries";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "GraphiqueWinsAllTime";
  divGraphique.className = "Graphique";
  divAnalyse.appendChild(divGraphique);

  //Creation Bouton
  const divPlay = document.createElement("div");
  divPlay.id = "play-controls";
  divAnalyse.appendChild(divPlay);

  const Btn = document.createElement("button");
  Btn.id = "play-pause-button";
  Btn.className = "fa fa_play";
  Btn.title = "play";
  Btn.innerHTML = "PLAY";
  divPlay.appendChild(Btn);

  const year = document.createElement("input");
  year.id = "play-range";
  year.value = 1958;
  year.min = 1958;
  year.max = 2022;
  year.type = "range";
  divPlay.appendChild(year);

  const startYear = 1958,
    endYear = 2022,
    btn = document.getElementById("play-pause-button"),
    nbr = 10;

  let dataset, chart;

  const colors = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    colors.push(tabGlobalDataEcuries[i].color);
  }

  const graphique = document.getElementById("GraphiqueWinsAllTime");

  const styleText = { color: "#FFFFFF", fontWeight: "bold" };

  var screenWidth = window.innerWidth;
  var legendFontSize = "16px";

  if (screenWidth <= 600) {
    legendFontSize = "12px"; //Taille de la police pour les écrans de 600px ou moins
  } else if (screenWidth <= 1024) {
    legendFontSize = "14px"; //Taille de la police pour les écrans de 1024px ou moins
  }

  /*
   * Animate dataLabels functionality
   */
  (function (H) {
    const FLOAT = /^-?\d+\.?\d*$/;

    // Add animated textSetter, just like fill/strokeSetters
    H.Fx.prototype.textSetter = function () {
      let startValue = this.start.replace(/ /g, ""),
        endValue = this.end.replace(/ /g, ""),
        currentValue = this.end.replace(/ /g, "");

      if ((startValue || "").match(FLOAT)) {
        startValue = parseInt(startValue, 10);
        endValue = parseInt(endValue, 10);

        // No support for float
        currentValue = Highcharts.numberFormat(
          Math.round(startValue + (endValue - startValue) * this.pos),
          0
        );
      }

      this.elem.endText = this.end;

      this.elem.attr(this.prop, currentValue, null, true);
    };

    // Add textGetter, not supported at all at this moment:
    H.SVGElement.prototype.textGetter = function () {
      const ct = this.text.element.textContent || "";
      return this.endText ? this.endText : ct.substring(0, ct.length / 2);
    };

    // Temporary change label.attr() with label.animate():
    // In core it's simple change attr(...) => animate(...) for text prop
    H.wrap(H.Series.prototype, "drawDataLabels", function (proceed) {
      const attr = H.SVGElement.prototype.attr,
        chart = this.chart;

      if (chart.sequenceTimer) {
        this.points.forEach((point) =>
          (point.dataLabels || []).forEach(
            (label) =>
              (label.attr = function (hash) {
                if (hash && hash.text !== undefined) {
                  const text = hash.text;

                  delete hash.text;

                  return this.attr(hash).animate({ text });
                }
                return attr.apply(this, arguments);
              })
          )
        );
      }

      const ret = proceed.apply(this, Array.prototype.slice.call(arguments, 1));

      this.points.forEach((p) =>
        (p.dataLabels || []).forEach((d) => (d.attr = attr))
      );

      return ret;
    });
  })(Highcharts);

  // renvoie un tableau qui contient deux éléments :
  // Le premier élément est un tableau contenant le nom du pays ayant la plus grande valeur de données
  // pour l'année donnée et cette valeur.
  // Le deuxième élément est un tableau contenant des tableaux pour les n-1 pays ayant les valeurs
  // de données les plus élevées pour l'année donnée.
  // Le nombre de pays à inclure est défini par la variable "nbr".
  // La fonction utilise les méthodes "Object.entries", "map" et "sort" pour traiter l'objet "dataset".
  // "Object.entries" renvoie un tableau contenant des paires clé-valeur de l'objet "dataset".
  // "Map" permet de transformer chaque élément de ce tableau en un tableau contenant le nom du pays
  // et sa valeur de données pour l'année donnée.
  // Enfin, "sort" trie ce tableau en fonction de la valeur de données et renvoie le tableau trié.
  function getData(year) {
    const output = Object.entries(dataset)
      .map((team) => {
        const [teamName, teamData] = team;
        return [teamName, Number(teamData[year])];
      })
      .sort((a, b) => b[1] - a[1]);
    return [output[0], output.slice(0, nbr)];
  }

  function getSubtitle() {
    return `<span style="font-size: 80px">${year.value}</span>`;
  }

  (async () => {
    dataset = await fetch("json/Ecuries/PointsLast.json").then((response) =>
      response.json()
    );

    chart = Highcharts.chart(graphique, {
      chart: {
        animation: {
          duration: 500,
        },
        height: "35%",
        marginRight: 50,
        backgroundColor: "#1b1b1b",
      },
      title: {
        text: "Statistiques des écuries de F1 depuis 1958",
        style: {
          color: "#FF2A2A",
          textShadow: "5px 5px 2px rgba(100,98,98,0.4)",
          fontWeight: "bold",
          fontSize: "30px",
        },
      },
      subtitle: {
        useHTML: true,
        style: styleText,
        text: getSubtitle(),
        floating: true,
        align: "right",
        verticalAlign: "middle",
        y: 50,
        x: -100,
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        offset: 0,
        labels: {
          style: styleText,
          rotation: -25,
        },
        type: "category",
      },
      yAxis: {
        opposite: true,
        tickPixelInterval: 150,
        title: {
          text: null,
        },
      },
      plotOptions: {
        series: {
          animation: false,
          groupPadding: 0,
          pointPadding: 0.1,
          borderWidth: 0,
          colorByPoint: true,
          dataSorting: {
            enabled: true,
            matchByName: true,
          },
          type: "bar",
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          type: "bar",
          name: startYear,
          data: getData(startYear)[1],
        },
      ],
      colors: colors,
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 550,
            },
            chartOptions: {
              xAxis: {
                visible: false,
              },
              subtitle: {
                x: 0,
              },
              plotOptions: {
                series: {
                  dataLabels: [
                    {
                      enabled: true,
                      y: 8,
                    },
                    {
                      enabled: true,
                      format: "{point.name}",
                      y: -8,
                      style: {
                        fontWeight: "normal",
                        opacity: 0.7,
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    });
  })();

  /*
   * Pause the timeline, either when the range is ended, or when clicking the pause button.
   * Pausing stops the timer and resets the button to play mode.
   */
  function pause(button) {
    button.title = "play";
    button.className = "fa fa-play";
    clearTimeout(chart.sequenceTimer);
    chart.sequenceTimer = undefined;
  }

  /*
   * Update the chart. This happens either on updating (moving) the range input,
   * or from a timer when the timeline is playing.
   */
  function update(increment) {
    if (increment) {
      year.value = parseInt(year.value, 10) + increment;
    }
    if (year.value >= endYear) {
      // Auto-pause
      pause(btn);
    }

    chart.update(
      {
        subtitle: {
          text: getSubtitle(),
        },
      },
      false,
      false,
      false
    );

    chart.series[0].update({
      name: year.value,
      data: getData(year.value)[1],
    });
  }

  /*
   * Play the timeline.
   */
  function play(button) {
    button.title = "pause";
    button.className = "fa fa-pause";
    chart.sequenceTimer = setInterval(function () {
      update(1);
    }, 500);
  }

  btn.addEventListener("click", function () {
    if (chart.sequenceTimer) {
      pause(this);
    } else {
      play(this);
    }
  });
  /*
   * Trigger the update on the range bar click.
   */
  year.addEventListener("click", function () {
    update();
  });
}
//------------------------------- Export des données -----------------------------
export {
  grapheEcuriesPoint,
  graphePie,
  grapheTest,
  tabPointsEcuriesAllTime,
  grapheCourse,
};
