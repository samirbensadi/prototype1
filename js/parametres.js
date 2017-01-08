$(document).on("pagebeforecreate", "#parametres",  function () {

    var server = "localhost";

    $.ajax({
        url: "http://" + server + '/prototype1/php/parametres.php',
        success: function (data) {
            var requete = JSON.parse(data);
            console.log(requete);
            $('#parametres-content').prepend('<h3>Nom : ' + requete.nom + '</h3></br><h3>Prénom : ' + requete.prenom + "</h3>");
            $('#tel').val(requete.tel);
            $('#newEmail').val(requete.email);
        },
        error: function () {
          alert('probleme de liaison'); // erreur de liaison avec le serveur
        }
    });

    $('#formparametres').on("submit", function () {

      var regexParamTel = /[0-9]/;
      var regexParamMail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

      var telParam = $('#tel').val();

      var emailParam = $('#emailconf').val();

      var mdpParam = $('#mdpreg').val();
      var mdpParamConf = $('#mdpconf').val();


      // si le numero correspond au regexTel et qu'il ne depasse pas 10 caracteres
      if (regexParamTel.test(tel) && telParam.length >= 10 ) {
        // si l'adresse e-mail correspond au regex et que la confirmation corresponde
        if (regexParamMail.test(email)) {
          // si le mot de passe fait au minimum 6 caracteres et que la confirmation corresponde
          if (mdpParam == mdpParamConf) {

            $.ajax({
                method: "POST",
                url: "http://" + server + '/prototype1/php/parametres.php',
                data: $('#formparametres').serialize() ,
                success: function (data) {
                    var requete = JSON.parse(data);
                    console.log(requete);
                },
                error: function () {
                  alert('probleme de liaison'); // erreur de liaison avec le serveur
                }
            });

          } else {
            alert("Les mots de passe ne correspondent pas. (6 caracteres minimum)");
          }
        } else {
          alert("L'email n'est pas valide.");
        }
      } else {
        alert("Le numéro n'est pas valide");
      }
    });

});
