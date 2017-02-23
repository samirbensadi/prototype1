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

              sessionStorage.setItem('startHour', data.start);
              sessionStorage.setItem('endHour', data.end);

              if (data.reponse == "disconnect") {
                disconnect();
              } else if (data.reponse == true) {
                $("#soldeText h3").text("Votre solde : ");
                  if (data.vert == 1) {
                      soldeText.append("<p><i class='zmdi zmdi-circle' style='color:green'></i> " + data.vert + " ticket vert</p>");
                  } else if (data.vert > 1) {
                    soldeText.append("<p><i class='zmdi zmdi-circle' style='color:green'></i> " + data.vert + " tickets verts</p>");
                  }

                  if (data.rose == 1) {
                      soldeText.append("<p><i class='zmdi zmdi-circle' style='color:pink'></i> " + data.rose + " ticket rose</p>");
                  } else if (data.rose > 1) {
                    soldeText.append("<p><i class='zmdi zmdi-circle' style='color:pink'></i> " + data.rose + " tickets roses</p>");
                  }

                  if (data.jaune == 1) {
                      soldeText.append("<p><i class='zmdi zmdi-circle' style='color:yellow'></i> " + data.jaune + " ticket jaune</p>");
                  } else if (data.jaune > 1) {
                    soldeText.append("<p><i class='zmdi zmdi-circle' style='color:yellow'></i> " + data.jaune + " tickets jaunes</p>");
                  }
              } else {
                  $('#soldeText h3').text("Vous n'avez aucun ticket.");
              }
              if (data.present == false ) {
                $('#soldeDiv').append('<div class="card-action"><button id="confirmBtn" class="ui-btn ui-btn-inline clr-primary">Je viens manger</button></div>');
                confirm();
              } else {
                soldeText.append("Je suis dans la liste aujourd'hui (ticket " + data.couleur + ")");
                $('#soldeDiv').append('<div class="card-action"><button id="unConfirmBtn" class="ui-btn ui-btn-inline clr-primary">Je veux annuler</button></div>');
                unconfirm();
              }

          },
          error: function () {
              toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // erreur de liaison avec le serveur
              $("#soldeText h3").text("Erreur de chargement.");
          }
      });
    }
    updateSolde();

    $("#refreshBtn").on('tap', function () {
      updateSolde();
    });

});
