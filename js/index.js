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

app.get("/infosGpDriver1", (req, res) => {
  const positionXFile = "./json/Driver1/coordX.json";
  const positionYFile = "./json/Driver1/coordY.json";
  const timeFile = "./json/Driver1/time.json";
  const speedFile = "./json/Driver1/speed.json";
  const brakeFile = "./json/Driver1/brake.json";
  const rpmFile = "./json/Driver1/rpm.json";
  const gearFile = "./json/Driver1/gear.json";
  const throttleFile = "./json/Driver1/throttle.json";
  const drsFile = "./json/Driver1/drs.json";

  const readJSONFile = (file) => {
    return new Promise((resolve, reject) => {
      fs.readFile(file, "utf8", (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data));
      });
    });
  };

  Promise.all([
    readJSONFile(positionXFile),
    readJSONFile(positionYFile),
    readJSONFile(timeFile),
    readJSONFile(speedFile),
    readJSONFile(brakeFile),
    readJSONFile(rpmFile),
    readJSONFile(gearFile),
    readJSONFile(throttleFile),
    readJSONFile(drsFile),
  ])
    .then((data) => {
      const donnees = [];
      data[0].forEach((posX, i) => {
        const posY = data[1][i];
        const time = data[2][i];
        const speed = data[3][i];
        const brake = data[4][i];
        const rpm = data[5][i];
        const gear = data[6][i];
        const throttle = data[7][i];
        const drs = data[8][i];
        donnees.push({
          positionX: posX,
          positionY: posY,
          time: time,
          speed: speed,
          brake: brake,
          rpm: rpm,
          gear: gear,
          throttle: throttle / 100,
          drs: drs,
        });
      });
      res.json(donnees);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});

app.get("/infosGpDriver2", (req, res) => {
  const positionXFile = "./json/Driver2/coordX.json";
  const positionYFile = "./json/Driver2/coordY.json";
  const timeFile = "./json/Driver2/time.json";
  const speedFile = "./json/Driver2/speed.json";
  const brakeFile = "./json/Driver2/brake.json";
  const rpmFile = "./json/Driver2/rpm.json";
  const gearFile = "./json/Driver2/gear.json";
  const throttleFile = "./json/Driver2/throttle.json";
  const drsFile = "./json/Driver2/drs.json";

  const readJSONFile = (file) => {
    return new Promise((resolve, reject) => {
      fs.readFile(file, "utf8", (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data));
      });
    });
  };

  Promise.all([
    readJSONFile(positionXFile),
    readJSONFile(positionYFile),
    readJSONFile(timeFile),
    readJSONFile(speedFile),
    readJSONFile(brakeFile),
    readJSONFile(rpmFile),
    readJSONFile(gearFile),
    readJSONFile(throttleFile),
    readJSONFile(drsFile),
  ])
    .then((data) => {
      const donnees = [];
      data[0].forEach((posX, i) => {
        const posY = data[1][i];
        const time = data[2][i];
        const speed = data[3][i];
        const brake = data[4][i];
        const rpm = data[5][i];
        const gear = data[6][i];
        const throttle = data[7][i];
        const drs = data[8][i];
        donnees.push({
          positionX: posX,
          positionY: posY,
          time: time,
          speed: speed,
          brake: brake,
          rpm: rpm,
          gear: gear,
          throttle: throttle / 100,
          drs: drs,
        });
      });
      res.json(donnees);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
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
app.use("/static", express.static("static/"));

app.listen(PORT, () => console.log(`Le serveur est sur le port ${PORT}`));
