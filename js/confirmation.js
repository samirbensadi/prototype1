$(document).on("pagecreate", "#confirmation", function () {

if (checkTime()) {
  console.log("hello");
  $.ajax({
      url: 'http://' + server + '/prototype1/php/solde.php',
      success: function (data) {
          var requete = JSON.parse(data);
          console.log(requete);
          if (requete.reponse == "disconnect") {
            disconnect();
          } else if (requete.reponse == true) {

            if (requete.vert > 0) {
              $('#radioVert').prop('disabled', false);
            }

            if (requete.jaune > 0) {
              $('#radioJaune').prop('disabled', false);
            }

            if (requete.rose > 0) {
              $('#radioRose').prop('disabled', false);
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

  $("#radioJaune, #radioVert, #radioRose").on('tap', function () {
    $('#confirmPresenceBtn').prop("disabled", false);
  });


  $("#confirmZone").on("submit", function () {
    $.ajax({
        url: 'http://' + server + '/prototype1/php/confirm.php',
        data: $("#confirmZone").serialize() ,
        success: function (data) {
            var requete = JSON.parse(data);
            console.log(requete);
            if (requete.reponse == "disconnect") {
              disconnect();
            } else if (requete.reponse == true) {

            }
          },

        error: function () {
            alert('probleme de liaison'); // erreur de liaison avec le serveur
        }
    });
  });


} else {
  alert("It's too late !");
  $.mobile.back();
}



});
