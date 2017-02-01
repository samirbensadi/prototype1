$(document).on('pagecreate', "#deconfirmation", function () {
        $('#unconfirmPresenceBtn').on('tap', function () {
            if (checkTime()) {
                $.ajax({
                    method: "POST",
                    data: { unconfirm: true },
                    url: 'http://' + server + '/prototype1/php/unconfirm.php',
                    success: function (data) {
                        var requete = JSON.parse(data);
                        if (requete.reponse == "disconnect") {
                            disconnect();
                        } else if (requete.reponse == true) {
                            toast("Vous êtes dé-confirmé !", 5000);
                            $.mobile.back();
                        } else if (requete.reponse == "time") {
                            toast("Vous ne pouvez plus annuler votre présence", 5000);
                            $.mobile.back();
                        } else if (requete.reponse == "nopresent") {
                            toast("Vous n'êtes pas présent !", 5000);
                            $.mobile.back();
                        } else {
                            toast("Vous n'avez pas de tickets !", 5000);
                            $.mobile.back();
                        }
                    },
                    error: function () {
                        toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // erreur de liaison avec le serveur
                    }
                });
            } else {
                toast("Vous ne pouvez plus annuler votre présence", 5000);
                $.mobile.back();
            }
        });

});