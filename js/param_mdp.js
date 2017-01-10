$(document).on("pagecreate", "#parametresmdp",  function () {

    var server = "localhost";

    $("#formparametresmdp").on("submit", function (event) {

        event.preventDefault();


        var oldMdp = $("#oldMdp").val();
        var mdpParam = $('#newMdp').val();
        var mdpParamConf = $('#newMdpConf').val();

        if (mdpParam == mdpParamConf && mdpParam.length > 5 && oldMdp.length > 5) {
            $.ajax({
                method: "POST",
                url: "http://" + server + '/prototype1/php/change_mdp.php',
                data: $('#formparametresmdp').serialize(),
                success: function (data) {
                    var requete = JSON.parse(data);
                    console.log(requete);
                    if (requete.reponse == "disconnect") {
                        $.mobile.changePage("index.html", {transition : "slide", reverse: true});
                    } else if (requete.reponse == "password") {
                        alert("L'ancien mot de passe n'est pas bon.");
                    } else {
                        alert("Mot de passe changé !");
                    }

                },
                error: function () {
                    alert('probleme de liaison'); // erreur de liaison avec le serveur
                }
            });

        } else {
            alert("Les mots de passe ne correspondent pas. (6 caracteres minimum)");
        }
    });

});