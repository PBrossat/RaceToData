//----------------------Gestion de l'affichage de la simulation du GP------------
export function afficherSimulationGP(xMin, yMin, xMax, yMax) {
  //Création des conteneurs
  const sectionStats = document.querySelector("#stats");
  const divSimulation = document.createElement("div");
  divSimulation.classList.add("simulation");
  sectionStats.appendChild(divSimulation);
  const divCircuitContainer = document.createElement("span");
  divCircuitContainer.classList.add("circuit-container");
  divSimulation.appendChild(divCircuitContainer);
  //Création des voitures
  const spanCar1 = document.createElement("span");
  spanCar1.classList.add("car");
  spanCar1.id = "car1";

  const spanCar2 = document.createElement("span");
  spanCar2.classList.add("car");
  spanCar2.id = "car2";

  //Création du circuit
  const divCircuit = document.createElement("span");
  divCircuit.classList.add("circuit");
  divCircuitContainer.appendChild(divCircuit);
  const canvas = document.createElement("canvas");
  canvas.id = "canvas";
  canvas.width = xMax - xMin + 1;
  canvas.height = yMax - yMin + 1;
  canvas.justifyContent = "center";
  divCircuit.appendChild(canvas);

  divCircuit.appendChild(spanCar1);
  divCircuit.appendChild(spanCar2);

  //Création des compteurs
  const main = document.createElement("main");
  divSimulation.appendChild(main);
  const divCompteur1 = document.createElement("div");
  divCompteur1.classList.add("compteur");
  divCompteur1.id = "compteur1";
  main.appendChild(divCompteur1);
  const divCompteur2 = document.createElement("div");
  divCompteur2.classList.add("compteur");
  divCompteur2.id = "compteur2";
  main.appendChild(divCompteur2);
}

//-------------------------------------Gestion de l'introduction du GP----------------
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
    "Pour lancer la simulation, il vous suffit de remplir le formulaire en sélectionnant deux pilotes de F1 ainsi que le circuit sur lequel vous souhaitez les voir concourir. Une fois que vous avez choisi vos options, validez le formulaire en cliquant sur le bouton 'Lancer la simulation'.\n\nUne simulation de course va alors se lancer. Cette simulation permet de recréer les meilleurs tours effectués par les pilotes sélectionnés lors du Grand Prix correspondant à la saison 2022 de Formule 1.\n\nVous pourrez ainsi observer leurs performances en temps réel, avec leurs compteurs de vitesse, RPM, et d'autres informations affichées en direct. Enfin, vous pourrez consulter un graphe comparatif qui affiche les télémétries des deux pilotes. Cela vous permettra de voir les différences de performance entre les deux pilotes et de comprendre comment ils se sont comportés sur le tracé du circuit.\n\nNous espérons que vous apprécierez cette expérience immersive de simulation de courses de Formule 1 et que vous prendrez plaisir à suivre les performances de vos pilotes préférés !\n\nAttention, la simulation peut prendre quelques secondes à se lancer, le temps que les pneus soient à bonne température !";
  divIntroduction.appendChild(paragrapheIntroduction);
}

// ------------------------------------Gestion du graphe de comparaison des télémétries----------------
export function afficherGrapheTelemetries(driver1, driver2, circuit) {
  const sectionStats = document.querySelector("#stats");
  const divGrapheTelemetriesEtExplication = document.createElement("div");
  divGrapheTelemetriesEtExplication.classList.add(
    "div-graphe-telemetries-et-explication"
  );
  sectionStats.appendChild(divGrapheTelemetriesEtExplication);

  const divGrapheTelemetries = document.createElement("div");
  divGrapheTelemetries.classList.add("div-graphe-telemetries");
  divGrapheTelemetriesEtExplication.appendChild(divGrapheTelemetries);
  const graphe = document.createElement("img");
  graphe.src =
    "/data/simulationGP/" + driver1 + "_" + driver2 + "_" + circuit + ".png";
  graphe.classList.add("graphe-telemetries");
  divGrapheTelemetries.appendChild(graphe);

  const divExplication = document.createElement("div");
  divExplication.classList.add("presentation");
  divGrapheTelemetriesEtExplication.appendChild(divExplication);
  const paragrapheGraphe = document.createElement("p");
  paragrapheGraphe.innerHTML =
    "Ce graphique compare les télémétries des deux pilotes sélectionnés.<br/><br/>Les données comprennent le régime moteur (RPM), la vitesse (speed), l'accélérateur (throttle), le freinage (brake), les rapports de vitesse (nGear), et le temps d'écart entre les deux pilotes (Delta time).<br/><br/>Pour interpréter ces données, vous pouvez regarder les différences entre les tracés des deux pilotes pour chaque paramètre de télémétrie.<br/><br/>Par exemple, des différences importantes dans les RPM ou la vitesse peuvent indiquer que l'un des pilotes a une meilleure accélération ou une vitesse de pointe plus élevée. De même, des différences dans la position de l'accélérateur ou la position de la pédale de frein peuvent suggérer des styles de conduite différents ou des stratégies de course distinctes. Enfin, le temps d'écart entre les deux pilotes peut être un indicateur important de la performance globale de chaque pilote. Si l'un des pilotes parvient à creuser un écart important par rapport à l'autre, cela peut indiquer une meilleure maîtrise de la voiture ou une stratégie de course plus efficace.<br/><br/>Pour des conseils plus détaillés sur la façon d'analyser les données de télémétrie, nous vous recommandons de consulter le site : <a href=\"https://www.formule1fr.com/news/data-analyse-comment-lire-un-graphique-de-telemetrie-de-formule-1\" target=\"_blank\" style=\"color:#e60012;\">formule1fr.com</a>. <br/><br/> Nous espérons que cette comparaison de télémétries vous aidera à mieux comprendre les performances des pilotes et à apprécier la complexité de la Formule 1.";
  divExplication.appendChild(paragrapheGraphe);
}
