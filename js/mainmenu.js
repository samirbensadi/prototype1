$(document).on("pagecreate", "#mainmenu", function () {

    // AU TAP DU BOUTON SE DECONNECTER

    $('#logOut').on('tap', function () {
        $.ajax({
            method: "POST",
            url: 'http://' + server + '/prototype1/php/log_out.php'
        });
        disconnect();
    });

    function updateSolde() {
      $.ajax({
          url: 'http://' + server + '/prototype1/php/solde.php',
          success: function (data) {
              var requete = JSON.parse(data);
              console.log(requete);
              if (requete.reponse == "disconnect") {
                disconnect();
              } else if (requete.reponse == true) {

                var soldeText = $('#soldeText');

                  if (requete.vert == 1) {
                      soldeText.append("<p>- " + requete.vert + " ticket vert</p>");
                  } else if (requete.vert > 1) {
                    soldeText.append("<p>- " + requete.vert + " tickets verts</p>");
                  }

                  if (requete.rose == 1) {
                      soldeText.append("<p>- " + requete.rose + " ticket rose</p>");
                  } else if (requete.rose > 1) {
                    soldeText.append("<p>- " + requete.rose + " tickets roses</p>");
                  }

                  if (requete.jaune == 1) {
                      soldeText.append("<p>- " + requete.jaune + " ticket jaune</p>");
                  } else if (requete.jaune > 1) {
                    soldeText.append("<p>- " + requete.jaune + " tickets jaunes</p>");
                  }

                  if (requete.present == false ) {
                    $('#soldeAction').append('<button id="confirmBtn" class="ui-btn ui-btn-inline clr-primary" data-transition="slide" disabled>Je viens manger</button>');
                    checkHour($('#confirmBtn'));
                      confirm();
                  } else {
                    soldeText.append('Je suis dans la liste (ticket ' + requete.couleur + ')');
                    $('#soldeAction').append('<button id="unConfirmBtn" class="ui-btn ui-btn-inline clr-primary" data-transition="slide" disabled>Je veux me décommander</button>');
                    checkHour($('#unConfirmBtn'));
                    unconfirm();
                  }

              } else {
                  $('#soldeText h3').text("Vous n'avez aucun ticket.");
              }

          },
          error: function () {
              toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // erreur de liaison avec le serveur
          }
      });
    }
    updateSolde();

});
