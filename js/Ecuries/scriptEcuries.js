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
    "<p> Sur ce graphique, on peut clairement voir la <span style='color:red'>domination de Ferrari</span> dans le monde de la F1. En effet, la Scuderia a remporté <span style='color:red'>16 titres</span> constructeurs, soit <span style='color:red'>7 de plus que</span> McLaren, qui est <span style='color:red'>la seconde équipe</span> la plus titrée. </p>";
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
        "<p> Sur ce graphique, on peut clairement voir la <span style='color:red'>domination de Ferrari</span> sur le monde de la F1. En effet, la Scuderia a remporté <span style='color:red'>16 titres</span> constructeurs, soit <span style='color:red'>7 de plus que</span> McLaren, qui est <span style='color:red'>la seconde équipe</span> la plus titrée. </p>";
      divAnalyse.appendChild(divAnalyseExplication);
    } else if (titrePilotes.checked) {
      data = Pilotes;
      type = "pilotes";
      divAnalyseExplication.innerHTML = "<h3>Analyse : </h3>";
      divAnalyseExplication.innerHTML += "<br>";
      divAnalyseExplication.innerHTML +=
        "<p> Sur ce graphique, on peut clairement voir la <span style='color:red'>domination de Ferrari</span> sur le monde de la F1. En effet, la Scuderia a remporté <span style='color:red'>15 titres</span> constructeurs, soit <span style='color:red'>3 de plus que</span> McLaren, qui est <span style='color:red'>la seconde équipe</span> la plus titrée. </p>";
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
    "<p> Sur ce graphique, on peut clairement voir la <span style='color:red'>domination de Ferrari</span> en <span style='color:red'>qualifications</span>. Cependant on voit également que <span style='color:red'>RedBull domine</span> en terme de <span style='color:red'>victoires</span> et de <span style='color:red'>podiums</span>. </p>";
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
        "<p> Sur ce graphique, on peut clairement voir la <span style='color:red'>domination de Ferrari</span> depuis la création de la discipline. En effet, <span style='color:red'>Ferrari</span> compte 789 podiums soit <span style='color:red'>299 podiums de plus</span> que McLaren, qui est <span style='color:red'>la seconde équipe</span> avec le plus de podiums, ce qui montre la <span style='color:red'>régularité</span> de cette équipe <span style='color:red'>au plus haut niveau</span> de ce sport depuis sa création. </p>";
      divAnalyse.appendChild(divAnalyseExplication);
    } else if (boutonStats2022.checked) {
      data = series;
      annee = 2022;
      divAnalyseExplication.innerHTML = "<h3>Analyse : </h3>";
      divAnalyseExplication.innerHTML += "<br>";
      divAnalyseExplication.innerHTML +=
        "<p> Sur ce graphique, on peut clairement voir la <span style='color:red'>domination de Ferrari</span> en <span style='color:red'>qualifications</span>. Cependant on voit également que <span style='color:red'>RedBull domine</span> en terme de <span style='color:red'>victoires</span> et de <span style='color:red'>podiums</span>. Cela signifie que Ferrari a une voiture construite pour être rapide en qualifications alors que RedBull a opté pour une voiture rapide en course, ce qui est une meilleure stratégie de développement car les points sont marqués lors de la course. </p>";
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

  //Création Texte Explicatif
  const texteExplicatif = document.createElement("div");
  texteExplicatif.id = "texteExplicationChartRace";
  texteExplicatif.className = "divExplication";
  texteExplicatif.innerHTML = "<h3>Explication : </h3>";
  texteExplicatif.innerHTML += "<br>";
  texteExplicatif.innerHTML +=
    "Les points sont la monnaie de la Formule 1 et chaque écurie cherchent à en accumuler le plus possible au cours de la saison. Les <span style='color:red'>points</span> sont attribués en fonction de la <span style='color:red'>position de chaque pilote à la fin de chaque course</span>, avec des points supplémentaires accordés pour la pole position et le meilleur tour en course. Ce graphique permet de visualiser le <span style='color:red'>nombre de points accumulés</span> par chaque <span style='color:red'>écurie</span> tout au long des saisons <span style='color:red'>depuis leur création</span>, permettant ainsi de suivre leur progression et leur <span style='color:red'>performance</span> relative par rapport à leurs <span style='color:red'>concurrents</span>.";
  divAnalyse.appendChild(texteExplicatif);

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

  grapheRace(data, year);

  buttonMettreAJour.addEventListener("click", function () {
    if (nbPointsEcurie.checked) {
      data = "Points";
      year.value = 1958;
    } else if (nbVictoiresEcurie.checked) {
      data = "Victoires";
      year.value = 1958;
    }
    grapheRace(data, year);
  });
}

//------------------------------- Export des données -----------------------------

export { tabGlobalDataEcuries }; //export du tableau contenant les données des écuries
