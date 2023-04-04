//import des données des pilotes
import { tabGlobalDataPilotes } from "./scriptPilote.js";
import { tabGlobalDataGP } from "../Grands-Prix/scriptGP.js";
//import { creationDivFormulaire } from "../Grands-Prix/simulationGP.js";

async function recupererInfosPilotesComparaison(pilote1, pilote2, gp) {
  let response = await fetch(
    "../json/comparaisonPilote/comparaison" +
      pilote1 +
      "_" +
      pilote2 +
      "_" +
      gp +
      ".json"
  );
  response = await response.json();
  return response;
}

let tabGlobalDataPilotesComparaison = [];
async function gestionFormulairePilote() {
  const formulaire = document.getElementById("formulaire");
  formulaire.addEventListener("submit", async (e) => {
    console.log("submit");
    e.preventDefault(); //permet de ne pas recharger la page dès qu'on appuie sur le bouton
    const pilote1 = document.getElementById("selecteurPilote1").value;
    const pilote2 = document.getElementById("selecteurPilote2").value;
    const gp = document.getElementById("selecteurGrandPrix").value;

    //desactivation de la soumission du formulaire
    document.getElementById("boutonSubmit").disabled = true;
    // fetch("http://localhost:3000/comparaisonPilote?nomGP=Monaco&saison=2022&nomPilote1=LEC&nomPilote2=VER")
    const response = await fetch(
      `http://localhost:3000/comparaisonPilote?nomGP=${gp}&saison=2022&nomPilote1=${pilote1}&nomPilote2=${pilote2}`
    );

    const data = await response.json();
    grahiquePositionComparaison(data);
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
  };
  sliderNav.appendChild(boutonGauche);

  //création du bouton de droite
  const boutonDroite = document.createElement("button");
  boutonDroite.className = "sliderNav__button";
  boutonDroite.id = "boutonDroite";
  boutonDroite.onclick = function () {
    next();
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
  const timeSlider = document.createElement("div");
  timeSlider.className = "slider__item";
  timeSlider.id = "timeSlider";
  sliderContent.appendChild(timeSlider);
  const positionSlider = document.createElement("div");
  positionSlider.className = "slider__item";
  positionSlider.id = "positionSlider";
  sliderContent.appendChild(positionSlider);
  const pneuSlider = document.createElement("div");
  pneuSlider.className = "slider__item";
  pneuSlider.id = "pneuSlider";
  sliderContent.appendChild(pneuSlider);

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

export { gestionFormulairePilote, creationSlider, grahiquePositionComparaison };
