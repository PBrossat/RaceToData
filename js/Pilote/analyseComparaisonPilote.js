//import des énumérations
import { Pilote, CouleurPilote } from "./enumeration.js";

//---------------------------Analyse des données---------------------------
function analysePosition(data) {
  const divParent = document.querySelector("#popup_0");
  const divTitre = document.createElement("div");
  divTitre.className = "titreAnalyse";
  divTitre.id = "titreAnalysePosition";
  const titre = document.createElement("h2");
  const paragraphe = document.createElement("p");
  divParent.innerHTML = "";

  let couleurPilote1 = CouleurPilote[data[0]["nomPilote"]];
  let couleurPilote2 = CouleurPilote[data[1]["nomPilote"]];

  let nomPiloteDevantDepart = "";
  let couleurPiloteDevantDepart = "";
  let positionPlusDevantDepart = Number.MAX_VALUE; //initialisé à la valeur la plus grande possible
  let nomPiloteDerriereDepart = "";
  let couleurPiloteDerriereDepart = "";

  for (let i = 0; i < data.length; i++) {
    if (data[i]["positionDepart"] < positionPlusDevantDepart) {
      positionPlusDevantDepart = data[i]["positionDepart"];
      nomPiloteDevantDepart = Pilote[data[i]["nomPilote"]];
      couleurPiloteDevantDepart = CouleurPilote[data[i]["nomPilote"]];
    }
  }
  if (nomPiloteDevantDepart == Pilote[data[0]["nomPilote"]]) {
    nomPiloteDerriereDepart = Pilote[data[1]["nomPilote"]];
    couleurPiloteDerriereDepart = CouleurPilote[data[1]["nomPilote"]];
  } else {
    nomPiloteDerriereDepart = Pilote[data[0]["nomPilote"]];
    couleurPiloteDerriereDepart = CouleurPilote[data[0]["nomPilote"]];
  }

  titre.innerHTML = `Analyse des positions de ${
    Pilote[data[0]["nomPilote"]]
  } et de ${Pilote[data[1]["nomPilote"]]}<br>`;
  paragraphe.innerHTML += `<br>Durant le Grand Prix de ${data[0]["GrandPrix"]}, <span style="color:${couleurPiloteDevantDepart}; font-weight:bold">${nomPiloteDevantDepart}</span> a commencé devant <span style="color:${couleurPiloteDerriereDepart}; font-weight:bold">${nomPiloteDerriereDepart}</span>.<br><br>
    Cela signifie que <span style="color:${couleurPiloteDevantDepart}; font-weight:bold">${nomPiloteDevantDepart}</span> a effectué un meilleur temps en qualification que <span style="color:${couleurPiloteDerriereDepart}; font-weight:bold">${nomPiloteDerriereDepart}</span>.<br>
    Cela peut être dû à un meilleur pilotage, mais aussi au choix des pneus, de la météo ou encore des performances de la monoplace (la formule 1). <br><br>`;

  let texteAdaptatif = "";
  let nomPiloteDevantArrive = "";
  let nomPiloteDerriereArrive = "";
  let positionPlusDevantArrive = Number.MAX_VALUE; //initialisé à la valeur la plus grande possible
  let positionVainqueurArrivee = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i]["positionArrivee"] < positionPlusDevantArrive) {
      positionPlusDevantArrive = data[i]["positionArrivee"];
      nomPiloteDevantArrive = Pilote[data[i]["nomPilote"]];
    }
  }

  if (nomPiloteDevantArrive == Pilote[data[0]["nomPilote"]]) {
    nomPiloteDerriereArrive = Pilote[data[1]["nomPilote"]];
  } else {
    nomPiloteDerriereArrive = Pilote[data[0]["nomPilote"]];
  }

  for (let i = 0; i < data.length; i++) {
    if (Pilote[data[i]["nomPilote"]] === nomPiloteDevantArrive) {
      positionVainqueurArrivee = data[i].positionArrivee;
    }
  }

  let preposition = "";
  if (positionVainqueurArrivee == 1) {
    preposition = "er";
  } else {
    preposition = "ème";
  }

  if (nomPiloteDevantDepart == nomPiloteDevantArrive) {
    texteAdaptatif = ` Au final <span style="color:${couleurPiloteDevantDepart}; font-weight:bold">${nomPiloteDevantDepart}</span> est resté devant <span style="color:${couleurPiloteDerriereDepart}; font-weight:bold">${nomPiloteDerriereDepart}</span> durant tout le Grand-Prix et arrive ${positionVainqueurArrivee}${preposition} de la course.<br><br>
      `;
  } else {
    texteAdaptatif = ` Au final <span style="color:${couleurPiloteDerriereDepart}; font-weight:bold">${nomPiloteDerriereDepart}</span> est passé devant <span style="color:${couleurPiloteDevantDepart}; font-weight:bold">${nomPiloteDevantDepart}</span> durant le Grand-Prix et arrive ${positionVainqueurArrivee}${preposition} de la course.<br><br>
      `;
  }

  paragraphe.innerHTML += texteAdaptatif;

  //texte adaptatif permettant de savoir l'evolution des places de chaque pilote
  if (data[0]["positionDepart"] > data[0]["positionArrivee"]) {
    paragraphe.innerHTML += ` Enfin, <span style="color:${couleurPilote1}; font-weight:bold">${
      Pilote[data[0]["nomPilote"]]
    }</span> a donc gagné ${
      data[0]["positionDepart"] - data[0]["positionArrivee"]
    } places <br>
      `;
  } else {
    paragraphe.innerHTML += ` Enfin, <span style="color:${couleurPilote1}; font-weight:bold">${
      Pilote[data[0]["nomPilote"]]
    }</span> a donc perdu ${
      data[0]["positionArrivee"] - data[0]["positionDepart"]
    } places`;
  }
  if (data[1]["positionDepart"] > data[1]["positionArrivee"]) {
    paragraphe.innerHTML += ` et <span style="color:${couleurPilote2}; font-weight:bold">${
      Pilote[data[1]["nomPilote"]]
    }</span> en a gagné ${
      data[1]["positionDepart"] - data[1]["positionArrivee"]
    } durant le Grand Prix.<br>
      `;
  } else {
    paragraphe.innerHTML += ` et <span style="color:${couleurPilote2}; font-weight:bold">${
      Pilote[data[1]["nomPilote"]]
    }</span> en a perdu ${
      data[1]["positionArrivee"] - data[1]["positionDepart"]
    } durant le Grand Prix.<br>
      `;
  }

  divTitre.appendChild(titre);
  divParent.appendChild(divTitre);
  divParent.appendChild(paragraphe);
}

function analysePneus(data) {
  const divParent = document.querySelector("#popup_1");
  const divTitre = document.createElement("div");
  divTitre.className = "titreAnalyse";
  divTitre.id = "titreAnalysePneus";
  const titre = document.createElement("h2");
  const paragraphe = document.createElement("p");
  divParent.innerHTML = "";

  //couleur pour chaque pilote (pour un visuel plus agréable)
  let couleurPilote1 = CouleurPilote[data[0]["nomPilote"]];
  let couleurPilote2 = CouleurPilote[data[1]["nomPilote"]];

  titre.innerHTML = `Analyse des pneus de ${
    Pilote[data[0]["nomPilote"]]
  } et de ${Pilote[data[1]["nomPilote"]]} <br>`;

  //description des avantages de chaque pneus
  const pneus = {
    SOFT: "offre une adhérence maximale et une faible résistance au roulement, mais s'use rapidement.",
    MEDIUM:
      "offre un équilibre entre adhérence et longévité, il est souvent utilisé pour les courses standards.",
    HARD: "offre une durée de vie plus longue, mais fournit moins d'adhérence que les pneus plus tendres.",
    INTERMEDIATE:
      "est conçu pour les conditions humides ou légèrement humides, il offre une bonne adhérence sur piste mouillée.",
    WET: "est conçu pour les fortes pluies, offrant une adhérence maximale sur piste mouillée.",
  };

  const texteAdaptatifMemePneu = pneus[data[0]["pneu"][0]]; //cas même pneus
  //cas pneus differents
  const texteAdaptatifPneuPilote1 = pneus[data[0]["pneu"][0]];
  const texteAdaptatifPneuPilote2 = pneus[data[1]["pneu"][0]];

  if (data[0]["pneu"][0] == data[1]["pneu"][0]) {
    //même type de pneu au départ
    paragraphe.innerHTML += `<br>Au départ du Grand-Prix, <span style="color:${couleurPilote1}; font-weight:bold">${
      Pilote[data[0]["nomPilote"]]
    }</span> et <span style="color:${couleurPilote2}; font-weight:bold">${
      Pilote[data[1]["nomPilote"]]
    }</span> ont choisi le même type de pneu : ${data[0]["pneu"][0]}<br>
    celui-ci `;
    paragraphe.innerHTML += texteAdaptatifMemePneu + "<br>";
  } else {
    //pneu différents au départ
    paragraphe.innerHTML += `<br>Au départ du Grand-Prix, <span style="color:${couleurPilote1}; font-weight:bold">${
      Pilote[data[0]["nomPilote"]]
    }</span> et <span style="color:${couleurPilote2}; font-weight:bold">${
      Pilote[data[1]["nomPilote"]]
    }</span> ont choisi une statégie différente,<br> 
    pneus ${
      data[0]["pneu"][0]
    } pour <span style="color:${couleurPilote1}; font-weight:bold">${
      Pilote[data[0]["nomPilote"]]
    }</span> et ${
      data[1]["pneu"][0]
    } pour <span style="color:${couleurPilote2}; font-weight:bold">${
      Pilote[data[1]["nomPilote"]]
    }</span><br><br>
    Le pneu ${data[0]["pneu"][0]} `;
    paragraphe.innerHTML += texteAdaptatifPneuPilote1 + "<br>";
    paragraphe.innerHTML += `Et le pneu ${data[1]["pneu"][0]} `;
    paragraphe.innerHTML += texteAdaptatifPneuPilote2 + "<br>";
  }

  //si un seul pneu utilisé durant le GP
  for (let i = 0; i < data.length; i++) {
    if (
      data[i]["pneu"].length == 1 &&
      data[i]["pneu"][0] != "INTERMEDIATE" &&
      data[i]["pneu"][0] != "WET"
    ) {
      paragraphe.innerHTML += `<br> On peut voir ici que <span style="color:${
        CouleurPilote[[data[i]["nomPilote"]]]
      }; font-weight:bold">${
        Pilote[data[i]["nomPilote"]]
      }</span> a utilisé qu'un unique type de pneu durant le Grand Prix.<br>
      Cela s'explique par le fait que <span style="color:${
        CouleurPilote[[data[i]["nomPilote"]]]
      }; font-weight:bold">${
        Pilote[data[i]["nomPilote"]]
      }</span> a été contraint d'abandonner la course au tour ${
        data[i]["nbToursEffectuees"]
      } (Do Not Finish). <br>
      En voici la raison : ${data[i]["statu"]}.<br>`;
    } else if (
      data[i]["statu"] != "Finished" &&
      !data[i]["statu"].startsWith("+")
    ) {
      paragraphe.innerHTML += `<br> On peut voir ici que <span style="color:${
        CouleurPilote[[data[i]["nomPilote"]]]
      }; font-weight:bold">${
        Pilote[data[i]["nomPilote"]]
      }</span> n'a pas fini la course.<br>
      Cela s'explique par le fait qu'il a été contraint d'abandonner la course au tour ${
        data[i]["nbToursEffectuees"]
      } (Do Not Finish). <br>
      En voici la raison : ${data[i]["statu"]}.<br>`;
    }
  }
  divTitre.appendChild(titre);
  divParent.appendChild(divTitre);
  divParent.appendChild(paragraphe);
}

function analyseTemps(data) {
  const divParent = document.querySelector("#popup_2");
  const divTitre = document.createElement("div");
  divTitre.className = "titreAnalyse";
  divTitre.id = "titreAnalyseTemps";
  const titre = document.createElement("h2");
  const paragraphe = document.createElement("p");
  divParent.innerHTML = "";

  //couleur pour chaque pilote (pour un visuel plus agréable)
  let couleurPilote1 = CouleurPilote[data[0]["nomPilote"]];
  let couleurPilote2 = CouleurPilote[data[1]["nomPilote"]];

  titre.innerHTML = `Analyse des temps de <span style="color:${couleurPilote1}; font-weight:bold">${
    Pilote[data[0]["nomPilote"]]
  }</span> et de ${Pilote[data[1]["nomPilote"]]} <br>`;
  paragraphe.innerHTML += `<br>Vous pouvez observer en <span style="color:violet; font-weight:bold">violet</span> le meilleur temps des deux pilotes. <br>
  Vous pouvez aussi y trouver:<br>
  En <span style="color:red; font-weight:bold">rouge</span> le temps lors du premier secteur, en <span style="color:blue; font-weight:bold">bleu</span> celui du deuxième et en <span style="color:yellow; font-weight:bold">jaune</span> celui du troisième.<br>
  Pour comprendre ce qu'est un secteur d'un circuit de Formule1, il suffit de regarder la tracé du circuit affiché juste en dessous des temps.<br>`;

  let meilleurTemps = "";
  let moinsBonTemps = "";

  //définition du meilleur temps en comparant le meilleur temps respectif des deux pilotes
  let tempsPilote1 = data[0]["meilleurTour"]
    .split(":")
    .reduce(
      (acc, val, index) =>
        acc +
        (index === 0
          ? parseInt(val, 10) * 3600
          : index === 1
          ? parseInt(val, 10) * 60
          : parseFloat(val)),
      0
    );
  let tempsPilote2 = data[1]["meilleurTour"]
    .split(":")
    .reduce(
      (acc, val, index) =>
        acc +
        (index === 0
          ? parseInt(val, 10) * 3600
          : index === 1
          ? parseInt(val, 10) * 60
          : parseFloat(val)),
      0
    );

  let couleurMeilleursTemps = "";
  let couleurMoinsBonTemps = "";
  if (tempsPilote1 < tempsPilote2) {
    meilleurTemps = Pilote[data[0]["nomPilote"]];
    couleurMeilleursTemps = couleurPilote1;
    moinsBonTemps = Pilote[data[1]["nomPilote"]];
    couleurMoinsBonTemps = couleurPilote2;
  } else {
    meilleurTemps = Pilote[data[1]["nomPilote"]];
    couleurMeilleursTemps = couleurPilote2;
    moinsBonTemps = Pilote[data[0]["nomPilote"]];
    couleurMoinsBonTemps = couleurPilote1;
  }
  //diffTemps = meilleurTemps - moinsBonTemps (max 3 chiffres après la virgule)
  let diffTemps = Math.abs(tempsPilote1 - tempsPilote2).toFixed(3);

  paragraphe.innerHTML += `<br>On peut voir, dans cet exemple, que <span style="color:${couleurMeilleursTemps}; font-weight:bold">${meilleurTemps}</span> a effectué un meilleur temps que <span style="color:${couleurMoinsBonTemps}; font-weight:bold">${moinsBonTemps}</span><br>
  avec une avance de ${diffTemps} secondes.<br>`;

  if (data[0]["numeroMeilleurTour"] == data[1]["numeroMeilleurTour"]) {
    paragraphe.innerHTML += `<br>Les deux pilotes ont effectué leur meilleur temps durant le même tour :${data[0]["numeroMeilleurTour"]} .<br>`;
  } else {
    paragraphe.innerHTML += `<br> <span style="color:${couleurPilote1}; font-weight:bold">${
      Pilote[data[0]["nomPilote"]]
    }</span> a effectué son meilleur temps au tour ${
      data[0]["numeroMeilleurTour"]
    } alors que <span style="color:${couleurPilote2}; font-weight:bold">${
      Pilote[data[1]["nomPilote"]]
    }</span> au tour ${data[1]["numeroMeilleurTour"]}.<br>`;
  }

  //meilleurs tours à la fin du GP
  if (
    data[0]["nbToursEffectuees"] - data[0]["numeroMeilleurTour"] >= 10 &&
    data[1]["nbToursEffectuees"] - data[1]["numeroMeilleurTour"] >= 10
  ) {
    paragraphe.innerHTML += `<br>Les deux pilotes ont effectués leur meilleur temps au tour avant leur fin de course.<br>
      Cela s'explique par le fait que le voiture est bien moins lourde qu'au départ du Grand-Prix car il y à moins de carburant dans le réservoir.<br>
      La formule1 est donc plus maniable et plus rapide.<br>`;
  }

  //pneus utilisés pour leur meilleur tour respectif
  if (data[0]["pneuMeilleurTour"] == data[1]["pneuMeilleurTour"]) {
    paragraphe.innerHTML += `<br><span style="color:${couleurPilote1}; font-weight:bold">${
      Pilote[data[0]["nomPilote"]]
    }</span> et <span style="color:${couleurPilote2}; font-weight:bold">${
      Pilote[data[1]["nomPilote"]]
    }</span> ont utilisés le même type de pneu pour leur meilleur tour respectif:<br>
    ${data[0]["pneuMeilleurTour"]}.<br>`;
    if (data[0]["pneuMeilleurTour"] == "SOFT") {
      paragraphe.innerHTML += `<br>En effet les pneus SOFT sont les pneus les plus tendres et donc les plus rapides, <br>
      ils sont souvent utilisés en fin de GP pour effectuer le meilleur temps.<br>`;
    } else if (data[0]["pneuMeilleurTour"] == "MEDIUM") {
      paragraphe.innerHTML += `<br>En effet les pneus MEDIUM sont les pneus les plus polyvalents, <br>
      ils permettent vitesse et stabilité, un atout important pour effectuer un bon temps.<br>`;
    }
  } else {
    paragraphe.innerHTML += `<br><span style="color:${couleurPilote1}; font-weight:bold">${
      Pilote[data[0]["nomPilote"]]
    }</span> et <span style="color:${couleurPilote2}; font-weight:bold">${
      Pilote[data[1]["nomPilote"]]
    }</span> ont utilisés des types de pneus différents pour leur meilleur tour respectif:<br>
    ${
      data[0]["pneuMeilleurTour"]
    } pour <span style="color:${couleurPilote1}; font-weight:bold">${
      Pilote[data[0]["nomPilote"]]
    }</span> et ${
      data[1]["pneuMeilleurTour"]
    } pour <span style="color:${couleurPilote2}; font-weight:bold">${
      Pilote[data[2]["nomPilote"]]
    }</span>.
    Ce choix différent prouve bien que chaque écurie a sa propre stratégie pour permettre au pilote <br>
    d'aller le plus vite possible.<br>`;
  }

  divTitre.appendChild(titre);
  divParent.appendChild(divTitre);
  divParent.appendChild(paragraphe);
}

export { analysePosition, analysePneus, analyseTemps };
