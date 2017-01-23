$(document).on('pagecreate', "#deconfirmation", function () {
    if (checkTime()) {
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
                            alert("Vous êtes dé-confirmé !");
                            $.mobile.back();
                        } else if (requete.reponse == "time") {
                            alert("It's too late !");
                            $.mobile.back();
                        } else if (requete.reponse == "nopresent") {
                            alert("Vous n'êtes pas présent !");
                            $.mobile.back();
                        } else {
                            alert("Vous n'avez pas de tickets !");
                            $.mobile.back();
                        }
                    },
                    error: function () {
                        alert('probleme de liaison'); // erreur de liaison avec le serveur
                    }
                });
            } else {
                alert("too late");
                $.mobile.back();
            }
        });
    } else {
        alert("too late");
        $.mobile.back();
    }
});