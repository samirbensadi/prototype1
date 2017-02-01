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
            toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // erreur de liaison avec le serveur
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
                        toast("Vos paramètres ont été mis à jour !", 5000);
                    }
                    else {
                        toast("<b>Erreur</b> : le serveur n'a pas reçu vos modifications.", 5000);
                    }
                },
                error: function () {
                    toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // erreur de liaison avec le serveur
                }
            });

        } else {
          toast("L'email n'est pas valide.", 5000);
        }
      } else {
        toast("Le numéro de téléphone n'est pas valide", 5000);
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
                    toast("Votre compte a bien été supprimé !", 5000);
                    disconnect();
                } else if (requete.reponse == "mdp") {
                    toast("Le mot de passe est incorrect", 5000);
                }
                else {
                    toast("<b>Erreur</b> : l'action n'a pas pu être réalisée.", 5000);
                }
            },
            error: function () {
                toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // erreur de liaison avec le serveur
            }
        });
    });

});
