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

                var dateMenu = new Date(requete[0].date_menu); // je crée un objet date pour recuperer les infos utiles
                var jourMois = dateMenu.getDate();
                var jourSemaine = dateMenu.getDay();
                var moisAnnee = dateMenu.getMonth();
                var annee = dateMenu.getFullYear();

                var titre = jours[jourSemaine] + " " + jourMois + " " + mois[moisAnnee];
                $('#cantineheader ul li:first-child').attr("data-tab", requete[3].date_menu).text(titre);
                $('#menucantine').append("<div data-role='nd2tab' data-tab='" + requete[3].date_menu + "' class='nd2Tabs-content-tab'></div>");

                $('#firstOne').html('<p>Entrée : ' + requete[3].entree + '</p>').attr("data-tab", "");
                $('#firstOne').append('<p>Plat : ' + requete[3].plat + '</p>');
                $('#firstOne').append('<p>Dessert : ' + requete[3].dessert + '</p>');

              for (var i = 2; i >= 0; i--) { // on fait une boucle pour lister les menus (je décremente pour remettre la liste dans le bon ordre)
                var dateMenu = new Date(requete[i].date_menu); // je crée un objet date pour recuperer les infos utiles
                var jourMois = dateMenu.getDate();
                var jourSemaine = dateMenu.getDay();
                var moisAnnee = dateMenu.getMonth();
                var annee = dateMenu.getFullYear();

                var titre = jours[jourSemaine] + " " + jourMois + " " + mois[moisAnnee];
                $('#cantineheader ul').append("<li data-tab='" + requete[i].date_menu + "' class='nd2Tabs-nav-item'>" + titre + "</li>");
                $('#menucantine').append("<div data-role='nd2tab' data-tab='" + requete[i].date_menu + "' class='nd2Tabs-content-tab'></div>");

                $('#menucantine div:last-child').append('<p>Entrée : ' + requete[i].entree + '</p>');
                $('#menucantine div:last-child').append('<p>Plat : ' + requete[i].plat + '</p>');
                $('#menucantine div:last-child').append('<p>Dessert : ' + requete[i].dessert + '</p>');
              }
            } else {
              $('#menucantine').text('<h3>Aucun menu enregistré.</h3>');
            }
        },

        error: function () { // en cas d'erreur
          alert('Problème de connexion');
        }
    });


});
