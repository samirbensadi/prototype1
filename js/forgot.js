$(document).on("pagecreate", "#forgot", function () {

    $("#formForgot").on('submit', function (event) {
        event.preventDefault();

        var emailForgot = $('#emailForgot').val();
        var regexMailForgot = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

        if (regexMailForgot.test(emailForgot)) {
            $.ajax({
                method: "POST",
                url: 'http://' + server + 'forgot.php',
                data: $('#formForgot').serialize(),
                success: function (data) {
                    console.log(data);
                    if (data.reponse == false) {
                        toast("<b>Erreur</b> : Le serveur n'a reçu aucune donnée.", 5000);
                    } else if (data.reponse == "email") {
                        toast("<b>Erreur</b> : ce compte n'existe pas.", 5000);
                    } else {
                        toast("Un lien de réinitialisation vous a été envoyé par e-mail. Vous avez 30 minutes pour changer de mot de passe");
                        $.mobile.back();
                    }
                },
                error: function () {
                    toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // erreur de liaison avec le serveur
                }
            });
        } else {
            toast("L'adresse e-mail n'est pas valide.", 5000);
        }
        });

});
