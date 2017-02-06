//ACHAT//
$(document).on(pageEvent, "#achat", function () {


  //PRIX (on récupere les prix en ajax depuis le serveur)
    if (!sessionStorage.tarifJaune && !sessionStorage.tarifVert && !sessionStorage.tarifRose) {
        $.ajax({
            method: "POST",
            url: 'http://' + server + '/prototype1/php/get_fares.php',
            success: function (data) { // en cas de succes, on recupere la retour en parametre d'une fonction anonyme
                console.log(data);
                if (data.reponse == "disconnect") {
                    disconnect();
                } else if (data.reponse == true) {
                    sessionStorage.setItem("tarifJaune",data.jaune);
                    sessionStorage.setItem("tarifVert", data.vert);
                    sessionStorage.setItem("tarifRose", data.rose);
                    achat(sessionStorage.tarifJaune, sessionStorage.tarifVert, sessionStorage.tarifRose);
                    loading();
                } else {
                    toast("<b>Erreur</b> : les tarifs n'ont pu être actualisés.", 5000);            }
            },

            error: loadingError
        });
    } else {
        achat(sessionStorage.tarifJaune, sessionStorage.tarifVert, sessionStorage.tarifRose);
        loading();
    }


    function achat (prixJaune, prixVert, prixRose) {

    // On indique par défaut le prix de chaque type de ticket
    $('#prixJaune').text(prixJaune + ' €');
    $('#prixVert').text(prixVert + ' €');
    $('#prixRose').text(prixRose + ' €');

    // REACTUALISATION DE LA PAGE : On affiche le nombre de ticket stockés dans le sessionStorage

    if (sessionStorage.ticketJaune == 0 || !sessionStorage.ticketJaune) {
        $('#numJaune').html('<p>0 ticket</p>');
    } else { // sinon
        if (sessionStorage.ticketJaune == 1) {
            $('#numJaune').text(sessionStorage.ticketJaune + " ticket");
        } else {
            $('#numJaune').text(sessionStorage.ticketJaune + " tickets");
        }
        $("#removeJaune").prop('disabled', false);
    }

    if (sessionStorage.ticketVert == 0 || !sessionStorage.ticketVert) {
        $('#numVert').html('<p>0 ticket</p>');
    } else { // sinon
        if (sessionStorage.ticketVert == 1) {
            $('#numVert').text(sessionStorage.ticketVert + " ticket");
        } else {
            $('#numVert').text(sessionStorage.ticketVert + " tickets");
        }
        $("#removeVert").prop('disabled', false);
    }

    if (sessionStorage.ticketRose == 0 || !sessionStorage.ticketRose) {
        $('#numRose').html('<p>0 ticket</p>');
    } else { // sinon
        if (sessionStorage.ticketRose == 1) {
            $('#numRose').text(sessionStorage.ticketRose + " ticket");
        } else {
            $('#numRose').text(sessionStorage.ticketRose + " tickets");
        }
        $("#removeRose").prop('disabled', false);
    }




    // ajout de ticket Jaune
    $('#addJaune').click(function () {
        sessionStorage.ticketJaune++;
        $('#removeJaune').prop('disabled', false);
        if (sessionStorage.ticketJaune == 1) {
            $('#numJaune').text(sessionStorage.ticketJaune + " ticket");
        } else {
            $('#numJaune').text(sessionStorage.ticketJaune + " tickets");
        }
    });

     //ajout de ticket Vert
     $('#addVert').click(function () {
       sessionStorage.ticketVert++;
       $('#removeVert').prop('disabled', false);
         if (sessionStorage.ticketVert == 1) {
             $('#numVert').text(sessionStorage.ticketVert + " ticket");
         } else {
             $('#numVert').text(sessionStorage.ticketVert + " tickets");
         }
     });

     //ajout de ticket rose
     $('#addRose').click(function () {
       sessionStorage.ticketRose++;
       $('#removeRose').prop('disabled', false);
         if (sessionStorage.ticketRose == 1) {
             $('#numRose').text(sessionStorage.ticketRose + " ticket");
         } else {
             $('#numRose').text(sessionStorage.ticketRose + " tickets");
         }
     });


    // retrait de ticket jaune
    $('#removeJaune').click(function () {
        if (sessionStorage.ticketJaune < 1) { // si le compteur est inférieur à 1
            sessionStorage.ticketJaune = 0;
        } else {
            sessionStorage.ticketJaune--; // on décrémente le compteur
            if (sessionStorage.ticketJaune == 0) {
                $(this).prop('disabled', true);
                $('#numJaune').text(sessionStorage.ticketJaune + " ticket");
            } else if (sessionStorage.ticketJaune == 1) {
                $('#numJaune').text(sessionStorage.ticketJaune + " ticket");
            } else {
                $('#numJaune').text(sessionStorage.ticketJaune + " tickets");
            }
        }
    });


    // retrait de ticket vert
    $('#removeVert').click(function () {
        if (sessionStorage.ticketVert < 1) {
            sessionStorage.ticketVert = 0;
        } else {
            sessionStorage.ticketVert--;
            $('#numVert').text(sessionStorage.ticketVert + " ticket(s)");
            if (sessionStorage.ticketVert == 0) {
                $(this).prop('disabled', true);
                $('#numVert').text(sessionStorage.ticketJaune + " ticket");
            } else if (sessionStorage.ticketVert == 1) {
                $('#numVert').text(sessionStorage.ticketVert + " ticket");
            } else {
                $('#numVert').text(sessionStorage.ticketVert + " tickets");
            }
        }
    });


    // retrait de ticket violet
    $('#removeRose').click(function () {
        if (sessionStorage.ticketRose < 1) {
            sessionStorage.ticketRose = 0;
        } else {
            sessionStorage.ticketRose--;
            if (sessionStorage.ticketRose == 0) {
                $(this).prop('disabled', true);
                $('#numRose').text(sessionStorage.ticketRose + " ticket");
            } else if (sessionStorage.ticketRose == 1) {
                $('#numRose').text(sessionStorage.ticketRose + " ticket");
            } else {
                $('#numRose').text(sessionStorage.ticketRose + " tickets");
            }

        }
    });



    // quand on va au panier
    $('.panierBtn').on("tap", function () {

        //Calcule PrixTotal
        var totalJaune = sessionStorage.ticketJaune * prixJaune;
        var totalVert = sessionStorage.ticketVert * prixVert;
        var totalRose = sessionStorage.ticketRose * prixRose;
        var coutTotal = totalJaune + totalVert + totalRose;

        sessionStorage.setItem('coutTotal', coutTotal);
    });
    }
});
