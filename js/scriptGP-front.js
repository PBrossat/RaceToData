function afficherMapGP() {
  const sectionStats = document.querySelector("#stats");
  const divMapEtInfosGP = document.createElement("div");
  divMapEtInfosGP.id = "map-et-infos-gp";
  sectionStats.appendChild(divMapEtInfosGP);
  const divMapGP = document.createElement("div");
  divMapEtInfosGP.appendChild(divMapGP);
  divMapGP.id = "mapGP";
  var mapGP = L.map("mapGP", {
    center: [48.866667, 2.333333],
    zoom: 1.5,
  });
  const layerPrincipale = L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 15,
      minZoom: 1.5,

      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }
  );
  layerPrincipale.addTo(mapGP);
  var sudOuest = L.latLng(-90, -180),
    nordEst = L.latLng(90, 180),
    limiteMap = L.latLngBounds(sudOuest, nordEst);

  mapGP.setMaxBounds(limiteMap);
  mapGP.on("drag", function () {
    mapGP.panInsideBounds(limiteMap, { animate: false });
  });
}

//-------------------------------Gestion du click sur le bouton de la carte des grands-prix--------------------------------------------------

const boutonDecouvrirStatsGrandsPrix = document.querySelector(
  ".btn-decouvrir-stats-grands-prix"
);
boutonDecouvrirStatsGrandsPrix.addEventListener("click", function () {
  console.log("zebiiiiiii");
  document.querySelector("#stats").innerHTML = "";
  afficherMapGP();
});
