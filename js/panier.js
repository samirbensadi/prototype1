//PANIER
$(document).on("pageinit", "#panier", function () {

    var server = "localhost";


    //PRIX (on récuperera plus tard les prix en ajax depuis le serveur)
    var prixJaune = 2.50;
    var prixVert = 3;
    var prixRose = 3.50;

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

        $.ajax({
            method: "POST",
            url: 'http://' + server + '/prototype1/php/paiement.php',
            data: {
                jaune : sessionStorage.ticketJaune,
                vert : sessionStorage.ticketVert,
                rose : sessionStorage.ticketRose,
                total : sessionStorage.prixtotal,
            },
            success: function (data) { // en cas de succes, on recupere la retour en parametre d'une fonction anonyme
                var requete = JSON.parse(data); // qu'on parse (puisque c'est du json)
                console.log(requete.reponse);
                if (requete.reponse == "disconnect") {
                    $.mobile.changePage("../index.html", {transition: "slide", reverse: true});
                } else if (requete.reponse == true) {
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



});
