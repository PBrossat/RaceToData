//import des données des pilotes
import { tabGlobalDataPilotes } from "./scriptPilote.js";

//---------------------------------GESTION DE LA MAP--------------------------------------

function mapPilote() {
  //création des div Map et Infos
  const MapEtInfos = document.querySelector("#divMapEtInfos");
  const boutonDezoom = document.createElement("button");
  boutonDezoom.className = "bouton";
  MapEtInfos.appendChild(boutonDezoom);
  boutonDezoom.textContent = "DeZoom";

  const divMapPilotes = document.createElement("div");
  divMapPilotes.id = "map";

  MapEtInfos.appendChild(divMapPilotes);

  //--Infos
  const divInfosPilotes = document.createElement("div");
  divInfosPilotes.id = "divInfos";

  MapEtInfos.appendChild(divInfosPilotes);
  const textIntro = document.createElement("h3");
  divInfosPilotes.appendChild(textIntro);
  textIntro.innerHTML =
    " Cliquez sur un pilote pour obtenir sa carte personnelle, et survolez sa carte pour avoir encore plus d'informations !";

  //centree sur Paris
  const centreMap = {
    lat: 48.866667,
    lng: 2.333333,
  };

  const zoomInitial = 1.5;

  //création de la map
  const mapPilote = L.map("map").setView(
    [centreMap.lat, centreMap.lng],
    zoomInitial
  );

  //ajout d'un layer (physique de la marque)
  const layerPrincipale = L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 8,
      minZoom: 1.5,

      //crédit
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }
  );

  //ajout du layer à la map
  layerPrincipale.addTo(mapPilote);

  //création de limite dans la map pour ne pas scroller à l'infini
  var sudOuest = L.latLng(-90, -180);
  var nordEst = L.latLng(90, 180);
  var limiteMap = L.latLngBounds(sudOuest, nordEst);

  mapPilote.setMaxBounds(limiteMap);
  mapPilote.on("drag", function () {
    mapPilote.panInsideBounds(limiteMap, { animate: false });
  });

  //option des marker (taille, ombre)
  var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [30, 30],
      shadowSize: [50, 64],
      iconAnchor: [20, 20],
      shadowAnchor: [4, 62],
    },
  });

  //création d'un nouveau marker
  var pneuMaker = new LeafIcon({
    iconUrl: "data/markerPneu.png",
  });

  //Placement des markers représentant les pilotes sur la map

  for (let i = 0; i < tabGlobalDataPilotes.length; i++) {
    L.marker([tabGlobalDataPilotes[i].Lat, tabGlobalDataPilotes[i].Long], {
      icon: pneuMaker,
    })
      .addTo(mapPilote)
      .on("click", function () {
        mapPilote.flyTo(
          [tabGlobalDataPilotes[i].Lat, tabGlobalDataPilotes[i].Long],
          mapPilote.getMaxZoom()
        );
        //   const divInfosPilote = document.querySelector("#divInfosPilotes");
        const existeDivInfosPilotes = document.querySelector("#divInfos");
        if (existeDivInfosPilotes) {
          existeDivInfosPilotes.remove();
        }
        const divInfosPilotes = document.createElement("div");
        divInfosPilotes.id = "divInfos";
        MapEtInfos.appendChild(divInfosPilotes);
        const cartePiloteContent = document.createElement("div");
        cartePiloteContent.id = "divInfosContent";
        divInfosPilotes.appendChild(cartePiloteContent);

        //PARTIE FRONT
        const divInfosPiloteFront = document.createElement("div");
        divInfosPiloteFront.id = "divInfosFront";
        cartePiloteContent.appendChild(divInfosPiloteFront);
        divInfosPiloteFront.style.backgroundImage =
          "url(" + tabGlobalDataPilotes[i].Image + ")";
        divInfosPiloteFront.style.backgroundSize = "cover";
        divInfosPiloteFront.style.backgroundPosition = "center";

        //PARTIE BACK
        const divInfosPiloteBack = document.createElement("div");
        divInfosPiloteBack.id = "divInfosBack";
        cartePiloteContent.appendChild(divInfosPiloteBack);
        const nomPilote = document.createElement("h1");
        const nationalité = document.createElement("p");
        const team = document.createElement("p");
        const nbVictoires = document.createElement("p");
        const nbGpDisputes = document.createElement("p");
        const nbPodiums = document.createElement("p");
        divInfosPiloteBack.appendChild(nomPilote);
        divInfosPiloteBack.appendChild(nationalité);
        divInfosPiloteBack.appendChild(team);
        divInfosPiloteBack.appendChild(nbVictoires);
        divInfosPiloteBack.appendChild(nbGpDisputes);
        divInfosPiloteBack.appendChild(nbPodiums);
        nomPilote.textContent = tabGlobalDataPilotes[i].Name;
        nationalité.textContent =
          "Nationalité : " + tabGlobalDataPilotes[i].Nationalité;
        team.textContent = "Ecurie : " + tabGlobalDataPilotes[i].Team;
        nbVictoires.textContent =
          "Nombre de Victoires : " + tabGlobalDataPilotes[i]["Nb Victoires"];
        nbGpDisputes.textContent =
          "Nombre de Grand Prix : " + tabGlobalDataPilotes[i]["Nb GP disputés"];
        nbPodiums.textContent =
          "Nombre de podiums : " + tabGlobalDataPilotes[i]["Nb podiums"];
      });
  }

  boutonDezoom.addEventListener("click", function () {
    const maxDezoome = 3;
    if (mapPilote.getZoom() >= maxDezoome) {
      //récupère le centrage actuel du zoom
      var currentCenter = mapPilote.getCenter();

      //récupère les coordonnées du centre du zoom
      var currentLng = currentCenter.lng;
      var currentLat = currentCenter.lat;

      //dézoume à partir du zoom actuel
      mapPilote.flyTo([currentLat, currentLng], maxDezoome);
    }
  });
}

//------------------------------- Export des données -----------------------------
export { mapPilote };
