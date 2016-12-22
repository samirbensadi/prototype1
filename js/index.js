$(document).on("pagecreate", "#first", function () {
  $.mobile.allowCrossDomainPages = true;

setTimeout(function () { // je fixe un délai avant exécution de ma fonction anonyme
  if (localStorage.remembertoken) { // si le remembertoken est dans le localStorage
    $.mobile.changePage($('#mainmenu')); // alors je charge la page 2
  }
  else {
    $.mobile.changePage($('#home')); // sinon je charge la page home
  }
}, 1000); // temps d'attente : 2 sec


// AU TAP DU BOUTON SE CONNECTER
  $('#btnCo').on("tap",function (event) {
    event.preventDefault();

    if ($("#login").val().length > 0 && $("#mdp").val().length > 5) { // si le login et le mot de passe ont bien été entré
      $.ajax({
        method: "POST",
        url : 'http://192.168.1.46/prototype1/php/traitement_connexion.php', // envoi vers ce script
        data: $('#formConnexion').serialize(),
        success: function (data) { // en cas de succes
          var requete = JSON.parse(data); // parser la reponse json
          console.log(requete);
          // if (reponse == true) { // si la reponse vaut true
          //   var token = "test"; // enregistrer le token
          //   window.localStorage.setItem("remembertoken", token); // le stocker dans le local storage
          //   $.mobile.changePage($('#mainmenu'),{transition : "slide", reverse: false}); // je charge la page 2
          } else {
            alert("Erreur : les identifiants ne sont pas ok !"); // php n'a pas reçu les bonnes infos
          }
        },
        error: function () {
          alert('Ya eu un problème !'); // erreur de liaison avec le serveur
        }
      });
    } else {
        // alert('Le mot de passe doit contenir au moins 6 caractères.');
        $( "#alertmdp" ).popup("open","fade");
    }
  });


  // AU TAP DU BOUTON SE DECONNECTER

    $('#logOut').on('tap', function () {
      window.localStorage.clear(); // effacer le localStorage
      $.mobile.changePage($('#home'),{transition : "slide", reverse: true}); // retourner à la page home
    });


});
