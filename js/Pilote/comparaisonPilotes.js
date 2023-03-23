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
    ).then(async (response) => {
      const data = await response.json();
      const tabComparaisonPilote = await recupererInfosPilotesComparaison(
        pilote1,
        pilote2,
        gp
      );
      resolve(tabComparaisonPilote);
      //console.log(tabComparaisonPilote);
    });
  });
}

export { creationDivFormulaire, gestionFormulairePilote };
