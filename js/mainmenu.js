$(document).on("pagecreate", "#mainmenu", function () {

    var server = "localhost";

    // AU TAP DU BOUTON SE DECONNECTER

    $('#logOut').on('tap', function () {
        window.sessionStorage.clear(); // effacer le localStorage
        $.ajax({
            method: "POST",
            url: 'http://' + server + '/prototype1/php/log_out.php'

        });
        $.mobile.changePage($('#home'),{transition : "slide", reverse: true}); // retourner à la page home
    });

    $.ajax({
        url: 'http://' + server + '/prototype1/php/mainmenu.php',
        success: function (data) {
            var ticketJaune = null;
            var ticketVert = 8;
            var ticketRose = null;

            if (ticketJaune!=null) {
                $('#soldeJaune').text('Vous avait '+ticketJaune+' ticket jaune');
            }
            if (ticketVert!=null) {
                $('#soldeVert').text('Vous avait '+ticketVert+' ticket vert');
            }
            if (ticketRose!=null) {
                $('#soldeRose').text('Vous avait '+ticketRose+' ticket rose');
            }
            if (ticketJaune!=null || ticketVert!=null || ticketRose!=null) {
                $('#confirm').html("<a id='confirmBtn' class='ui-btn' data-transition='slide' href='confirmation.html'>confirmé votre présence</a>");
            }

            if (ticketJaune==null && ticketVert==null && ticketRose==null) {
                $('#soldeNull').text('vous avait pas de tickets');
            }


        },
        error: function () {
            alert('probleme de liaison'); // erreur de liaison avec le serveur
        }
    })

    
});