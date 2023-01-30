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

fetch("http://ergast.com/api/f1/constructors/mclaren/")
  .then((response) => response.json())
  .then((data) => console.nationality(data));
