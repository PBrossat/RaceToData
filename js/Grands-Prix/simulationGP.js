export { creationDivFormulaire };
import { tabGlobalDataPilotes } from "../Pilote/scriptPilote.js";
import { tabGlobalDataGP } from "./scriptGP.js";

//Creation de scale pour afficher le tracé du circuit
var xScale = d3.scaleLinear().domain([-25000, 25000]).range([0, 1600]);
var yScale = d3.scaleLinear().domain([-25000, 25000]).range([0, 1600]);

//-------------------------------Gestion de la simulation du GP----------------------------------------------------------------------------

//Class driver
class Driver {
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
function creationDivFormulaire(
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
    //récupération des données du formulaire
    const driver1 = document.getElementById("selecteurPilote1").value;
    const driver2 = document.getElementById("selecteurPilote2").value;
    const gp = document.getElementById("selecteurGrandPrix").value;
    //désactiver la soumission du formulaire
    document.getElementById("boutonSubmit").disabled = true;
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
        //move window to #canvas
        document
          .querySelector(".circuit-container")
          .scrollIntoView({ behavior: "smooth", block: "center" });

        animateRace(tabInfosSimulationGP[0], "car1", "compteur1", Driver1);
        animateRace(tabInfosSimulationGP[1], "car2", "compteur2", Driver2);

        afficherGrapheTelemetries(driver1, driver2, gp);
      }
    );
    //Attendre que l'animation soit terminée pour en relancer une autre -> temps mis à la zeub
    setTimeout(() => {
      //désactiver la soumission du formulaire
      document.getElementById("boutonSubmit").disabled = false;
    }, 2500); //valeur à redéfinir suite au chargement des données avec python et fastF1
  });

  //! problème : si on choisit le même pilote
}

//-------------------Gestion du compteur----------------

function updateCompteur(idCompteur, driver) {
  const divCompteur = d3.select("#" + idCompteur);
  // supprimer le contenu précédent
  divCompteur.selectAll("*").remove();
  // ajouter le contenu
  const overview = divCompteur.append("div").attr("class", "overview");
  overview.append("h2").text(driver.lastName);
  // following the HTML-centric section, include an SVG to highlight the telemetry
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };
  const width = 400 - (margin.left + margin.right);
  const height = 400 - (margin.top + margin.bottom);
  const details = divCompteur
    .append("svg")
    .attr(
      "viewBox",
      `0 0 ${width + (margin.left + margin.right)} ${
        height + (margin.top + margin.bottom)
      }`
    )
    .append("g")
    .attr("transform", `translate(${margin.top} ${margin.left})`);
  // group describing the text elements for the speed
  // positioned in the center of the SVG with the unit of measure right below the number
  const speed = details
    .append("g")
    .attr("transform", `translate(${width / 2} ${(height / 21) * 10.5})`);
  speed
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .attr("font-size", "1.8rem")
    .attr("fill", "#fff")
    .text(driver.telemetry.speed);
  speed
    .append("text")
    .attr("x", 0)
    .attr("y", 18)
    .attr("text-anchor", "middle")
    .attr("font-size", "0.7rem")
    .attr("fill", "#fff")
    .text("Km/h");
  // group describing the text elements for the rotation per minutes
  // similar to the speed section, but with smaller fonts and positioned right below it
  const rpm = details
    .append("g")
    .attr("transform", `translate(${width / 2} ${(height / 21) * 15})`);
  rpm
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .attr("font-size", "1.4rem")
    .attr("fill", "#fff")
    .text(driver.telemetry.rpm);
  rpm
    .append("text")
    .attr("x", 0)
    .attr("y", 18)
    .attr("text-anchor", "middle")
    .attr("font-size", "0.7rem")
    .attr("fill", "#fff")
    .text("RPM");
  // group describing the drs
  // with a text element laid on top of a wrapping rectangle
  const drs = details
    .append("g")
    .attr("transform", `translate(${width / 2} ${(height / 21) * 18})`);
  drs
    .append("rect")
    .attr("x", -22)
    .attr("y", -13)
    .attr("width", 44)
    .attr("height", 26)
    .attr("fill", driver.telemetry.drs ? "#059801" : "#34343488")
    .attr("rx", 5);
  drs
    .append("text")
    .attr("x", 0)
    .attr("y", 5)
    .attr("text-anchor", "middle")
    .attr("font-size", 12)
    .attr("fill", "#fff")
    .text("DRS");
  // group describing the gear
  // showing the gear in a separate tspan element to resize the important number
  const gear = details
    .append("g")
    .attr("transform", `translate(${width / 2} ${height})`);
  gear
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "central")
    .attr("font-size", "0.7rem")
    .attr("fill", "#fff")
    .style("text-transform", "uppercase")
    .text("Gear ")
    .append("tspan")
    .text(driver.telemetry.gear)
    .attr("dx", 5)
    .attr("font-size", "1.3rem")
    .attr("alignment-baseline", "middle");
  // MAIN VIZ showing the speed and throttle/brake through slices of a partial dounut chart
  // both dounuts use the same pie function, describing a partial donut beginning and ending before/after the center of the visualization
  // this to have the donuts wrap around the text-based elements
  const pie = d3
    .pie()
    .sort(null)
    .startAngle(-0.8 * Math.PI)
    .endAngle(0.8 * Math.PI);
  // each donut has its own arc function, to have one arc atop the other
  const arcInner = d3
    .arc()
    .innerRadius(height / 3.5)
    .outerRadius(height / 3.5 + height / 10);
  // first donut, encapsulated in a group element
  const groupInner = details.append("g");
  // add one group with a class of .slice for the following values
  // this to have the slice for the throttle occupy twice the space of the slice for the brake
  // with a 0.05 made-up slice to separate the throttle and brake sections
  const valuesInner = [
    driver.telemetry.throttle * 2,
    2 - driver.telemetry.throttle * 2,
    0.05,
    1,
  ];
  // color the sections according to the purpose behind each value
  const colorsInner = [
    "#059801",
    "#34343455",
    "none",
    driver.telemetry.brake ? "#EF1A03" : "#34343455",
  ];
  const slicesInner = groupInner
    .selectAll("g.slice")
    .data(pie(valuesInner))
    .enter()
    .append("g")
    .attr("class", "slice")
    // horizontally and vertically centered
    .attr("transform", `translate(${width / 2} ${height / 2})`);
  // for each slice add a path element with the matching value
  slicesInner
    .append("path")
    .attr("d", arcInner)
    // using the colors defined in the appropriate array
    .attr("fill", (d, i) => colorsInner[i]);
  // to add text elements _around_ the donut charts include invisible path elements to use in the textPath element
  // for the inner dounut include two arcs for the throttle and brake strings
  const textInner = ["throttle", "brake"];
  const fillerInner = [2, 1];
  const slicesFillerInner = groupInner
    .selectAll("g.filler")
    .data(pie(fillerInner))
    .enter()
    .append("g")
    .attr("class", "filler")
    .attr("transform", `translate(${width / 2} ${height / 2})`);
  slicesFillerInner
    .append("path")
    .attr("d", arcInner)
    .attr("fill", "none")
    // id to identify the path in the textPath element
    .attr("id", (d, i) => textInner[i]);
  // include the text within the made-up arcs
  slicesFillerInner
    .append("text")
    .attr("x", 15)
    .attr("dy", height / 14)
    .attr("fill", "#ccc")
    .attr("font-size", "0.9rem")
    .style("text-transform", "uppercase")
    .style("letter-spacing", "0.3rem")
    .append("textPath")
    .attr("startOffset", "12%")
    .attr("xlink:href", (d, i) => `#${textInner[i]}`)
    .text((d, i) => textInner[i]);
  // second donut, with a similar methodoloy
  // arc function, expressing a larger arc
  const arcOuter = d3
    .arc()
    .innerRadius(height / 3.5 + height / 8)
    .outerRadius(height / 3.5 + height / 8 + height / 12);
  // group element encapsulating the donut chart
  const groupOuter = details.append("g");
  // one slice for each of the following values
  // this to have the first slice represent the speed relative to 360km/h, considered as upper threshold
  const topSpeed = d3.min([driver.telemetry.speed, 360]);
  const valuesOuter = [topSpeed, 360 - topSpeed];
  const colorsOuter = ["#0059D9", "#34343455"];
  const slicesOuter = groupOuter
    .selectAll("g.slice")
    .data(pie(valuesOuter))
    .enter()
    .append("g")
    .attr("class", "slice")
    .attr("transform", `translate(${width / 2} ${height / 2})`);
  slicesOuter
    .append("path")
    .attr("d", arcOuter)
    .attr("fill", (d, i) => colorsOuter[i]);
  // for the outer dounut, include as many arcs as there are speed values to be highlighted
  const textOuter = [0, 60, 120, 180, 240, 300, 360];
  // evenly distributed around the dounut chart
  const fillerOuter = Array(textOuter.length).fill(1);
  const slicesFillerOuter = groupOuter
    .selectAll("g.filler")
    .data(pie(fillerOuter))
    .enter()
    .append("g")
    .attr("class", "filler")
    .attr("transform", `translate(${width / 2} ${height / 2})`);
  slicesFillerOuter
    .append("path")
    .attr("d", arcOuter)
    .attr("fill", "none")
    // id to identify the path in the textPath element
    .attr("id", (d, i) => `speed-${textOuter[i]}`);
  slicesFillerOuter
    .append("text")
    .attr("x", 15)
    .attr("dy", height / 18)
    .attr("fill", "#ccc")
    .attr("font-size", "0.7rem")
    .style("letter-spacing", "0.1rem")
    .append("textPath")
    .attr("startOffset", "12%")
    .attr("xlink:href", (d, i) => `#speed-${textOuter[i]}`)
    .text((d, i) => textOuter[i]);
}

//--------------------------Gestion de l'animation du GP--------------------

function animateRace(data, idCar, idCompteur, driver) {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const car = document.getElementById(idCar);
  let position = 0;

  const drawTrack = (coordinatesX, coordinatesY) => {
    context.beginPath();
    context.moveTo(coordinatesX[0], coordinatesY[0]);
    for (let i = 1; i < coordinatesX.length; i++) {
      context.lineTo(coordinatesX[i], coordinatesY[i]);
    }
    context.strokeStyle = "white";
    context.stroke();
  };

  const moveCar = () => {
    let timeDiff = 0;
    if (position < data["coordX"].length) {
      const x = data["coordX"][position];
      const y = data["coordY"][position];
      car.style.left = `${x - 6}px`; //6 environ moitié de la largeur de la voiture => centrage
      car.style.top = `${y}px`;
      //! ATTENTION PRBLM INDICE => position + 1 pose pbrlm car dernier élément du tableau + 1 = undefined
      if (position < data["coordX"].length - 1) {
        timeDiff = data["time"][position + 1] - data["time"][position] / 1000; //en secondes
      } else {
        timeDiff = 0;
      }
      //TODO MAJ des infos pilotes compteurs
      driver.telemetry.speed = data["speed"][position];
      driver.telemetry.gear = data["nGear"][position];
      driver.telemetry.rpm = data["rpm"][position];
      driver.telemetry.throttle = data["throttle"][position] / 100;
      driver.telemetry.brake = data["brake"][position];
      driver.telemetry.drs =
        data["drs"][position] === 10 ||
        data["drs"][position] === 12 ||
        data["drs"][position] === 14
          ? true
          : false;

      updateCompteur(idCompteur, driver);
      position++;
      setTimeout(moveCar, timeDiff / 1200);
    }
  };
  // Dessiner le tracé du circuit
  const trackCoordinatesX = data["coordX"];
  const trackCoordinatesY = data["coordY"];
  drawTrack(trackCoordinatesX, trackCoordinatesY);
  // Déplacer la voiture
  moveCar();
}

//----------------------Gestion de l'affichage de la simulation du GP------------
function afficherSimulationGP(xMin, yMin, xMax, yMax) {
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

  //divCircuitContainer.appendChild(spanCar1);

  const spanCar2 = document.createElement("span");
  spanCar2.classList.add("car");
  spanCar2.id = "car2";

  //divCircuitContainer.appendChild(spanCar2);

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
