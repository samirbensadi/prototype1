//PANIER
$(document).on(pageEvent, "#panier", function () {

//PRIX (on récuperera les prix en ajax depuis le serveur)
    if (!sessionStorage.tarifJaune && !sessionStorage.tarifVert && !sessionStorage.tarifRose) {
        $.ajax({
            method: "POST",
            url: 'http://' + server + 'get_fares.php',
            success: function (data) { // en cas de succes, on recupere la retour en parametre d'une fonction anonyme
                console.log(data);
                if (data.reponse == "disconnect") {
                    disconnect();
                } else if (data.reponse == true) {
                    sessionStorage.setItem("tarifJaune",data.jaune);
                    sessionStorage.setItem("tarifVert", data.vert);
                    sessionStorage.setItem("tarifRose", data.rose);
                    panier(sessionStorage.tarifJaune, sessionStorage.tarifVert, sessionStorage.tarifRose);
                    fadingContent();

                } else {
                    toast("<b>Erreur</b> : les tarifs n'ont pu être actualisés.", 5000);            }
            },

            error: loadingError
        });
    } else {
        panier(sessionStorage.tarifJaune, sessionStorage.tarifVert, sessionStorage.tarifRose);
        fadingContent();
    }

    function panier(prixJaune, prixVert, prixRose) {
        var total = 0;

        if (sessionStorage.coutTotal == 0) {   // si le total dans le sessionStorage est égal à 0
            $('#panierContent').html('<p>Votre panier est vide.</p>'); // on indique que le panier est vide
        } else { // sinon
            $('#panierContent').html('<ul data-role="listview"></ul>'); // on crée une liste dans laquelle
            if (sessionStorage.ticketJaune > 0) { // je vérifie par type de ticket sa valeur
                var totalJaune = sessionStorage.ticketJaune * prixJaune; // je recalcule les sous totaux en fonction du tarifs du serveur
                if (sessionStorage.ticketJaune == 1) {
                    var orthographe = " ticket jaune";
                } else {
                    var orthographe = " tickets jaunes";
                }
                $('#panierContent ul').append('<li class="zone"><h2>' + sessionStorage.ticketJaune + orthographe + '</h2><p>Sous-total : ' + totalJaune + ' €</p></li>');
                total += totalJaune; // j'ajoute le sous-total au total général
            }

            if (sessionStorage.ticketVert > 0) { // je vérifie par type de ticket sa valeur
                var totalVert = sessionStorage.ticketVert * prixVert; // je recalcule les sous totaux en fonction du tarifs du serveur
                if (sessionStorage.ticketVert == 1) {
                    var orthographe = " ticket vert";
                } else {
                    var orthographe = " tickets verts";
                }
                $('#panierContent ul').append('<li class="zone"><h2>' + sessionStorage.ticketVert + orthographe + '</h2><p>Sous-total : ' + totalVert + ' €</p></li>');
                total += totalVert; // j'ajoute le sous-total au total général
            }

            if (sessionStorage.ticketRose > 0) { // je vérifie par type de ticket sa valeur
                var totalRose = sessionStorage.ticketRose * prixRose; // je recalcule les sous totaux en fonction du tarifs du serveur
                if (sessionStorage.ticketRose == 1) {
                    var orthographe = " ticket rose";
                } else {
                    var orthographe = " tickets roses";
                }
                $('#panierContent ul').append('<li class="zone"><h2>' + sessionStorage.ticketRose + orthographe + '</h2><p>Sous-total : ' + totalRose + ' €</p></li>');
                total += totalRose; // j'ajoute le sous-total au total général
            }

            $('#panierContent').append('<div class="ui-body ui-body-a ui-corner-all"><h2>TOTAL : ' + total + ' €</h2></div>');
            $('#panierContent').append('<button id="payBtn" href="#" class="ui-btn  ui-btn-raised clr-primary">Payer</button>');
        }


        $('#payBtn').on('tap', function () {
            var string = {jaune: sessionStorage.ticketJaune, vert: sessionStorage.ticketVert, rose: sessionStorage.ticketRose, total: sessionStorage.coutTotal};

            $.ajax({
                method: "POST",
                url: 'http://' + server + 'paiement.php',
                data: { achat : JSON.stringify(string) },
                success: function (data) { // en cas de succes, on recupere la retour en parametre d'une fonction anonyme
                    console.log(data);
                    if (data.reponse == "disconnect") {
                        disconnect();
                    } else if (data.reponse == true) {
                        sessionStorage.ticketJaune = 0;
                        sessionStorage.ticketRose = 0;
                        sessionStorage.ticketVert = 0;
                        sessionStorage.coutTotal = 0;
                        $.mobile.changePage("paiement.html", {transition: "slide", reverse: false});
                    } else {
                        toast("<b>Erreur</b> : l'achat a échoué.", 5000);
                    }
                },

                error: function () { // en cas d'erreur
                    toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // erreur de liaison avec le serveur
                }
            });
        });

    }

});
