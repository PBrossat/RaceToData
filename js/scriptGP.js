//Creation de scale pour afficher le tracé du circuit
var xScale = d3.scaleLinear().domain([-20000, 20000]).range([-800, 1400]);
var yScale = d3.scaleLinear().domain([-20000, 20000]).range([-800, 1200]);
//Requete API pour avoir des infos sur les GP
async function recupererInfosGpAPI() {
  let response = await fetch("http://localhost:3000/infosGpAPI");
  response = await response.json();
  return response["MRData"]["CircuitTable"]["Circuits"];
}
//Requete pour avoir les infos sur les GP contenues dans notre fichier json
async function recupererInfosGpJSON() {
  let response = await fetch("http://localhost:3000/infosGpJSON");
  response = await response.json();
  return response["Circuits"];
}
//Requete pour avoir les infos sur le driver 1
async function recupererInfosDriver1() {
  let response = await fetch("http://localhost:3000/infosGpDriver1");
  response = await response.json();
  return response;
}
//Requete pour avoir les infos sur le driver 2
async function recupererInfosDriver2() {
  let response = await fetch("http://localhost:3000/infosGpDriver2");
  response = await response.json();
  return response;
}

//! window.localStorage

// Recuperer les infos sur les GP
let tabGlobalDataGpAPI;
let tabGlobalDataGpJSON;
let tabGlobalDataGP = [];
tabGlobalDataGpAPI = await recupererInfosGpAPI();
tabGlobalDataGpJSON = await recupererInfosGpJSON();

//Fusionner les deux fichiers JSON
for (let i = 0; i < tabGlobalDataGpAPI.length; i++) {
  tabGlobalDataGP[i] = Object.assign(
    {},
    tabGlobalDataGpAPI[i],
    tabGlobalDataGpJSON[i]
  );
}

//Recuperer les infos sur les drivers
let dataDriver1 = await recupererInfosDriver1();
let dataDriver2 = await recupererInfosDriver2();

//Mettre les données à la bonne échelle
for (let i = 0; i < dataDriver1.length; i++) {
  dataDriver1[i].positionX = xScale(dataDriver1[i].positionX);
  dataDriver1[i].positionY = yScale(dataDriver1[i].positionY);
}
for (let i = 0; i < dataDriver2.length; i++) {
  dataDriver2[i].positionX = xScale(dataDriver2[i].positionX);
  dataDriver2[i].positionY = yScale(dataDriver2[i].positionY);
}

//---------------------------------GESTION DE LA MAP--------------------------------------

function afficherMapGP() {
  //Création des div nécessaires
  const sectionStats = document.querySelector("#stats");
  const divMapEtInfosGP = document.createElement("div");
  divMapEtInfosGP.id = "map-et-infos-gp";
  sectionStats.appendChild(divMapEtInfosGP);
  const divMapGP = document.createElement("div");
  divMapEtInfosGP.appendChild(divMapGP);
  divMapGP.id = "map";
  //Création du texte d'introduction pour dire à l'utilisateur comment voir les infos gràace à la carte
  const divInfosGP = document.createElement("div");
  divInfosGP.id = "divInfos";
  divMapEtInfosGP.appendChild(divInfosGP);
  const textIntro = document.createElement("h3");
  divInfosGP.appendChild(textIntro);
  textIntro.innerHTML =
    " Cliquez sur un circuit pour avoir son tracé, et survolez sa carte pour avoir encore plus d'informations !";

  const boutonDezoom = document.createElement("button");
  boutonDezoom.className = "bouton";
  divMapEtInfosGP.appendChild(boutonDezoom);
  boutonDezoom.textContent = "DeZoom";

  //Création de la map
  let mapGP = L.map("map", {
    center: [48.866667, 2.333333],
    zoom: 1.5,
  });
  const layerPrincipale = L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 8,
      minZoom: 1.5,

      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }
  );
  layerPrincipale.addTo(mapGP);
  //Création des limites de la map
  var sudOuest = L.latLng(-90, -180),
    nordEst = L.latLng(90, 180),
    limiteMap = L.latLngBounds(sudOuest, nordEst);
  mapGP.setMaxBounds(limiteMap);
  mapGP.on("drag", function () {
    mapGP.panInsideBounds(limiteMap, { animate: false });
  });

  const markerGP = L.icon({
    iconUrl: "data/markerPneu.png",
    iconSize: [30, 30],
  });

  //Création des markers
  for (let i = 0; i < tabGlobalDataGP.length; i++) {
    L.marker(
      [tabGlobalDataGP[i].Location.lat, tabGlobalDataGP[i].Location.long],
      {
        icon: markerGP,
      }
    )
      .addTo(mapGP)
      .on("click", function () {
        mapGP.flyTo(
          [tabGlobalDataGP[i].Location.lat, tabGlobalDataGP[i].Location.long],
          mapGP.getMaxZoom()
        );
        const existeDivInfosGP = document.querySelector("#divInfos");
        if (existeDivInfosGP) {
          existeDivInfosGP.remove();
        }
        const divInfosGP = document.createElement("div");
        divInfosGP.id = "divInfos";
        divMapEtInfosGP.appendChild(divInfosGP);
        const divInfosGPContent = document.createElement("div");
        divInfosGPContent.id = "divInfosContent";
        divInfosGP.appendChild(divInfosGPContent);

        //PARTIE FRONT
        const divInfosGPFront = document.createElement("div");
        divInfosGPFront.id = "divInfosFront";
        divInfosGPContent.appendChild(divInfosGPFront);
        const titreGP = document.createElement("h1");
        const imgGP = document.createElement("img");
        divInfosGPFront.appendChild(titreGP);
        divInfosGPFront.appendChild(imgGP);
        titreGP.textContent = tabGlobalDataGP[i].circuitName;
        imgGP.src = tabGlobalDataGP[i].Image;

        //PARTIE BACK
        const divInfosGPBack = document.createElement("div");
        divInfosGPBack.id = "divInfosBack";
        divInfosGPContent.appendChild(divInfosGPBack);
        const firstGP = document.createElement("p");
        const numberLaps = document.createElement("p");
        const circuitLength = document.createElement("p");
        const raceDistance = document.createElement("p");
        const lapRecord = document.createElement("p");
        const recordHolder = document.createElement("p");
        divInfosGPBack.appendChild(firstGP);
        divInfosGPBack.appendChild(numberLaps);
        divInfosGPBack.appendChild(circuitLength);
        divInfosGPBack.appendChild(raceDistance);
        divInfosGPBack.appendChild(lapRecord);
        divInfosGPBack.appendChild(recordHolder);
        firstGP.textContent =
          "Premier Grand Prix : " + tabGlobalDataGP[i].FirstGP;
        numberLaps.textContent =
          "Nombre de tours : " + tabGlobalDataGP[i].NumberLaps;
        circuitLength.textContent =
          "Longueur du circuit : " + tabGlobalDataGP[i].CircuitLength + " km";
        raceDistance.textContent =
          "Distance de la course : " + tabGlobalDataGP[i].RaceDistance + " km";
        lapRecord.textContent =
          "Record du tour : " + tabGlobalDataGP[i].LapRecord;
        recordHolder.textContent =
          "Recordman : " + tabGlobalDataGP[i].RecordHolder;
      });
  }
  //Gestion du bouton dezoom
  boutonDezoom.addEventListener("click", function () {
    const maxDezoome = 3;
    if (mapGP.getZoom() >= maxDezoome) {
      //récupère le centrage actuel du zoom
      var currentCenter = mapGP.getCenter();

      //récupère les coordonnées du centre du zoom
      var currentLng = currentCenter.lng;
      var currentLat = currentCenter.lat;

      //dézoume à partir du zoom actuel
      mapGP.flyTo([currentLat, currentLng], maxDezoome);
    }
  });
}

//-------------------------------Gestion de la simulation du GP----------------------------------------------------------------------------

//------------------Création des pilotes------------------

//Création du driver1
let driver1 = {
  firstName: "Charles",
  lastName: "Leclerc",
  threeLetterName: "LER",
  team: "Ferrari",
  telemetry: {
    speed: 0, // value in the [0-360] range, measured in km/h
    rpm: 0,
    drs: false, // boolean, highlighting the DRS string if true
    throttle: 0, // value in the [0-1] range, highlighted in the green band of the inner circle
    brake: false, // boolean, highlighting the red band next to the throttle area
    gear: 0,
  },
};
//Création du driver2
let driver2 = {
  firstName: "Kevin",
  lastName: "Magnussen",
  threeLetterName: "MAG",
  team: "Haas",
  telemetry: {
    speed: 0, // value in the [0-360] range, measured in km/h
    rpm: 0,
    drs: false, // boolean, highlighting the DRS string if true
    throttle: 0, // value in the [0-1] range, highlighted in the green band of the inner circle
    brake: false, // boolean, highlighting the red band next to the throttle area
    gear: 0,
  },
};

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
  const boutonAnimation = document.createElement("button");
  boutonAnimation.id = "boutonAnimation";
  boutonAnimation.textContent = "Lancer la simulation";
  sectionStats.appendChild(boutonAnimation);
  boutonAnimation.addEventListener("click", () => {
    boutonAnimation.disabled = true;
    animateRace(dataDriver1, "car1", "compteur1", driver1);
    animateRace(dataDriver2, "car2", "compteur2", driver2);
    //Attendre que l'animation soit terminée pour en relancer une autre -> temps mis à la zeub
    setTimeout(() => {
      boutonAnimation.disabled = false;
    }, 25000);
  });
}

//-------------------------------Gestion du click sur le bouton de la card des grands-prix--------------------------------------------------

const boutonDecouvrirStatsGrandsPrix = document.querySelector(
  ".btn-decouvrir-stats-grands-prix"
);
boutonDecouvrirStatsGrandsPrix.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherMapGP();
  afficherSimulationGP();
});
