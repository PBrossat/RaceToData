function afficherStatsEcuries() {
  const StatsEcuries = document.querySelector("#stats");
  const sectionStatsEcuries = document.createElement("section");
  sectionStatsEcuries.innerHTML +=
    "<h2>Analyse des données relatives aux Ecuries</h2>";
  const divStatsEcuries = document.createElement("div");
  divStatsEcuries.id = "divId";
  divStatsEcuries.innerHTML = "";
  const graphique = document.createElement("canvas");
  graphique.id = "CanvaId";

  StatsEcuries.appendChild(sectionStatsEcuries);
  sectionStatsEcuries.appendChild(divStatsEcuries);
  divStatsEcuries.appendChild(graphique);
}

const boutonDecouvrirStatsEcuries = document.querySelector(
  ".btn-decouvrir-stats-ecuries"
);
boutonDecouvrirStatsEcuries.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherStatsEcuries();
  grapheEcurieRadar();
  //grapheEcurieBaton();
});

let dataGlobalTab;
fetch("json/Ecuries.json")
  .then((response) => response.json())
  .then((json) => {
    const ecurieData = json;
    const tabData = ecurieData.map((ecurie) => {
      return {
        Points: ecurie["points"],
        Victoires: ecurie["wins"],
        Nom: ecurie.Constructor["name"],
        Nationalite: ecurie.Constructor["nationality"],
        Position: ecurie["position"],
      };
    });
    dataGlobalTab = tabData;
    return tabData;
  });

// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => response.json())
//   .then((json) => console.log(json));

function getEcuries() {
  const nomEcurie = [];
  for (var i = 0; i < dataGlobalTab.length; i++) {
    nomEcurie.push(dataGlobalTab[i].Nom);
  }
  return nomEcurie;
}

function getNbVictoiresEcuries() {
  const victoireEcurie = [];
  for (var i = 0; i < dataGlobalTab.length; i++) {
    victoireEcurie.push(dataGlobalTab[i].Victoires);
  }
  return victoireEcurie;
}

function getNbPointsEcuries() {
  const pointsEcurie = [];
  for (var i = 0; i < dataGlobalTab.length; i++) {
    pointsEcurie.push(dataGlobalTab[i].Points);
  }
  return pointsEcurie;
}

function getPositionEcuries() {
  const positionEcurie = [];
  for (var i = 0; i < dataGlobalTab.length; i++) {
    positionEcurie.push(dataGlobalTab[i].Position);
  }
  return positionEcurie;
}

function getNationaliteEcuries() {
  const nationaliteEcurie = [];
  for (var i = 0; i < dataGlobalTab.length; i++) {
    nationaliteEcurie.push(dataGlobalTab[i].Nationalite);
  }
  return nationaliteEcurie;
}

function grapheEcurieRadar() {
  const nomEcurie = getEcuries();
  const nbVictoiresEcuries = getNbVictoiresEcuries();
  const positionEcuries = getPositionEcuries();

  const configuration = {
    type: "radar",
    data: {
      labels: nomEcurie,

      datasets: [
        {
          label: "Position au championnat par écurie",
          data: positionEcuries,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
        {
          label: "Nombre de victoires par écurie",
          data: nbVictoiresEcuries,
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgb(54, 162, 235)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(54, 162, 235)",
        },
      ],
    },
  };

  const graphique = document.getElementById("CanvaId");
  const chart = new Chart(graphique, configuration);
}

function grapheEcurieBaton() {
  var tabCouleurs = [];
  for (var i = 0; i < dataGlobalTab.length; i++) {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    tabCouleurs.push(`rgba(${r}, ${g}, ${b}, 0.9)`);
  }

  const nomEcurie = getEcuries();
  const nbPointsEcuries = getNbPointsEcuries();

  const configuration = {
    type: "bar",
    data: {
      labels: nomEcurie,

      datasets: [
        {
          label: "Nombre de points par écurie",
          data: nbPointsEcuries,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
      ],
    },
  };
  const graphique = document.getElementById("CanvaId");
  const chart = new Chart(graphique, configuration);
}

// fetch("https://ergast.com/api/f1/2022/constructorStandings")
//   .then((response) => response.text())
//   .then((str) => {
//     const parser = new DOMParser();
//     const xml = parser.parseFromString(str, "text/xml");
//     const json = xmlToJson(xml);
//     const values = json.map((element) => element.points);
//     console.log(values);
//   });

// function xmlToJson(xml) {
//   let obj = [];
//   if (xml.nodeType === 1) {
//     if (xml.attributes.length > 0) {
//       obj["@attributes"] = {};
//       for (let j = 0; j < xml.attributes.length; j++) {
//         const attribute = xml.attributes.item(j);
//         obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
//       }
//     }
//   } else if (xml.nodeType === 3) {
//     obj = xml.nodeValue;
//   }
//   if (xml.hasChildNodes()) {
//     for (let i = 0; i < xml.childNodes.length; i++) {
//       const item = xml.childNodes.item(i);
//       const nodeName = item.nodeName;
//       if (typeof obj[nodeName] === "undefined") {
//         obj[nodeName] = xmlToJson(item);
//       } else {
//         if (typeof obj[nodeName].push === "undefined") {
//           const old = obj[nodeName];
//           obj[nodeName] = [];
//           obj[nodeName].push(old);
//         }
//         obj[nodeName].push(xmlToJson(item));
//       }
//     }
//   }
//   return obj;
// }

// let xmlString = "https://ergast.com/api/f1/2022/constructorStandings";

// parse the XML string into an XML document
// let parser = new DOMParser();
// let xmlDoc = parser.parseFromString(xmlString, "text/xml");

// extract data from the XML document and convert it to JSON
// let jsonData = {};
// let points = xmlDoc.getElementsByTagName("points")[0];

// if (points) {
//   jsonData.points = points.textContent;
// }

// const xml2js = require("xml2js");
// const request = require("request");

// // URL de l'emplacement du fichier XML
// const url = "https://ergast.com/api/f1/2022/constructorStandings";

// // Récupérer le contenu du fichier XML depuis l'URL
// request(url, (err, xml) => {
//   if (err) throw err;

//   // Convertir le contenu XML en objet JSON
//   xml2js.parseString(xml, (err, result) => {
//     if (err) throw err;

//     // Le contenu XML est maintenant disponible sous forme d'objet JSON
//     const json = result;

//     // Extraire les données nécessaires
//     const donnee =
//       json.StandingsTable.StandingsLists.ConstructorStandings["points"];
//     console.log(donnee);
//   });
// });
