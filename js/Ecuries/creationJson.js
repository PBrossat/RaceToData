//---------------------------------J1-----------------------------------
async function tabVictoiresEcuriesAllTime(startYear, endYear) {
  const newJson = {};

  // Parcourir chaque année de startYear à endYear
  for (let year = startYear; year <= endYear; year++) {
    // Obtenir les données JSON pour l'année en cours
    const response = await fetch(
      `https://ergast.com/api/f1/${year}/constructorStandings.json`
    );
    const data = await response.json();

    let cpt = 0;

    // Ajouter une nouvelle entrée au nouveau JSON pour chaque écurie pour chaque année
    data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.forEach(
      (cs) => {
        const constructorId = cs.Constructor.constructorId;
        const wins = parseInt(cs.wins);

        if (!newJson[constructorId]) {
          newJson[constructorId] = {};
        }

        // Si c'est la première année, initialiser le total des wins de l'écurie
        if (!newJson[constructorId].total) {
          newJson[constructorId].total = 0;
        }

        // Ajouter les wins de l'écurie pour l'année en cours
        if (!newJson[constructorId][year]) {
          newJson[constructorId][year] = 0;
        }
        newJson[constructorId].total += wins;
        cpt = newJson[constructorId].total;

        newJson[constructorId][year] += cpt;

        // Ajouter les wins de l'écurie pour toutes les années précédentes
        if (year > startYear) {
          for (let prevYear = year - 1; prevYear >= startYear; prevYear--) {
            if (newJson[constructorId][prevYear] === undefined) {
              newJson[constructorId][prevYear] = 0;
            } else {
              break;
            }
          }
        }
      }
    );
  }

  return newJson;
}

//---------------------------------J2-----------------------------------

async function tabPointsEcuriesAllTime(startYear, endYear) {
  const newJson = {};

  // Parcourir chaque année de startYear à endYear
  for (let year = startYear; year <= endYear; year++) {
    // Obtenir les données JSON pour l'année en cours
    const response = await fetch(
      `https://ergast.com/api/f1/${year}/constructorStandings.json`
    );
    const data = await response.json();

    let cpt = 0;

    // Ajouter une nouvelle entrée au nouveau JSON pour chaque écurie pour chaque année
    data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.forEach(
      (cs) => {
        const constructorId = cs.Constructor.constructorId;
        const points = parseInt(cs.points);

        if (!newJson[constructorId]) {
          newJson[constructorId] = {};
        }

        // Si c'est la première année, initialiser le total des points de l'écurie
        if (!newJson[constructorId].total) {
          newJson[constructorId].total = 0;
        }

        // Ajouter les points de l'écurie pour l'année en cours
        if (!newJson[constructorId][year]) {
          newJson[constructorId][year] = 0;
        }
        newJson[constructorId].total += points;
        cpt = newJson[constructorId].total;

        newJson[constructorId][year] += cpt;

        // Ajouter les points de l'écurie pour toutes les années précédentes
        if (year > startYear) {
          for (let prevYear = year - 1; prevYear >= startYear; prevYear--) {
            if (newJson[constructorId][prevYear] === undefined) {
              // Si l'année précédente n'existe pas, initialiser avec les points de l'année en cours
              newJson[constructorId][prevYear] = 0;
            } else {
              break;
            }
          }
        }
      }
    );
  }

  return newJson;
}

//------------------------------- Appels fonctions -----------------------------

function main() {
  // Appeler les fonctions pour obtenir les données
  const data1 = tabVictoiresEcuriesAllTime(1958, 2022);
  const data2 = tabPointsEcuriesAllTime(1958, 2022);

  // Convertir les données en chaîne JSON
  const jsonData1 = JSON.stringify(data1);
  const jsonData2 = JSON.stringify(data2);

  console.log("jsonVictoires: ", jsonData1);
  console.log("jsonPoints: ", jsonData2);
}

//------------------------------- Export des données -----------------------------
export { tabVictoiresEcuriesAllTime, tabPointsEcuriesAllTime, main };
