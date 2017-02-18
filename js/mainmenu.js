$(document).on(pageEvent, "#mainmenu", function () {
    // AU TAP DU BOUTON SE DECONNECTER

    $('#logOut').on('tap', function () {
        $.ajax({
            method: "POST",
            url: 'http://' + server + 'log_out.php'
        });
        disconnect();
    });

    function updateSolde() {
      $('#soldeDiv').html('<div class="card-supporting-text" id="soldeText"><h3 class="card-primary-title"></h3></div>');

      var soldeText = $('#soldeText');


      $.ajax({
          url: 'http://' + server + 'solde.php',
          success: function (data) {
              console.log(data);
              if (data.reponse == "disconnect") {
                disconnect();
              } else if (data.reponse == true) {
                $("#soldeText h3").text("Votre solde : ");
                  if (data.vert == 1) {
                      soldeText.append("<p>- " + data.vert + " ticket vert</p>");
                  } else if (data.vert > 1) {
                    soldeText.append("<p>- " + data.vert + " tickets verts</p>");
                  }

                  if (data.rose == 1) {
                      soldeText.append("<p>- " + data.rose + " ticket rose</p>");
                  } else if (data.rose > 1) {
                    soldeText.append("<p>- " + data.rose + " tickets roses</p>");
                  }

                  if (data.jaune == 1) {
                      soldeText.append("<p>- " + data.jaune + " ticket jaune</p>");
                  } else if (data.jaune > 1) {
                    soldeText.append("<p>- " + data.jaune + " tickets jaunes</p>");
                  }
              } else {
                  $('#soldeText h3').text("Vous n'avez aucun ticket.");
              }

              if (data.present == false ) {
                $('#soldeDiv').append('<div class="card-action"><button id="confirmBtn" class="ui-btn ui-btn-inline clr-primary" disabled>Je viens manger</button></div>');
                checkHour($('#confirmBtn'));
                confirm();
              } else {
                soldeText.append('Je suis dans la liste (ticket ' + data.couleur + ')');
                $('#soldeDiv').append('<div class="card-action"><button id="unConfirmBtn" class="ui-btn ui-btn-inline clr-primary"  disabled>Je veux me décommander</button></div>');
                checkHour($('#unConfirmBtn'));
                unconfirm();
              }

          },
          error: function () {
              toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // erreur de liaison avec le serveur
              $("#soldeText h3").text("Erreur de chargement.");
              $('#refreshBtn').removeClass('rotationBtn');
          }
      });
    }
    updateSolde();

    $("#refreshBtn").on('tap', function () {
      updateSolde();
    });

});
