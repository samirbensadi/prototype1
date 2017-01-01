//PANIER
$(document).on("pageinit", "#panier", function () {

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

    }



});
