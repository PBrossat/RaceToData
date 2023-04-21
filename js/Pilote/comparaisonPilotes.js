//import des données des pilotes
import { tabGlobalDataPilotes } from "./scriptPilote.js";
import { tabGlobalDataGP } from "../SimulationGP/scriptSimulation.js";
import {
  analysePosition,
  analysePneus,
  analyseTemps,
} from "./analyseComparaisonPilote.js";
import { GrandPrix, Pilote, CouleurPilote } from "./enumeration.js";

async function gestionFormulairePilote() {
  const formulaire = document.getElementById("formulaire");
  formulaire.addEventListener("submit", async (e) => {
    e.preventDefault(); //permet de ne pas recharger la page dès qu'on appuie sur le bouton
    const pilote1 = document.getElementById("selecteurPilote1").value;
    const pilote2 = document.getElementById("selecteurPilote2").value;
    const gp = document.getElementById("selecteurGrandPrix").value;

    //desactivation de la soumission du formulaire
    document.getElementById("boutonSubmit").disabled = false;
    //fetch des données
    const response = await fetch(
      `/dataComparaison?nomGP=${gp}&nomPilote1=${pilote1}&nomPilote2=${pilote2}`
    );

    const data = await response.json();

    //-----Rendre visible les boutons de navigation-----
    document.getElementById("boutonGauche").style.visibility = "visible";
    document.getElementById("boutonDroite").style.visibility = "visible";
    //------Affichage des données dans le slider-----

    //slider 1
    //Position des pilotes sur la grille de départ à la fin du GP
    grahiquePositionComparaison(data);

    //slider 2
    //Pneux utilisés par les pilotes
    pneuPilote(data, 0);
    pneuPilote(data, 1);

    //slider 3
    //Temps des pilotes
    tempsPilote(data, 1);
    tempsPilote(data, 2);
    //image du circuit sélectionné
    imageGP(data);
    ajoutPointInterrogation();
    hoverPointInterrogation(0, "positionSlider");
    hoverPointInterrogation(1, "pneuSlider");
    hoverPointInterrogation(2, "timeSlider");

    //analyse des données
    analysePosition(data);
    analysePneus(data);
    analyseTemps(data);
  });
}

async function creationSlider() {
  const divParent = document.querySelector("#stats");
  const divFormulaireEtSlider = document.createElement("div");
  divFormulaireEtSlider.id = "divFormulaireEtSlider"; //style dans formulaire.css
  divParent.appendChild(divFormulaireEtSlider);

  const slider = document.createElement("div");
  slider.class = "slider";
  slider.id = "slider";

  //création d'une div sliderNav (pour les boutons)
  const sliderNav = document.createElement("div");
  sliderNav.className = "sliderNav";

  //création du bouton de gauche
  const boutonGauche = document.createElement("button");
  boutonGauche.className = "sliderNav__button";
  boutonGauche.id = "boutonGauche";
  boutonGauche.onclick = function () {
    previous();
    desactiverBoutons();
  };
  //invisible au chargement de la page
  boutonGauche.style.visibility = "hidden";
  sliderNav.appendChild(boutonGauche);

  //création du bouton de droite
  const boutonDroite = document.createElement("button");
  boutonDroite.className = "sliderNav__button";
  boutonDroite.id = "boutonDroite";
  boutonDroite.onclick = function () {
    next();
    desactiverBoutons();
  };
  //invisible au chargement de la page
  boutonDroite.style.visibility = "hidden";
  sliderNav.appendChild(boutonDroite);

  //svg dans bouton droit :
  const svgDroit = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  ); // création de l'élément SVG
  svgDroit.setAttribute("xmlns", "http://www.w3.org/2000/svg"); // ajout de l'attribut xmlns à l'élément SVG
  svgDroit.setAttribute("viewBox", "0 0 24 24"); // ajout de l'attribut viewBox à l'élément SVG
  svgDroit.setAttribute("fill", "currentColor"); // ajout de l'attribut fill à l'élément SVG
  svgDroit.classList.add("w-6", "h-6"); // ajout des classes CSS à l'élément SVG
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path"); // création de l'élément path
  path.setAttribute("fill-rule", "evenodd"); // ajout de l'attribut fill-rule à l'élément path
  path.setAttribute(
    "d",
    "M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
  ); // ajout de l'attribut d à l'élément path
  svgDroit.appendChild(path); // ajout de l'élément path à l'élément SVG
  boutonDroite.appendChild(svgDroit); // ajout de l'élément SVG au bouton

  //svg dans bouton gauche :
  const svgGauche = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  ); // création de l'élément SVG
  svgGauche.setAttribute("xmlns", "http://www.w3.org/2000/svg"); // ajout de l'attribut xmlns à l'élément SVG
  svgGauche.setAttribute("viewBox", "0 0 24 24"); // ajout de l'attribut viewBox à l'élément SVG
  svgGauche.setAttribute("fill", "currentColor"); // ajout de l'attribut fill à l'élément SVG
  svgGauche.classList.add("w-6", "h-6"); // ajout des classes CSS à l'élément SVG
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path"); // création de l'élément path
  path2.setAttribute("fill-rule", "evenodd"); // ajout de l'attribut fill-rule à l'élément path
  path2.setAttribute(
    "d",
    "M20.25 12a.75.75 0 01-.75.75H6.31l5.47 5.47a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 111.06 1.06l-5.47 5.47H19.5a.75.75 0 01.75.75z"
  ); // ajout de l'attribut d à l'élément path
  svgGauche.appendChild(path2); // ajout de l'élément path à l'élément SVG
  boutonGauche.appendChild(svgGauche); // ajout de l'élément SVG au bouton

  slider.appendChild(sliderNav);

  const sliderContent = document.createElement("div");
  sliderContent.className = "sliderContent";
  slider.appendChild(sliderContent);

  //creation de 3 div pour le slider

  //création de la div pour la position
  const positionSlider = document.createElement("div");
  positionSlider.className = "slider__item";
  positionSlider.id = "positionSlider";
  sliderContent.appendChild(positionSlider);

  //création de deux div pour les pneus
  const pneuSlider = document.createElement("div");
  pneuSlider.className = "slider__item";
  pneuSlider.id = "pneuSlider";
  sliderContent.appendChild(pneuSlider);
  //création de deux div dans pneuSlider
  const pneuPilote1 = document.createElement("div");
  pneuPilote1.className = "pneuPilote";
  pneuPilote1.id = "pneuPilote1";
  pneuSlider.appendChild(pneuPilote1);
  const pneuPilote2 = document.createElement("div");
  pneuPilote2.className = "pneuPilote";
  pneuPilote2.id = "pneuPilote2";
  pneuSlider.appendChild(pneuPilote2);

  //création de la div pour le temps
  const timeSlider = document.createElement("div");
  timeSlider.className = "slider__item";
  timeSlider.id = "timeSlider";
  sliderContent.appendChild(timeSlider);

  //création de deux div dans timeSlider (une pour les temps, une pour l'image du gp)
  const temps = document.createElement("div");
  temps.id = "tempsPilote";
  const imageGp = document.createElement("div");
  imageGp.id = "imageGp";
  timeSlider.appendChild(temps);
  timeSlider.appendChild(imageGp);

  const timePilote1 = document.createElement("div");
  timePilote1.className = "timePilote";
  timePilote1.id = "timePilote1";
  temps.appendChild(timePilote1);
  const timePilote2 = document.createElement("div");
  timePilote2.className = "timePilote";
  timePilote2.id = "timePilote2";
  temps.appendChild(timePilote2);

  divFormulaireEtSlider.appendChild(slider);
}

//fonction permettant de faire défiler le slider vers la droite
function next() {
  const longueurSlider = document.querySelector("#slider").offsetWidth;
  const sliderContent = document.querySelector(".sliderContent");
  sliderContent.scrollLeft += longueurSlider;
  const scrollLeft = sliderContent.scrollLeft;
  const itemSlider = sliderContent.querySelectorAll(".slider__item");

  if (scrollLeft == longueurSlider * (itemSlider.length - 1)) {
    document.querySelector("#boutonDroite").style.display = "none";
  }
}

//fonction permettant de faire défiler le slider vers la gauche
function previous() {
  const longueurSlider = document.querySelector("#slider").offsetWidth;
  const sliderContent = document.querySelector(".sliderContent");
  sliderContent.scrollLeft -= longueurSlider;
  const scrollLeft = sliderContent.scrollLeft;
  const itemSlider = sliderContent.querySelectorAll(".slider__item");

  if (scrollLeft == sliderContent * (itemSlider.length - 1)) {
    document.querySelector("#boutonGauche").style.display = "none";
  }
}

function desactiverBoutons() {
  //désactiver les boutons pendant 1sec
  document.getElementById("boutonGauche").disabled = true;
  document.getElementById("boutonDroite").disabled = true;
  setTimeout(function () {
    document.getElementById("boutonGauche").disabled = false;
    document.getElementById("boutonDroite").disabled = false;
  }, 1000);
}

function ajoutPointInterrogation() {
  const sliderItems = document.querySelectorAll(".slider__item");

  //parcours de tous les sliders
  sliderItems.forEach(function (slider, index) {
    const divPointInterrogationExiste = document.getElementById(
      "divPointInterrogation" + index
    );
    //si cette div n'existe pas déjà
    if (divPointInterrogationExiste == null) {
      //ajout d'un point d'intérrogation (img) dans chaque slider
      //création d'une div contenant l'image
      const divPointInterrogation = document.createElement("div");
      divPointInterrogation.id = "divPointInterrogation" + index;
      divPointInterrogation.className = "divPointInterrogation";
      divPointInterrogation.style.position = "relative";

      const pointInterrogation = document.createElement("img");
      pointInterrogation.className = "pointInterrogation";
      pointInterrogation.src = "data/interrogation.png";

      //resize image
      pointInterrogation.style.width = "40px";
      pointInterrogation.style.height = "40px";
      pointInterrogation.style.cursor = "pointer";
      pointInterrogation.id = "pointInterrogation_" + index;

      //création d'une div contenant le texte d'explication
      const popup = document.createElement("div");
      popup.className = "popup";
      popup.id = "popup_" + index;
      sliderItems[index].appendChild(popup);

      divPointInterrogation.appendChild(pointInterrogation);
      sliderItems[index].appendChild(divPointInterrogation);
    }
  });
}

//fonction appélée lors du chargement de la page Pilote pour expliquer le fonctionnement de la comparaison
async function explicationComparaison() {
  //l'unique slider visible lors du chargement de la page est celui de la position
  const divParent = document.querySelector("#positionSlider");
  const titre = document.createElement("h2");
  titre.style.textAlign = "center";
  titre.innerHTML = "Comparaison de deux pilotes";
  const explication = document.createElement("p");
  explication.id = "explicationComparaisonIntro";
  explication.innerHTML =
    "Bienvenue sur notre application de comparaison de pilotes de Formule 1 pour la saison 2022. Nous avons conçu un carrousel interactif qui vous permettra de comparer deux pilotes sur plusieurs critères clés d'un Grand Prix.<br><br>" +
    "Le premier slider de notre carrousel est un graphique linéaire qui représente l'évolution des positions de départ et d'arrivée des deux pilotes pendant le Grand Prix. Vous pourrez ainsi visualiser leur progression tout au long de la course.<br><br>" +
    "Le deuxième slider est une représentation visuelle des pneus utilisés par chaque pilote pendant le Grand Prix. Vous pourrez ainsi voir s'ils ont opté pour des pneus durs, moyens ou tendres à différents moments de la course.<br><br>" +
    "Le troisième slider représente le meilleur temps des deux pilotes ainsi que le temps de chaque secteur de celui-ci. Cela vous permettra de voir les performances de chaque pilote dans les différents secteurs de la piste.<br><br>" +
    'Pour utiliser notre application, il vous suffit de sélectionner les noms des deux pilotes que vous souhaitez comparer, ainsi que le Grand Prix que vous souhaitez analyser. Une fois que vous avez sélectionné ces critères, cliquez sur "Comparaison !" pour lancer la comparaison.<br><br>';

  divParent.appendChild(titre);
  divParent.appendChild(explication);
}

async function grahiquePositionComparaison(data) {
  //récuperation de la div parent
  const divParent = document.querySelector("#positionSlider");

  //suppression l'explication de la comparaison (qui se trouve dans ce slider)
  divParent.innerHTML = "";
  //creation du titre
  const titre = document.createElement("h2");
  titre.innerHTML =
    "Position de " +
    Pilote[data[0]["nomPilote"]] +
    " et de " +
    Pilote[data[1]["nomPilote"]] +
    " au départ et à l'arrivée";
  const sousTitre = document.createElement("h3");
  sousTitre.innerHTML = "Grand-Prix : " + data[0]["GrandPrix"] + ".";
  divParent.appendChild(titre);
  divParent.appendChild(sousTitre);

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "graphiquePositionGP";
  divParent.appendChild(divGraphique);

  let tabPositionPilote1 = [2];
  let tabPositionPilote2 = [2];
  tabPositionPilote1[0] = data[0]["positionDepart"];
  tabPositionPilote1[1] = data[0]["positionArrivee"];
  tabPositionPilote2[0] = data[1]["positionDepart"];
  tabPositionPilote2[1] = data[1]["positionArrivee"];

  const graphique = document.getElementById("graphiquePositionGP");

  const styleText = { color: "#FFFFFF", fontWeight: "bold" };

  //trouver le min des data et le max
  var max1 = Math.max.apply(null, tabPositionPilote1);
  var min1 = Math.min.apply(null, tabPositionPilote1);
  var max2 = Math.max.apply(null, tabPositionPilote2);
  var min2 = Math.min.apply(null, tabPositionPilote2);

  var maxY = Math.max(max1, max2) + 1;
  var minY = Math.min(min1, min2) - 1;

  // ZOOM dans le chart adapté aux data (pour éviter d'avoir un graphique vide)
  var maxY = Math.max(max1, max2) + 1;
  var minY = Math.min(min1, min2) - 1;

  //creation du graphique
  Highcharts.chart(graphique, {
    chart: {
      backgroundColor: "#1b1b1b",
      marginBottom: 110,
      height: "70%",
      zoomType: "xy",
      panning: true,
      panKey: "shift",
      events: {
        load: function () {
          this.setSize(this.container.offsetWidth * 0.8);
        },
      },
    },

    title: {
      text: "Position des pilotes au départ et à l'arrivé",
      style: {
        color: "#FF2A2A",
        textShadow: "5px 5px 2px rgba(100,98,98,0.4)",
        fontWeight: "bold",
        fontSize: "20px",
      },
    },

    yAxis: {
      title: {
        text: "Position",
        itemStyle: {
          fontWeight: "bold",
          color: "#FFFFFF",
        },
      },
      min: minY,
      max: maxY,
      gridLineWidth: 0.5,
      tickInterval: 1,
      startOnTick: false,
      endOnTick: false,
      labels: {
        style: styleText,
      },
      //inversion de l'axe des ordonnées
      reversed: true,
    },

    xAxis: {
      categories: ["Départ", "Arrivé"],
      labels: {
        style: styleText,
        rotation: -45,
      },
    },

    legend: {
      itemStyle: {
        fontWeight: "bold",
        color: "#FFFFFF",
      },
    },

    series: [
      {
        name: Pilote[data[0]["nomPilote"]],
        data: tabPositionPilote1,
        color: CouleurPilote[data[0]["nomPilote"]],
      },
      {
        name: Pilote[data[1]["nomPilote"]],
        data: tabPositionPilote2,
        color: CouleurPilote[data[1]["nomPilote"]],
      },
    ],
  });
}

async function pneuPilote(data, idPilote) {
  const divParent = document.querySelector(`#pneuPilote${idPilote + 1}`);
  divParent.innerHTML = "";
  divParent.style.display = "flex";
  divParent.style.flexDirection = "column";
  divParent.style.height = "60%";
  divParent.style.top = "10%";

  //creation du titre
  const titre = document.createElement("h2");
  titre.innerHTML = "Pneus utilisés par " + Pilote[data[idPilote]["nomPilote"]];
  divParent.appendChild(titre);

  for (let i = 0; i < data[idPilote]["pneu"].length; i++) {
    const divPneu = document.createElement("div");
    divPneu.className = "pneu";
    if (data[idPilote]["pneu"].length > 1) {
      //minimum 2 pneux
      //hauteur de la div s'adapte en fonction de data[idPilote]["pneu"].length
      divPneu.style.height = `${100 / data[idPilote]["pneu"].length - 3}%`;
      divPneu.style.width = `${100 / data[idPilote]["pneu"].length - 3}%`;
    } //si il n'y a qu'un seul pneu
    else {
      divPneu.style.height = "55%";
      divPneu.style.width = "55%";
    }

    //insertion de l'image du pneu dans la div
    divPneu.innerHTML = `<img src='data/pneu/${data[idPilote]["pneu"][i]}.png' alt='pneu${data[idPilote]["pneu"][i]}' class='pneu__image' >`;

    //Combien de tour sur ce pneu
    divPneu.innerHTML +=
      "durée de vie du pneu : " +
      data[idPilote]["dureePneu"][i] +
      " - " +
      data[idPilote]["dureePneu"][i + 1] +
      " tours";
    divParent.appendChild(divPneu);
  }

  const zoneExplication = document.createElement("div");
  zoneExplication.id = "zoneExplication";
  // const nbPneu = data[idPilote]["pneu"].length;
  // zoneExplication.innerHTML = "Stratégie à : " + nbPneu - 1 + " arrêts";
  zoneExplication.innerHTML +=
    "<br> Pneu au départ : " + data[idPilote]["pneu"][0] + " ";
  for (let i = 1; i < data[idPilote]["pneu"].length; i++) {
    zoneExplication.innerHTML +=
      "<br> Arrêt n°" + i + " : " + data[idPilote]["pneu"][i] + " ";
  }
  divParent.appendChild(zoneExplication);
}

function affichageTempsPilote(
  data,
  lapTimeOrSectorTime,
  nbSecteur,
  idPilote,
  divParent,
  couleur
) {
  let temps = null;
  switch (lapTimeOrSectorTime) {
    case "lapTime":
      const chiffreLapTime = new Array(6);
      temps = data[idPilote - 1]["meilleurTour"]; //une seule valeur (string)
      var unite_minute = parseInt(temps.substr(4, 1));
      chiffreLapTime[0] = new Image();
      chiffreLapTime[0].src = `data/chiffres_${couleur}/${unite_minute}.gif`;
      var dixaine_seconde = parseInt(temps.substr(6, 1));
      chiffreLapTime[1] = new Image();
      chiffreLapTime[1].src = `data/chiffres_${couleur}/${dixaine_seconde}.gif`;
      var unite_seconde = parseInt(temps.substr(7, 1));
      chiffreLapTime[2] = new Image();
      chiffreLapTime[2].src = `data/chiffres_${couleur}/${unite_seconde}.gif`;
      var dixaine_milliseconde = parseInt(temps.substr(9, 1));
      chiffreLapTime[3] = new Image();
      chiffreLapTime[3].src = `data/chiffres_${couleur}/${dixaine_milliseconde}.gif`;
      var centaine_milliseconde = parseInt(temps.substr(10, 1));
      chiffreLapTime[4] = new Image();
      chiffreLapTime[4].src = `data/chiffres_${couleur}/${centaine_milliseconde}.gif`;
      var unite_milliseconde = parseInt(temps.substr(11, 1));
      chiffreLapTime[5] = new Image();
      chiffreLapTime[5].src = `data/chiffres_${couleur}/${unite_milliseconde}.gif`;

      for (let i = 0; i < 6; i++) {
        chiffreLapTime[i].width = 40;
        chiffreLapTime[i].height = 40;
      }

      const Blanc1 = new Image();
      Blanc1.src = `data/chiffres_${couleur}/Points.gif`;
      Blanc1.style.width = 40;
      const Blanc2 = new Image();
      Blanc2.src = `data/chiffres_${couleur}/Points.gif`;
      Blanc2.style.width = 40;

      //affichage des images dans le divParent
      divParent.appendChild(chiffreLapTime[0]);
      divParent.appendChild(Blanc1);
      for (let i = 1; i < 3; i++) {
        divParent.appendChild(chiffreLapTime[i]);
      }
      divParent.appendChild(Blanc2);
      for (let i = 3; i < 6; i++) {
        divParent.appendChild(chiffreLapTime[i]);
      }

      break;

    case "sectorTime":
      const chiffreSectorTime = new Array(5);
      temps = data[idPilote - 1]["tempsSecteur"]; //tableau de 3 valeurs (string)
      var dixaine_seconde = parseInt(temps[nbSecteur - 1].substr(6, 1));
      chiffreSectorTime[0] = new Image();
      chiffreSectorTime[0].src = `data/chiffres_${couleur}/${dixaine_seconde}.gif`;
      var unite_seconde = parseInt(temps[nbSecteur - 1].substr(7, 1));
      chiffreSectorTime[1] = new Image();
      chiffreSectorTime[1].src = `data/chiffres_${couleur}/${unite_seconde}.gif`;
      var dixaine_milliseconde = parseInt(temps[nbSecteur - 1].substr(9, 1));
      chiffreSectorTime[2] = new Image();
      chiffreSectorTime[2].src = `data/chiffres_${couleur}/${dixaine_milliseconde}.gif`;
      var centaine_milliseconde = parseInt(temps[nbSecteur - 1].substr(10, 1));
      chiffreSectorTime[3] = new Image();
      chiffreSectorTime[3].src = `data/chiffres_${couleur}/${centaine_milliseconde}.gif`;
      var unite_milliseconde = parseInt(temps[nbSecteur - 1].substr(11, 1));
      chiffreSectorTime[4] = new Image();
      chiffreSectorTime[4].src = `data/chiffres_${couleur}/${unite_milliseconde}.gif`;

      //chiffre[i].width = 40;
      for (let i = 0; i < 5; i++) {
        chiffreSectorTime[i].width = 40;
        chiffreSectorTime[i].height = 40;
      }

      const Blanc = new Image();
      Blanc.src = `data/chiffres_${couleur}/Points.gif`;
      Blanc.style.width = 40;

      //affichage des images dans le divParent
      for (let i = 0; i < 2; i++) {
        divParent.appendChild(chiffreSectorTime[i]);
      }
      divParent.appendChild(Blanc);
      for (let i = 2; i < 5; i++) {
        divParent.appendChild(chiffreSectorTime[i]);
      }
      break;
  }
}

function tempsPilote(data, idPilote, couleur) {
  const divParent = document.querySelector(`#timePilote${idPilote}`);
  divParent.innerHTML = "";
  const divLapTime = document.createElement("div");
  divLapTime.id = "lapTime";
  divLapTime.innerHTML = "Meilleur tour : ";
  divLapTime.style.color = "violet";

  divParent.innerHTML = `<h2>Meilleur temps de <br>${
    Pilote[data[idPilote - 1]["nomPilote"]]
  }</h2>`;
  //création des trois div (secteur 1, secteur 2, secteur 3)
  const divSecteur1 = createSecteurDiv("Secteur 1 : ", "red");
  const divSecteur2 = createSecteurDiv("Secteur 2 : ", "blue");
  const divSecteur3 = createSecteurDiv("Secteur 3 : ", "yellow");

  divParent.append(divLapTime, divSecteur1, divSecteur2, divSecteur3);

  affichageTempsPilote(data, "lapTime", 0, idPilote, divLapTime, "violet"); //meilleur tour
  affichageTempsPilote(data, "sectorTime", 1, idPilote, divSecteur1, "rouge"); //secteur 1
  affichageTempsPilote(data, "sectorTime", 2, idPilote, divSecteur2, "bleu"); //secteur 2
  affichageTempsPilote(data, "sectorTime", 3, idPilote, divSecteur3, "jaune"); //secteur 3
}

function createSecteurDiv(label, color) {
  const divSecteur = document.createElement("div");
  divSecteur.className = "secteur";
  divSecteur.innerHTML = label;
  divSecteur.style.color = color;
  divSecteur.style.fontSize = "0.7em";
  divSecteur.style.fontWeight = "bold";
  return divSecteur;
}

async function imageGP(data) {
  const divParent = document.querySelector("#imageGp");
  divParent.innerHTML = "";
  const imageGP = new Image();
  imageGP.src = GrandPrix[data[0]["GrandPrix"]]; //vient de l'énumeration en debut de fichier

  divParent.appendChild(imageGP);
}

//---------------------------Gestion du hover sur le points d'interrogation---------------------------

function hoverPointInterrogation(index, slider) {
  let pointInterrogation = document.getElementById(
    "pointInterrogation_" + index
  );
  let popup = document.getElementById("popup_" + index);
  let sliderActuel = document.getElementById(slider);
  let popupOuvert = false; //de base le popup est fermé

  pointInterrogation.onmouseover = () => {
    if (popupOuvert) {
      return; //si le popup est ouvert, on ne fait rien
    }
    popup.style.display = "flex";
    popup.style.flexDirection = "column";
    sliderActuel.style.position = "relative";
    popupOuvert = true;
  };

  pointInterrogation.onmouseout = () => {
    if (!popupOuvert) {
      return;
    }
    popup.style.display = "none";
    sliderActuel.style.position = "static"; //désactivation de la position relative
    popupOuvert = false;
  };
}

//permet de créer un div pour chaque secteur
export {
  gestionFormulairePilote,
  creationSlider,
  grahiquePositionComparaison,
  explicationComparaison,
};
