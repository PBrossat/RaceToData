function afficherStatsGrandsPrix() {
  const divStatsGrandsPrix = document.querySelector("#stats");
  const sectionStatsGrandsPrix = document.createElement("section");
  sectionStatsGrandsPrix.innerHTML +=
    "<h2>Analyse des données relatives aux Grands prix</h2>";
  const figureStatsGrandsPrix = document.createElement("figure");
  figureStatsGrandsPrix.innerHTML = "<img src='data/graphe.png'>";

  divStatsGrandsPrix.appendChild(sectionStatsGrandsPrix);
  sectionStatsGrandsPrix.appendChild(figureStatsGrandsPrix);
}

const boutonDecouvrirStatsGrandsPrix = document.querySelector(
  ".btn-decouvrir-stats-grands-prix"
);
boutonDecouvrirStatsGrandsPrix.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherStatsGrandsPrix();
});
