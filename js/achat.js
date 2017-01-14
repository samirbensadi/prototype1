//ACHAT//

$(document).on("pageinit", "#achat", function () {

    //NombreTicket
    var nombreJaune = sessionStorage.getItem('ticketJaune');
    var nombreVert = sessionStorage.getItem('ticketVert');
    var nombreRose = sessionStorage.getItem('ticketRose');

    //PRIX (on récuperera plus tard les prix en ajax depuis le serveur)
    var prixJaune = 2.50;
    var prixVert = 3;
    var prixRose = 3.50;


    // On indique par défaut le prix de chaque type de ticket
    $('#prixJaune').text(prixJaune +' €');
    $('#prixVert').text(prixVert +' €');
    $('#prixRose').text(prixRose +' €');

    // REACTUALISATION DE LA PAGE : On affiche le nombre de ticket stockés dans le sessionStorage

    if (sessionStorage.ticketJaune == 0 || !sessionStorage.ticketJaune) {
        $('#numJaune').html('<p>0 ticket(s)</p>');
    } else { // sinon
        $('#numJaune').text(sessionStorage.getItem('ticketJaune') + " ticket(s)");
        $("#removeJaune").prop('disabled', false);
    }
    if (sessionStorage.ticketVert == 0 || !sessionStorage.ticketVert) {
        $('#numVert').html('<p>0 ticket(s)</p>');
    } else { // sinon
        $('#numVert').text(sessionStorage.getItem('ticketVert') + " ticket(s)");
        $("#removeVert").prop('disabled', false);
    }
    if (sessionStorage.ticketRose == 0 || !sessionStorage.ticketRose) {
        $('#numRose').html('<p>0 ticket(s)</p>');
    } else { // sinon
        $('#numRose').text(sessionStorage.getItem('ticketRose') + " ticket(s)");
        $("#removeRose").prop('disabled', false);
    }

    // ajout de ticket Jaune
    $('#addJaune').click(function () {
        nombreJaune++; // on incrémente son compteur
        sessionStorage.setItem('ticketJaune', nombreJaune);
        $('#numJaune').text(sessionStorage.getItem('ticketJaune') + " ticket(s)"); // on actualise le compteur sur la page
        $('#removeJaune').prop('disabled', false);
    });

    // retrait de ticket jaune
    $('#removeJaune').click(function () {
        if (nombreJaune<1) { // si le compteur est inférieur à 1
            nombreJaune = 0;
        } else {
            nombreJaune--; // on décrémente le compteur
            sessionStorage.setItem('ticketJaune', nombreJaune);
            $('#numJaune').text(sessionStorage.getItem('ticketJaune') + " ticket(s)"); // sinon on l'actualise
            if (nombreJaune == 0) {
              $(this).prop('disabled', true);
            }
        }
    });

    //ajout de ticket Vert
    $('#addVert').click(function () {
        nombreVert++;
        sessionStorage.setItem('ticketVert', nombreVert);
        $('#numVert').text(sessionStorage.getItem('ticketVert') + " ticket(s)");
        $('#removeVert').prop('disabled', false);
    });
    // retrait de ticket vert
    $('#removeVert').click(function () {
        if (nombreVert<1) {
            nombreVert = 0;
        } else {
            nombreVert--;
            sessionStorage.setItem('ticketVert', nombreVert);
            $('#numVert').text(sessionStorage.getItem('ticketVert') + " ticket(s)");
            if (nombreVert == 0) {
              $(this).prop('disabled', true);
            }
        }
    });

    //ajout de ticket Violet
    $('#addRose').click(function () {
        nombreRose++;
        sessionStorage.setItem('ticketRose', nombreRose);
        $('#numRose').text(sessionStorage.getItem('ticketRose') + " ticket(s)");
        $('#removeRose').prop('disabled', false);
    });
    // retrait de ticket violet
    $('#removeRose').click(function () {
        if (nombreRose<1) {
            nombreRose = 0;
        } else {
            nombreRose--;
            sessionStorage.setItem('ticketRose', nombreRose);
            $('#numRose').text(sessionStorage.getItem('ticketRose') + " ticket(s)");
            if (nombreRose == 0) {
              $(this).prop('disabled', true);
            }
        }
    });

    // quand on va au panier
    $('.slot').click(function () {

        //Calcule PrixTotal
        var totalJaune = nombreJaune * prixJaune;
        var totalVert = nombreVert * prixVert;
        var totalRose = nombreRose * prixRose;
        var prixTotal = totalJaune + totalVert + totalRose;

        sessionStorage.setItem('prixtotal', prixTotal);
    });
});
