$(document).on(pageEvent, "#menucantine", function () {

    $.ajax({
        method: "POST",
        url: 'http://' + server + 'menucantine.php',
        success: function (data) { // en cas de succes, on recupere la retour en parametre d'une fonction anonyme
            console.log(data);
            if (data.reponse == "disconnect") {
              disconnect();
            } else if (data.length > 0) {

              // $('#cantineContent').html('<div id="liste"></div>');
              var longueur = data.length - 1;

              for (var i = longueur ; i >= 0; i--) { // on fait une boucle pour lister les menus (je décremente pour remettre la liste dans le bon ordre)
                var dateMenu = new Date(data[i].date_menu); // je crée un objet date pour recuperer les infos utiles
                var jourMois = dateMenu.getDate();
                var jourSemaine = dateMenu.getDay();
                var moisAnnee = dateMenu.getMonth();
                var annee = dateMenu.getFullYear();

                var titre = jours[jourSemaine] + " " + jourMois + " " + mois[moisAnnee];
                $('#cantineContent').append('<div class="nd2-card"><div class="card-title"><h3 class="card-primary-title">' + titre + '</h3></div><div class="card-supporting-text"><h4>Entrée</h4><h5>' + data[i].entree + '</h5><h4>Plat</h4><h5>' + data[i].plat + '</h5><h4>Dessert</h4><h5>' + data[i].dessert + '</h5></div></div>');
              }
                fadingContent();
            } else {
              $('#cantineContent').html('<p>Aucun menu enregistré.</p>');
            }
        },

        error: loadingError
    });


});
