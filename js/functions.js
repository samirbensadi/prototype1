var server = "localhost";
var heureDebut = 0; // heure à partir de laquelle on peut confirmer
var heureFin = 22; // heure à partir de laquelle on ne peut plus

// tableaux qui contiennent la liste des jours de la semaine et des mois de l'année pour que ecrire les dates en français
var jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
var mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

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
    $('#confirmBtn').on("tap", function () {
      $.mobile.changePage('confirmation.html',{transition : "slide", reverse: false});
    });
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
  console.log(newdate);

  var champ = document.getElementById('bday');
  champ.max = newdate;

}


// fonction pour re-activer le bouton de confirmation si un ticket a eté choisi
function chooseTicket() {
    $("#confirmZone fieldset input").on('tap', function () {
        $('#confirmPresenceBtn').prop("disabled", false);
    });
}

// fonction pour deconfirmer
function unconfirm() {
    $("#unConfirmBtn").on('tap', function () {
        $.mobile.changePage('deconfirmation.html',{transition : "slide", reverse: false});
    });
}