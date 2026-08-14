/* ============================================================
   JAVASCRIPT — navigation entre les pages du dossier
   Le site est techniquement une seule page HTML : on cache et on
   affiche des <div class="page"> pour donner l'impression de
   tourner les pages d'un vrai dossier papier.
   ============================================================ */

// Liste des numéros de page dans l'ordre + un petit nom court
// pour l'onglet affiché en haut (ça reste volontairement court).
var listePages = [
  { numero: 0, nomOnglet: "Accueil" },
  { numero: 1, nomOnglet: "1" },
  { numero: 2, nomOnglet: "2" },
  { numero: 3, nomOnglet: "3" },
  { numero: 4, nomOnglet: "4" },
  { numero: 5, nomOnglet: "CV" },
  { numero: 6, nomOnglet: "5" },
  { numero: 7, nomOnglet: "6" },
  { numero: 8, nomOnglet: "Père" },
  { numero: 9, nomOnglet: "Mère" },
  { numero: 10, nomOnglet: "Verdict" }
];

var pageActuelle = 0; // on démarre sur la page d'accueil (numéro 0)

// Construit les onglets numérotés en haut du dossier, une seule fois
// au chargement de la page.
function construireOnglets() {
  var zone = document.getElementById("zone-onglets");
  for (var i = 0; i < listePages.length; i++) {
    var page = listePages[i];
    var onglet = document.createElement("button");
    onglet.className = "onglet";
    onglet.textContent = page.nomOnglet;
    onglet.id = "onglet-" + page.numero;
    // On utilise une fonction "fabrique" pour bien capturer le bon numéro
    onglet.onclick = fabriquerClicOnglet(page.numero);
    zone.appendChild(onglet);
  }
}

// Petite fonction utilitaire : évite que tous les boutons appellent
// allerA() avec le même numéro (piège classique des boucles en JS).
function fabriquerClicOnglet(numero) {
  return function() { allerA(numero); };
}

// Affiche la page demandée et met à jour l'onglet actif + le numéro
// affiché en bas ("Page X / 10").
function allerA(numero) {
  // On ne fait rien si le numéro est hors limites
  if (numero < 0 || numero >= listePages.length) {
    return;
  }

  // Cacher l'ancienne page, afficher la nouvelle
  var ancienneDiv = document.querySelector('.page[data-page="' + pageActuelle + '"]');
  var nouvelleDiv = document.querySelector('.page[data-page="' + numero + '"]');
  if (ancienneDiv) ancienneDiv.classList.remove("active");
  if (nouvelleDiv) nouvelleDiv.classList.add("active");

  // Mettre à jour l'onglet actif
  var ancienOnglet = document.getElementById("onglet-" + pageActuelle);
  var nouvelOnglet = document.getElementById("onglet-" + numero);
  if (ancienOnglet) ancienOnglet.classList.remove("actif");
  if (nouvelOnglet) nouvelOnglet.classList.add("actif");

  pageActuelle = numero;

  // Mettre à jour l'indicateur "Page X / 10" (numérotation 1 à 10 pour l'affichage)
  document.getElementById("indicateur-page").textContent =
    "Page " + (numero + 1) + " / " + listePages.length;

  // Remonter en haut du dossier à chaque changement de page
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function pageSuivante() {
  allerA(pageActuelle + 1);
}

function pagePrecedente() {
  allerA(pageActuelle - 1);
}

// Affiche ou cache un bloc "résultat" (utilisé pour "Voir la preuve", etc.)
function basculerResultat(id) {
  var bloc = document.getElementById("resultat-" + id);
  bloc.classList.toggle("visible");
}

/* ============================================================
   PAGE 2, COMPÉTENCE "INTELLIGENT" : petite animation de fausse analyse
   déclenchée par le bouton "Voir la preuve"
   ============================================================ */
function lancerAnalyseIntelligence() {
  var bloc = document.getElementById("resultat-analyse-intelligence");
  bloc.classList.add("visible");

  var etapes = [
    "Vérification du résultat...",
    "2 + 2...",
    "Calcul en cours...",
    "Réalité modifiée avec succès.",
    "✓ INTELLIGENCE CONFIRMÉE"
  ];

  var indexEtape = 0;
  bloc.textContent = etapes[0];

  var minuteur = setInterval(function() {
    indexEtape = indexEtape + 1;
    if (indexEtape >= etapes.length) {
      clearInterval(minuteur);
      return;
    }
    bloc.textContent = etapes[indexEtape];
  }, 900);
}

/* ============================================================
   PAGE "ÉVALUATION DU PÈRE" : petite animation de fausse analyse
   ============================================================ */
function lancerAnalysePere() {
  var bloc = document.getElementById("resultat-analyse-pere");
  bloc.classList.add("visible");

  // Liste des messages à afficher les uns après les autres
  var etapes = [
    "Analyse en cours...",
    "Vérification de la compatibilité...",
    "Vérification de l'humour...",
    "Vérification du niveau de folie...",
    "Vérification du dossier Christopher...",
    "❌ ERREUR — Le père est trop puissant pour être simulé.",
    "Ne vous inquiétez pas. J'ai du temps à perdre."
  ];

  var indexEtape = 0;
  bloc.textContent = etapes[0];

  // On affiche chaque message toutes les 900 millisecondes
  var minuteur = setInterval(function() {
    indexEtape = indexEtape + 1;
    if (indexEtape >= etapes.length) {
      clearInterval(minuteur);
      return;
    }
    bloc.textContent = etapes[indexEtape];
  }, 900);
}

/* ============================================================
   PAGE "DÉCISION FINALE" : la petite comédie du bouton "Refuser"
   ============================================================ */
var etapeRefus = 0; // compte combien de fois on a cliqué sur "Refuser"

var messagesRefus = [
  "Êtes-vous vraiment sûr ?",
  "Êtes-vous vraiment vraiment sûr ?",
  "Dernière chance.",
  "🤖 ERREUR 404 : AUCUNE RÉPONSE ACCEPTABLE DÉTECTÉE DANS VOTRE SYSTÈME DE DÉCISION. VEUILLEZ RÉESSAYER, HUMAIN."
];

function cliquerRefuser() {
  var bloc = document.getElementById("resultat-refus");
  bloc.classList.add("visible");

  if (etapeRefus < messagesRefus.length) {
    bloc.textContent = messagesRefus[etapeRefus];
    etapeRefus = etapeRefus + 1;
  }

  // On cache les autres blocs de résultat au cas où
  document.getElementById("resultat-reflexion").classList.remove("visible");
  document.getElementById("resultat-acceptation").classList.remove("visible");
}

function afficherReflexion() {
  document.getElementById("resultat-reflexion").classList.add("visible");
  document.getElementById("resultat-refus").classList.remove("visible");
  document.getElementById("resultat-acceptation").classList.remove("visible");
}

function afficherAcceptation() {
  document.getElementById("resultat-acceptation").classList.add("visible");
  document.getElementById("resultat-refus").classList.remove("visible");
  document.getElementById("resultat-reflexion").classList.remove("visible");
}

/* ============================================================
   PAGE "DÉCISION FINALE" : signatures à dessiner (canvas)
   ============================================================ */

// Branche les écouteurs souris/tactile sur un canvas donné pour
// permettre d'y dessiner une "signature" à main levée.
function initialiserCanvasSignature(idCanvas) {
  var canvas = document.getElementById(idCanvas);
  if (!canvas) return;

  var contexte = canvas.getContext("2d");
  contexte.strokeStyle = "#2b2b28";
  contexte.lineWidth = 2;
  contexte.lineCap = "round";
  contexte.lineJoin = "round";

  var enTrainDeDessiner = false;
  var dernierX = 0;
  var dernierY = 0;

  // Convertit la position du pointeur (souris ou doigt) en coordonnées
  // internes du canvas, même si celui-ci est affiché plus petit/grand
  // que sa résolution réelle (300x120).
  function positionSurCanvas(evt) {
    var rect = canvas.getBoundingClientRect();
    var echelleX = canvas.width / rect.width;
    var echelleY = canvas.height / rect.height;
    return {
      x: (evt.clientX - rect.left) * echelleX,
      y: (evt.clientY - rect.top) * echelleY
    };
  }

  canvas.addEventListener("pointerdown", function (evt) {
    enTrainDeDessiner = true;
    var pos = positionSurCanvas(evt);
    dernierX = pos.x;
    dernierY = pos.y;
    canvas.setPointerCapture(evt.pointerId);
  });

  canvas.addEventListener("pointermove", function (evt) {
    if (!enTrainDeDessiner) return;
    var pos = positionSurCanvas(evt);
    contexte.beginPath();
    contexte.moveTo(dernierX, dernierY);
    contexte.lineTo(pos.x, pos.y);
    contexte.stroke();
    dernierX = pos.x;
    dernierY = pos.y;
  });

  ["pointerup", "pointerleave", "pointercancel"].forEach(function (nomEvenement) {
    canvas.addEventListener(nomEvenement, function () {
      enTrainDeDessiner = false;
    });
  });
}

// Efface entièrement le dessin d'un canvas de signature.
function effacerSignature(idCanvas) {
  var canvas = document.getElementById(idCanvas);
  if (!canvas) return;
  var contexte = canvas.getContext("2d");
  contexte.clearRect(0, 0, canvas.width, canvas.height);
}

// Télécharge le contenu du canvas en tant que vraie image PNG sur
// l'appareil de la personne (rien n'est envoyé sur un serveur).
function telechargerSignature(idCanvas, nomFichier) {
  var canvas = document.getElementById(idCanvas);
  if (!canvas) return;
  var lien = document.createElement("a");
  lien.download = nomFichier;
  lien.href = canvas.toDataURL("image/png");
  lien.click();
}

/* ============================================================
   INITIALISATION : on construit les onglets et on affiche la
   page 0 (accueil) dès que la page a fini de charger.
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  construireOnglets();
  allerA(0);
  initialiserCanvasSignature("signature-papa");
  initialiserCanvasSignature("signature-maman");
});