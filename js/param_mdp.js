$(document).on(pageEvent, "#parametres",  function () {

    $('#formparametresmdp input').on('keyup', function () {
        checkChangeMdp();
    });


    $("#formparametresmdp").on("submit", function (event) {
        event.preventDefault();

        $.ajax({
            method: "POST",
            url: "http://" + server + 'set_new_mdp.php',
            data: $('#formparametresmdp').serialize(),
            success: function (data) {
                console.log(data);
                if (data.reponse == "disconnect") {
                    disconnect();
                    } else if (data.reponse == "password") {
                        toast("Le mot de passe actuel est incorrect.", 5000);
                    } else {
                        toast("Mot de passe changé !", 5000);
                        $('#parametresmdp').popup('close');
                        $('#formparametresmdp *').val('');
                    }
                },
            error: function () {
                toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // erreur de liaison avec le serveur
                }
            });
    });



});