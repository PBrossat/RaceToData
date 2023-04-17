//import des données des écuries
import { tabGlobalDataEcuries } from "./scriptEcuries.js";

//--------------------------------GRAPHES_Highcharts---------------------------------------------

//------------------------------G1---------------------------------------

async function graphePie(données, type) {
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
      height: "40%",
      zoomType: "xy",
      panning: true,
      panKey: "shift",
    },
    title: {
      text: "Nombre de titres " + type + " par écuries",
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
        data: données,
      },
    ],
  });
}

//---------------------------------G2-----------------------------------

async function grapheMultipleBars(données, annee) {
  const colors = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    colors.push(tabGlobalDataEcuries[i].color);
  }

  const graphique = document.getElementById("GraphiqueVictoires");

  Highcharts.chart(graphique, {
    chart: {
      type: "column",
      backgroundColor: "#1b1b1b",
      height: "35%",
    },
    title: {
      text: "Statistiques des écuries de F1 depuis " + annee,

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
    series: données,
    colors: colors,
  });
}

//--------------------------------------G3------------------------------------------------------------

async function grapheRace(données, year) {
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
  var legendFontSize;

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

  // Le nombre de pays à inclure est défini par la variable "nbr" et 0 pour commencer à la premiere valeur.
  // "Object.entries" renvoie un tableau contenant des paires clé-valeur de l'objet "dataset".
  // "sort" trie ce tableau en fonction de la valeur de données et renvoie le tableau trié.
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
    dataset = await fetch(`json/Ecuries/` + données + `.json`).then(
      (response) => response.json()
    );

    chart = Highcharts.chart(graphique, {
      chart: {
        animation: {
          duration: 500,
        },
        height: "40%",
        marginRight: 50,
        backgroundColor: "#1b1b1b",
      },
      title: {
        text: "Evolution des " + données + " des écuries de F1 depuis 1958",
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
export { graphePie, grapheMultipleBars, grapheRace };
