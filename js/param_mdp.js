$(document).on("pagecreate", "#parametresmdp",  function () {
    
    $('#formparametresmdp input').on('keyup', function () {
        checkChangeMdp();
    });


    $("#formparametresmdp").on("submit", function (event) {
        event.preventDefault();
        
            $.ajax({
                method: "POST",
                url: "http://" + server + '/prototype1/php/change_mdp.php',
                data: $('#formparametresmdp').serialize(),
                success: function (data) {
                    var requete = JSON.parse(data);
                    console.log(requete);
                    if (requete.reponse == "disconnect") {
                        disconnect();
                    } else if (requete.reponse == "password") {
                        toast("Le mot de passe actuel est incorrect.", 5000);
                    } else {
                        toast("Mot de passe changé !", 5000);
                        $.mobile.back();
                    }
                },
                error: function () {
                    toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // erreur de liaison avec le serveur
                }
            });
    });
});