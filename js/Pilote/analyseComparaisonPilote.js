//---------------------------Analyse des données---------------------------
function analysePosition(data) {
  const divParent = document.querySelector("#popup_0");
  const divTitre = document.createElement("div");
  divTitre.id = "titreAnalysePosition";
  const titre = document.createElement("h2");
  const paragraphe = document.createElement("p");
  divParent.innerHTML = "";

  let nomPiloteDevantDepart = "";
  let positionPlusDevantDepart = Number.MAX_VALUE; //initialisé à la valeur la plus grande possible
  let nomPiloteDerriereDepart = "";

  for (let i = 0; i < data.length; i++) {
    if (data[i]["positionDepart"] < positionPlusDevantDepart) {
      positionPlusDevantDepart = data[i]["positionDepart"];
      nomPiloteDevantDepart = data[i]["nomPilote"];
    }
  }
  if (nomPiloteDevantDepart == data[0]["nomPilote"]) {
    nomPiloteDerriereDepart = data[1]["nomPilote"];
  } else {
    nomPiloteDerriereDepart = data[0]["nomPilote"];
  }

  titre.innerHTML = `Analyse des positions de ${data[0]["nomPilote"]} et de ${data[1]["nomPilote"]}`;
  paragraphe.innerHTML += `Durant le Grand Prix de ${data[0]["GrandPrix"]}, ${nomPiloteDevantDepart} a commencé devant ${nomPiloteDerriereDepart}.<br><br>
    Cela signifie que ${nomPiloteDevantDepart} a effectué un meilleur temps en qualification que ${nomPiloteDerriereDepart}.<br>
    Cela peut être dû à un meilleur pilotage, mais aussi au choix des pneux, de la météo ou encore des performances de la monoplace (la formule 1) <br><br>`;

  let texteAdaptatif = "";
  let nomPiloteDevantArrive = "";
  let nomPiloteDerriereArrive = "";
  let positionPlusDevantArrive = Number.MAX_VALUE; //initialisé à la valeur la plus grande possible
  let positionVainqueurArrivee = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i]["positionArrivee"] < positionPlusDevantArrive) {
      positionPlusDevantArrive = data[i]["positionArrivee"];
      nomPiloteDevantArrive = data[i]["nomPilote"];
    }
  }

  if (nomPiloteDevantArrive == data[0]["nomPilote"]) {
    nomPiloteDerriereArrive = data[1]["nomPilote"];
  } else {
    nomPiloteDerriereArrive = data[0]["nomPilote"];
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].nomPilote === nomPiloteDevantArrive) {
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
    texteAdaptatif = ` Au final ${nomPiloteDevantDepart} est resté devant ${nomPiloteDerriereDepart} durant tout le Grand-Prix et arrive ${positionVainqueurArrivee}${preposition} de la course.<br><br>
      `;
  } else {
    texteAdaptatif = ` Au final ${nomPiloteDerriereDepart} est passé devant ${nomPiloteDevantDepart} durant le Grand-Prix et arrive ${positionVainqueurArrivee}ème de la course.<br><br>
      `;
  }

  paragraphe.innerHTML += texteAdaptatif;

  //texte adaptatif permettant de savoir l'evolution des places de chaque pilote
  if (data[0]["positionDepart"] > data[0]["positionArrivee"]) {
    paragraphe.innerHTML += ` Enfin ${data[0]["nomPilote"]} a donc gagné ${
      data[0]["positionDepart"] - data[0]["positionArrivee"]
    } places <br>
      `;
  } else {
    paragraphe.innerHTML += ` Enfin, ${data[0]["nomPilote"]} a donc perdu ${
      data[0]["positionArrivee"] - data[0]["positionDepart"]
    } places`;
  }
  if (data[1]["positionDepart"] > data[1]["positionArrivee"]) {
    paragraphe.innerHTML += ` et ${data[1]["nomPilote"]} en a gagné ${
      data[1]["positionDepart"] - data[1]["positionArrivee"]
    } durant le Grand Prix.<br>
      `;
  } else {
    paragraphe.innerHTML += ` et ${data[1]["nomPilote"]} en a perdu ${
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
  divTitre.id = "titreAnalysePneus";
  const titre = document.createElement("h2");
  const paragraphe = document.createElement("p");
  divParent.innerHTML = "";

  titre.innerHTML = `Analyse des pneus de ${data[0]["nomPilote"]} et de ${data[1]["nomPilote"]}`;

  //description des avantages de chaque pneus
  const pneus = {
    SOFT: "offre une adhérence maximale et une faible résistance au roulement, mais s'use rapidement.",
    MEDIUM:
      "offre un équilibre entre adhérence et longévité, il est utilisé pour les courses standards.",
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
    paragraphe.innerHTML += `Au départ du Grand-Prix, ${data[0]["nomPilote"]} et ${data[1]["nomPilote"]} ont choisi le même type de pneu : ${data[0]["pneu"][0]}<br>
    celui-ci `;
    paragraphe.innerHTML += texteAdaptatifMemePneu + "<br>";
  } else {
    //pneu différents au départ
    paragraphe.innerHTML += `Au départ du Grand-Prix, ${data[0]["nomPilote"]} et ${data[1]["nomPilote"]} ont choisi une statégie différente,<br> 
    pneus ${data[0]["pneu"][0]} pour ${data[0]["nomPilote"]} et ${data[1]["pneu"][0]} pour ${data[1]["nomPilote"]}<br><br>
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
      paragraphe.innerHTML += `<br> On peut voir ici que ${data[i]["nomPilote"]} a utilisé qu'un unique type de pneu durant le Grand Prix.<br>
      Cela s'explique par le fait que ${data[i]["nomPilote"]} a été contraint d'abandonner la course au tour n°${data[i]["nbToursEffectuees"]} (Do Not Finish). <br>
      En voici la raison : ${data[i]["statu"]}.<br>`;
    } else if (
      data[i]["statu"] != "Finished" &&
      !data[i]["statu"].startsWith("+")
    ) {
      paragraphe.innerHTML += `<br> On peut voir ici que ${data[i]["nomPilote"]} n'a pas fini la course.<br>
      Cela s'explique par le fait que ${data[i]["nomPilote"]} a été contraint d'abandonner la course au tour n°${data[i]["nbToursEffectuees"]} (Do Not Finish). <br>
      En voici la raison : ${data[i]["statu"]}.<br>`;
    }
  }
  divTitre.appendChild(titre);
  divParent.appendChild(divTitre);
  divParent.appendChild(paragraphe);
}

export { analysePosition, analysePneus };
