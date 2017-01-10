$(document).on("pagebeforecreate", "#code", function () {

  var server = "localhost";

  $.ajax({
    url: "http://" + server + '/prototype1/php/code.php',
    success: function (data) {
      var requete = JSON.parse(data);
      console.log(requete);
      
      $('#codeZone').qrcode(requete.qrcode);
    },
    error: function () {
      alert('probleme de liaison'); // erreur de liaison avec le serveur
    }
  })

});
