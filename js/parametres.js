$(document).on("pagecreate", "#parametres",  function () {

    var server = "localhost";

    $.ajax({
        url: "http://" + server + '/prototype1/php/parametres.php',
        success: function (data) {
            var requete = JSON.parse(data);
            console.log(requete);
        }
    });
});