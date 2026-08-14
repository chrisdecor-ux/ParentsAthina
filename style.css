/* ============================================================
   STYLE GÉNÉRAL
   On veut un rendu "dossier administratif officiel" :
   papier légèrement crème, police sobre, cadre net, tampon rouge.
   ============================================================ */

:root {
  --papier: #f4f1e8;
  --papier-fonce: #e9e4d4;
  --encre: #2b2b28;
  --encre-claire: #5c574f;
  --rouge-tampon: #8c2f2f;
  --vert-ok: #2f6b3f;
  --orange: #b5651d;
  --bordure: #c9c2ac;
  --accent: #35424a;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  padding: 24px 16px 60px;
  background: #d8d2bf;
  font-family: 'Georgia', 'Times New Roman', serif;
  color: var(--encre);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

/* Le "dossier" lui-même : cadre façon feuille A4 */
.dossier {
  background: var(--papier);
  width: 100%;
  max-width: 780px;
  border: 1px solid var(--bordure);
  box-shadow: 0 6px 24px rgba(0,0,0,0.25);
  position: relative;
}

/* Bandeau supérieur type en-tête administratif */
.entete {
  border-bottom: 2px solid var(--encre);
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  letter-spacing: 0.5px;
  color: var(--encre-claire);
  background: var(--papier-fonce);
}

/* Onglets numérotés pour naviguer directement à une page */
.onglets {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 10px 16px;
  background: var(--papier-fonce);
  border-bottom: 1px solid var(--bordure);
}

.onglet {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  background: var(--papier);
  border: 1px solid var(--bordure);
  color: var(--encre-claire);
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 2px;
}

.onglet:hover { background: #fff; }

.onglet.actif {
  background: var(--accent);
  color: var(--papier);
  border-color: var(--accent);
  font-weight: bold;
}

/* Corps du dossier : une seule "page" visible à la fois */
.corps {
  padding: 32px 28px 24px;
  min-height: 420px;
}

/* Chaque page est une div ; toutes cachées sauf celle active */
.page { display: none; }
.page.active { display: block; }

h1 {
  font-size: 22px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 0;
}

h2 {
  font-size: 18px;
  border-bottom: 1px solid var(--bordure);
  padding-bottom: 6px;
  margin-top: 0;
}

.sous-titre {
  text-align: center;
  color: var(--encre-claire);
  font-style: italic;
  margin-top: -8px;
  margin-bottom: 24px;
  font-size: 14px;
}

/* Tampon "confidentiel" façon administration */
.tampon {
  display: inline-block;
  border: 3px solid var(--rouge-tampon);
  color: var(--rouge-tampon);
  font-family: 'Courier New', monospace;
  font-weight: bold;
  text-transform: uppercase;
  padding: 6px 14px;
  transform: rotate(-4deg);
  font-size: 13px;
  letter-spacing: 2px;
  margin: 12px auto;
  display: table;
}

/* Fiche d'identité (tableau clé / valeur) */
.fiche {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 14px;
}
.fiche td {
  padding: 6px 8px;
  border-bottom: 1px dashed var(--bordure);
}
.fiche td:first-child {
  color: var(--encre-claire);
  width: 45%;
}
.fiche td:last-child { font-weight: bold; }

/* Quand une ligne a 3 colonnes (ex. tableau des risques avec icône de
   niveau de danger), la dernière colonne reste étroite et centrée. */
.fiche tr td:nth-child(3) {
  width: 40px;
  text-align: center;
  white-space: nowrap;
}

/* Cadre pour une compétence évaluée */
.competence {
  border: 1px solid var(--bordure);
  background: #fff;
  padding: 14px 16px;
  margin: 14px 0;
}
.competence h3 { margin: 0 0 6px 0; font-size: 15px; }
.score {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: var(--vert-ok);
}
.commentaire {
  font-style: italic;
  color: var(--encre-claire);
  font-size: 13px;
}

/* Titre de rapport pseudo-scientifique à l'intérieur d'une compétence
   (ex. "ANALYSE INTELLECTUELLE", "RAPPORT SANITAIRE") */
.rapport-titre {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 13px;
  color: var(--accent);
  margin: 14px 0 6px;
  text-transform: uppercase;
}

/* Barres de progression (jauges de compatibilité, etc.) */
.jauge-ligne { margin: 10px 0; font-size: 14px; }
.jauge-fond {
  background: var(--papier-fonce);
  border: 1px solid var(--bordure);
  height: 16px;
  width: 100%;
  margin-top: 4px;
}
.jauge-remplie {
  background: var(--accent);
  height: 100%;
}

/* Jauge qui dépasse le seuil normal (ex : 200%) — couleur différente pour marquer l'excès */
.jauge-remplie.depasse {
  background: var(--rouge-tampon);
}

/* Jauge "inconnue" — motif hachuré, on ne sait pas encore où ça en est */
.jauge-remplie.inconnue {
  background: repeating-linear-gradient(
    45deg,
    var(--bordure),
    var(--bordure) 6px,
    var(--papier-fonce) 6px,
    var(--papier-fonce) 12px
  );
}

/* Encadré "page sérieuse" — visuellement différent, plus sobre */
.page-serieuse {
  border-left: 4px solid var(--accent);
  background: #fff;
  padding: 20px 22px;
  margin: 18px 0;
  font-size: 16px;
  line-height: 1.6;
}

/* Liste de promesses avec cases cochées */
.promesses { list-style: none; padding: 0; font-size: 15px; }
.promesses li { padding: 6px 0; }

/* Boutons génériques du dossier */
.bouton {
  font-family: 'Courier New', monospace;
  background: var(--accent);
  color: var(--papier);
  border: none;
  padding: 10px 18px;
  cursor: pointer;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 6px 6px 6px 0;
}
.bouton:hover { background: #24303a; }
.bouton.rouge { background: var(--rouge-tampon); }
.bouton.rouge:hover { background: #6f2323; }
.bouton.vert { background: var(--vert-ok); }
.bouton.vert:hover { background: #234f2e; }

.zone-boutons { text-align: center; margin-top: 20px; }

/* Zone réservée à une photo, vidéo ou audio */
.media-cadre {
  border: 2px dashed var(--bordure);
  background: var(--papier-fonce);
  color: var(--encre-claire);
  font-size: 12px;
  text-align: center;
  padding: 20px;
  margin: 12px 0;
  font-family: 'Courier New', monospace;
}
.media-cadre img, .media-cadre video {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}
.media-cadre audio {
  width: 100%;
  display: block;
  margin: 0 auto;
}

/* Petite légende toujours visible sous chaque image/vidéo/audio, pour
   rappeler le nom exact de fichier attendu (utile tant que le vrai
   média n'est pas encore ajouté, et pour vérifier après coup). */
.media-nom {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: var(--encre-claire);
  text-align: center;
  margin: 6px 0 0;
}

/* Variante compacte du cadre média, pour les vignettes de compétence
   (photo carrée plus petite à côté du texte plutôt qu'en pleine largeur) */
.media-cadre.vignette {
  max-width: 420px;
  margin: 8px auto 14px;
}

/* Variante réduite, environ moitié moins large que la vignette standard
   (ex. petite photo de CV en haut de page, pas besoin qu'elle soit grande) */
.media-cadre.vignette-petite {
  max-width: 200px;
}

/* Galerie de plusieurs photos côte à côte (ex. petite séquence de
   mouvement : gauche / milieu / droite) */
.media-galerie {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}
.media-item {
  flex: 1;
  min-width: 0; /* évite que les images forcent la largeur du flex-item */
  border: 2px dashed var(--bordure);
  background: var(--papier-fonce);
  padding: 8px;
  text-align: center;
}
.media-item img {
  max-width: 100%;
  max-height: 200px;
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  border-radius: 2px;
}

@media (max-width: 480px) {
  .media-galerie {
    flex-direction: column;
  }
}

/* Message qui apparaît après un clic (preuve vidéo, analyse en cours, etc.) */
.resultat {
  margin-top: 12px;
  padding: 12px;
  background: var(--papier-fonce);
  border: 1px solid var(--bordure);
  font-size: 14px;
  display: none;
}
.resultat.visible { display: block; }

/* Pied de page : numéro de page + boutons précédent/suivant */
.pied {
  border-top: 2px solid var(--encre);
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--papier-fonce);
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

.numero-page { color: var(--encre-claire); }

.cases-decision {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.signature-ligne {
  margin-top: 40px;
  border-top: 1px solid var(--encre);
  width: 260px;
  padding-top: 6px;
  text-align: center;
  font-size: 13px;
  color: var(--encre-claire);
  margin-left: auto;
  margin-right: auto;
}

/* Zone de signature "à dessiner" (canvas) affichée sur le verdict final */
.signature-bloc {
  margin-top: 28px;
  text-align: center;
}

.signature-label {
  font-size: 13px;
  color: var(--encre-claire);
  margin-bottom: 6px;
}

.signature-canvas {
  background: #fff;
  border: 1px solid var(--encre);
  border-radius: 2px;
  display: block;
  margin: 0 auto;
  max-width: 100%;
  cursor: crosshair;
  touch-action: none; /* évite que la page défile pendant qu'on dessine au doigt */
}

.signature-boutons {
  margin-top: 8px;
}

@media (max-width: 600px) {
  .corps { padding: 22px 16px; }
  .entete { flex-direction: column; gap: 6px; text-align: center; }
}

/* Notification "toast" qui apparaît en haut de l'écran (ex. après
   l'envoi d'une signature), et disparaît toute seule après un moment. */
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
  background: var(--accent);
  color: var(--papier);
  padding: 14px 22px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.toast.visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.toast.erreur {
  background: var(--rouge-tampon);
}
.toast.succes {
  background: var(--vert-ok);
}
