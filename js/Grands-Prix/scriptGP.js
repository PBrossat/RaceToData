import { afficherMapGP } from "../SimulationGP/mapGP.js";
import {
  afficherIntroductionGP,
  gestionFormulaireGP,
} from "./introductionEtFormulaireGP.js";
//-------------------------------Gestion du click sur le bouton de la card des grands-prix--------------------------------------------------

const boutonDecouvrirStatsGrandsPrix = document.querySelector(
  ".btn-decouvrir-stats-grands-prix"
);
boutonDecouvrirStatsGrandsPrix.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherMapGP();
  afficherIntroductionGP();
  gestionFormulaireGP();
});
