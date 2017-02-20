$(document).on(pageEvent, "#confirmation", function () {
if (checkTime()) {
  $.ajax({
      url: 'http://' + server + 'solde.php',
      success: function (data) {
          if (data.reponse == "disconnect") {
            disconnect();
          } else if (data.reponse == true) {

            if (data.jaune > 0) {
              $('#confirmZone fieldset').append("<input type='radio' name='radioCouleur' id='radioJaune' value='jaune' ><label for='radioJaune'>Jaune</label>");
                chooseTicket();
            }

            if (data.vert > 0) {
                $('#confirmZone fieldset').append("<input type='radio' name='radioCouleur' id='radioVert' value='vert' ><label for='radioVert'>Vert</label>");
                chooseTicket();
            }

            if (data.rose > 0) {
                $('#confirmZone fieldset').append("<input type='radio' name='radioCouleur' id='radioRose' value='rose' ><label for='radioRose'>Rose</label>");
                chooseTicket();
            }

          }
          else {
            alert("Vous n'avez pas de tickets !");
            $.mobile.back();
          }
          fadingContent();
        },
      error: loadingError
  });



  $("#confirmZone").on("submit", function (event) {
      event.preventDefault();
      if (checkTime()) {
          $.ajax({
              method: "POST",
              url: 'http://' + server + 'confirm.php',
              data: $("#confirmZone").serialize(),
              success: function (data) {
                  console.log(data);
                  if (data.reponse == "disconnect") {
                      disconnect();
                  } else if (data.reponse == true) {
                      toast("Vous êtes confirmé !", 5000);
                      $.mobile.back();
                  } else if (data.reponse == "time") {
                      toast("Vous ne pouvez plus confirmer.", 5000);
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
    toast("Vous ne pouvez plus confirmer.", 5000);
    $.mobile.back();
}



});
