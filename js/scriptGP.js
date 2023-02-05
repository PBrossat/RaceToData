//Requete API pour avoir des infos sur les GP
async function recupererInfosGP() {
  let response = await fetch("https://ergast.com/api/f1/2022/circuits.json");
  response = await response.json();
  return response["MRData"]["CircuitTable"]["Circuits"];
}

//! window.localStorage

let tabGlobalDataGP;

tabGlobalDataGP = await recupererInfosGP();

//console.log(tabGlobalDataGP);

const melbourneInfos = tabGlobalDataGP[0];
const austinInfos = tabGlobalDataGP[1];
const bahrainInfos = tabGlobalDataGP[2];
const bakuInfos = tabGlobalDataGP[3];
const barceloneInfos = tabGlobalDataGP[4];
const hungaroringInfos = tabGlobalDataGP[5];
const imolaInfos = tabGlobalDataGP[6];
const bresilInfos = tabGlobalDataGP[7];
const jeddahInfos = tabGlobalDataGP[8];
const singapourInfos = tabGlobalDataGP[9];
const miamiInfos = tabGlobalDataGP[10];
const monacoInfos = tabGlobalDataGP[11];
const monzaInfos = tabGlobalDataGP[12];
const redBullRingInfos = tabGlobalDataGP[13];
const castelletInfos = tabGlobalDataGP[14];
const mexiqueInfos = tabGlobalDataGP[15];
const silverstoneInfos = tabGlobalDataGP[16];
const spaFrancorchampsInfos = tabGlobalDataGP[17];
const suzukaInfos = tabGlobalDataGP[18];
const canadaInfos = tabGlobalDataGP[19];
const abuDhabiInfos = tabGlobalDataGP[20];
const zandvoortInfos = tabGlobalDataGP[21];

//---------------------------------GESTION DE LA MAP--------------------------------------

function afficherMapGP() {
  //Création des div nécessaires
  const sectionStats = document.querySelector("#stats");
  const divMapEtInfosGP = document.createElement("div");
  divMapEtInfosGP.id = "map-et-infos-gp";
  sectionStats.appendChild(divMapEtInfosGP);
  const divMapGP = document.createElement("div");
  divMapEtInfosGP.appendChild(divMapGP);
  divMapGP.id = "mapGP";
  //Création de la map
  var mapGP = L.map("mapGP", {
    center: [48.866667, 2.333333],
    zoom: 1.5,
  });
  const layerPrincipale = L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 12,
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

  L.marker([melbourneInfos.Location.lat, melbourneInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [melbourneInfos.Location.lat, melbourneInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([austinInfos.Location.lat, austinInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [austinInfos.Location.lat, austinInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([bahrainInfos.Location.lat, bahrainInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [bahrainInfos.Location.lat, bahrainInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([bakuInfos.Location.lat, bakuInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [bakuInfos.Location.lat, bakuInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([barceloneInfos.Location.lat, barceloneInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [barceloneInfos.Location.lat, barceloneInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([hungaroringInfos.Location.lat, hungaroringInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [hungaroringInfos.Location.lat, hungaroringInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([imolaInfos.Location.lat, imolaInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [imolaInfos.Location.lat, imolaInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([bresilInfos.Location.lat, bresilInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [bresilInfos.Location.lat, bresilInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([jeddahInfos.Location.lat, jeddahInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [jeddahInfos.Location.lat, jeddahInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([singapourInfos.Location.lat, singapourInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [singapourInfos.Location.lat, singapourInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([miamiInfos.Location.lat, miamiInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [miamiInfos.Location.lat, miamiInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([monacoInfos.Location.lat, monacoInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [monacoInfos.Location.lat, monacoInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([monzaInfos.Location.lat, monzaInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [monzaInfos.Location.lat, monzaInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([redBullRingInfos.Location.lat, redBullRingInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [redBullRingInfos.Location.lat, redBullRingInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  const zebi = L.marker(
    [castelletInfos.Location.lat, castelletInfos.Location.long],
    {
      icon: markerGP,
    }
  )
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [castelletInfos.Location.lat, castelletInfos.Location.long],
        mapGP.getMaxZoom()
      );
      const divInfosGP = document.createElement("div");
      divInfosGP.id = "divInfosGP";
      divMapEtInfosGP.appendChild(divInfosGP);
      const imgGP = document.createElement("img");
      divInfosGP.appendChild(imgGP);
      imgGP.src = "data/grands-prix/castellet.png";
    });

  L.marker([mexiqueInfos.Location.lat, mexiqueInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [mexiqueInfos.Location.lat, mexiqueInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([silverstoneInfos.Location.lat, silverstoneInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [silverstoneInfos.Location.lat, silverstoneInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker(
    [spaFrancorchampsInfos.Location.lat, spaFrancorchampsInfos.Location.long],
    {
      icon: markerGP,
    }
  )
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [
          spaFrancorchampsInfos.Location.lat,
          spaFrancorchampsInfos.Location.long,
        ],
        mapGP.getMaxZoom()
      );
    });

  L.marker([suzukaInfos.Location.lat, suzukaInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [suzukaInfos.Location.lat, suzukaInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([canadaInfos.Location.lat, canadaInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [canadaInfos.Location.lat, canadaInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([abuDhabiInfos.Location.lat, abuDhabiInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [abuDhabiInfos.Location.lat, abuDhabiInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });

  L.marker([zandvoortInfos.Location.lat, zandvoortInfos.Location.long], {
    icon: markerGP,
  })
    .addTo(mapGP)
    .on("click", function () {
      mapGP.flyTo(
        [zandvoortInfos.Location.lat, zandvoortInfos.Location.long],
        mapGP.getMaxZoom()
      );
    });
}

//-------------------------------Gestion du click sur le bouton de la carte des grands-prix--------------------------------------------------

const boutonDecouvrirStatsGrandsPrix = document.querySelector(
  ".btn-decouvrir-stats-grands-prix"
);
boutonDecouvrirStatsGrandsPrix.addEventListener("click", function () {
  document.querySelector("#stats").innerHTML = "";
  afficherMapGP();
});
