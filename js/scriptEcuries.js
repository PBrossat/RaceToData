const api = "http://ergast.com/api/f1/";

// Utility functions
const json = (res) => res.json();
const error = (err) => console.log("Request failed: ", err);

function afficherStatsEcuries() {
  const divStatsEcuries = document.querySelector("#stats");
  const sectionStatsEcuries = document.createElement("section");
  sectionStatsEcuries.innerHTML +=
    "<h2>Analyse des données relatives aux Ecuries</h2>";
  const figureStatsEcuries = document.createElement("figure");
  figureStatsEcuries.innerHTML = "";

  divStatsEcuries.appendChild(sectionStatsEcuries);
  sectionStatsEcuries.appendChild(figureStatsEcuries);
}

const boutonDecouvrirStatsEcuries = document.querySelector(
  ".btn-decouvrir-stats-ecuries"
);
boutonDecouvrirStatsEcuries.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherStatsEcuries();
});

let url = api;
fetch(url + ".json")
  .then((response) => response.json())
  .then((json) => console.log(json));

// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => response.json())
//   .then((json) => console.log(json));
