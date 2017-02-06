var server = "localhost";
var heureDebut = 0; // heure à partir de laquelle on peut confirmer
var heureFin = 24; // heure à partir de laquelle on ne peut plus

var pageEvent = "pageshow";

// tableaux qui contiennent la liste des jours de la semaine et des mois de l'année pour que ecrire les dates en français
var jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
var mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

// on crée nos regex
var regexNom = /[a-zA-Z]/;
var regexDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
var regexTel = /[0-9]/;
var regexMail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

// fonction pour créer un toast
function toast(msg, time) {
    new $.nd2Toast({
        message : msg , // Required
        ttl : time // optional, time-to-live in ms (default: 3000)
    });
}


// fonction qui permet d'activer ou désactiver le bouton pour changer le mot de passe en fonction des champs
function checkChangeMdp() {
    var oldMdp = $("#oldMdp").val();
    var mdpParam = $('#newMdp').val();
    var mdpParamConf = $('#newMdpConf').val();

    if (mdpParam == mdpParamConf && mdpParam.length > 5 && oldMdp.length > 5) {
        $('#btnSaveMdp').prop("disabled", false);
    } else  {
        $('#btnSaveMdp').prop("disabled", true);
    }
}

// fonction pour quitter le service
function disconnect() {
        localStorage.clear();
        sessionStorage.clear();
        $.mobile.changePage("../index.html", {transition : "slide", reverse: true});
        toast("Vous êtes déconnecté.", 5000);
}

// fonction pour verifier l'heure
function checkTime() {
  var date_actuelle = new Date();
  var heure = date_actuelle.getHours();
  if (heure >= heureDebut && heure < heureFin) {
    return true;
  } else {
    return false;
  }
}


// fonction pour autoriser ou non la confirmation en fonction de l'heure
function checkHour(cible) {
  if (checkTime()) {
    cible.prop("disabled", false);
  } else {
    cible.prop("disabled", true);
  }
}

// fonction pour limiter l'inscription au majeur
function majeur() {
  var date_actuelle = new Date();
  var annee = date_actuelle.getYear();
  date_actuelle.setYear(annee - 18);

  var hihi = date_actuelle.toISOString();
  var newdate = hihi.substring(0,10);

  var champ = document.getElementById('bday');
  champ.max = newdate;
}

// fonction pour re-activer le bouton de confirmation si un ticket a eté choisi
function chooseTicket() {
  $("#confirmZone fieldset input").on('tap', function () {
    $('#confirmPresenceBtn').prop("disabled", false);
  });
}

function confirm() {
  $('#confirmBtn').on("tap", function () {
    $.mobile.changePage('confirmation.html',{transition : "slide", reverse: false});
  });
}

// fonction pour deconfirmer
function unconfirm() {
  $("#unConfirmBtn").on('tap', function () {
    $.mobile.changePage('deconfirmation.html',{transition : "slide", reverse: false});
  });
}


// fonction pour cacher le loader et faire apparaitre le contenu de la page
function loading() {
  $('.hiddenContent').fadeIn('fast');
}

// fonction anonyme en cas d'erreur d'une requete ajax spécifique
var loadingError = function () {
    toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // erreur de liaison avec le serveur
    $('.ui-content').html('<h3>Erreur de chargement</h3>');
};

var loader = '<svg class="loaderJS" width="40px" height="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ring-alt"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#afafb7" fill="none" stroke-width="10" stroke-linecap="round"></circle><circle cx="50" cy="50" r="40" stroke="#5cffd6" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="2s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg>';

function ajaxLoader(cible) {

   $(document).ajaxStart(function () {
      cible.html(loader);
   });

    $(document).ajaxStop(function () {
       $('.loaderJS').remove();
    });

}
