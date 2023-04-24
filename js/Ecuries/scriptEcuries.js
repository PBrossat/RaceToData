//----------------------------- Import des fonctions ----------------------------
import { graphePie, grapheMultipleBars, grapheRace } from "./graphesEcuries.js";
import { mapEcuries } from "./mapEcuries.js";
// import { main } from "./creationJson.js";

//----------------------------Récuperation Infos Ecuries depuis fichier json-------------
async function recupererInfosEcuries() {
  let response = await fetch("../json/Ecuries/Ecuries.json");
  response = await response.json();
  return response;
}
let tabGlobalDataEcuries;
tabGlobalDataEcuries = await recupererInfosEcuries();

//-------------------- Action lorsqu'on clique sur le bouton Ecuries ---------------

const boutonDecouvrirStatsEcuries = document.querySelector(
  ".btn-decouvrir-stats-ecuries"
);
boutonDecouvrirStatsEcuries.addEventListener("click", async function () {
  document.querySelector("#stats").innerHTML = "";
  afficherStatsEcuries();
  recupererInfosEcuries();
  mapEcuries();
  creationIntro();
  creationDivPie();
  creationDivMultipleBars();
  creationDivRace();
});

//------------------------------ Création des containers ----------------

//création d'une div pour la map
function afficherStatsEcuries() {
  const StatsEcuries = document.querySelector("#stats");

  const divMapEtInfos = document.createElement("div");
  divMapEtInfos.id = "divMapEtInfos";

  StatsEcuries.appendChild(divMapEtInfos);
}

//création d'une div pour les graphiques
function creationIntro() {
  const StatsPilotes = document.querySelector("#stats");

  const nouvelleDiv = document.createElement("div");
  nouvelleDiv.className = "divGraphique";
  nouvelleDiv.id = "textIntro";
  const intro = document.createElement("div");
  intro.id = "intro";
  intro.innerHTML =
    "Les graphes sont un moyen visuel et efficace de représenter des données complexes, et dans le contexte de la F1, ils peuvent fournir des informations claires sur les performances des équipes tout au long de la saison.";
  intro.innerHTML += "<br> <br>";
  intro.innerHTML +=
    "Les titres pilotes et écuries sont des données clés dans la F1, car ils reflètent les performances globales d'une équipe. Nous avons utilisé ces données pour créer des graphes afin de montrer quelle équipe a remporté le championnat des constructeurs, ainsi que le championnat des pilotes. Les graphes permettent de visualiser facilement l'évolution des performances des équipes au fil de la saison, mettant en évidence les équipes qui ont dominé et celles qui ont eu du mal.";
  intro.innerHTML += "<br> <br>";
  intro.innerHTML +=
    "Les victoires, les poles, les podiums et les points sont également des statistiques importantes en F1, car elles montrent les performances des équipes lors des différentes courses tout au long de la saison. En créant des graphes avec ces données, vous pouvez facilement comparer les performances des équipes et identifier les tendances et les motifs. Par exemple, un graphe montrant le nombre de victoires d'une équipe peut révéler si elle a été dominante tout au long de la saison ou si elle a connu des hauts et des bas.";
  intro.innerHTML += "<br> <br>";
  intro.innerHTML +=
    "Les graphes sont également utiles pour mettre en évidence les écarts de performance entre les équipes. Par exemple, en comparant les graphes de différentes équipes, vous pouvez voir quelle équipe a obtenu le plus de poles, de podiums ou de points, ce qui peut révéler des informations sur la hiérarchie des équipes et les performances des pilotes.";

  nouvelleDiv.appendChild(intro);

  StatsPilotes.appendChild(nouvelleDiv);
}

//------------------- Création de la div pour le graphique de titres -------------------
function creationDivPie() {
  //Création container
  const divParent = document.querySelector(".divGraphique");

  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divPieEcurieEtExplication";
  divAnalyse.className = "divGraphiqueEcurie";
  divParent.appendChild(divAnalyse);

  const grapheEtExplication = document.createElement("div");
  grapheEtExplication.className = "grapheEtExplication";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "GraphiquePtEcuries";
  divGraphique.className = "Graphique";
  grapheEtExplication.appendChild(divGraphique);

  //creation div où se trouve l'explication
  const divExplication = document.createElement("div");
  divExplication.className = "divExplication";
  divExplication.innerHTML = "<h3>Explication : </h3>";
  divExplication.innerHTML += "<br>";
  divExplication.innerHTML +=
    "<p> La Formule 1 est une compétition de course automobile de haut niveau où les équipes construisent deux voitures de course chacunes pour concourir. </p>";
  divExplication.innerHTML += "<br>";
  divExplication.innerHTML +=
    "<p> Le <span style='color:red'>titre</span> de champion du monde des pilotes est attribué au <span style='color:red'>pilote</span> ayant remporté le <span style='color:red'>plus</span> grand nombre de <span style='color:red'>points</span> lors de la saison. </p>";
  divExplication.innerHTML += "<br>";
  divExplication.innerHTML +=
    "<p> Le <span style='color:red'>titre</span> de champion du monde des constructeurs est attribué à <span style='color:red'>l'écurie</span> ayant remporté le <span style='color:red'>plus</span> grand nombre de <span style='color:red'>points</span> lors de la saison. </p>";
  divExplication.innerHTML += "<br>";
  divExplication.innerHTML +=
    "<p> Ce graphique illustre le prestige et la <span style='color:red'>dominance</span> des équipes actuelles en fonction du nombre de <span style='color:red'>titres récoltés</span>.</p>";
  grapheEtExplication.appendChild(divExplication);

  divAnalyse.appendChild(grapheEtExplication);

  const divChoix = document.createElement("div");
  divChoix.className = "divChoix";
  divAnalyse.appendChild(divChoix);

  const boutonRadioTitreConstructeurs = document.createElement("input");
  boutonRadioTitreConstructeurs.id = "inputChoix";
  boutonRadioTitreConstructeurs.type = "radio";
  boutonRadioTitreConstructeurs.name = "option";
  boutonRadioTitreConstructeurs.checked = true;
  divChoix.appendChild(boutonRadioTitreConstructeurs);

  const labelTitreConstructeurs = document.createElement("label");
  labelTitreConstructeurs.id = "labelChoix";
  labelTitreConstructeurs.innerHTML =
    "Nombre de titres constructeurs par écuries";
  divChoix.appendChild(labelTitreConstructeurs);

  const titrePilotes = document.createElement("input");
  titrePilotes.id = "inputChoix";
  titrePilotes.type = "radio";
  titrePilotes.name = "option";
  divChoix.appendChild(titrePilotes);

  const labelTitrePilotes = document.createElement("label");
  labelTitrePilotes.id = "labelChoix";
  labelTitrePilotes.innerHTML = "Nombre de titres pilotes par écuries";
  divChoix.appendChild(labelTitrePilotes);

  const buttonMettreAJour = document.createElement("button");
  buttonMettreAJour.className = "buttonMettreAJour";
  buttonMettreAJour.innerHTML = "Mettre à jour";
  divChoix.appendChild(buttonMettreAJour);

  const divAnalyseExplication = document.createElement("div");
  divAnalyseExplication.className = "divAnalyseGraphiqueEcurie";
  divAnalyseExplication.innerHTML = "<h3>Analyse : </h3>";
  divAnalyseExplication.innerHTML += "<br>";
  divAnalyseExplication.innerHTML +=
    "<p> La première écurie à considérer est <span style='color: #DC0000;text-shadow:none;'>Ferrari</span>, qui a remporté 16 titres de championnat au cours de son histoire. Cette performance en fait l'une des écuries les plus dominantes de l'histoire de la Formule 1. <br><br> La deuxième écurie en termes de domination est <span style='color: #00D2BE;text-shadow:none;'>Mercedes</span>, avec un total de 8 titres de championnat. Bien que ce chiffre soit inférieur à celui de <span style='color: #DC0000;text-shadow:none;'>Ferrari</span>, il est important de noter que <span style='color: #00D2BE;text-shadow:none;'>Mercedes</span> a remporté tous ses titres de championnat dans les années 2010, ce qui en fait l'écurie la plus dominante de la dernière décennie. <br><br> <span style='color: #FF8700;text-shadow:none;'>McLaren</span> est également une écurie importante en termes de domination, avec un total de 8 titres de championnat. McLaren est connue pour sa longue histoire dans la Formule 1 et pour avoir remporté de nombreux titres avec des pilotes légendaires tels que Ayrton Senna et Alain Prost. <br><br> <span style='color: #0600EF;text-shadow:none;'>Red Bull</span> a remporté 5 titres de championnat, ce qui en fait une écurie relativement nouvelle dans la Formule 1. Cependant, <span style='color: #0600EF;text-shadow:none;'>Red Bull</span> a été très performante depuis son arrivée dans la compétition, avec une domination notable dans les années 2010 grâce au pilote Sebastian Vettel. <br><br> <span style='color: #005AFF;text-shadow:none;'>Williams</span> est une autre écurie importante en termes de domination, avec un total de 9 titres de championnat. Bien que <span style='color: #005AFF;text-shadow:none;'>Williams</span> n'ait pas remporté de titre depuis les années 1990, l'écurie a toujours été un acteur majeur de la Formule 1, avec des victoires légendaires dans le passé grâce à des pilotes tels que Nigel Mansell et Damon Hill. <br><br> Enfin, <span style='color: #0090FF;text-shadow:none;'>Alpine</span> a également remporté 2 titres sous l'ère Renault avec notamment Fernando Alonso. <br><br> <span style='color: #FFFFFF;text-shadow:none;'>Haas</span>, <span style='color: #006F62;text-shadow:none;'>Aston Martin</span>, <span style='color: #2B4562;text-shadow:none;'>Alpha Tauri</span> et <span style='color: #900000;text-shadow:none;'>Alfa Romeo</span> n'ont remporté aucun titre de championnat dans l'histoire de la Formule 1. Cela ne signifie pas que ces écuries n'ont pas été performantes dans le passé ou qu'elles ne le seront pas à l'avenir, mais simplement qu'elles n'ont pas encore réussi à dominer la compétition comme les autres écuries mentionnées ci-dessus.</p>";
  divAnalyse.appendChild(divAnalyseExplication);

  const Ecuries = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    Ecuries.push([
      tabGlobalDataEcuries[i].nom,
      tabGlobalDataEcuries[i].titre_ecurie,
    ]);
  }

  const Pilotes = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    Pilotes.push([
      tabGlobalDataEcuries[i].nom,
      tabGlobalDataEcuries[i].titre_pilote,
    ]);
  }

  let data = Ecuries;
  let type = "constructeurs";

  graphePie(data, type);

  buttonMettreAJour.addEventListener("click", function () {
    if (boutonRadioTitreConstructeurs.checked) {
      data = Ecuries;
      type = "constructeurs";
      divAnalyseExplication.innerHTML = "<h3>Analyse : </h3>";
      divAnalyseExplication.innerHTML += "<br>";
      divAnalyseExplication.innerHTML +=
        "<p> La première écurie à considérer est <span style='color: #DC0000;text-shadow:none;'>Ferrari</span>, qui a remporté 16 titres de championnat au cours de son histoire. Cette performance en fait l'une des écuries les plus dominantes de l'histoire de la Formule 1. <br><br> La deuxième écurie en termes de domination est <span style='color: #00D2BE;text-shadow:none;'>Mercedes</span>, avec un total de 8 titres de championnat. Bien que ce chiffre soit inférieur à celui de <span style='color: #DC0000;text-shadow:none;'>Ferrari</span>, il est important de noter que <span style='color: #00D2BE;text-shadow:none;'>Mercedes</span> a remporté tous ses titres de championnat dans les années 2010, ce qui en fait l'écurie la plus dominante de la dernière décennie. <br><br> <span style='color: #FF8700;text-shadow:none;'>McLaren</span> est également une écurie importante en termes de domination, avec un total de 8 titres de championnat. McLaren est connue pour sa longue histoire dans la Formule 1 et pour avoir remporté de nombreux titres avec des pilotes légendaires tels que Ayrton Senna et Alain Prost. <br><br> <span style='color: #0600EF;text-shadow:none;'>Red Bull</span> a remporté 5 titres de championnat, ce qui en fait une écurie relativement nouvelle dans la Formule 1. Cependant, <span style='color: #0600EF;text-shadow:none;'>Red Bull</span> a été très performante depuis son arrivée dans la compétition, avec une domination notable dans les années 2010 grâce au pilote Sebastian Vettel. <br><br> <span style='color: #005AFF;text-shadow:none;'>Williams</span> est une autre écurie importante en termes de domination, avec un total de 9 titres de championnat. Bien que <span style='color: #005AFF;text-shadow:none;'>Williams</span> n'ait pas remporté de titre depuis les années 1990, l'écurie a toujours été un acteur majeur de la Formule 1, avec des victoires légendaires dans le passé grâce à des pilotes tels que Nigel Mansell et Damon Hill. <br><br> Enfin, <span style='color: #0090FF;text-shadow:none;'>Alpine</span> a également remporté 2 titres sous l'ère Renault avec notamment Fernando Alonso. <br><br> <span style='color: #FFFFFF;text-shadow:none;'>Haas</span>, <span style='color: #006F62;text-shadow:none;'>Aston Martin</span>, <span style='color: #2B4562;text-shadow:none;'>Alpha Tauri</span> et <span style='color: #900000;text-shadow:none;'>Alfa Romeo</span> n'ont remporté aucun titre de championnat dans l'histoire de la Formule 1. Cela ne signifie pas que ces écuries n'ont pas été performantes dans le passé ou qu'elles ne le seront pas à l'avenir, mais simplement qu'elles n'ont pas encore réussi à dominer la compétition comme les autres écuries mentionnées ci-dessus.</p>";
      divAnalyse.appendChild(divAnalyseExplication);
    } else if (titrePilotes.checked) {
      data = Pilotes;
      type = "pilotes";
      divAnalyseExplication.innerHTML = "<h3>Analyse : </h3>";
      divAnalyseExplication.innerHTML += "<br>";
      divAnalyseExplication.innerHTML +=
        "<p> <span style='color: #DC0000;text-shadow:none;'>Ferrari</span> est l'écurie la plus dominante avec 15 titres de pilote à son actif. Depuis sa création en 1950, <span style='color: #DC0000;text-shadow:none;'>Ferrari</span> a été une force incontournable dans le monde de la Formule 1, remportant plusieurs championnats constructeurs et pilotes. <br><br> La deuxième écurie la plus dominante est <span style='color: #FF8700;text-shadow:none;'>McLaren</span>, avec 12 titres de pilote à son actif. Fondée en 1963, <span style='color: #FF8700;text-shadow:none;'>McLaren</span> est également une écurie légendaire qui a connu de nombreux succès au fil des ans, notamment grâce à des pilotes tels que Niki Lauda, Alain Prost, Ayrton Senna et Lewis Hamilton. <br><br> <span style='color: #00D2BE;text-shadow:none;'>Mercedes</span> est l'écurie suivante avec 9 titres de pilote, mais elle a connu une période de domination récente sans précédent dans l'histoire de la Formule 1. Depuis l'introduction de la réglementation des moteurs hybrides en 2014, <span style='color: #00D2BE;text-shadow:none;'>Mercedes</span> a remporté tous les championnats constructeurs et pilotes, avec Lewis Hamilton remportant sept titres de pilote. <br><br> <span style='color: #0600EF;text-shadow:none;'>Red Bull</span> suit avec 6 titres de pilote, principalement grâce aux performances de Sebastian Vettel, qui a remporté quatre de ces titres consécutivement entre 2010 et 2013. <br><br> <span style='color: #005AFF;text-shadow:none;'>Williams</span>, avec 7 titres de pilote à son actif, a également été une écurie importante dans l'histoire de la Formule 1, avec des pilotes tels que Nigel Mansell, Damon Hill et Jacques Villeneuve. <br><br> <span style='color: #0090FF;text-shadow:none;'>Alpine</span> a également remporté 2 titres sous l'ère Renault avec notamment Fernando Alonso. <br><br> Les autres écuries, <span style='color: #900000;text-shadow:none;'>Alfa Romeo</span>, <span style='color: #FFFFFF;text-shadow:none;'>Haas</span>, <span style='color: #2B4562;text-shadow:none;'>AlphaTauri</span> et <span style='color: #006F62;text-shadow:none;'>Aston Martin</span>, n'ont pas encore remporté de titres de pilote, bien qu'elles aient toutes connu des succès dans d'autres aspects de la Formule 1, tels que les victoires de course et les podiums. </p>";
      divAnalyse.appendChild(divAnalyseExplication);
    }
    graphePie(data, type);
  });
}

//------------------- Création de la div pour le graphique de stats -------------------

function creationDivMultipleBars() {
  //Création container
  const divParent = document.querySelector(".divGraphique");
  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divMultipleBarsEtExplication";
  divAnalyse.className = "divGraphiqueEcurie";
  divParent.appendChild(divAnalyse);
  divAnalyse.innerHTML = "";

  const grapheEtExplication = document.createElement("div");
  grapheEtExplication.className = "grapheEtExplication";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  grapheEtExplication.appendChild(divGraphique);
  divGraphique.id = "GraphiqueVictoires";
  divGraphique.className = "Graphique";

  //Création Texte Explicatif
  const divExplication = document.createElement("div");
  divExplication.className = "divExplication";
  divExplication.innerHTML = "<h3>Explication : </h3>";
  divExplication.innerHTML += "<br>";
  divExplication.innerHTML +=
    "<p> Les victoires, les poles positions et les podiums sont des éléments clés de la compétition en Formule 1. </p>";
  divExplication.innerHTML += "<br>";
  divExplication.innerHTML +=
    "<p> Les <span style='color:red'>victoires</span> récompensent la performance du pilote lors d'une <span style='color:red'>course</span>, tandis que les <span style='color:red'>poles positions</span> récompensent la performance lors des <span style='color:red'>qualifications</span>. Les  <span style='color:red'>podiums</span> récompensent les pilotes qui ont terminé <span style='color:red'>parmi les trois premiers</span> à la fin d'une course. </p>";
  divExplication.innerHTML += "<br>";
  divExplication.innerHTML +=
    "<p> Ce graphique permet de comparer le <span style='color:red'>nombre</span> de victoires, de poles positions et de podiums entre les équipes, permettant ainsi de visualiser leur <span style='color:red'>performance</span> au fil des saisons. </p>";
  grapheEtExplication.appendChild(divExplication);

  divAnalyse.appendChild(grapheEtExplication);

  const divChoix = document.createElement("div");
  divChoix.className = "divChoix";
  divAnalyse.appendChild(divChoix);

  const boutonStatsAll = document.createElement("input");
  boutonStatsAll.id = "inputChoix";
  boutonStatsAll.type = "radio";
  boutonStatsAll.name = "option";
  divChoix.appendChild(boutonStatsAll);

  const labelStatsAll = document.createElement("label");
  labelStatsAll.id = "labelChoix";
  labelStatsAll.innerHTML = "Statistiques depuis 1958 par écuries";
  divChoix.appendChild(labelStatsAll);

  const boutonStats2022 = document.createElement("input");
  boutonStats2022.id = "inputChoix";
  boutonStats2022.type = "radio";
  boutonStats2022.name = "option";
  divChoix.appendChild(boutonStats2022);

  const labelStats2022 = document.createElement("label");
  labelStats2022.id = "labelChoix";
  labelStats2022.innerHTML = "Satistiques saison 2022 par écuries";
  divChoix.appendChild(labelStats2022);

  const buttonMettreAJour = document.createElement("button");
  buttonMettreAJour.className = "buttonMettreAJour";
  buttonMettreAJour.innerHTML = "Mettre à jour";
  divChoix.appendChild(buttonMettreAJour);

  const divAnalyseExplication = document.createElement("div");
  divAnalyseExplication.className = "divAnalyseGraphiqueEcurie";
  divAnalyseExplication.innerHTML = "<h3>Analyse : </h3>";
  divAnalyseExplication.innerHTML += "<br>";
  divAnalyseExplication.innerHTML +=
    "<p> Les données de chaque écurie depuis leur création montrent une hiérarchie claire dans l'histoire de la Formule 1. <br><br> <span style='color: #DC0000;text-shadow:none;'>Ferrari</span> est sans aucun doute l'une des équipes les plus dominantes de l'histoire, avec 217 victoires, 789 podiums et 237 pole positions. <br><br> <span style='color: #0600EF;text-shadow:none;'>Red Bull</span>, écurie plus récente dans la discipline, a réussi à rivaliser avec les équipes historiques, avec 92 victoires, 234 podiums et 81 pole positions. <br><br> <span style='color: #00D2BE;text-shadow:none;'>Mercedes</span>, également relativement récente, a rapidement émergé comme une force dominante, avec 116 victoires, 281 podiums et 136 pole positions. <br><br> En revanche, <span style='color: #0090FF;text-shadow:none;'>Alpine</span>, bien qu'elle ait remporté le championnat du monde à deux reprises dans les années 2000, n'a pas réussi à rivaliser avec les équipes les plus dominantes de l'histoire, avec seulement 36 victoires, 105 podiums et 51 pole positions. <br><br> <span style='color: #FF8700;text-shadow:none;'>McLaren</span>, une équipe à succès, a réussi à se maintenir dans les hautes sphères de la discipline, avec 179 victoires, 490 podiums et 155 pole positions. <br><br> <span style='color: #900000;text-shadow:none;'>Alfa Romeo</span>, autre équipe historique de la discipline, a remporté 10 victoires, 26 podiums et 12 pole positions. <br><br> <span style='color: #005AFF;text-shadow:none;'>Williams</span> a connu des hauts et des bas, mais a réussi à remporter 114 victoires, 312 podiums et 128 pole positions au cours de son histoire. <br><br> <span style='color: #2B4562;text-shadow:none;'>AlphaTauri</span>, auparavant appelée Toro Rosso, a remporté 2 victoires, 5 podiums et 1 pole position. <br><br> Quant aux équipes plus récentes, <span style='color: #006F62;text-shadow:none;'>Aston Martin</span> n'a jamais remporté de victoire, avec seulement 3 podiums et 0 pole position, tandis que <span style='color: #FFFFFF;text-shadow:none;'>Haas</span> n'a pas encore réussi à s'installer sur le podium mais a remporté une pole position. </p>";
  divAnalyse.appendChild(divAnalyseExplication);

  const seriesAll = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    seriesAll.push({
      name: tabGlobalDataEcuries[i].nom,
      data: [
        tabGlobalDataEcuries[i].wins_all,
        tabGlobalDataEcuries[i].pole_all,
        tabGlobalDataEcuries[i].podiums_all,
      ],
    });
  }

  const series = [];
  for (let i = 0; i < tabGlobalDataEcuries.length; i++) {
    series.push({
      name: tabGlobalDataEcuries[i].nom,
      data: [
        tabGlobalDataEcuries[i].wins,
        tabGlobalDataEcuries[i].pole,
        tabGlobalDataEcuries[i].podium,
      ],
    });
  }

  let data = seriesAll;
  let annee = 1958;

  grapheMultipleBars(data, annee);

  buttonMettreAJour.addEventListener("click", function () {
    if (boutonStatsAll.checked) {
      data = seriesAll;
      annee = 1958;
      divAnalyseExplication.innerHTML = "<h3>Analyse : </h3>";
      divAnalyseExplication.innerHTML += "<br>";
      divAnalyseExplication.innerHTML +=
        "<p> Les données de chaque écurie depuis leur création montrent une hiérarchie claire dans l'histoire de la Formule 1. <br><br> <span style='color: #DC0000;text-shadow:none;'>Ferrari</span> est sans aucun doute l'une des équipes les plus dominantes de l'histoire, avec 217 victoires, 789 podiums et 237 pole positions. <br><br> <span style='color: #0600EF;text-shadow:none;'>Red Bull</span>, écurie plus récente dans la discipline, a réussi à rivaliser avec les équipes historiques, avec 92 victoires, 234 podiums et 81 pole positions. <br><br> <span style='color: #00D2BE;text-shadow:none;'>Mercedes</span>, également relativement récente, a rapidement émergé comme une force dominante, avec 116 victoires, 281 podiums et 136 pole positions. <br><br> En revanche, <span style='color: #0090FF;text-shadow:none;'>Alpine</span>, bien qu'elle ait remporté le championnat du monde à deux reprises dans les années 2000, n'a pas réussi à rivaliser avec les équipes les plus dominantes de l'histoire, avec seulement 36 victoires, 105 podiums et 51 pole positions. <br><br> <span style='color: #FF8700;text-shadow:none;'>McLaren</span>, une équipe à succès, a réussi à se maintenir dans les hautes sphères de la discipline, avec 179 victoires, 490 podiums et 155 pole positions. <br><br> <span style='color: #900000;text-shadow:none;'>Alfa Romeo</span>, autre équipe historique de la discipline, a remporté 10 victoires, 26 podiums et 12 pole positions. <br><br> <span style='color: #005AFF;text-shadow:none;'>Williams</span> a connu des hauts et des bas, mais a réussi à remporter 114 victoires, 312 podiums et 128 pole positions au cours de son histoire. <br><br> <span style='color: #2B4562;text-shadow:none;'>AlphaTauri</span>, auparavant appelée Toro Rosso, a remporté 2 victoires, 5 podiums et 1 pole position. <br><br> Quant aux équipes plus récentes, <span style='color: #006F62;text-shadow:none;'>Aston Martin</span> n'a jamais remporté de victoire, avec seulement 3 podiums et 0 pole position, tandis que <span style='color: #FFFFFF;text-shadow:none;'>Haas</span> n'a pas encore réussi à s'installer sur le podium mais a remporté une pole position. </p>";
      divAnalyse.appendChild(divAnalyseExplication);
    } else if (boutonStats2022.checked) {
      data = series;
      annee = 2022;
      divAnalyseExplication.innerHTML = "<h3>Analyse : </h3>";
      divAnalyseExplication.innerHTML += "<br>";
      divAnalyseExplication.innerHTML +=
        "<p> En examinant les résultats de la saison avec les données fournies, nous pouvons constater que <span style='color: #0600EF;text-shadow:none;'>Red Bull</span> a été l'écurie la plus dominante en remportant 17 victoires, 8 poles positions et 28 podiums. L'écurie a donc été très performante tout au long de la saison. <br><br> <span style='color: #DC0000;text-shadow:none;'>Ferrari</span> a également connu une saison solide avec 4 victoires, 12 poles positions et 20 podiums, ce qui en fait la deuxième écurie la plus performante de la saison. <br><br> <span style='color: #00D2BE;text-shadow:none;'>Mercedes</span> a quant à elle remporté 1 seule victoire, 1 pole position et est montée sur le podium 17 fois. Bien que les résultats de Mercedes soient moins impressionnants que ceux de <span style='color: #0600EF;text-shadow:none;'>Red Bull</span> et de <span style='color: #DC0000;text-shadow:none;'>Ferrari</span>, l'écurie a tout de même réussi à maintenir une position solide tout au long de la saison. <br><br> A part <span style='color: #FF8700;text-shadow:none;'>McLaren</span> avec un podium et <span style='color: #FFFFFF;text-shadow:none;'>Haas</span> avec une pole position. Les autres écuries, <span style='color: #0090FF;text-shadow:none;'>Alpine</span>, <span style='color: #900000;text-shadow:none;'>Alfa Romeo</span>, <span style='color: #006F62;text-shadow:none;'>Aston Martin</span>, <span style='color: #2B4562;text-shadow:none;'>AlphaTauri</span> et <span style='color: #005AFF;text-shadow:none;'>Williams</span>, ont connu une saison moins performante, n'ayant remporté aucune victoire, pole position ou podium. </p>";
      divAnalyse.appendChild(divAnalyseExplication);
    }
    grapheMultipleBars(data, annee);
  });
}

//------------------- Création de la div pour le graphique race -------------------

function creationDivRace() {
  //Création container
  const divParent = document.querySelector(".divGraphique");
  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divChartRaceExplication";
  divAnalyse.className = "divGraphiqueEcurie";
  divParent.appendChild(divAnalyse);

  let data = "Points";

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

  const divChoix = document.createElement("div");
  divChoix.id = "divChoixRaceChart";
  divChoix.className = "divChoix";
  divAnalyse.appendChild(divChoix);

  const nbPointsEcurie = document.createElement("input");
  nbPointsEcurie.id = "inputChoix";
  nbPointsEcurie.type = "radio";
  nbPointsEcurie.name = "option";
  divChoix.appendChild(nbPointsEcurie);

  const labelPoints = document.createElement("label");
  labelPoints.id = "labelChoix";
  labelPoints.innerHTML = "Evolution du nombre de points par écuries";
  divChoix.appendChild(labelPoints);

  const nbVictoiresEcurie = document.createElement("input");
  nbVictoiresEcurie.id = "inputChoix";
  nbVictoiresEcurie.type = "radio";
  nbVictoiresEcurie.name = "option";
  divChoix.appendChild(nbVictoiresEcurie);

  const labelVictoires = document.createElement("label");
  labelVictoires.id = "labelChoix";
  labelVictoires.innerHTML = "Evolution du nombre de victoires par écuries";
  divChoix.appendChild(labelVictoires);

  const buttonMettreAJour = document.createElement("button");
  buttonMettreAJour.className = "buttonMettreAJour";
  buttonMettreAJour.innerHTML = "Mettre à jour";
  divChoix.appendChild(buttonMettreAJour);

  //Création Texte Explicatif
  const texteExplicatif = document.createElement("div");
  texteExplicatif.id = "texteExplicationChartRace";
  texteExplicatif.className = "divExplication";
  texteExplicatif.innerHTML = "<h3>Explication : </h3>";
  texteExplicatif.innerHTML += "<br>";
  texteExplicatif.innerHTML +=
    "Les points sont la monnaie de la Formule 1 et chaque écurie cherchent à en accumuler le plus possible au cours de la saison. Les <span style='color:red'>points</span> sont attribués en fonction de la <span style='color:red'>position de chaque pilote à la fin de chaque course</span>, avec des points supplémentaires accordés pour la pole position et le meilleur tour en course. Ce graphique permet de visualiser le <span style='color:red'>nombre de points accumulés</span> par chaque <span style='color:red'>écurie</span> tout au long des saisons <span style='color:red'>depuis leur création</span>, permettant ainsi de suivre leur progression et leur <span style='color:red'>performance</span> relative par rapport à leurs <span style='color:red'>concurrents</span>.";
  divAnalyse.appendChild(texteExplicatif);

  grapheRace(data, year);

  buttonMettreAJour.addEventListener("click", function () {
    if (nbPointsEcurie.checked) {
      data = "Points";
      year.value = 1958;
      texteExplicatif.innerHTML = "<h3>Explication : </h3>";
      texteExplicatif.innerHTML += "<br>";
      texteExplicatif.innerHTML +=
        "Les points sont la monnaie de la Formule 1 et chaque écurie cherchent à en accumuler le plus possible au cours de la saison. Les <span style='color:red'>points</span> sont attribués en fonction de la <span style='color:red'>position de chaque pilote à la fin de chaque course</span>, avec des points supplémentaires accordés pour la pole position et le meilleur tour en course. Ce graphique permet de visualiser le <span style='color:red'>nombre de points accumulés</span> par chaque <span style='color:red'>écurie</span> tout au long des saisons <span style='color:red'>depuis leur création</span>, permettant ainsi de suivre leur progression et leur <span style='color:red'>performance</span> relative par rapport à leurs <span style='color:red'>concurrents</span>.";
      divAnalyse.appendChild(texteExplicatif);
    } else if (nbVictoiresEcurie.checked) {
      data = "Victoires";
      year.value = 1958;
      texteExplicatif.innerHTML = "<h3>Explication : </h3>";
      texteExplicatif.innerHTML += "<br>";
      texteExplicatif.innerHTML +=
        "<p>Les victoires sont l'une des mesures les plus importantes de la performance en Formule 1 et chaque écurie vise à en obtenir le plus possible tout au long de la saison. Les <span style='color:red'>victoires</span> sont attribuées en fonction de la <span style='color:red'>première place de chaque pilote à la fin de chaque course</span>. Ce graphique permet de visualiser le <span style='color:red'>nombre de victoires accumulées</span> par chaque <span style='color:red'>écurie</span> depuis leur création, permettant ainsi de suivre leur progression et leur <span style='color:red'>performance</span> relative par rapport à leurs <span style='color:red'>concurrents</span>. Les victoires sont un indicateur clé de la réussite dans le sport automobile, car elles reflètent la capacité d'une équipe à gagner des courses et à défier les autres écuries pour le titre de champion du monde. </p>";
      divAnalyse.appendChild(texteExplicatif);
    }
    grapheRace(data, year);
  });
}

//------------------------------- Export des données -----------------------------

export { tabGlobalDataEcuries }; //export du tableau contenant les données des écuries
