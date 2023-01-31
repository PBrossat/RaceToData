// const api = "http://ergast.com/api/f1/";

function afficherStatsEcuries() {
  const StatsEcuries = document.querySelector("#stats");
  const sectionStatsEcuries = document.createElement("section");
  sectionStatsEcuries.innerHTML +=
    "<h2>Analyse des données relatives aux Ecuries</h2>";
  const divStatsEcuries = document.createElement("div");
  divStatsEcuries.id = "divId";
  divStatsEcuries.innerHTML = `
    <select class="choixGraphique">
        <option value="">Type de graphique</option>
        <option value="radar">Radar</option>
    </select>
  `;
  const graphique = document.createElement("canvas");
  graphique.id = "CanvaId";

  StatsEcuries.appendChild(sectionStatsEcuries);
  sectionStatsEcuries.appendChild(divStatsEcuries);
  divStatsEcuries.appendChild(graphique);
}

const boutonDecouvrirStatsEcuries = document.querySelector(
  ".btn-decouvrir-stats-ecuries"
);
boutonDecouvrirStatsEcuries.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherStatsEcuries();
});

//let url = api;
fetch("json/Ecuries.json")
  .then((response) => response.json())
  .then((json) => console.log(json));

let globalTabData;
fetch("json/Ecuries.json")
  .then((response) => response.json())
  .then((json) => {
    const ecurieData = json;
    const tabData = ecurieData.map((ecurie) => {
      return {
        Nom: ecurie["Name"],
        Voiture: ecurie["car"],
        Titres: ecurie["titles"],
        Description: ecurie["description"],
      };
    });
    globalTabData = tabData;
    return tabData;
  });

// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => response.json())
//   .then((json) => console.log(json));

function getEcuries() {
  const nomEcurie = [];
  for (var i = 0; i < globalTabData.length; i++) {
    nomEcurie.push(globalTabData[i].Nom);
  }
  return nomEcurie;
}

function getNbTitresEcuries() {
  const nomEcurie = [];
  for (var i = 0; i < globalTabData.length; i++) {
    nomEcurie.push(globalTabData[i].titles);
  }
  return nomEcurie;
}

function grapheEcurieNbTitre() {
  const nomEcurie = getEcuries();
  const nbTitresEcuries = getNbTitresEcuries();

  const configuration = {
    type: "radar",
    data: {
      labels: nomEcurie,

      datasets: [
        {
          label: "Nombre de titres par écurie",
          data: nbTitresEcuries,
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
