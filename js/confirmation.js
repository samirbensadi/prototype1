$(document).on("pagecreate", "#confirmation", function () {

if (checkTime()) {
  $.ajax({
      url: 'http://' + server + '/prototype1/php/solde.php',
      success: function (data) {
          var requete = JSON.parse(data);
          if (requete.reponse == "disconnect") {
            disconnect();
          } else if (requete.reponse == true) {

            if (requete.jaune > 0) {
              $('#confirmZone fieldset').append("<input type='radio' name='radioCouleur' id='radioJaune' value='jaune' ><label for='radioJaune'>Jaune</label>");
                chooseTicket();
            }

            if (requete.vert > 0) {
                $('#confirmZone fieldset').append("<input type='radio' name='radioCouleur' id='radioVert' value='vert' ><label for='radioVert'>Vert</label>");
                chooseTicket();
            }

            if (requete.rose > 0) {
                $('#confirmZone fieldset').append("<input type='radio' name='radioCouleur' id='radioRose' value='rose' ><label for='radioRose'>Rose</label>");
                chooseTicket();
            }

          }
          else {
            alert("Vous n'avez pas de tickets !");
            $.mobile.back();
          }
        },
      error: function () {
          alert('probleme de liaison'); // erreur de liaison avec le serveur
      }
  });



  $("#confirmZone").on("submit", function (event) {
      event.preventDefault();

      if (checkTime()) {
          $.ajax({
              method: "POST",
              url: 'http://' + server + '/prototype1/php/confirm.php',
              data: $("#confirmZone").serialize(),
              success: function (data) {
                  var requete = JSON.parse(data);
                  console.log(requete);
                  if (requete.reponse == "disconnect") {
                      disconnect();
                  } else if (requete.reponse == true) {
                      toast("Vous êtes confirmé !", 5000);
                      $.mobile.back();
                  } else if (requete.reponse == "time") {
                      toast("Vous ne pouvez plus annuler confirmer.", 5000);
                      $.mobile.back();
                  } else {
                      toast("Vous n'avez pas choisi de ticket !",5000);
                  }
              },

              error: function () {
                  toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // erreur de liaison avec le serveur
              }
          });
      }
  });


} else {
    toast("Vous ne pouvez plus annuler confirmer.", 5000);
    $.mobile.back();
}



});
