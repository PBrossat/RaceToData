export function creationDivGrapheExplicationGauche(
  divParent,
  imgSrc,
  texteExplication
) {
  const divGrapheExplication = document.createElement("div");
  divGrapheExplication.classList.add("div-graphe-gauche-et-explication");
  divParent.appendChild(divGrapheExplication);

  const divGraphe = document.createElement("div");
  divGraphe.classList.add("div-graphe");
  divGrapheExplication.appendChild(divGraphe);
  const graphe = document.createElement("img");
  graphe.src = imgSrc;
  divGraphe.appendChild(graphe);

  const divExplication = document.createElement("div");
  divExplication.classList.add("presentation");
  divGrapheExplication.appendChild(divExplication);
  const paragrapheExplication = document.createElement("p");
  paragrapheExplication.innerText = texteExplication;
  divExplication.appendChild(paragrapheExplication);
}

export function creationDivGrapheExplicationDroite(
  divParent,
  imgSrc,
  texteExplication
) {
  const divGrapheExplication = document.createElement("div");
  divGrapheExplication.classList.add("div-graphe-droite-et-explication");
  divParent.appendChild(divGrapheExplication);

  const divExplication = document.createElement("div");
  divExplication.classList.add("presentation");
  divGrapheExplication.appendChild(divExplication);
  const paragrapheExplication = document.createElement("p");
  paragrapheExplication.innerText = texteExplication;
  divExplication.appendChild(paragrapheExplication);

  const divGraphe = document.createElement("div");
  divGraphe.classList.add("div-graphe");
  divGrapheExplication.appendChild(divGraphe);
  const graphe = document.createElement("img");
  graphe.src = imgSrc;
  divGraphe.appendChild(graphe);
}
