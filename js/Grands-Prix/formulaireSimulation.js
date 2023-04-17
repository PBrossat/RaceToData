import { animateRace } from "./animationGP.js";
import { tabGlobalDataPilotes } from "../Pilote/scriptPilote.js";
import { tabGlobalDataGP } from "./scriptGP.js";
import {
  afficherSimulationGP,
  afficherGrapheTelemetries,
} from "./affichageSimulation.js";

//Class driver
export class Driver {
  constructor(lastName) {
    this.lastName = lastName;
    this.telemetry = {
      speed: 0, // value in the [0-360] range, measured in km/h
      rpm: 0, // measured in rpm
      drs: false, // boolean, highlighting the DRS string if true
      throttle: 0, // value in the [0-1] range, highlighted in the green band of the inner circle
      brake: false, // boolean, highlighting the red band next to the throttle area
      gear: 0,
    };
  }
}

//Creation de scale pour afficher le tracé du circuit
var xScale = d3.scaleLinear().domain([-25000, 25000]).range([0, 1600]);
var yScale = d3.scaleLinear().domain([-25000, 25000]).range([0, 1600]);

//------------------------------------Récupération des données des pilotes et des Grand Prix------------------------------------------------------------
async function recupererInfosSimulationGP(driver1, driver2, gp) {
  const data = await fetch(
    "/dataSimulationGP?namePilote1=" +
      driver1 +
      "&namePilote2=" +
      driver2 +
      "&nameGP=" +
      gp
  );
  const dataJSON = await data.json();
  return dataJSON;
}

//------------------------------------Création du formulaire de simulation------------------------------------------------------------
export function creationDivFormulaire(
  divParent,
  tabPilote,
  tabGrandPrix,
  nomSubmit,
  nomFormulaire
) {
  const divFormulaire = document.createElement("div");
  divFormulaire.id = "divFormulaire";
  divParent.appendChild(divFormulaire);

  //creation du titre du formulaire
  const titreFormulaire = document.createElement("h2");
  titreFormulaire.textContent = nomFormulaire;
  divFormulaire.appendChild(titreFormulaire);

  //création de la balise form
  const formulaire = document.createElement("form");
  formulaire.id = "formulaire";
  divFormulaire.appendChild(formulaire);

  //creation de deux selecteurs pour choisir un pilote
  for (let i = 1; i <= 2; i++) {
    const selecteurPilote = document.createElement("select");
    selecteurPilote.id = "selecteurPilote" + i;
    selecteurPilote.className = "selecteur";
    selecteurPilote.required = true;
    selecteurPilote.name = "selecteurPilote" + i;
    //valeur de base du selecteur : "Pilote 1" ou "Pilote 2"
    const optionPilote = document.createElement("option");
    optionPilote.selected = true;
    optionPilote.value = "";
    optionPilote.disabled = true;
    optionPilote.hidden = true;
    optionPilote.textContent = "Pilote " + i;
    selecteurPilote.appendChild(optionPilote);
    formulaire.appendChild(selecteurPilote);
  }

  //creation d'un selecteur pour choisir le Grand Prix
  const selecteurGrandPrix = document.createElement("select");
  selecteurGrandPrix.id = "selecteurGrandPrix";
  selecteurGrandPrix.className = "selecteur";
  selecteurGrandPrix.required = true;
  selecteurGrandPrix.name = "selecteurGrandPrix";
  //valeur de base du selecteur : "Grand Prix"
  const optionGrandPrix = document.createElement("option");
  optionGrandPrix.selected = true;
  optionGrandPrix.value = "";
  optionGrandPrix.disabled = true;
  optionGrandPrix.hidden = true;
  optionGrandPrix.textContent = "Grand Prix";
  selecteurGrandPrix.appendChild(optionGrandPrix);
  formulaire.appendChild(selecteurGrandPrix);

  //creation d'un bouton pour valider le choix
  const boutonSubmit = document.createElement("button");
  boutonSubmit.id = "boutonSubmit";
  boutonSubmit.type = "submit";
  boutonSubmit.name = "boutonSubmit";
  boutonSubmit.textContent = nomSubmit;
  formulaire.appendChild(boutonSubmit);

  //remplissage des selecteur avec les noms des pilotes
  for (let i = 0; i < tabPilote.length; i++) {
    const selecteurPilote1 = document.querySelector("#selecteurPilote1");
    const selecteurPilote2 = document.querySelector("#selecteurPilote2");
    const optionPilote = document.createElement("option");
    optionPilote.value = tabPilote[i].Abbrieviation;
    optionPilote.textContent = tabPilote[i].Name;
    selecteurPilote1.appendChild(optionPilote);
    selecteurPilote2.appendChild(optionPilote.cloneNode(true));
  }

  //remplissage du selecteur avec les noms des Grand Prix
  for (let i = 0; i < tabGrandPrix.length; i++) {
    const selecteurGrandPrix = document.querySelector("#selecteurGrandPrix");
    const optionGrandPrix = document.createElement("option");
    optionGrandPrix.value = tabGrandPrix[i].Localisation;
    optionGrandPrix.textContent = tabGrandPrix[i].Localisation;
    selecteurGrandPrix.appendChild(optionGrandPrix);
  }
}

//--------------------------------------------Gestion du formulaire------------------------------------------------------------
export function gestionFormulaireGP() {
  creationDivFormulaire(
    document.querySelector("#stats"),
    tabGlobalDataPilotes,
    tabGlobalDataGP,
    "Lancer la simulation",
    "Comparez les meilleurs tours de vos pilotes préférés !"
  );
  document
    .querySelector(".intro-formulaire")
    .appendChild(document.querySelector("#divFormulaire"));
  const formulaire = document.getElementById("formulaire");
  formulaire.addEventListener("submit", (e) => {
    //pour éviter le rechargement de la page
    e.preventDefault();
    //désactiver la soumission du formulaire
    document.getElementById("boutonSubmit").disabled = true;
    //récupération des données du formulaire
    const driver1 = document.getElementById("selecteurPilote1").value;
    const driver2 = document.getElementById("selecteurPilote2").value;
    const gp = document.getElementById("selecteurGrandPrix").value;
    //supprimer la div contenant la simulation précédente
    if (document.querySelector(".simulation") != null) {
      document.querySelector(".simulation").remove();
    }
    if (
      document.querySelector(".div-graphe-telemetries-et-explication") != null
    ) {
      document.querySelector(".div-graphe-telemetries-et-explication").remove();
    }
    recupererInfosSimulationGP(driver1, driver2, gp).then(
      (tabInfosSimulationGP) => {
        //Mettre à l'échelle les coordonnées des pilotes et réupérer les max et min de chaque axe pour la taile du canva
        for (let i = 0; i < tabInfosSimulationGP[0]["coordX"].length; i++) {
          tabInfosSimulationGP[0]["coordX"][i] = xScale(
            tabInfosSimulationGP[0]["coordX"][i]
          );
          tabInfosSimulationGP[0]["coordY"][i] = yScale(
            tabInfosSimulationGP[0]["coordY"][i]
          );
        }
        //Les deux pilotes n'ont pas forcément la même longueur de tableau
        for (let i = 0; i < tabInfosSimulationGP[1]["coordX"].length; i++) {
          tabInfosSimulationGP[1]["coordX"][i] = xScale(
            tabInfosSimulationGP[1]["coordX"][i]
          );
          tabInfosSimulationGP[1]["coordY"][i] = yScale(
            tabInfosSimulationGP[1]["coordY"][i]
          );
        }
        //récupération des max et min de chaque axe pour la taille du canva
        let xMax = Math.max(
          Math.max(...tabInfosSimulationGP[0]["coordX"]),
          Math.max(...tabInfosSimulationGP[1]["coordX"])
        );
        let yMax = Math.max(
          Math.max(...tabInfosSimulationGP[0]["coordY"]),
          Math.max(...tabInfosSimulationGP[1]["coordY"])
        );
        let xMin = Math.min(
          Math.min(...tabInfosSimulationGP[0]["coordX"]),
          Math.min(...tabInfosSimulationGP[1]["coordX"])
        );
        let yMin = Math.min(
          Math.min(...tabInfosSimulationGP[0]["coordY"]),
          Math.min(...tabInfosSimulationGP[1]["coordY"])
        );
        //réajustement des coordx et coordy en enlevant les min de chaque axe
        for (let i = 0; i < tabInfosSimulationGP[0]["coordX"].length; i++) {
          tabInfosSimulationGP[0]["coordX"][i] -= xMin;
          tabInfosSimulationGP[0]["coordY"][i] -= yMin;
        }
        for (let i = 0; i < tabInfosSimulationGP[1]["coordX"].length; i++) {
          tabInfosSimulationGP[1]["coordX"][i] -= xMin;
          tabInfosSimulationGP[1]["coordY"][i] -= yMin;
        }

        let Driver1 = new Driver(driver1);
        let Driver2 = new Driver(driver2);

        afficherSimulationGP(xMin, yMin, xMax, yMax);
        //move window
        document.querySelector(".simulation").scrollIntoView(true);
        //descendre plus

        animateRace(tabInfosSimulationGP[0], "car1", "compteur1", Driver1);
        animateRace(tabInfosSimulationGP[1], "car2", "compteur2", Driver2);

        afficherGrapheTelemetries(driver1, driver2, gp);
      }
    );
    //Attendre que l'animation soit terminée pour en relancer une autre -> temps mis à la zeub
    setTimeout(() => {
      //désactiver la soumission du formulaire
      document.getElementById("boutonSubmit").disabled = false;
    }, 26000); //environ la durée de l'animation si on a déjà les données
  });
}
