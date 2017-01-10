$(document).on("pageinit", "#inscription", function () {

  var server = "localhost";

  $('#forminscription').on("submit",function (event) { // au tap du bouton d'inscription
    event.preventDefault(); // on empeche la transmission par defaut

    // on enregistre le contenu des champs dans des variables
    var nom = $('#nom').val();
    var prenom = $('#prenom').val();
    var bday = $('#bday').val();
    var tel = $('#tel').val();
    var email = $('#email').val();
    var emailconf = $('#emailconf').val();

    var mdpreg = $('#mdpreg').val();
    var mdpconf = $('#mdpconf').val();


    // on crée nos regex
    var regexNom = /[a-zA-Z]/;
    var regexDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    var regexTel = /[0-9]/;
    var regexMail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

    // si les nom et prénoms correspondent au regexNom et qu'ils font entre 2 et 250 caracteres
    if (regexNom.test(nom) && regexNom.test(prenom) && nom.length > 2 && nom.length < 250 && prenom.length > 2 && prenom.length < 250) {
      // si le numero correspond au regexTel et qu'il ne depasse pas 10 caracteres
      if (regexTel.test(tel) && tel.length >= 10 ) {
        // si l'adresse e-mail correspond au regex et que la confirmation corresponde
        if (regexMail.test(email) && email == emailconf) {
          // si le mot de passe fait au minimum 6 caracteres et que la confirmation corresponde
          if (mdpreg.length > 5 && mdpreg == mdpconf) {
            // requete ajax vers la script php d'inscription
            $.ajax({
              method: "POST",
              url: 'http://' + server + '/prototype1/php/register.php',
              data: $('#forminscription').serialize(), // on serialise le formulaire et on envoie
              success: function (data) { // en cas de succes, on recupere la retour en parametre d'une fonction anonyme
                var requete = JSON.parse(data); // qu'on parse (puisque c'est du json)
                console.log(requete.reponse);
                if (requete.reponse == true) { // si l'enfant reponse de l'objet requete vaut true
                  $.mobile.changePage("confirm_account.html",{transition : "slide", reverse: false}); // on bascule sur la page confInscription
                }
                else {
                  $("#alertMailExist").popup("open", "fade");
                }
              },
              error: function () { // en cas d'erreur
                $("#alertCoReg").popup("open","fade"); // on fait apparaitre la pop up d'erreur de connexion
              }
            });
          } else {
            $("#alertMdpReg").popup("open","fade"); // sinon on fait apparaitre la pop up alertMdpReg
          }
        } else {
          $("#alertMail").popup("open","fade"); // sinon on fait apparaitre la pop up alertMail
        }
      } else {
        $("#alertNum").popup("open","fade"); // sinon on fait apparaitre la pop up alertNum
      }
    } else {
      $("#alertNom").popup("open","fade"); // sinon on fait apparaitre la pop up alertNom
    }
  });

});
