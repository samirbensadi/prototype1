$(document).on("pageinit", "#inscription", function () {
  ajaxLoader($('.loadArea'));

  majeur();

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
                console.log(data);
                if (data.reponse == true) { // si l'enfant reponse de l'objet data vaut true
                  $.mobile.changePage("confirm_account.html",{transition : "slide", reverse: false}); // on bascule sur la page confInscription
                }
                else {
                  toast("<b>Erreur</b> : cette adresse e-mail est déjà utilisée.", 5000);
                }
              },
              error: function () { // en cas d'erreur
                toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // on fait apparaitre la pop up d'erreur de connexion
              }
            });
          } else {
            toast("Mot de passe : 6 caractères au minimum.", 5000);
          }
        } else {
          toast("Merci d'entrer une adresse e-mail valide.", 5000);
        }
      } else {
        toast("Votre numéro doit contenir au minimum 10 chiffres.", 5000);
      }
    } else {
      toast("Vos nom et/ou prénom ne sont pas valides.", 5000);
    }
  });

});
