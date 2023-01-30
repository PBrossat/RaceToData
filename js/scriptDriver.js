
function afficherStatsPilotes() 
{
    const StatsPilotes = document.querySelector("#stats");
    const sectionStatsPilotes = document.createElement("section");
    sectionStatsPilotes.innerHTML += "<h2>Analyse des données relatives aux Pilotes</h2>";
    const divStatsPilotes = document.createElement("div");
    divStatsPilotes.id="divId"
    const graphique=document.createElement("canvas");
    graphique.id="CanvaId";

    
    StatsPilotes.appendChild(sectionStatsPilotes);
    sectionStatsPilotes.appendChild(divStatsPilotes);
    divStatsPilotes.appendChild(graphique);


}


const boutonDecouvrirStatsPilotes = document.querySelector(".btn-decouvrir-stats-pilotes");
boutonDecouvrirStatsPilotes.addEventListener("click", function() {
    document.querySelector("#stats").innerHTML = "";
    afficherStatsPilotes();
    grapheDriverPointMoyenParGP();

});


function grapheDriverPointMoyenParGP()
{
    //Récuperer les données dans un tableau
    fetch('json/Driver.json')
  .then(response => response.json())
  .then(data => {
    const piloteData = data;

    const tabData = piloteData.map(pilote =>{
        return {
                Nom: pilote["Name"],
                nbMoyenPointsParGP: pilote["Nb points moyen/GP"]
            };
        }
    );
    

    //création d'un tableau NomPilote  
    const NomPilote=[]
    for (var i=0; i<tabData.length; i++)
    {
        NomPilote.push(tabData[i].Nom);
    }

    //création d'un tableau nbMoyenPointsParGpParPilote  
    const nbMoyenPointsParGpParPilote=[]
    for (var i=0; i<tabData.length; i++)
    {
        nbMoyenPointsParGpParPilote.push(tabData[i].nbMoyenPointsParGP);
    }


    const configuration = 
    {
        type: 'radar',
        data: 
        {
            labels: NomPilote,

            datasets: [{
                label: "Points moyen par Grand Prix ",
                data: nbMoyenPointsParGpParPilote,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'

            }]
        },   
    };

    const graphique = document.getElementById('CanvaId');
    const chart = new Chart(graphique, configuration)


      
});
}











// async function getPointsPilotesSaison(nomPilote) 
// {
//     let pointsParSaison = [];
//     const API_URL = `http://ergast.com/api/f1`;
//     const premiereSaison= data.MRData.StandingsTable.StandingsLists[0].season;
//     for (let annee = 1950; annee <= new Date().getFullYear(); annee++) 
//     {
//       const response = await fetch(`${API_URL}/${annee}/drivers/${nomPilote}/driverStandings.json`);
//       console.log(response);
//     }
//       const data = await response.json();
//       const points = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points;
//       pointsParSaison.push({ annee, points });
//     }
  
//     return pointsParSaison;
// }

// function getPremierSaisonPilote(nomPilote) {
//     const url = `https://ergast.com/api/f1/driverStandings/1.json`;
  
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         const standingsLists = data.MRData.StandingsTable.StandingsLists;
//         for (let i = 0; i < standingsLists.length; i++) {
//           const driverStandings = standingsLists[i].DriverStandings;
//           for (let j = 0; j < driverStandings.length; j++) {
//             const driver = driverStandings[j].Driver;
//             if (`${driver.givenName} ${driver.familyName}` === nomPilote) {
//                 console.log(`The first season year of ${driverName} is ${standingsLists[i].season}.`);
//                 return;
//             }
//           }
//         }
//       });
// }

