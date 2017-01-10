$(document).on("pagebeforecreate", "#parametres",  function () {

    var server = "localhost";

    $.ajax({
        url: "http://" + server + '/prototype1/php/get_parametres.php',
        success: function (data) {
            var requete = JSON.parse(data);
            console.log(requete);
            if (requete.reponse == "disconnect") {
                $.mobile.changePage("index.html", {transition: "slide", reverse: true});
            } else {
                $('#parametres-content').prepend('<h3>Nom : ' + requete.nom + '</h3></br><h3>Prénom : ' + requete.prenom + "</h3>");
                $('#newTel').val(requete.tel);
                $('#newEmail').val(requete.email);
            }
        },
        error: function () {
          alert('probleme de liaison'); // erreur de liaison avec le serveur
        }
    });

    $('#formparametres').on("submit", function (event) {

        event.preventDefault();
            
      var regexParamTel = /[0-9]/;
      var regexParamMail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

      var telParam = $('#newTel').val();

      var emailParam = $('#newEmail').val();

 


      // si le numero correspond au regexTel et qu'il ne depasse pas 10 caracteres
      if (regexParamTel.test(telParam) && telParam.length >= 10 ) {
        // si l'adresse e-mail correspond au regex et que la confirmation corresponde
        if (regexParamMail.test(emailParam)) {
          // si le mot de passe fait au minimum 6 caracteres et que la confirmation corresponde
          

            $.ajax({
                method: "POST",
                url: "http://" + server + '/prototype1/php/change_parametres.php',
                data: $('#formparametres').serialize() ,
                success: function (data) {
                    var requete = JSON.parse(data);
                    console.log(requete);
                    if (requete.reponse == "disconnect") {
                        $.mobile.changePage("index.html", {transition : "slide", reverse: true});
                    } else if (requete.reponse == true) {
                        alert("Vos modifications ont bien été enregistrées !");
                    }
                    else {
                        alert("Le serveur n'a pas reçu vos modifications.");
                    }
                },
                error: function () {
                  alert('probleme de liaison'); // erreur de liaison avec le serveur
                }
            });

          
        } else {
          alert("L'email n'est pas valide.");
        }
      } else {
        alert("Le numéro n'est pas valide");
      }
    });

});
