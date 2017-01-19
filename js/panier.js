//PANIER
$(document).on("pageinit", "#panier", function () {

    var server = "localhost";
    

//PRIX (on récuperera les prix en ajax depuis le serveur)
    $.ajax({
        method: "POST",
        url: 'http://' + server + '/prototype1/php/get_fares.php',
        success: function (data) { // en cas de succes, on recupere la retour en parametre d'une fonction anonyme
            var requete = JSON.parse(data); // qu'on parse (puisque c'est du json)
            console.log(requete);
            if (requete.reponse == "disconnect") {
                localStorage.clear();
                sessionStorage.clear();
                $.mobile.changePage("../index.html", {transition: "slide", reverse: true});
            } else if (requete.reponse == true) {
                var prixJaune = requete.jaune;
                var prixVert = requete.vert;
                var prixRose = requete.rose;

                panier(prixJaune, prixVert, prixRose);
            } else {
                alert("Ya de l'eau dans le gaz ... ");
            }
        },

        error: function () { // en cas d'erreur
            alert('Problème de connexion');
        }
    });

    function panier(prixJaune, prixVert, prixRose) {


        var total = 0;

        if (sessionStorage.prixtotal == 0) {   // si le total dans le sessionStorage est égal à 0
            $('#panierContent').html('<p>Votre panier est vide.</p>'); // on indique que le panier est vide
        } else { // sinon
            $('#panierContent').html('<ul data-role="listview"></ul>'); // on crée une liste dans laquelle

            if (sessionStorage.ticketJaune > 0) { // je vérifie par type de ticket sa valeur
                var totalJaune = sessionStorage.ticketJaune * prixJaune; // je recalcule les sous totaux en fonction du tarifs du serveur
                $('#panierContent ul').append('<li class="zone"><h2>' + sessionStorage.ticketJaune + ' ticket(s) Jaune</h2><p>Sous-total : ' + totalJaune + ' €</p></li>');
                total += totalJaune; // j'ajoute le sous-total au total général
            }

            if (sessionStorage.ticketVert > 0) { // je vérifie par type de ticket sa valeur
                var totalVert = sessionStorage.ticketVert * prixVert; // je recalcule les sous totaux en fonction du tarifs du serveur
                $('#panierContent ul').append('<li class="zone"><h2>' + sessionStorage.ticketVert + ' ticket(s) Vert</h2><p>Sous-total : ' + totalVert + ' €</p></li>');
                total += totalVert; // j'ajoute le sous-total au total général
            }

            if (sessionStorage.ticketRose > 0) { // je vérifie par type de ticket sa valeur
                var totalRose = sessionStorage.ticketRose * prixRose; // je recalcule les sous totaux en fonction du tarifs du serveur
                $('#panierContent ul').append('<li class="zone"><h2>' + sessionStorage.ticketRose + ' ticket(s) Rose</h2><p>Sous-total : ' + totalRose + ' €</p></li>');
                total += totalRose; // j'ajoute le sous-total au total général
            }

            $('#panierContent').append('<div class="ui-body ui-body-a ui-corner-all"><h2>TOTAL : ' + total + ' €</h2></div>');
            $('#panierContent').append('<button id="payBtn" href="#" class="ui-btn  ui-btn-raised clr-primary">Payer</button>');
        }


        $('#payBtn').on('tap', function () {

            var string = {jaune: sessionStorage.ticketJaune, vert: sessionStorage.ticketVert, rose: sessionStorage.ticketRose, total: sessionStorage.prixtotal};

            $.ajax({
                method: "POST",
                url: 'http://' + server + '/prototype1/php/paiement.php',
                data: { achat : JSON.stringify(string) },
                success: function (data) { // en cas de succes, on recupere la retour en parametre d'une fonction anonyme
                    var requete = JSON.parse(data); // qu'on parse (puisque c'est du json)
                    console.log(requete);
                    if (requete.reponse == "disconnect") {
                        localStorage.clear();
                        sessionStorage.clear();
                        $.mobile.changePage("../index.html", {transition: "slide", reverse: true});
                    } else if (requete.reponse == true) {
                        sessionStorage.ticketJaune = 0;
                        sessionStorage.ticketRose = 0;
                        sessionStorage.ticketVert = 0;
                        sessionStorage.prixtotal = 0;
                        $.mobile.changePage("paiement.html", {transition: "slide", reverse: false});
                    } else {
                        alert("Ya de l'eau dans le gaz ... ");
                    }
                },

                error: function () { // en cas d'erreur
                    alert('Problème de connexion');
                }
            });
        });

    }

});
