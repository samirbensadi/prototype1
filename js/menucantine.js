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

              $('#cantineContent').append('<ul data-collapsible="accordion" id="coSet" class="collapsible"></ul>');
              var longueur = requete.length - 1;

              for (var i = longueur ; i >= 0; i--) { // on fait une boucle pour lister les menus (je décremente pour remettre la liste dans le bon ordre)
                var dateMenu = new Date(requete[i].date_menu); // je crée un objet date pour recuperer les infos utiles
                var jourMois = dateMenu.getDate();
                var jourSemaine = dateMenu.getDay();
                var moisAnnee = dateMenu.getMonth();
                var annee = dateMenu.getFullYear();

                var titre = jours[jourSemaine] + " " + jourMois + " " + mois[moisAnnee];
                $('#coSet').append('<li><div class="collapsible-header"><h3>' + titre + '</h3></div><div class="collapsible-body"><h4>Entrée</h4><h5>' + requete[i].entree + '</h5><h4>Plat</h4><h5>' + requete[i].plat + '</h5><h4>Dessert</h4><h5>' + requete[i].dessert + '</h5></div></li>');
              }
                $('#coSet').collapsible();
            } else {
              $('#cantineContent').text('<p>Aucun menu enregistré.</p>');
            }
        },

        error: function () { // en cas d'erreur
            toast("<b>Erreur</b> : l'envoi a échoué. Vérifiez votre connexion.", 5000); // erreur de liaison avec le serveur
        }
    });


});
