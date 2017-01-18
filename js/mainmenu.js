$(document).on("pagecreate", "#mainmenu", function () {

    var server = "localhost";

    // AU TAP DU BOUTON SE DECONNECTER

    $('#logOut').on('tap', function () {
        window.sessionStorage.clear(); // effacer le localStorage
        $.ajax({
            method: "POST",
            url: 'http://' + server + '/prototype1/php/log_out.php'

        });
        $.mobile.changePage("../index.html",{transition : "slide", reverse: true}); // retourner à la page home
        localStorage.clear();
        sessionStorage.clear();
    });

    $.ajax({
        url: 'http://' + server + '/prototype1/php/solde.php',
        success: function (data) {
            var requete = JSON.parse(data);
            console.log(requete);
            if (requete.reponse == "disconnect") {
                localStorage.clear();
                sessionStorage.clear();
                $.mobile.changePage("../index.html", {transition : "slide", reverse: true});
            } else if (requete.reponse == true) {

                $("#soldeDiv").html('<h3>Vous avez : </h3>');

                if (requete.vert > 0) {
                    $('#soldeDiv').append("<p>- " + requete.vert + " ticket(s) vert(s)</p>");
                }
                if (requete.rose > 0) {
                    $('#soldeDiv').append("<p>- " + requete.rose + " ticket(s) rose(s)</p>");
                }
                if (requete.jaune > 0) {
                    $('#soldeDiv').append("<p>- " + requete.jaune + " ticket(s) jaune(s)</p>");
                }

                $("#soldeDiv").append('<a id="confirmBtn" class="ui-btn ui-btn-raised clr-primary" data-transition="slide" href="confirmation.html">Je viens manger</a>');

            } else {
                $('#soldeDiv').text("Vous n'avez aucun ticket.");
            }

        },
        error: function () {
            alert('probleme de liaison'); // erreur de liaison avec le serveur
        }
    })


    // $('#confirmBtn').on("tap", function () {
    //
    // });


});
