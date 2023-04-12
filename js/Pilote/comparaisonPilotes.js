//import des données des pilotes
import { tabGlobalDataPilotes } from "./scriptPilote.js";
import { tabGlobalDataGP } from "../Grands-Prix/scriptGP.js";

async function gestionFormulairePilote() {
  const formulaire = document.getElementById("formulaire");
  formulaire.addEventListener("submit", async (e) => {
    e.preventDefault(); //permet de ne pas recharger la page dès qu'on appuie sur le bouton
    const pilote1 = document.getElementById("selecteurPilote1").value;
    const pilote2 = document.getElementById("selecteurPilote2").value;
    const gp = document.getElementById("selecteurGrandPrix").value;

    //desactivation de la soumission du formulaire
    document.getElementById("boutonSubmit").disabled = true;
    // fetch("http://localhost:3000/comparaisonPilote?nomGP=Monaco&saison=2022&nomPilote1=LEC&nomPilote2=VER")
    const response = await fetch(
      `/dataComparaison?nomGP=${gp}&nomPilote1=${pilote1}&nomPilote2=${pilote2}`
    );

    const data = await response.json();
    grahiquePositionComparaison(data);
    pneuPilote(data, 0);
    pneuPilote(data, 1);
    tempsPilote(data, 1, "bleu");
    tempsPilote(data, 2, "vert");
  });
}

function creationSlider() {
  const divParent = document.querySelector(".divGraphique");
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
  sliderNav.appendChild(boutonGauche);

  //création du bouton de droite
  const boutonDroite = document.createElement("button");
  boutonDroite.className = "sliderNav__button";
  boutonDroite.id = "boutonDroite";
  boutonDroite.onclick = function () {
    next();
    desactiverBoutons();
  };
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
  //création de deux div dans timeSlider
  const timePilote1 = document.createElement("div");
  timePilote1.className = "timePilote";
  timePilote1.id = "timePilote1";
  timeSlider.appendChild(timePilote1);
  const timePilote2 = document.createElement("div");
  timePilote2.className = "timePilote";
  timePilote2.id = "timePilote2";
  timeSlider.appendChild(timePilote2);

  divParent.appendChild(slider);
}

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

async function grahiquePositionComparaison(tabGlobalDataPilotesComparaison) {
  console.log(tabGlobalDataPilotesComparaison);
  //récuperation de la div parent
  const divParent = document.querySelector("#positionSlider");

  //creation du titre
  const titre = document.createElement("h2");
  titre.innerHTML =
    "Position de " +
    tabGlobalDataPilotesComparaison[0]["nomPilote"] +
    " et de " +
    tabGlobalDataPilotesComparaison[1]["nomPilote"] +
    " au départ et à l'arrivée";
  const sousTitre = document.createElement("h3");
  sousTitre.innerHTML =
    "Grand-Prix : " + tabGlobalDataPilotesComparaison[0]["GrandPrix"] + ".";
  divParent.appendChild(titre);
  divParent.appendChild(sousTitre);

  //Creation div où se trouve le graphique
  const divGraphique = document.createElement("div");
  divGraphique.id = "graphiquePositionGP";
  divParent.appendChild(divGraphique);

  let tabPositionPilote1 = [2];
  let tabPositionPilote2 = [2];
  tabPositionPilote1[0] = tabGlobalDataPilotesComparaison[0]["positionDepart"];
  tabPositionPilote1[1] = tabGlobalDataPilotesComparaison[0]["positionArrivee"];
  tabPositionPilote2[0] = tabGlobalDataPilotesComparaison[1]["positionDepart"];
  tabPositionPilote2[1] = tabGlobalDataPilotesComparaison[1]["positionArrivee"];

  const graphique = document.getElementById("graphiquePositionGP");

  const styleText = { color: "#FFFFFF", fontWeight: "bold" };

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
        },
      },
      min: 1,
      max: 20,
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
      },
    },

    series: [
      {
        name: tabGlobalDataPilotesComparaison[0]["nomPilote"],
        data: tabPositionPilote1,
        color: "#FF0000",
      },
      {
        name: tabGlobalDataPilotesComparaison[1]["nomPilote"], // nom de la série de données pour le pilote 2
        data: tabPositionPilote2, // les données du pilote 2 à afficher
        color: "#FFD700",
      },
    ],
  });
}

async function pneuPilote(data, idPilote) {
  const divParent = document.querySelector(`#pneuPilote${idPilote + 1}`);
  divParent.style.display = "flex";
  divParent.style.flexDirection = "column";
  divParent.style.height = "60%";
  divParent.style.top = "10%";

  //creation du titre
  const titre = document.createElement("h2");
  titre.innerHTML = "Pneu utilisés par " + data[idPilote]["nomPilote"];
  divParent.appendChild(titre);

  for (let i = 0; i < data[idPilote]["pneu"].length; i++) {
    const divPneu = document.createElement("div");
    divPneu.className = "pneu";
    //hauteur de la div s'adapte en fonction de data[idPilote]["pneu"].length
    divPneu.style.height = `${100 / data[idPilote]["pneu"].length - 3}%`;

    //insertion de l'image du pneu dans la div
    switch (data[idPilote]["pneu"][i]) {
      case "SOFT":
        divPneu.innerHTML =
          "<img src='data/pneu/soft.png' alt='pneuSoft' class='pneu__image' >";
        break;
      case "MEDIUM":
        divPneu.innerHTML =
          "<img src='data/pneu/medium.png' alt='pneuMedium' class='pneu__image' >";
        break;
      case "HARD":
        divPneu.innerHTML =
          "<img src='data/pneu/hard.png' alt='pneuHard' class='pneu__image' >";
        break;
      case "INTERMEDIATE":
        divPneu.innerHTML =
          "<img src='data/pneu/inter.png' alt='pneuIntermediate' class='pneu__image' >";
        break;
      case "WET":
        divPneu.innerHTML =
          "<img src='data/pneu/wet.png' alt='pneuWet' class='pneu__image' >";
        break;
    }

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
  const divLapTime = document.createElement("div");
  divLapTime.id = "lapTime";
  divLapTime.innerHTML = "Meilleur tour : ";
  divLapTime.style.color = "white";

  //création des trois div (secteur 1, secteur 2, secteur 3)
  const divSecteur1 = createSecteurDiv("Secteur 1 : ", "red");
  const divSecteur2 = createSecteurDiv("Secteur 2 : ", "blue");
  const divSecteur3 = createSecteurDiv("Secteur 3 : ", "yellow");

  divParent.append(divLapTime, divSecteur1, divSecteur2, divSecteur3);

  affichageTempsPilote(data, "lapTime", 0, idPilote, divLapTime, couleur);
  affichageTempsPilote(data, "sectorTime", 1, idPilote, divSecteur1, couleur);
  affichageTempsPilote(data, "sectorTime", 2, idPilote, divSecteur2, couleur);
  affichageTempsPilote(data, "sectorTime", 3, idPilote, divSecteur3, couleur);
}

//permet de créer un div pour chaque secteur
function createSecteurDiv(label, color) {
  const divSecteur = document.createElement("div");
  divSecteur.className = "secteur";
  divSecteur.innerHTML = label;
  divSecteur.style.color = color;
  divSecteur.style.fontSize = "0.7em";
  divSecteur.style.fontWeight = "bold";
  return divSecteur;
}
export { gestionFormulairePilote, creationSlider, grahiquePositionComparaison };
