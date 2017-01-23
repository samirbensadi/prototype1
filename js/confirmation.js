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
      event.preventDefault;

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
                      alert("Vous êtes confirmé !");
                      $.mobile.back();
                  } else if (requete.reponse == "time") {
                      alert("It's too late !");
                      $.mobile.back();
                  } else {
                      alert("Vous n'avez pas choisi de ticket !");
                  }
              },

              error: function () {
                  alert('probleme de liaison'); // erreur de liaison avec le serveur
              }
          });
      }
  });


} else {
  alert("It's too late !");
  $.mobile.back();
}



});
