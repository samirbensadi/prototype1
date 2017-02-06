$(document).on(pageEvent, "#deconfirmation", function () {
  ajaxLoader($('.loadArea'));

        $('#unconfirmPresenceBtn').on('tap', function () {
            if (checkTime()) {
                $.ajax({
                    method: "POST",
                    data: { unconfirm: true },
                    url: 'http://' + server + '/prototype1/php/unconfirm.php',
                    success: function (data) {
                        if (data.reponse == "disconnect") {
                            disconnect();
                        } else if (data.reponse == true) {
                            toast("Vous êtes dé-confirmé !", 5000);
                            $.mobile.back();
                        } else if (data.reponse == "time") {
                            toast("Vous ne pouvez plus annuler votre présence", 5000);
                            $.mobile.back();
                        } else if (data.reponse == "nopresent") {
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
