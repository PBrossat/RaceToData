const { PythonShell } = require("python-shell");
const express = require("express");
const fs = require("fs");
const { spawn } = require("child_process");
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

//fetch("http://localhost:3000/dataPython?namePilote=LEC&nameGP=Monaco&nameData=coordX")
app.get("/dataPython", async (req, res) => {
  //récupération des données du formulaire
  const namePilote = req.query.namePilote;
  const nameGP = req.query.nameGP;
  const nameData = req.query.nameData;
  argv = [namePilote, nameGP, nameData];
  let pyshell = new PythonShell("./py/simulationGP.py", { args: argv });
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

app.get("/dataDriverComparaison", (req, res) => {
  const nomGP = req.query.nomGP;
  const nomPilote1 = req.query.nomPilote1;
  const nomPilote2 = req.query.nomPilote2;

  //tant que ./json/comparaisonPilote/comparaison" +
  // nomPilote1 +
  // "_" +
  // nomPilote2 +
  // "_" +
  // nomGP +
  // ".json n'est pas créé, on attend
  while (
    !fs.existsSync(
      "./json/comparaisonPilote/comparaison" +
        nomPilote1 +
        "_" +
        nomPilote2 +
        "_" +
        nomGP +
        ".json"
    )
  ) {
    console.log("wait");
  }
  fs.readFile(
    "./json/comparaisonPilote/comparaison" +
      nomPilote1 +
      "_" +
      nomPilote2 +
      "_" +
      nomGP +
      ".json",
    "utf-8",
    (error, data) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.send(JSON.parse(data));
      }
    }
  );
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
      "http://localhost:3000/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=X"
    );
    coordX = await coordX.json();
    //coordY
    let coordY = await fetch(
      "http://localhost:3000/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=Y"
    );
    coordY = await coordY.json();
    //time
    let time = await fetch(
      "http://localhost:3000/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=Time"
    );
    time = await time.json();
    //speed
    let speed = await fetch(
      "http://localhost:3000/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=Speed"
    );
    speed = await speed.json();
    //brake
    let brake = await fetch(
      "http://localhost:3000/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=Brake"
    );
    brake = await brake.json();
    //rpm
    let rpm = await fetch(
      "http://localhost:3000/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=RPM"
    );
    rpm = await rpm.json();
    //gear
    let gear = await fetch(
      "http://localhost:3000/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=nGear"
    );
    gear = await gear.json();
    //throttle
    let throttle = await fetch(
      "http://localhost:3000/dataPython?namePilote=" +
        namePilote +
        "&nameGP=" +
        nameGP +
        "&nameData=Throttle"
    );
    throttle = await throttle.json();
    //drs
    let drs = await fetch(
      "http://localhost:3000/dataPython?namePilote=" +
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

//fetch("http://localhost:3000/dataSimulationGP?namePilote1=LEC&namePilote2=VER&nameGP=Monaco")
app.get("/dataSimulationGP", (req, res) => {
  //récupération des données du formulaire
  const namePilote1 = req.query.namePilote1;
  const namePilote2 = req.query.namePilote2;
  const nameGP = req.query.nameGP;
  const argv = [namePilote1, namePilote2, nameGP];

  // Chemin vers votre script Python
  const cheminScriptPython = "./py/simulationGP.py";

  // Exécuter le script Python en utilisant child_process.spawn
  const executionScriptPython = spawn("python3", [cheminScriptPython, ...argv]);

  // Gérer la sortie standard (stdout) du script Python
  executionScriptPython.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  // Gérer la sortie d'erreur (stderr) du script Python
  executionScriptPython.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  // Gérer la fin de l'exécution du script Python
  executionScriptPython.on("close", (code) => {
    console.log(`child process exited with code ${code}`);

    fs.readFile(
      "./json/simulationGP/" +
        namePilote1 +
        "_" +
        namePilote2 +
        "_" +
        nameGP +
        ".json",
      "utf-8",
      (error, data) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          res.send(JSON.parse(data));
        }
      }
    );
  });
});

//fetch("http://localhost:3000/dataComparaison?nomGP=Monaco&nomPilote1=LEC&nomPilote2=VER")
app.get("/dataComparaison", (req, res) => {
  //récupération des données du formulaire
  const nomGP = req.query.nomGP;
  const nomPilote1 = req.query.nomPilote1;
  const nomPilote2 = req.query.nomPilote2;
  const argv = [nomGP, nomPilote1, nomPilote2];

  // Chemin vers votre script Python
  const cheminScriptPython = "./py/comparaisonPilote.py";

  // Exécuter le script Python en utilisant child_process.spawn
  const executionScriptPython = spawn("python3", [cheminScriptPython, ...argv]);

  // Gérer la sortie standard (stdout) du script Python
  executionScriptPython.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  // Gérer la sortie d'erreur (stderr) du script Python
  executionScriptPython.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  // Gérer la fin de l'exécution du script Python
  executionScriptPython.on("close", (code) => {
    console.log(`child process exited with code ${code}`);

    fs.readFile(
      "./json/comparaisonPilote/comparaison" +
        nomPilote1 +
        "_" +
        nomPilote2 +
        "_" +
        nomGP +
        ".json",
      "utf-8",
      (error, data) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          res.send(JSON.parse(data));
        }
      }
    );
  });
});

//route GPAnnee avec l'année en paramètre (utilisée dans graphePilote.js)
app.get("/GPAnnee/:annee", async (req, res) => {
  try {
    const annee = req.params.annee;
    let GPannee = await fetch(`https://ergast.com/api/f1/${annee}/races.json`);
    GPannee = await GPannee.json();
    res.json(GPannee);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur Liste des GP de la saison : " + annee);
  }
});

//route pointPiloteSaison avec l'année et le nom du pilote en paramètre (utilisée dans graphePilote.js)
app.get("/pointsPiloteSaison/:annee/:nomPilote", async (req, res) => {
  try {
    const annee = req.params.annee;
    const nomPilote = req.params.nomPilote;
    let pointPiloteSaison = await fetch(
      `https://ergast.com/api/f1/${annee}/drivers/${nomPilote}/results.json`
    );
    pointPiloteSaison = await pointPiloteSaison.json();
    res.json(pointPiloteSaison);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send(
        "Erreur récupération des points du pilote : " +
          nomPilote +
          " de la saison : " +
          annee
      );
  }
});

//`https://ergast.com/api/f1/${annee}/drivers/${nomPilote}/results.json`

//route pilotesSaison avec l'année en paramètre (utilisée dans graphePilote.js)
app.get("/pilotesSaison/:annee", async (req, res) => {
  try {
    const annee = req.params.annee;
    let pilotesSaison = await fetch(
      `https://ergast.com/api/f1/${annee}/drivers.json`
    );
    pilotesSaison = await pilotesSaison.json();
    res.json(pilotesSaison);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur Liste des pilotes de la saison : " + annee);
  }
});

app.use("/css", express.static("css/"));
app.use("/js", express.static("js/"));
app.use("/data", express.static("data/"));
app.use("/json", express.static("json/"));
app.use("/py", express.static("py/"));

app.listen(PORT, () => console.log(`Le serveur est sur le port ${PORT}`));
