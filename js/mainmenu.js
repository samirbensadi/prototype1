$(document).on("pagecreate", "#mainmenu", function () {

    var server = "localhost";

    // AU TAP DU BOUTON SE DECONNECTER

    $('#logOut').on('tap', function () {
        window.sessionStorage.clear(); // effacer le localStorage
        $.ajax({
            method: "POST",
            url: 'http://' + server + '/prototype1/php/log_out.php'

        });
        $.mobile.changePage($('#home'),{transition : "slide", reverse: true}); // retourner à la page home
        localStorage.clear();
    });



    
});