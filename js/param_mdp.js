$(document).on("pagecreate", "#parametresmdp",  function () {
    
    $('#formparametresmdp input').on('keyup', function () {
        checkChangeMdp();
    });


    $("#formparametresmdp").on("submit", function (event) {
        event.preventDefault();
        
            $.ajax({
                method: "POST",
                url: "http://" + server + '/prototype1/php/change_mdp.php',
                data: $('#formparametresmdp').serialize(),
                success: function (data) {
                    var requete = JSON.parse(data);
                    console.log(requete);
                    if (requete.reponse == "disconnect") {
                        disconnect();
                    } else if (requete.reponse == "password") {
                        alert("L'ancien mot de passe n'est pas bon.");
                    } else {
                        alert("Mot de passe changé !");
                        $.mobile.back();
                    }
                },
                error: function () {
                    alert('probleme de liaison'); // erreur de liaison avec le serveur
                }
            });
    });
});