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
  creationNouvelleDiv();
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
function creationNouvelleDiv() {
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
    "Les titres pilotes et écuries sont des données clés dans la F1, car ils reflètent les performances globales d'une équipe. Vous avez utilisé ces données pour créer des graphes afin de montrer quelle équipe a remporté le championnat des constructeurs, ainsi que le championnat des pilotes. Les graphes permettent de visualiser facilement l'évolution des performances des équipes au fil de la saison, mettant en évidence les équipes qui ont dominé et celles qui ont eu du mal.";
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

  const grapheEtExplication = document.createElement("div");
  grapheEtExplication.id = "grapheEtExplication";
  //display flex pour que les div s'affichent cote à cote
  grapheEtExplication.style.display = "flex";
  grapheEtExplication.style.flexDirection = "row";
  grapheEtExplication.style.width = "100%";

  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divAnalysePointsPilotes";
  divParent.appendChild(divAnalyse);

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "GraphiquePtEcuries";
  divGraphique.className = "Graphique";
  grapheEtExplication.appendChild(divGraphique);

  //creation div où se trouve l'explication
  const divExplication = document.createElement("div");
  divExplication.id = "divExplication";
  divExplication.style.marginLeft = "4%";
  grapheEtExplication.appendChild(divExplication);

  divAnalyse.appendChild(grapheEtExplication);

  const titreConstructeurs = document.createElement("input");
  titreConstructeurs.id = "inputChoix";
  titreConstructeurs.type = "radio";
  titreConstructeurs.name = "option";
  titreConstructeurs.checked = true;
  divAnalyse.appendChild(titreConstructeurs);

  const labelTitreConstructeurs = document.createElement("label");
  labelTitreConstructeurs.id = "labelChoix";
  labelTitreConstructeurs.innerHTML =
    "Nombre de titres constructeurs par écuries";
  divAnalyse.appendChild(labelTitreConstructeurs);

  const titrePilotes = document.createElement("input");
  titrePilotes.id = "inputChoix";
  titrePilotes.type = "radio";
  titrePilotes.name = "option";
  divAnalyse.appendChild(titrePilotes);

  const labelTitrePilotes = document.createElement("label");
  labelTitrePilotes.id = "labelChoix";
  labelTitrePilotes.innerHTML = "Nombre de titres pilotes par écuries";
  divAnalyse.appendChild(labelTitrePilotes);

  const buttonMettreAJour = document.createElement("button");
  buttonMettreAJour.className = "buttonMettreAJour";
  buttonMettreAJour.innerHTML = "Mettre à jour";
  divAnalyse.appendChild(buttonMettreAJour);

  divExplication.style.width = "20%";
  divExplication.style.float = "right";
  divGraphique.style.width = "80%";
  divGraphique.style.float = "left";

  divExplication.style.color = "#FFFFFF";
  divExplication.style.fontSize = "0.9em";
  divExplication.innerHTML =
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
    if (titreConstructeurs.checked) {
      data = Ecuries;
      type = "constructeurs";
    } else if (titrePilotes.checked) {
      data = Pilotes;
      type = "pilotes";
    }
    graphePie(data, type);
  });
}

//------------------- Création de la div pour le graphique de stats -------------------

function creationDivMultipleBars() {
  //Création container
  const divParent = document.querySelector(".divGraphique");
  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divAnalysePointsPilotes";
  divParent.appendChild(divAnalyse);

  const grapheEtExplication = document.createElement("div");
  grapheEtExplication.id = "grapheEtExplication";
  grapheEtExplication.style.display = "flex";
  grapheEtExplication.style.flexDirection = "row";
  grapheEtExplication.style.width = "100%";
  grapheEtExplication.style.height = "400px";

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "GraphiqueVictoires";
  divGraphique.className = "Graphique";
  divGraphique.style.width = "80%";
  divGraphique.style.float = "left";
  grapheEtExplication.appendChild(divGraphique);

  //Création Texte Explicatif
  const divExplication = document.createElement("div");
  grapheEtExplication.appendChild(divExplication);
  divExplication.className = "divExplication";
  divExplication.style.marginLeft = "4%";
  divExplication.style.width = "20%";
  divExplication.style.float = "right";
  divExplication.style.color = "#FFFFFF";
  divExplication.style.fontSize = "0.9em";
  divExplication.innerHTML =
    "<p> Les victoires, les poles positions et les podiums sont des éléments clés de la compétition en Formule 1. </p>";
  divExplication.innerHTML += "<br>";
  divExplication.innerHTML +=
    "<p> Les <span style='color:red'>victoires</span> récompensent la performance du pilote lors d'une  <span style='color:red'>course</span>, tandis que les <span style='color:red'>poles positions</span> récompensent la performance lors des <span style='color:red'>qualifications</span>. Les  <span style='color:red'>podiums</span> récompensent les pilotes qui ont terminé <span style='color:red'>parmi les trois premiers</span> à la fin d'une course. </p>";
  divExplication.innerHTML += "<br>";
  divExplication.innerHTML +=
    "<p> Ce graphique permet de comparer le <span style='color:red'>nombre</span> de victoires, de poles positions et de podiums entre les équipes, permettant ainsi de visualiser leur <span style='color:red'>performance</span> au fil des saisons. </p>";

  divAnalyse.appendChild(grapheEtExplication);

  const StatsAll = document.createElement("input");
  StatsAll.id = "inputChoix";
  StatsAll.type = "radio";
  StatsAll.name = "option";
  divAnalyse.appendChild(StatsAll);

  const labelStatsAll = document.createElement("label");
  labelStatsAll.id = "labelChoix";
  labelStatsAll.innerHTML = "Statistiques depuis 1958 par écuries";
  divAnalyse.appendChild(labelStatsAll);

  const Stats = document.createElement("input");
  Stats.id = "inputChoix";
  Stats.type = "radio";
  Stats.name = "option";
  divAnalyse.appendChild(Stats);

  const labelStats = document.createElement("label");
  labelStats.id = "labelChoix";
  labelStats.innerHTML = "Satistiques saison 2022 par écuries";
  divAnalyse.appendChild(labelStats);

  const buttonMettreAJour = document.createElement("button");
  buttonMettreAJour.className = "buttonMettreAJour";
  buttonMettreAJour.innerHTML = "Mettre à jour";
  divAnalyse.appendChild(buttonMettreAJour);

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
    if (StatsAll.checked) {
      data = seriesAll;
      annee = 1958;
    } else if (Stats.checked) {
      data = series;
      annee = 2022;
    }
    grapheMultipleBars(data, annee);
  });
}

//------------------- Création de la div pour le graphique race -------------------

function creationDivRace() {
  //Création container
  const divParent = document.querySelector(".divGraphique");
  const divAnalyse = document.createElement("div");
  divAnalyse.id = "divAnalysePointsPilotes";
  divParent.appendChild(divAnalyse);

  let data = "Points";

  //Création Texte Explicatif
  const texteExplicatif = document.createElement("div");
  divAnalyse.appendChild(texteExplicatif);
  texteExplicatif.style.color = "#FFFFFF";
  texteExplicatif.style.fontSize = "1.0em";
  texteExplicatif.style.marginBottom = "2%";
  texteExplicatif.innerHTML =
    "Les points sont la monnaie de la Formule 1 et chaque écurie cherchent à en accumuler le plus possible au cours de la saison. Les <span style='color:red'>points</span> sont attribués en fonction de la <span style='color:red'>position de chaque pilote à la fin de chaque course</span>, avec des points supplémentaires accordés pour la pole position et le meilleur tour en course. Ce graphique permet de visualiser le <span style='color:red'>nombre de points accumulés</span> par chaque <span style='color:red'>écurie</span> tout au long des saisons <span style='color:red'>depuis leur création</span>, permettant ainsi de suivre leur progression et leur <span style='color:red'>performance</span> relative par rapport à leurs <span style='color:red'>concurrents</span>.";
  texteExplicatif.innerHTML += "<br>";
  //image dans le texte explicatif
  const imgExplication = document.createElement("img");
  imgExplication.src = "data/fleche-vers-le-bas.png";
  imgExplication.style.width = "4%";
  imgExplication.style.height = "4%";
  imgExplication.style.marginTop = "1%";
  texteExplicatif.appendChild(imgExplication);

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

  const Points = document.createElement("input");
  Points.id = "inputChoix";
  Points.type = "radio";
  Points.name = "option";
  divAnalyse.appendChild(Points);

  const labelPoints = document.createElement("label");
  labelPoints.id = "labelChoix";
  labelPoints.innerHTML = "Evolution du nombre de points par écuries";
  divAnalyse.appendChild(labelPoints);

  const Victoires = document.createElement("input");
  Victoires.id = "inputChoix";
  Victoires.type = "radio";
  Victoires.name = "option";
  divAnalyse.appendChild(Victoires);

  const labelVictoires = document.createElement("label");
  labelVictoires.id = "labelChoix";
  labelVictoires.innerHTML = "Evolution du nombre de victoires par écuries";
  divAnalyse.appendChild(labelVictoires);

  const buttonMettreAJour = document.createElement("button");
  buttonMettreAJour.className = "buttonMettreAJour";
  buttonMettreAJour.innerHTML = "Mettre à jour";
  divAnalyse.appendChild(buttonMettreAJour);

  grapheRace(data, year);

  buttonMettreAJour.addEventListener("click", function () {
    if (Points.checked) {
      data = "Points";
      year.value = 1958;
    } else if (Victoires.checked) {
      data = "Victoires";
      year.value = 1958;
    }
    grapheRace(data, year);
  });
}

//------------------------------- Export des données -----------------------------

export { tabGlobalDataEcuries }; //export du tableau contenant les données des écuries
