const express = require("express");
const fs = require("fs");
const request = require("request");
const app = express();
const PORT = 3000;

app.get("/index.html", (_, res) => {
  //pas besoin de la requete donc on peut remplacer req par _
  const indexHTML = fs.readFileSync("index.html", "utf-8");
  res.send(indexHTML);
});

app.get("/", (_, res) => {
  //pas besoin de la requete donc on peut remplacer req par _
  const indexHTML = fs.readFileSync("index.html", "utf-8");
  res.send(indexHTML);
});

app.get("/infosGpAPI", (_, res) => {
  request(
    "https://ergast.com/api/f1/2022/circuits.json",
    function (error, response, body) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.send(body);
      }
    }
  );
});

app.get("/infosGpJSON", (_, res) => {
  fs.readFile("./json/Grands-prix.json", "utf-8", (error, data) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.send(JSON.parse(data));
    }
  });
});

//fetch("http://localhost:3001/dataPython?namePilote=LEC&nameGP=Monaco&nameData=coordX")
app.get("/dataPython", (req, res) => {
  //récupération des données du formulaire
  const namePilote = req.query.namePilote;
  const nameGP = req.query.nameGP;
  const nameData = req.query.nameData;
  argv = [namePilote, nameGP, nameData];
  let pyshell = new PythonShell("./app.py", { args: argv });
  pyshell.on("message", function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    // console.log(message);
    const data = message;
    res.json(data);
  });
  // end the input stream and allow the process to exit
  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log("The exit code was: " + code);
    console.log("The exit signal was: " + signal);
    console.log("finished");
  });
});

//fetch("http://localhost:3001/dataDriver?namePilote=LEC&nameGP=Monaco")
app.get("/dataDriver", async (req, res) => {
  //récupération des données du formulaire
  const namePilote = req.query.namePilote;
  const nameGP = req.query.nameGP;
  //récupération des données via les appels
  try {
    //coordX
    let coordX = await fetch(
      "http://localhost:3001/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=X"
    );
    coordX = await coordX.json();
    //coordY
    let coordY = await fetch(
      "http://localhost:3001/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=Y"
    );
    coordY = await coordY.json();
    //time
    let time = await fetch(
      "http://localhost:3001/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=Time"
    );
    time = await time.json();
    //speed
    let speed = await fetch(
      "http://localhost:3001/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=Speed"
    );
    speed = await speed.json();
    //brake
    let brake = await fetch(
      "http://localhost:3001/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=Brake"
    );
    brake = await brake.json();
    //rpm
    let rpm = await fetch(
      "http://localhost:3001/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=RPM"
    );
    rpm = await rpm.json();
    //gear
    let gear = await fetch(
      "http://localhost:3001/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=nGear"
    );
    gear = await gear.json();
    //throttle
    let throttle = await fetch(
      "http://localhost:3001/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=Throttle"
    );
    throttle = await throttle.json();
    //drs
    let drs = await fetch(
      "http://localhost:3001/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=DRS"
    );
    drs = await drs.json();

    //création du tableau de données
    const donnees = [];
    coordX = JSON.parse(coordX);
    coordY = JSON.parse(coordY);
    time = JSON.parse(time);
    speed = JSON.parse(speed);
    brake = JSON.parse(brake);
    rpm = JSON.parse(rpm);
    gear = JSON.parse(gear);
    throttle = JSON.parse(throttle);
    drs = JSON.parse(drs);

    coordX.forEach((posX, i) => {
      const posY = coordY[i];
      const timeData = time[i];
      const speedData = speed[i];
      const brakeData = brake[i];
      const rpmData = rpm[i];
      const gearData = gear[i];
      const throttleData = throttle[i] / 100;
      const drsData = drs[i];
      donnees.push({
        positionX: posX,
        positionY: posY,
        time: timeData,
        speed: speedData,
        brake: brakeData,
        rpm: rpmData,
        gear: gearData,
        throttle: throttleData,
        drs: drsData,
      });
    });
    res.json(donnees);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// à reprendre
app.get("/f1/:annee/:nomPiloteMinuscule", async (req, res) => {
  const annee = req.params.annee;
  const nomPiloteMinuscule = req.params.nomPiloteMinuscule;
  request(
    `https://ergast.com/api/f1/${annee}/drivers/${nomPiloteMinuscule}/results.json`,
    function (error, response, body) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.send(body);
      }
    }
  );
});

// const annee = req.params.annee;
// const nomPiloteMinuscule = req.params.nomPiloteMinuscule;
// const url = `https://ergast.com/api/f1/${annee}/drivers/${nomPiloteMinuscule}/results.json`;
// const response = await fetch(url);
// const data = await response.json();
// res.send(data);

app.use("/css", express.static("css/"));
app.use("/js", express.static("js/"));
app.use("/data", express.static("data/"));
app.use("/json", express.static("json/"));
app.use("/py", express.static("py/"));

app.listen(PORT, () => console.log(`Le serveur est sur le port ${PORT}`));
