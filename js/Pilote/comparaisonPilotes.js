//import des données des pilotes
import { tabGlobalDataPilotes } from "./scriptPilote.js";
import { tabGlobalDataGP } from "../Grands-Prix/scriptGP.js";
import { creationDivFormulaire } from "../Grands-Prix/simulationGP.js";

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

async function gestionFormulairePilote() {
  //fonction récupérée dans js/Grands-Prix/simulationGP.js
  creationDivFormulaire(
    document.querySelector(".divGraphique"),
    tabGlobalDataPilotes,
    tabGlobalDataGP,
    "Comparaison !"
  );
  const formulaire = document.getElementById("formulaire");
  formulaire.addEventListener("submit", async (e) => {
    console.log("submit");
    e.preventDefault(); //permet de ne pas recharger la page dès qu'on appuie sur le bouton
    const pilote1 = document.getElementById("selecteurPilote1").value;
    const pilote2 = document.getElementById("selecteurPilote2").value;
    const gp = document.getElementById("selecteurGrandPrix").value;

    //désactiver la soumission du formulaire
    document.getElementById("boutonSubmit").disabled = true;
    // fetch("http://localhost:3000/comparaisonPilote?nomGP=Monaco&saison=2022&nomPilote1=LEC&nomPilote2=VER")
    fetch(
      "http://localhost:3000/comparaisonPilote?nomGP=" +
        gp +
        "&saison=2022&nomPilote1=" +
        pilote1 +
        "&nomPilote2=" +
        pilote2
    );
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

export { creationDivFormulaire, gestionFormulairePilote, creationSlider };
