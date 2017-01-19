$(document).on("pagecreate", "#forgot", function () {

    $("#formForgot").on('submit', function (event) {
        event.preventDefault();

        var emailForgot = $('#emailForgot').val();
        var regexMailForgot = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

        if (regexMailForgot.test(emailForgot)) {
            $.ajax({
                method: "POST",
                url: 'http://' + server + '/prototype1/php/forgot.php',
                data: $('#formForgot').serialize(),
                success: function (data) {
                    var requete = JSON.parse(data);
                    console.log(requete);
                    if (requete.reponse == false) {
                        alert("Le serveur n'a rien reçu.");
                    } else if (requete.reponse == "email") {
                        alert("Ce compte n'existe pas.");
                    } else {
                        alert("Un lien de réinitialisation vous a été envoyé par e-mail. Vous avez 30 minutes pour changer de mot de passe");
                        $.mobile.back();
                    }
                },
                error: function () {
                    alert('Problème de liaison');
                }
            });
        } else {
            alert("L'adresse e-mail n'est pas valide.");
        }
        });

});