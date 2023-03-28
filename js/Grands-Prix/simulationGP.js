export { creationDivFormulaire };
import { tabGlobalDataPilotes } from "../Pilote/scriptPilote.js";
import { tabGlobalDataGP } from "./scriptGP.js";

//Creation de scale pour afficher le tracé du circuit
var xScale = d3.scaleLinear().domain([-20000, 20000]).range([-800, 1400]);
var yScale = d3.scaleLinear().domain([-20000, 20000]).range([-800, 1200]);

//-------------------------------Gestion de la simulation du GP----------------------------------------------------------------------------

//Class driver
class Driver {
  constructor(firstName, lastName, threeLetterName, team) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.threeLetterName = threeLetterName;
    this.team = team;

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

//------------------------------------Création du formulaire de simulation
function creationDivFormulaire(divParent, tabPilote, tabGrandPrix, nomSubmit) {
  const divFormulaire = document.createElement("div");
  divFormulaire.id = "divFormulaire";
  divParent.appendChild(divFormulaire);

  //creation du titre du formulaire
  const titreFormulaire = document.createElement("h2");
  titreFormulaire.textContent =
    "Comparez les meilleurs tours de vos pilotes préférés !";
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

//--------------------------------------------Gestion du formulaire
export function gestionFormulaireGP() {
  creationDivFormulaire(
    document.querySelector("#stats"),
    tabGlobalDataPilotes,
    tabGlobalDataGP,
    "Lancer la simulation"
  );
  const formulaire = document.getElementById("formulaire");
  formulaire.addEventListener("submit", (e) => {
    console.log("submit");
    //pour éviter le rechargement de la page
    e.preventDefault();
    //récupération des données du formulaire
    const driver1 = document.getElementById("selecteurPilote1").value;
    const driver2 = document.getElementById("selecteurPilote2").value;
    const gp = document.getElementById("selecteurGrandPrix").value;
    //désactiver la soumission du formulaire
    document.getElementById("boutonSubmit").disabled = true;
    afficherSimulationGP();
    fetch("/dataDriver?namePilote=" + driver1 + "&nameGP=" + gp)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].positionX = xScale(data[i].positionX);
          data[i].positionY = yScale(data[i].positionY);
        }
        let Driver1 = new Driver("Charles", "Leclerc", "LEC", "Ferrari"); //TODO recup ces données via le formulaire / tableau de pilotes
        animateRace(data, "car1", "compteur1", Driver1);
      })
      .catch((err) => {
        console.error(err);
      });

    fetch("/dataDriver?namePilote=" + driver2 + "&nameGP=" + gp)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          data[i].positionX = xScale(data[i].positionX);
          data[i].positionY = yScale(data[i].positionY);
        }
        let Driver2 = new Driver("Kevin", "Magnussen", "MAG", "Haas"); //TODO recup ces données via le formulaire / tableau de pilotes
        animateRace(data, "car2", "compteur2", Driver2);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log("fin submit");
    //Attendre que l'animation soit terminée pour en relancer une autre -> temps mis à la zeub
    setTimeout(() => {
      //désactiver la soumission du formulaire
      document.getElementById("boutonSubmit").disabled = false;
    }, 25000); //valeur à redéfinir suite au chargement des données avec python et fastF1
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
  overview.append("h3").text(driver.team);
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

  const drawTrack = (coordinates) => {
    context.beginPath();
    context.moveTo(coordinates[0].positionX, coordinates[0].positionY);
    for (let i = 1; i < coordinates.length; i++) {
      context.lineTo(coordinates[i].positionX, coordinates[i].positionY);
    }
    context.strokeStyle = "white";
    context.stroke();
  };

  const moveCar = () => {
    let timeDiff = 0;
    if (position < data.length) {
      const x = data[position].positionX;
      const y = data[position].positionY;
      car.style.left = `${x - 8}px`; //12 environ moitié de la largeur de la voiture => centrage
      car.style.top = `${y}px`;
      //! ATTENTION PRBLM INDICE => position + 1 pose pbrlm car dernier élément du tableau + 1 = undefined
      if (position < data.length - 1) {
        timeDiff = data[position + 1].time - data[position].time / 1000; //en secondes
      } else {
        timeDiff = 0;
      }
      //TODO MAJ des infos pilotes compteurs
      driver.telemetry.speed = data[position].speed;
      driver.telemetry.gear = data[position].gear;
      driver.telemetry.rpm = data[position].rpm;
      driver.telemetry.throttle = data[position].throttle;
      driver.telemetry.brake = data[position].brake;
      driver.telemetry.drs =
        data[position].drs === 10 ||
        data[position].drs === 12 ||
        data[position].drs === 14
          ? true
          : false;

      updateCompteur(idCompteur, driver);
      position++;
      setTimeout(moveCar, timeDiff / 1000);
    }
  };
  // Dessiner le tracé du circuit
  const trackCoordinates = data;
  drawTrack(trackCoordinates);
  // Déplacer la voiture
  moveCar();
}

//----------------------Gestion de l'affichage de la simulation du GP------------
function afficherSimulationGP() {
  //Création des conteneurs
  const sectionStats = document.querySelector("#stats");
  const divSimulation = document.createElement("div");
  divSimulation.classList.add("simulation");
  sectionStats.appendChild(divSimulation);
  const divCircuitContainer = document.createElement("div");
  divCircuitContainer.classList.add("circuit-container");
  divSimulation.appendChild(divCircuitContainer);
  //Création des voitures
  const spanCar1 = document.createElement("span");
  spanCar1.classList.add("car");
  spanCar1.id = "car1";
  divCircuitContainer.appendChild(spanCar1);
  const spanCar2 = document.createElement("span");
  spanCar2.classList.add("car");
  spanCar2.id = "car2";
  divCircuitContainer.appendChild(spanCar2);
  //Création du circuit
  const divCircuit = document.createElement("div");
  divCircuit.classList.add("circuit");
  divCircuitContainer.appendChild(divCircuit);
  const canvas = document.createElement("canvas");
  canvas.id = "canvas";
  canvas.width = 1200;
  canvas.height = 1200;
  divCircuit.appendChild(canvas);
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
  // //Gestion du formulaire : création et soumission
  // gestionFormulaireGP();

  // const boutonAnimation = document.createElement("button");
  // boutonAnimation.id = "boutonAnimation";
  // boutonAnimation.textContent = "Lancer la simulation";
  // sectionStats.appendChild(boutonAnimation);
  // boutonAnimation.addEventListener("click", () => {
  //   boutonAnimation.disabled = true;
  //   animateRace(dataDriver1, "car1", "compteur1", driver1);
  //   animateRace(dataDriver2, "car2", "compteur2", driver2);
  //   //Attendre que l'animation soit terminée pour en relancer une autre -> temps mis à la zeub
  //   setTimeout(() => {
  //     boutonAnimation.disabled = false;
  //   }, 25000);
  // });
}
