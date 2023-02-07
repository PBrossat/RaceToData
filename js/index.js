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

app.use("/css", express.static("css/"));
app.use("/js", express.static("js/"));
app.use("/data", express.static("data/"));
app.use("/json", express.static("json/"));

app.listen(PORT, () => console.log(`Le serveur est sur le port ${PORT}`));
