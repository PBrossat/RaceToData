function afficherStatsEcuries () 
{
    const divStatsEcuries = document.querySelector("#stats");
    const sectionStatsEcuries = document.createElement("section");
    sectionStatsEcuries.innerHTML += "<h2>Analyse des données relatives aux Ecuries</h2>";
    const figureStatsEcuries = document.createElement("figure");
    figureStatsEcuries.innerHTML = "<img src='data/graphe.png'>";

    divStatsEcuries.appendChild(sectionStatsEcuries);
    sectionStatsEcuries.appendChild(figureStatsEcuries);

}


const boutonDecouvrirStatsEcuries = document.querySelector(".btn-decouvrir-stats-ecuries");
boutonDecouvrirStatsEcuries.addEventListener("click", function() {
    document.querySelector("#stats").innerHTML = "";
    afficherStatsEcuries();
});

