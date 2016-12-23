//ACHAT//

$(document).on("pageinit", "#achat", function () {

    //NombreTicket
    var nombreJaune = 0;
    var nombreVert = 0;
    var nombreRose = 0;

    //PRIX (on récuperera plus tard les prix en ajax depuis le serveur)
    var prixJaune = 2.50;
    var prixVert = 3;
    var prixRose = 3.50;


    // On indique par défaut le prix de chaque type de ticket
    $('#prixJaune').text(prixJaune +' €');
    $('#prixVert').text(prixVert +' €');
    $('#prixRose').text(prixRose +' €');

    // ajout de ticket Jaune
    $('#addJaune').click(function () {
        nombreJaune++; // on incrémente son compteur
        $('#numJaune').text(nombreJaune + " ticket(s)"); // on actualise le compteur sur la page
    });

    // retrait de ticket jaune
    $('#removeJaune').click(function () {
      nombreJaune--; // on décrémente le compteur
        if (nombreJaune<1) { // si le compteur est inférieur à 1
          $('#numJaune').text(" "); // on supprime le compteur de la page
        }
        else {
            $('#numJaune').text(nombreJaune + " ticket(s)"); // sinon on l'actualise
        }
    });

    //ajout de ticket Vert
    $('#addVert').click(function () {
        nombreVert++;
        $('#numVert').text(nombreVert + " ticket(s)");
    });
    // retrait de ticket vert
    $('#removeVert').click(function () {
      nombreVert--;
        if (nombreVert<1) {
          $('#numVert').text(" ");
        }
        else {
            $('#numVert').text(nombreVert + " ticket(s)");
        }
    });

    //ajout de ticket Violet
    $('#addRose').click(function () {
        nombreRose++;
        $('#numRose').text(nombreRose + " ticket(s)");
    });
    // retrait de ticket violet
    $('#removeRose').click(function () {
      nombreRose--;
        if (nombreRose<1) {
          $('#numRose').text(" ");
        }
        else {
            $('#numRose').text(nombreRose + " ticket(s)");
        }
    });

    // quand on va au panier
    $('.slot').click(function () {
        //set sessionStorage
        sessionStorage.setItem('ticketJaune', nombreJaune);
        sessionStorage.setItem('ticketVert', nombreVert);
        sessionStorage.setItem('ticketRose', nombreRose);

        //Calcule PrixTotal
        var totalJaune = nombreJaune * prixJaune;
        var totalVert = nombreVert * prixVert;
        var totalRose = nombreRose * prixRose;
        var prixTotal = totalJaune + totalVert + totalRose;

        sessionStorage.setItem('prixtotal', prixTotal);


    });

    // quand on quitte la page achat, on supprime le sessionStorage
    $('#resetTicket').click(function () {
        sessionStorage.removeItem('ticketJaune');
        sessionStorage.removeItem('ticketVert');
        sessionStorage.removeItem('ticketRose');
        sessionStorage.removeItem('prixtotal');
    });

});
