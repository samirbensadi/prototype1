$(document).on("pageinit", "#home", function () {
  $.mobile.allowCrossDomainPages = true;

  $('#btninscription').on("tap",function (event) {
    event.preventDefault();
    console.log("hello");

    var nom = $('#nom').val();
    var prenom = $('#prenom').val();
    var bday = $('#bday').val();
    var tel = $('#tel').val();
    var email = $('#email').val();
    var emailconf = $('#emailconf').val();


    var regexNom = /^[a-zA-Z] $/;
    var regexTel = /[^0-9]/;
    var regexMail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

    if (regexNom.test(nom) && nom.length > 2 && nom.length < 250) {

      if (regexTel.test(tel) && tel.length >= 10 ) {
        if (regexMail.test(email) && email == emailconf) {

          $.ajax({
            method: "POST",
            url: 'http://192.168.1.46/prototype1/php/traitement_inscription.php',
            data: $('#forminscription').serialize(),
            success: function (data) {
              var reponse = JSON.parse(data);
              console.log(reponse);
            },
            error: function () {
              alert('Ya eu un problème !');
            }
          });

        } else {
          alert("Votre e-mail n'est pas valide");
        }
      }
      else {
        alert("Votre numéro n'est pas valide");
      }

    } else {
      alert("Votre nom n'est pas valide");
    }
  });




});
