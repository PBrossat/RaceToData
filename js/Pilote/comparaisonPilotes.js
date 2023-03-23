//import des données des pilotes
import { tabGlobalDataPilotes } from "./scriptPilote.js";
import { tabGlobalDataGP } from "../Grands-Prix/scriptGP.js";
import { creationDivFormulaire } from "../Grands-Prix/simulationGP.js";

function gestionFormulairePilote() {
  //fonction récupérée dans js/Grands-Prix/simulationGP.js
  creationDivFormulaire(
    document.querySelector(".divGraphique"),
    tabGlobalDataPilotes,
    tabGlobalDataGP,
    "Comparaison !"
  );
  const formulaire = document.getElementById("formulaire");
  formulaire.addEventListener("submit", (e) => {
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

// fetch(
//   "http://localhost:3001/comparaisonPilote?nomGP=${valeurSelecteurGrandPrix}&saison=2022&nomPilote1=${valeuSelecteurPilote1}&nomPilote2=${valeuSelecteurPilote1}"
// );

export { creationDivFormulaire, gestionFormulairePilote };
