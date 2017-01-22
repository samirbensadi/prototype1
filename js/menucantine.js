$(document).on("pagebeforecreate", "#menucantine", function () {

    $.ajax({
        method: "POST",
        url: 'http://' + server + '/prototype1/php/menucantine.php',
        success: function (data) { // en cas de succes, on recupere la retour en parametre d'une fonction anonyme
            var requete = JSON.parse(data); // qu'on parse (puisque c'est du json)
            console.log(requete[0]);
            if (requete.reponse == "disconnect") {
              disconnect();
            } else if (requete.length > 0) {
              $('#menucantineContent').html('<div id="cantineDiv"></div>');
              for (var i = 3; i >= 0; i--) { // on fait une boucle pour lister les menus (je décremente pour remettre la liste dans le bon ordre)
                var dateMenu = new Date(requete[i].date_menu); // je crée un objet date pour recuperer les infos utiles
                var jourMois = dateMenu.getDate();
                var jourSemaine = dateMenu.getDay();
                var moisAnnee = dateMenu.getMonth();
                var annee = dateMenu.getFullYear();
                $('#cantineDiv').append('<h4>' + jours[jourSemaine] + " " + jourMois + " " + mois[moisAnnee] + " " + annee +  '</h4>');                                $('#cantineDiv').append('<h4>Entrée : ' + requete[i].entree + '</h4>');
                $('#cantineDiv').append('<h4>Plat : ' + requete[i].plat + '</h4>');
                $('#cantineDiv').append('<h4>Dessert : ' + requete[i].dessert + '</h4>');
              }
            } else {
              $('#menucantinecontent').html('<h3>Aucun menu enregistré.</h3>');
            }
        },

        error: function () { // en cas d'erreur
          alert('Problème de connexion');
        }
    });


});
