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

    // On affiche le nombre de ticket stoquer dans le sessionStorage

    if (sessionStorage.ticketJaune == null) {
        $('#numJaune').html('<p>0 ticket(s)</p>');
    } else { // sinon
        $('#numJaune').text(sessionStorage.getItem('ticketJaune') + " ticket(s)");
    }
    if (sessionStorage.ticketVert == null) {
        $('#numVert').html('<p>0 ticket(s)</p>');
    } else { // sinon
        $('#numVert').text(sessionStorage.getItem('ticketVert') + " ticket(s)");
    }
    if (sessionStorage.ticketRose == null) {
        $('#numRose').html('<p>0 ticket(s)</p>');
    } else { // sinon
        $('#numRose').text(sessionStorage.getItem('ticketRose') + " ticket(s)");
    }

    // ajout de ticket Jaune
    $('#addJaune').click(function () {
        nombreJaune++; // on incrémente son compteur
        sessionStorage.setItem('ticketJaune', nombreJaune);
        $('#numJaune').text(sessionStorage.getItem('ticketJaune') + " ticket(s)"); // on actualise le compteur sur la page
    });

    // retrait de ticket jaune
    $('#removeJaune').click(function () {
        if (nombreJaune<1) { // si le compteur est inférieur à 1
            nombreJaune = 0;
        }
        else {
            nombreJaune--; // on décrémente le compteur
            sessionStorage.setItem('ticketJaune', nombreJaune);
            $('#numJaune').text(sessionStorage.getItem('ticketJaune') + " ticket(s)"); // sinon on l'actualise
        }
    });

    //ajout de ticket Vert
    $('#addVert').click(function () {
        nombreVert++;
        sessionStorage.setItem('ticketVert', nombreVert);
        $('#numVert').text(sessionStorage.getItem('ticketVert') + " ticket(s)");
    });
    // retrait de ticket vert
    $('#removeVert').click(function () {
        if (nombreVert<1) {
            nombreVert = 0;
        }
        else {
            nombreVert--;
            sessionStorage.setItem('ticketVert', nombreVert);
            $('#numVert').text(sessionStorage.getItem('ticketVert') + " ticket(s)");
        }
    });

    //ajout de ticket Violet
    $('#addRose').click(function () {
        nombreRose++;
        sessionStorage.setItem('ticketRose', nombreRose);
        $('#numRose').text(sessionStorage.getItem('ticketRose') + " ticket(s)");
    });
    // retrait de ticket violet
    $('#removeRose').click(function () {
        if (nombreRose<1) {
            nombreRose = 0;
        }
        else {
            nombreRose--;
            sessionStorage.setItem('ticketRose', nombreRose);
            $('#numRose').text(sessionStorage.getItem('ticketRose') + " ticket(s)");
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
