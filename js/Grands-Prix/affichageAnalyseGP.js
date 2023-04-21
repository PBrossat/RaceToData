import {
  creationDivGrapheExplicationDroite,
  creationDivGrapheExplicationGauche,
} from "./creationDivGrapheExplication.js";

export function afficherAnalyseGP(gp) {
  const sectionStats = document.querySelector("#stats");
  const divAnalyse = document.createElement("div");
  divAnalyse.classList.add("analyse");
  sectionStats.appendChild(divAnalyse);

  //-----------------------------------------------------Premier graphe-----------------------------------------------------
  const imgSrc1 = "/data/analyseGP/" + gp + "/rythme_moyen_pilotes.png";
  const texteExplication1 =
    "Le diagramme à bâtons que nous vous proposons représente le rythme moyen des pilotes durant le Grand Prix de " +
    gp +
    ". Cette mesure est obtenue en faisant la moyenne du temps de tous les tours effectués par chaque pilote durant la course.\n\nEn observant ce diagramme, vous pourrez ainsi constater le rythme moyen de chaque pilote tout au long de la course, ce qui est une donnée essentielle pour comprendre comment les pilotes ont géré leur course.\n\nGrâce à cette analyse, vous pourrez également avoir une idée de la performance globale de chaque pilote durant le Grand Prix.\n\nEnfin, en comparant les rythmes moyens des différents pilotes, vous pourrez dégager des tendances et évaluer les forces en présence.";
  creationDivGrapheExplicationGauche(divAnalyse, imgSrc1, texteExplication1);

  //-----------------------------------------------------Deuxième graphe-----------------------------------------------------
  const imgSrc2 = "/data/analyseGP/" + gp + "/position_finale_vitesse.png";
  const texteExplication2 =
    "On dit souvent que la Formule 1 est un sport où la vitesse est primordiale, mais il ne faut pas oublier que d'autres facteurs sont également déterminants pour remporter une course. Le graphique que nous vous proposons ici représente la position finale de chaque pilote à l'issue du Grand Prix de " +
    gp +
    " en fonction de la vitesse maximale atteinte en piste.\n\nEn observant ce graphique, on pourrait être tenté de croire que le plus rapide a automatiquement gagné la course. Mais ce n'est pas toujours le cas. En effet, les courses de Formule 1 sont caractérisées par des stratégies complexes qui peuvent influencer le résultat final. Les choix de pneus, les arrêts aux stands, les changements de stratégie en cours de course, tous ces éléments peuvent faire la différence entre la victoire et la défaite.\n\nLe graphique permet de voir qu'il n'y a pas de corrélation directe entre la vitesse maximale atteinte en piste et la position finale des pilotes. En effet, certains pilotes ayant atteint des vitesses maximales inférieures ont tout de même réussi à finir devant des pilotes ayant atteint des vitesses supérieures. Cela montre l'importance de la stratégie de course et du choix des pneus dans la réussite en Formule 1. Le graphique peut donc servir à analyser la performance des pilotes, mais également à mettre en lumière l'importance de la stratégie en Formule 1.";
  creationDivGrapheExplicationDroite(divAnalyse, imgSrc2, texteExplication2);

  //-----------------------------------------------------Troisième graphe-----------------------------------------------------
  const imgSrc3 = "/data/analyseGP/" + gp + "/strategie_course.png";
  const texteExplication3 =
    "Justement, ce graphe représente les différentes stratégies pneumatiques choisies par les pilotes durant le Grand Prix de " +
    gp +
    ". En Formule 1, le choix des pneus est un élément crucial de la stratégie de course. Les équipes peuvent choisir différents types de pneus, en fonction de la température de la piste, de la longueur de la course, et de la stratégie choisie.\n\nIl est intéressant de noter que les pilotes n'ont pas forcément tous la même stratégie pneumatique. En effet, certains pilotes peuvent choisir des pneus plus durs (HARD) qui leur permettent de rouler plus longtemps, tandis que d'autres peuvent opter pour des pneus plus tendres (SOFT) pour avoir une meilleure adhérence en début de course. Le choix de la stratégie pneumatique dépend également de la place de départ du pilote, ainsi que de la dégradation différente selon les pneus par rapport à la monoplace.\n\nLe graphique permet de visualiser les différentes stratégies pneumatiques choisies par les pilotes, et peut être utilisé pour analyser la performance de chaque pilote en fonction de sa stratégie.\n\nMais alors, comment choisir sa stratégie pneumatique ?";
  creationDivGrapheExplicationGauche(divAnalyse, imgSrc3, texteExplication3);

  //-----------------------------------------------------Quatrième graphe-----------------------------------------------------
  const imgSrc4 = "/data/analyseGP/" + gp + "/temps_tour_pneus.png";
  const texteExplication4 =
    "Le dernier graphique que nous allons examiner est une représentation en boîtes à moustache des temps réalisés par les pilotes en fonction des pneus qu'ils ont utilisés pendant le Grand Prix de " +
    gp +
    ". Les pneus jouent un rôle crucial en Formule 1 car ils peuvent affecter considérablement la performance de la voiture. Par exemple, les pneus tendres (SOFT) sont plus rapides mais s'usent plus rapidement, tandis que les pneus durs (HARD) sont plus durables mais moins performants.\n\nDans ce graphique, chaque boîte représente la répartition des temps réalisés par les pilotes avec un type de pneu spécifique. Les lignes verticales qui s'étendent au-dessus et en dessous des boîtes représentent les valeurs maximales et minimales des temps de chaque groupe de pneus, tandis que la ligne à l'intérieur de la boîte représente la médiane.\n\nBien que les temps réalisés avec des pneus tendres soient généralement plus rapides que ceux obtenus avec des pneus plus durs, cela dépend fortement du circuit et des conditions de la course. En effet, la température de la piste, la nature de l'asphalte ou encore les contraintes du tracé peuvent influencer la performance et le rythme des pneus, car ceux-ci fonctionnent exclusivement dans une certaine fenêtre de température ! La gestion des pneus pendant la course est également un facteur important à prendre en compte, car une utilisation trop agressive des pneus peut entraîner une dégradation prématurée et ainsi entraîner une chute drastique des performances !";
  creationDivGrapheExplicationDroite(divAnalyse, imgSrc4, texteExplication4);

  const divPresentation = document.querySelectorAll(
    ".div-graphe-droite-et-explication .presentation"
  )[1];
  const p = divPresentation.querySelector("p");
  p.innerHTML =
    p.innerHTML +
    '<br><br>Pour plus d\'informations sur les différents pneus de F1 et leurs spécificités, vous pouvez consulter le site de Red Bull Racing : <a href="https://www.redbull.com/ch-fr/pneus-f1#2-pourquoi-y\'a-t-il-plusieurs-types-de-pneus" target="_blank" style="color:#e60012;">tout savoir sur les pneus</a>';
}
