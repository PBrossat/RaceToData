import { tabGlobalDataGP } from "../SimulationGP/scriptSimulation.js";

//-------------------------------------Gestion de l'introduction de la partie GP----------------
export function afficherIntroductionGP() {
  const sectionStats = document.querySelector("#stats");
  const divIntroEtFormulaire = document.createElement("div");
  divIntroEtFormulaire.classList.add("intro-formulaire");
  sectionStats.appendChild(divIntroEtFormulaire);
  const divIntroduction = document.createElement("div");
  divIntroduction.classList.add("presentation");
  divIntroEtFormulaire.appendChild(divIntroduction);
  const paragrapheIntroduction = document.createElement("p");
  paragrapheIntroduction.innerText =
    "Bienvenue dans notre partie d'analyse de courses de Formule 1 ! Après avoir sélectionné le Grand Prix de votre choix et appuyé sur le bouton 'Analyse !', vous accéderez à une analyse approfondie de la course, avec des graphiques et des commentaires.\n\n qVous pourrez ainsi comprendre les stratégies de course adoptées par les pilotes, comparer leurs rythmes et leurs vitesses maximales, et voir comment ils ont évolué au fil des tours.\n\nNous sommes convaincus que cette partie d'analyse vous aidera à approfondir votre compréhension de la course, à apprécier les performances de vos pilotes préférés et à mieux appréhender les enjeux de la saison de Formule 1.\n\nAlors, lancez-vous dès maintenant dans cette expérience immersive et profitez d'une analyse approfondie de la course pour vivre la Formule 1 comme jamais auparavant !";
  divIntroduction.appendChild(paragrapheIntroduction);
}

//-------------------------------------Création du formulaire de la partie GP----------------

function creationFormulaire(divParent, tabGrandPrix, nomSubmit, nomFormulaire) {
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

  //remplissage du selecteur avec les noms des Grand Prix
  for (let i = 0; i < tabGrandPrix.length; i++) {
    const selecteurGrandPrix = document.querySelector("#selecteurGrandPrix");
    const optionGrandPrix = document.createElement("option");
    optionGrandPrix.value = tabGrandPrix[i].Localisation;
    optionGrandPrix.textContent = tabGrandPrix[i].Localisation;
    selecteurGrandPrix.appendChild(optionGrandPrix);
  }
}

//-------------------------------------Gestion du formulaire de la partie GP----------------

export function gestionFormulaireGP() {
  creationFormulaire(
    document.querySelector("#stats"),
    tabGlobalDataGP,
    "Analyse !",
    "Choisissez le Grand Prix à analyser"
  );
  document
    .querySelector(".intro-formulaire")
    .appendChild(document.querySelector("#divFormulaire"));
  const formulaire = document.getElementById("formulaire");
  formulaire.addEventListener("submit", (e) => {
    //pour éviter le rechargement de la page
    e.preventDefault();
    //désactiver la soumission du formulaire
    // document.getElementById("boutonSubmit").disabled = true;
    //récupération des données du formulaire
    const gp = document.getElementById("selecteurGrandPrix").value;
    // supprimer la div contenant l'analyse précédente
    if (document.querySelector(".analyse") != null) {
      document.querySelector(".analyse").remove();
    }
    //afficherAnalyseGP(gp);
  });
}
