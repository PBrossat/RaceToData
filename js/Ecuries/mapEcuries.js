//import des données des écuries
import { tabGlobalDataEcuries } from "./scriptEcuries.js";

//---------------------------------GESTION DE LA MAP--------------------------------------

function mapEcuries() {
  //création des div Map et Infos
  //--Map
  const MapEtInfos = document.querySelector("#divMapEtInfos");

  const divMapEcuries = document.createElement("div");
  divMapEcuries.id = "map";
  MapEtInfos.appendChild(divMapEcuries);

  //--Infos
  const divInfosEcuries = document.createElement("div");
  divInfosEcuries.id = "divInfos";
  MapEtInfos.appendChild(divInfosEcuries);

  const boutonDezoom = document.createElement("button");
  boutonDezoom.className = "bouton";
  MapEtInfos.appendChild(boutonDezoom);
  boutonDezoom.innerHTML = "DeZoom";
  boutonDezoom.addEventListener("click", function () {
    mapEcuries.flyTo([48.866667, -18.333333], mapEcuries.getMinZoom());
  });

  const textIntro = document.createElement("h3");
  divInfosEcuries.appendChild(textIntro);
  textIntro.innerHTML =
    " Cliquez sur une ecurie pour obtenir sa carte, et survolez sa carte pour avoir encore plus d'informations !";

  //centree sur Paris
  const centreMap = {
    lat: 48.866667,
    lng: -18.333333,
  };

  const zoomInitial = 2.5;

  //création de la map
  const mapEcuries = L.map("map").setView(
    [centreMap.lat, centreMap.lng],
    zoomInitial
  );

  //ajout d'un layer (physique de la marque)
  const layerPrincipale = L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 8,
      minZoom: 3,

      //crédit de la map
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }
  );

  //ajout du layer à la map
  layerPrincipale.addTo(mapEcuries);

  //création de limite dans la map pour ne pas scroller à l'infini
  let sudOuest = L.latLng(-90, -180);
  let nordEst = L.latLng(90, 180);
  let limiteMap = L.latLngBounds(sudOuest, nordEst);

  mapEcuries.setMaxBounds(limiteMap);
  mapEcuries.on("drag", function () {
    mapEcuries.panInsideBounds(limiteMap, { animate: false });
  });

  //option des marker (taille, ombre)
  let LeafIcon = L.Icon.extend({
    options: {
      iconSize: [30, 30],
      shadowSize: [50, 64],
      iconAnchor: [20, 20],
      shadowAnchor: [4, 62],
    },
  });

  //création d'un nouveau marker
  let pneuMaker = new LeafIcon({
    iconUrl: "data/markerPneuMedium.png",
  });

  //Placement des markers représentant les Ecuries sur la map

  for (let i = 0; i < 10; i++) {
    L.marker([tabGlobalDataEcuries[i].Lat, tabGlobalDataEcuries[i].Long], {
      icon: pneuMaker,
    })
      .addTo(mapEcuries)
      .on("click", function () {
        mapEcuries.flyTo(
          [tabGlobalDataEcuries[i].Lat, tabGlobalDataEcuries[i].Long],
          mapEcuries.getMaxZoom()
        );
        const existeDivInfosEcuries = document.querySelector("#divInfos");
        if (existeDivInfosEcuries) {
          existeDivInfosEcuries.remove();
        }
        const divInfosEcuries = document.createElement("div");
        divInfosEcuries.id = "divInfos";
        MapEtInfos.appendChild(divInfosEcuries);
        const carteEcuriesContent = document.createElement("div");
        carteEcuriesContent.id = "divInfosContent";
        divInfosEcuries.appendChild(carteEcuriesContent);

        //PARTIE FRONT
        const divInfosEcuriesFront = document.createElement("div");
        divInfosEcuriesFront.id = "divInfosFront";
        carteEcuriesContent.appendChild(divInfosEcuriesFront);
        divInfosEcuriesFront.style.backgroundImage =
          "url(" + tabGlobalDataEcuries[i].ImageFront + ")";
        divInfosEcuriesFront.style.backgroundSize = "cover";
        divInfosEcuriesFront.style.backgroundPosition = "center";

        //PARTIE BACK
        const divInfosEcuriesBack = document.createElement("div");
        divInfosEcuriesBack.id = "divInfosBack";
        carteEcuriesContent.appendChild(divInfosEcuriesBack);
        divInfosEcuriesBack.style.backgroundImage =
          "url(" + tabGlobalDataEcuries[i].ImageBack + ")";
        divInfosEcuriesBack.style.backgroundSize = "cover";
        divInfosEcuriesBack.style.backgroundPosition = "center";
        divInfosEcuriesBack.style.opacity = "0.7";
        const nomEcuries = document.createElement("h1");
        const nationalité = document.createElement("p");
        const nbVictoires = document.createElement("p");
        const nbPoles = document.createElement("p");
        const nbPodiums = document.createElement("p");
        const nbPoints = document.createElement("p");
        const constructeur = document.createElement("p");
        const pilote = document.createElement("p");
        divInfosEcuriesBack.appendChild(nomEcuries);
        divInfosEcuriesBack.appendChild(nationalité);
        divInfosEcuriesBack.appendChild(nbVictoires);
        divInfosEcuriesBack.appendChild(nbPoles);
        divInfosEcuriesBack.appendChild(nbPodiums);
        divInfosEcuriesBack.appendChild(nbPoints);
        divInfosEcuriesBack.appendChild(constructeur);
        divInfosEcuriesBack.appendChild(pilote);
        nomEcuries.textContent = tabGlobalDataEcuries[i]["nom"];
        nationalité.textContent =
          "Pays d'origine : " + tabGlobalDataEcuries[i]["nationality"];
        nbVictoires.textContent =
          "Victoires : " + tabGlobalDataEcuries[i]["wins_all"];
        nbPoles.textContent =
          "Poles Positions : " + tabGlobalDataEcuries[i]["pole_all"];
        nbPodiums.textContent =
          "Podiums : " + tabGlobalDataEcuries[i]["podiums_all"];
        nbPoints.textContent =
          "Points : " + tabGlobalDataEcuries[i]["points_all"];
        pilote.textContent =
          "Titres pilote : " + tabGlobalDataEcuries[i]["titre_pilote"];
        constructeur.textContent =
          "Titres constructeur : " + tabGlobalDataEcuries[i]["titre_ecurie"];
      });
  }
}

//------------------------------- Export des données -----------------------------
export { mapEcuries };
