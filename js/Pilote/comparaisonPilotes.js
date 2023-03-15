//import des données des pilotes
import { tabGlobalDataPilotes } from "./scriptPilote.js";

// Créer un tableau avec les noms des grands prix de 2020
//! tableau INUTILE pour la suite du projet mais utile pour tester le fonctionnement du selecteur
var grandsPrix = [
  "GP d'Autriche",
  "GP de Styrie",
  "GP de Hongrie",
  "GP de Grande-Bretagne",
  "GP du 70ème anniversaire",
  "GP d'Espagne",
  "GP de Belgique",
  "GP d'Italie",
  "GP de Toscane",
  "GP de Russie",
  "GP de l'Eifel",
  "GP du Portugal",
  "GP d'Émilie-Romagne",
  "GP de Turquie",
  "GP de Bahreïn",
  "GP de Sakhir",
  "GP d'Abou Dhabi",
];

function creationDivFormulaire() {
  const divParent = document.querySelector(".divGraphique");
  const divFormulaire = document.createElement("div");
  divFormulaire.id = "divFormulairePilote";
  divFormulaire.className = "composantDivGraphique";
  divParent.appendChild(divFormulaire);

  //creation d'un titre pour le formulaire
  const titreFormulaire = document.createElement("h2");
  titreFormulaire.id = "titreFormulaire";
  titreFormulaire.textContent = "Choix des pilotes et du Grand Prix";
  divFormulaire.appendChild(titreFormulaire);

  //creation d'une balise hr pour séparer le titre du formulaire
  const hr = document.createElement("hr");
  divFormulaire.appendChild(hr);

  //creation de deux selecteurs pour choisir un pilote
  for (let i = 1; i <= 2; i++) {
    const selecteurPilote = document.createElement("select");
    selecteurPilote.className = "selecteur";
    selecteurPilote.id = "selecteurPilote" + i;
    //valeur de base du selecteur : "Pilote 1" ou "Pilote 2"
    const optionPilote = document.createElement("option");
    optionPilote.value = "Pilote " + i;
    optionPilote.textContent = "Pilote " + i;
    optionPilote.selected = true;
    selecteurPilote.appendChild(optionPilote);
    divFormulaire.appendChild(selecteurPilote);
  }

  //creation d'un selecteur pour choisir le Grand Prix
  const selecteurGrandPrix = document.createElement("select");
  selecteurGrandPrix.id = "selecteurGrandPrix";
  selecteurGrandPrix.className = "selecteur";
  //valeur de base du selecteur : "Grand Prix"
  const optionGrandPrix = document.createElement("option");
  optionGrandPrix.value = "Grand Prix";
  optionGrandPrix.textContent = "Grand Prix";
  optionGrandPrix.selected = true;
  selecteurGrandPrix.appendChild(optionGrandPrix);
  divFormulaire.appendChild(selecteurGrandPrix);

  //creation d'un bouton pour valider le choix
  const boutonValider = document.createElement("button");
  boutonValider.id = "boutonValider";
  boutonValider.textContent = "Valider";
  divFormulaire.appendChild(boutonValider);

  //remplissage des selecteur avec les noms des pilotes
  for (let i = 0; i < tabGlobalDataPilotes.length; i++) {
    const selecteurPilote1 = document.querySelector("#selecteurPilote1");
    const selecteurPilote2 = document.querySelector("#selecteurPilote2");
    const optionPilote = document.createElement("option");
    optionPilote.value = tabGlobalDataPilotes[i].Name;
    optionPilote.textContent = tabGlobalDataPilotes[i].Name;
    selecteurPilote1.appendChild(optionPilote);
    selecteurPilote2.appendChild(optionPilote.cloneNode(true));
  }

  //remplissage du selecteur avec les noms des Grand Prix
  for (let i = 0; i < grandsPrix.length; i++) {
    const selecteurGrandPrix = document.querySelector("#selecteurGrandPrix");
    const optionGrandPrix = document.createElement("option");
    optionGrandPrix.value = grandsPrix[i];
    optionGrandPrix.textContent = grandsPrix[i];
    selecteurGrandPrix.appendChild(optionGrandPrix);
  }
}

export { creationDivFormulaire };
