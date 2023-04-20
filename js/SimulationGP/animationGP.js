import { updateCompteur } from "./compteur.js";

//--------------------------Gestion de l'animation du GP--------------------

export function animateRace(data, idCar, idCompteur, driver) {
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

    //Ligne arrivée/départ
    context.beginPath();
    context.moveTo(coordinatesX[0], coordinatesY[0]);
    context.lineTo(coordinatesX[5], coordinatesY[5]);
    context.strokeStyle = "red";
    context.stroke();
  };

  const moveCar = () => {
    let timeDiff = 0;
    if (position < data["coordX"].length) {
      const x = data["coordX"][position];
      const y = data["coordY"][position];
      car.style.left = `${x - 6}px`; //6 environ moitié de la largeur de la voiture => centrage
      car.style.top = `${y}px`;
      if (position < data["coordX"].length - 1) {
        timeDiff = data["time"][position + 1] - data["time"][position];
      } else {
        timeDiff = 0;
      }
      //MAJ des données de la telemetrie
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
      setTimeout(moveCar, timeDiff / 4);
    }
  };
  // Dessiner le tracé du circuit
  const trackCoordinatesX = data["coordX"];
  const trackCoordinatesY = data["coordY"];
  drawTrack(trackCoordinatesX, trackCoordinatesY);
  // Déplacer la voiture
  moveCar();
}
