$(document).on("pageinit", "#inscription", function () {

  $('#btninscription').on("tap",function (event) {
    event.preventDefault();

    var nom = $('#nom').val();
    var prenom = $('#prenom').val();
    var bday = $('#bday').val();
    var tel = $('#tel').val();
    var email = $('#email').val();
    var emailconf = $('#emailconf').val();

    var mdpreg = $('#mdpreg').val();
    var mdpconf = $('#mdpconf').val();

    var regexNom = /[a-zA-Z]/;
    var regexDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    var regexTel = /[0-9]/;
    var regexMail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;


    if (regexNom.test(nom) && nom.length > 2 && nom.length < 250) {
      if (regexNom.test(prenom) && prenom.length > 2 && prenom.length < 250) {
        if (regexDate.test(bday)) {
          if (regexTel.test(tel) && tel.length >= 10 ) {
            if (regexMail.test(email) && email == emailconf) {
              if (mdpreg.length > 5 && mdpreg == mdpconf) {
                $.ajax({
                  method: "POST",
                  url: 'http://192.168.1.46/prototype1/php/traitement_inscription.php',
                  data: $('#forminscription').serialize(),
                  success: function (data) {
                    var reponse = JSON.parse(data);
                    console.log(reponse);
                    if (reponse == "nothing received") {
                      alert("Erreur : aucun champ n'a été renseigné !")
                    }
                    else if () {

                    }
                    $.mobile.changePage($('#confInscription'),{transition : "slide", reverse: false});
                  },
                  error: function () {
                    alert('Ya eu un problème !');
                  }
                });
              } else {
                alert("Vous n'avez pas entré de mot de passe !");
              }

            } else {
              alert("Votre e-mail n'est pas valide");
            }
          } else {
            alert("Votre numéro n'est pas valide");
          }
        } else {
          alert("Votre date n'est pas valide");
        }

      } else {
        alert("Votre prénom n'est pas valide");
      }
    } else {
      alert("Votre nom n'est pas valide");
    }
  });


  // AU TAP DU BOUTON SE CONNECTER, BASCULEMENT VERS LA PAGE HOME
  $('#logIn').on("tap", function () {
    $.mobile.changePage($('#home'),{transition : "slide", reverse: true});
  });




});
