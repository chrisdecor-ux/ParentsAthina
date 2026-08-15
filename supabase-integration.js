/* ============================================================
   SUPABASE — enregistrement des décisions finales et envoi
   des signatures vers ta base de données.

   ⚠️ À FAIRE AVANT TOUT : colle ici ton URL de projet et ta clé
   "anon public", récupérées dans Supabase > Project Settings > API.
   ============================================================ */

const SUPABASE_URL = "https://pcmpmrmiisqhcmtoxpmh.supabase.co";
const SUPABASE_CLE_PUBLIQUE = "sb_publishable_rjuXX9dSKc6a6Ei_5HQRfQ_Pj35cI5U";

// On vérifie que la librairie Supabase (chargée depuis le CDN, dans le
// <script> juste avant celui-ci) est bien disponible AVANT de s'en servir.
// Si elle n'a pas chargé (CDN indisponible, ordre des balises modifié,
// coupure réseau...), on ne fait plus planter tout ce fichier : on
// continue avec "supabase = null", et chaque fonction plus bas vérifie
// ce cas pour afficher un message clair au lieu de laisser les boutons
// ne rien faire silencieusement.
var supabaseClient = null;
if (window.supabase && typeof window.supabase.createClient === "function") {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_CLE_PUBLIQUE);
} else {
  console.error(
    "La librairie Supabase (supabase-js) n'a pas pu être chargée. " +
    "Vérifie dans index.html que la balise <script> du CDN " +
    "(cdn.jsdelivr.net/npm/@supabase/supabase-js@2) est bien présente " +
    "ET placée AVANT <script src=\"supabase-integration.js\">."
  );
}

/* ============================================================
   IDENTIFIANT DE VISITEUR
   On génère un identifiant unique une seule fois par navigateur,
   et on le garde dans localStorage. Ça permet de reconnaître le
   même visiteur s'il revient, sans être aussi précis (ni aussi
   intrusif) qu'un vrai compte utilisateur.
   ============================================================ */
function obtenirVisiteurId() {
  var id = localStorage.getItem("visiteur_id");
  if (!id) {
    // crypto.randomUUID() est disponible nativement dans tous les
    // navigateurs récents, pas besoin de librairie externe.
    id = crypto.randomUUID();
    localStorage.setItem("visiteur_id", id);
  }
  return id;
}

/* ============================================================
   ADRESSE IP PUBLIQUE (best effort)
   Le JavaScript exécuté dans le navigateur ne peut pas lire
   l'adresse IP directement : il faut demander à un service tiers
   de nous la renvoyer. ipify.org est gratuit et ne nécessite pas
   de clé. Si la requête échoue (pas de réseau, service bloqué),
   on continue quand même sans IP plutôt que de bloquer le site.
   ============================================================ */
async function obtenirAdresseIP() {
  try {
    var reponse = await fetch("https://api.ipify.org?format=json");
    var donnees = await reponse.json();
    return donnees.ip;
  } catch (erreur) {
    return null;
  }
}

/* ============================================================
   ENREGISTRER UNE DÉCISION (Refuser / Réfléchir / Accepter)
   Appelée depuis script.js à chaque clic sur un des 3 boutons
   de la page finale.
   ============================================================ */
async function enregistrerDecision(decision) {
  if (!supabaseClient) {
    console.error("Connexion à la base de données indisponible.");
    return;
  }

  try {
    var visiteurId = obtenirVisiteurId();
    var adresseIP = await obtenirAdresseIP();

    var { error } = await supabaseClient.from("reponses_finales").insert({
      visiteur_id: visiteurId,
      decision: decision,
      adresse_ip: adresseIP,
      navigateur: navigator.userAgent
    });

    if (error) {
      // Aucune notification visible pour ces boutons : la personne ne doit
      // rien remarquer. L'erreur reste visible uniquement dans la console,
      // pour toi si tu dois déboguer.
      console.error("Erreur lors de l'enregistrement de la décision :", error);
    }
  } catch (erreurInattendue) {
    console.error("Erreur inattendue dans enregistrerDecision :", erreurInattendue);
  }
}

/* ============================================================
   ENVOYER UNE SIGNATURE VERS SUPABASE
   Convertit le contenu du canvas en image PNG, l'envoie dans le
   bucket "signatures", puis enregistre une ligne dans la table
   "signatures" avec le chemin du fichier.
   ============================================================ */
async function envoyerSignature(idCanvas, signataire) {
  var canvas = document.getElementById(idCanvas);
  if (!canvas) return;

  if (!supabaseClient) {
    afficherToast("❌ L'envoi de la signature au candidat a échoué.", "erreur");
    return;
  }

  var visiteurId = obtenirVisiteurId();
  // Le timestamp est placé EN PREMIER dans le nom de fichier. Comme ça,
  // trier les fichiers par ordre alphabétique (ce que fait la plupart
  // des interfaces par défaut) revient à les trier par ordre chronologique,
  // sans que "papa" et "maman" viennent casser l'ordre en se mélangeant
  // par initiale.
  var nomFichier = Date.now() + "-" + signataire + "-" + visiteurId + ".png";

  // On transforme le canvas en "blob" (fichier binaire en mémoire),
  // c'est le format attendu par l'upload Supabase.
  canvas.toBlob(async function (blob) {
    try {
      var { error: erreurUpload } = await supabaseClient.storage
        .from("signatures")
        .upload(nomFichier, blob, { contentType: "image/png" });

      if (erreurUpload) {
        console.error("Erreur lors de l'envoi de la signature :", erreurUpload);
        afficherToast("❌ L'envoi de la signature au candidat a échoué.", "erreur");
        return;
      }

      var { error: erreurTable } = await supabaseClient.from("signatures").insert({
        visiteur_id: visiteurId,
        signataire: signataire,
        chemin_fichier: nomFichier
      });

      if (erreurTable) {
        console.error("Erreur lors de l'enregistrement de la signature :", erreurTable);
        afficherToast("❌ L'envoi de la signature au candidat a échoué.", "erreur");
        return;
      }

      afficherToast("✅ Le candidat a bien reçu votre signature.", "succes");
    } catch (erreurInattendue) {
      // Même filet de sécurité que pour enregistrerDecision : on affiche
      // l'erreur au lieu de la laisser disparaître silencieusement.
      console.error("Erreur inattendue dans envoyerSignature :", erreurInattendue);
      afficherToast("❌ L'envoi de la signature au candidat a échoué.", "erreur");
    }
  }, "image/png");
}

// Notification "toast" qui apparaît en haut de l'écran quelques
// secondes, pour que l'envoi (ou l'échec) de la signature soit
// vraiment visible, pas juste un petit texte discret.
var minuteurToast = null;
function afficherToast(texte, type) {
  var toast = document.getElementById("toast");
  if (!toast) return;

  // On retire d'abord la classe "visible" et on force le navigateur à
  // "digérer" ce changement (reflow) avant de la remettre. Ça garantit
  // que la notification rejoue toujours son animation d'apparition,
  // même si on clique deux fois de suite sur "Envoyer" avec le même
  // texte de résultat — la personne voit bien que ça vient de se
  // reproduire, pas juste un texte figé qui ne bouge plus.
  toast.classList.remove("visible");
  void toast.offsetWidth;

  toast.textContent = texte;
  toast.className = "toast visible" + (type ? " " + type : "");

  if (minuteurToast) clearTimeout(minuteurToast);
  minuteurToast = setTimeout(function () {
    toast.classList.remove("visible");
  }, 3500);
}

/* ============================================================
   SUIVI DE TOUS LES AUTRES CLICS DU SITE
   ("Commencer l'évaluation", Précédent/Suivant, les onglets
   numérotés, "Voir la preuve", Effacer/Télécharger/Envoyer, etc.)

   Ça réutilise directement la table reponses_finales (et donc la
   fonction enregistrerDecision déjà définie plus haut) : pas besoin
   de créer une nouvelle table ni une nouvelle policy Supabase.
   Le texte affiché sur le bouton sert de valeur pour la colonne
   "decision", ex. "➡ Suivant" ou "Voir la preuve".

   Les 3 boutons de la page finale (Refuser / Réfléchir / Accepter)
   sont EXCLUS ici, parce qu'ils sont déjà suivis individuellement
   par script.js avec un libellé propre ("refuser", "reflechir",
   "accepter") — sans ça, chaque clic dessus créerait 2 lignes au
   lieu d'une.
   ============================================================ */
document.addEventListener("click", function (evt) {
  var element = evt.target.closest("button, .onglet");
  if (!element) return;

  var declencheur = element.getAttribute("onclick") || "";
  var dejaSuiviAilleurs =
    declencheur.indexOf("cliquerRefuser") !== -1 ||
    declencheur.indexOf("afficherReflexion") !== -1 ||
    declencheur.indexOf("afficherAcceptation") !== -1;
  if (dejaSuiviAilleurs) return;

  var texte = (element.textContent || "").trim().slice(0, 80);
  enregistrerDecision(texte || ("clic:" + (element.id || "bouton sans nom")));
});
