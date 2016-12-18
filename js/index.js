$(document).on("pageinit", "#home", function () {
  $.mobile.allowCrossDomainPages = true;

  if (localStorage.login && localStorage.mdp) { // si les identifiants sont déjà dans le localStorage
    $.mobile.changePage($('#mainmenu')); // alors je charge la page 2
  }
  else {
    $.mobile.changePage($('#home')); // sinon je charge la page connect
  }

// AU TAP DU BOUTON SE CONNECTER
  $('#btnCo').on("tap",function (event) {
    event.preventDefault();

    if ($("#login").length > 0 || $("#mdp").length > 0) {
      $.ajax({
        method: "POST",
        url : 'http://localhost/prototype1/php/traitement_connexion.php',
        data: $('#formConnexion').serialize(),
        success: function (data) {
          var reponse = JSON.parse(data);
          console.log(reponse);
          if (reponse == true) {
            var login = $('#login').val();
            var mdp = $('#mdp').val();
            window.localStorage.setItem("login", login);
            window.localStorage.setItem("mdp", mdp);
            $.mobile.changePage($('#mainmenu'),{transition : "slide", reverse: false}); // je charge la page 2
          } else {
            alert("Erreur : something's missing !");
          }
        },
        error: function () {
          alert('Ya eu un problème !');
        }
      });
    } else {
        alert('Tapez qqch');
    }
  });


  // AU TAP DU BOUTON SE DECONNECTER

    $('#logOut').on('tap', function () {
      window.localStorage.clear(); // effacer le localStorage
      $.mobile.changePage($('#home'),{transition : "slide", reverse: true}); // retourner à la page home
    });


});
