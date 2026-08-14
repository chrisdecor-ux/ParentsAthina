/* ============================================================
   SUPABASE — enregistrement des décisions finales et envoi
   des signatures vers ta base de données.

   ⚠️ À FAIRE AVANT TOUT : colle ici ton URL de projet et ta clé
   "anon public", récupérées dans Supabase > Project Settings > API.
   ============================================================ */

const SUPABASE_URL = "https://zyhsgdrdifasllyjkait.supabase.co";
const SUPABASE_CLE_PUBLIQUE = "sb_publishable_d8ie8GqPf9G8Ei3L0FDuFw_SXxsgJWB";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_CLE_PUBLIQUE);

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
  var visiteurId = obtenirVisiteurId();
  var adresseIP = await obtenirAdresseIP();

  var { error } = await supabase.from("reponses_finales").insert({
    visiteur_id: visiteurId,
    decision: decision,
    adresse_ip: adresseIP,
    navigateur: navigator.userAgent
  });

  if (error) {
    console.error("Erreur lors de l'enregistrement de la décision :", error);
    afficherToast("❌ Décision non enregistrée (voir console).", "erreur");
  } else {
    afficherToast("✅ Décision bien reçue.", "succes");
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

  var visiteurId = obtenirVisiteurId();
  var nomFichier = signataire + "-" + visiteurId + "-" + Date.now() + ".png";

  // On transforme le canvas en "blob" (fichier binaire en mémoire),
  // c'est le format attendu par l'upload Supabase.
  canvas.toBlob(async function (blob) {
    var { error: erreurUpload } = await supabase.storage
      .from("signatures")
      .upload(nomFichier, blob, { contentType: "image/png" });

    if (erreurUpload) {
      console.error("Erreur lors de l'envoi de la signature :", erreurUpload);
      afficherMessageEnvoi(idCanvas, "❌ Échec de l'envoi. Réessaie.");
      afficherToast("❌ Échec de l'envoi de la signature.", "erreur");
      return;
    }

    var { error: erreurTable } = await supabase.from("signatures").insert({
      visiteur_id: visiteurId,
      signataire: signataire,
      chemin_fichier: nomFichier
    });

    if (erreurTable) {
      console.error("Erreur lors de l'enregistrement de la signature :", erreurTable);
      afficherToast("❌ Signature envoyée mais non enregistrée.", "erreur");
      return;
    }

    afficherMessageEnvoi(idCanvas, "✅ Signature envoyée.");
    afficherToast("✅ Signature bien reçue, merci !", "succes");
  }, "image/png");
}

// Petit message de confirmation affiché sous le canvas concerné
// (reste discret, en plus de la notification popup).
function afficherMessageEnvoi(idCanvas, texte) {
  var id = "confirmation-" + idCanvas;
  var bloc = document.getElementById(id);
  if (bloc) {
    bloc.textContent = texte;
    bloc.style.display = "block";
  }
}

// Notification "toast" qui apparaît en haut de l'écran quelques
// secondes, pour que l'envoi (ou l'échec) de la signature soit
// vraiment visible, pas juste un petit texte discret.
var minuteurToast = null;
function afficherToast(texte, type) {
  var toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = texte;
  toast.className = "toast visible" + (type ? " " + type : "");

  if (minuteurToast) clearTimeout(minuteurToast);
  minuteurToast = setTimeout(function () {
    toast.classList.remove("visible");
  }, 3500);
}
