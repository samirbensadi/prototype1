$(document).on("mobileinit", function () {
  $.mobile.allowCrossDomainPages = true;
});


$(document).on("pagecreate", "#home", function () {

  var server = "localhost";


// AU TAP DU BOUTON SE CONNECTER
  $('#btnCo').on("tap",function (event) {
    event.preventDefault();

    if ($("#login").val().length > 0 && $("#mdp").val().length > 5) { // si le login et le mot de passe ont bien été entré
      $.ajax({
        method: "POST",
        url : 'http://' + server + '/prototype1/php/log_in.php', // envoi vers ce script
        data: $('#formConnexion').serialize(),
        success: function (data) { // en cas de succes
          var requete = JSON.parse(data); // parser la reponse json
          console.log(requete);
          if (requete.reponse == true) { // si la reponse vaut true
            $.mobile.changePage("views/mainmenu.html",{transition : "slide", reverse: false}); // je charge la page 2
          } else {
            $("#alertErreur").popup("open","fade"); // php n'a pas reçu les bonnes infos
          }
        },
        error: function () {
          $("#alertCo").popup("open","fade"); // erreur de liaison avec le serveur
        }
      });
    } else {
        $("#alertmdp").popup("open","fade"); // champs incomplets
    }
  });




});
