$(document).on("pagebeforecreate", "#menucantine", function () {

    $.ajax({
        method: "POST",
        url: 'http://' + server + '/prototype1/php/menucantine.php',
        success: function (data) { // en cas de succes, on recupere la retour en parametre d'une fonction anonyme
            var requete = JSON.parse(data); // qu'on parse (puisque c'est du json)
            console.log(requete);
            if (requete.reponse == "disconnect") {
              disconnect();
            } else if (requete.length > 0) {
                console.log("ok");

                var longueur = requete.length - 1;

                var dateMenu = new Date(requete[longueur].date_menu); // je crée un objet date pour recuperer les infos utiles
                var jourMois = dateMenu.getDate();
                var jourSemaine = dateMenu.getDay();
                var moisAnnee = dateMenu.getMonth();
                var annee = dateMenu.getFullYear();

                var titre = jours[jourSemaine] + " " + jourMois + " " + mois[moisAnnee];
                $('#cantineheader ul li:first-child').attr("data-tab", requete[longueur].date_menu).text(titre);

                $('#firstOne').html('<h4>Entrée</h4><h5>' + requete[longueur].entree + '</h5>').attr("data-tab", requete[longueur].date_menu).append('<h4>Plat</h4><h5>' + requete[longueur].plat + '</h5><h4>Dessert</h4><h5>' + requete[longueur].dessert + '</h5>');

              for (var i = longueur -1; i >= 0; i--) { // on fait une boucle pour lister les menus (je décremente pour remettre la liste dans le bon ordre)
                var dateMenu = new Date(requete[i].date_menu); // je crée un objet date pour recuperer les infos utiles
                var jourMois = dateMenu.getDate();
                var jourSemaine = dateMenu.getDay();
                var moisAnnee = dateMenu.getMonth();
                var annee = dateMenu.getFullYear();

                var titre = jours[jourSemaine] + " " + jourMois + " " + mois[moisAnnee];
                $('#cantineheader ul').append("<li data-tab='" + requete[i].date_menu + "' class='nd2Tabs-nav-item'>" + titre + "</li>");
                $('#cantineContent').append("<div data-role='nd2tab' data-tab='" + requete[i].date_menu + "' class='nd2Tabs-content-tab'></div>");

                $('#cantineContent div:last-child').append('<h4>Entrée</h4><h5>' + requete[i].entree + '</h5><h4>Plat</h4><h5>' + requete[i].plat + '</h5><h4>Dessert</h4><h5>' + requete[i].dessert + '</h5>');
              }
            } else {
              $('#cantineContent').text('<p>Aucun menu enregistré.</p>');
            }
        },

        error: function () { // en cas d'erreur
          alert('Problème de connexion');
        }
    });


});
