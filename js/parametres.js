$(document).on("pagebeforecreate", "#parametres",  function () {

    // RÉCUPÉRER LES PARAMETRES
    $.ajax({
        url: "http://" + server + '/prototype1/php/get_parametres.php',
        success: function (data) {
            var requete = JSON.parse(data);
            console.log(requete);
            if (requete.reponse == "disconnect") {
                disconnect();
            } else if (requete.reponse == true) {
                $('#paramNom').val(requete.nom);
                $('#paramPrenom').val(requete.prenom);
                $('#newTel').val(requete.tel);
                $('#newEmail').val(requete.email);
            }
        },
        error: function () {
          alert('probleme de liaison'); // erreur de liaison avec le serveur
        }
    });

    // MODIFIER LES PARAMETRES

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
                        disconnect();
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


    // SUPPRIMER LE COMPTE

    $('#btnDelAccountPop').on('click', function () {
        $('#delAccountPop').popup("open", "fade");
    });

    //  verifier que le mot de passe fait bien 6 caracteres
    $('#delAccountForm input').on('keyup', function () {
        var mdpDel = $("#mdpDel").val();
        if (mdpDel.length > 5) {
            $('#delAccount').prop('disabled', false);
        } else {
            $('#delAccount').prop('disabled', true);
        }
    });

    // soumettre la suppression
    $('#delAccountForm').on("submit", function (event) {
        event.preventDefault();
        var mdpDel = $("#mdpDel").val();
        $.ajax({
            method: "POST",
            url: "http://" + server + '/prototype1/php/delete_account.php',
            data: { mdp : mdpDel},
            success: function (data) {
                var requete = JSON.parse(data);
                console.log(requete);
                if (requete.reponse == "disconnect") {
                    disconnect();
                } else if (requete.reponse == true) {
                    alert("Votre compte a bien été supprimé !");
                    disconnect();
                } else if (requete.reponse == "mdp") {
                    alert("Le mot de passe n'est pas correct");
                }
                else {
                    alert("Le serveur n'a pas reçu vos modifications.");
                }
            },
            error: function () {
                alert('probleme de liaison'); // erreur de liaison avec le serveur
            }
        });
    });

});
