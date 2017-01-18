$(document).on("pagebeforecreate", "#menucantine", function () {
    var server = "localhost";

    $.ajax({
        method: "POST",
        url: 'http://' + server + '/prototype1/php/menucantine.php',
        success: function (data) { // en cas de succes, on recupere la retour en parametre d'une fonction anonyme
            var requete = JSON.parse(data); // qu'on parse (puisque c'est du json)
            console.log(requete[2]);
            if (requete.reponse == "disconnect") {
                localStorage.clear();
                sessionStorage.clear();
                $.mobile.changePage("../index.html", {transition: "slide", reverse: true});
            } else if (requete.reponse == true) {

            } else {
                alert("Ya de l'eau dans le gaz ... ");
            }
        },

        error: function () { // en cas d'erreur
            alert('Problème de connexion');
        }
    });


});