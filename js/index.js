$(document).on("pageinit", "#home", function () {
  $.mobile.allowCrossDomainPages = true;

  if (localStorage.login && localStorage.mdp) { // si les identifiants sont déjà dans le localStorage
    $.mobile.changePage($('#mainmenu')); // alors je charge la page 2
  }
  else {
    $.mobile.changePage($('#home')); // sinon je charge la page connect
  }

// AU TAP DU BOUTON SE CONNECTER
  $('#btnCo').on("tap",function (event) {
    event.preventDefault();

    if ($("#login").length > 0 || $("#mdp").length > 0) {
      $.ajax({
        method: "POST",
        url : 'http://localhost/testForm-back/traitement_connexion.php',
        data: $('#formConnexion').serialize(),
        success: function (data) {
          var reponse = JSON.parse(data);
          console.log(reponse);
          if (reponse == true) {
            var login = $('#login').val();
            var mdp = $('#mdp').val();
            window.localStorage.setItem("login", login);
            window.localStorage.setItem("mdp", mdp);
            $.mobile.changePage($('#mainmenu'),{transition : "slide", reverse: false}); // je charge la page 2
          } else {
            alert("Erreur : something's missing !");
          }
        },
        error: function () {
          alert('Ya eu un problème !');
        }
      });
    } else {
        alert('Tapez qqch');
    }
  });


  // AU TAP DU BOUTON SE DECONNECTER

    $('#logout').on('tap', function () {
      window.localStorage.clear(); // effacer le localStorage
      $.mobile.changePage($('#home'),{transition : "slide", reverse: true}); // retourner à la page home
    });


    //ACHAT//


    //PRIX
    var prix1 = 2.50;
    var prix2 = 3;
    var prix3 = 3.50;

    //GET LOCALSTOARAGE
    var jaune = localStorage.getItem('jaune');
    var vert = localStorage.getItem('vert');
    var violet = localStorage.getItem('violet');
    //TOTAL
    var total1 = prix1 * jaune;
    var total2 = prix2 * vert;
    var total3 = prix3 * violet;
    //PRIX FINAL
    var totalfinal = total1 + total2 + total3;


    //recupe prix pour afficher
    function prix(){
        document.getElementById('prix1').innerHTML = prix1 + '€';
        document.getElementById('prix2').innerHTML = prix2 + '€';
        document.getElementById('prix3').innerHTML = prix3 + '€';
    }
    //ticket jaune
    var numbre1 = 0;

    function add1() {
        numbre1++;
        document.getElementById('num1').innerHTML = numbre1;
    }
    function remove1() {
        if (numbre1<1) {
            numbre1 = 0;
        }
        else {
            numbre1--;
            document.getElementById('num1').innerHTML = numbre1;
        }
    }

    //ticket vert
    var numbre2 = 0;

    function add2() {
        numbre2++;
        document.getElementById('num2').innerHTML = numbre2;
    }
    function remove2() {
        if (numbre2<1) {
            numbre2 = 0;
        }
        else {
            numbre2--;
            document.getElementById('num2').innerHTML = numbre2;
        }
    }

    //ticket violet
    var numbre3 = 0;

    function add3() {
        numbre3++;
        document.getElementById('num3').innerHTML = numbre3;
    }

    function remove3() {
        if (numbre3<1) {
            numbre3 = 0;
        }
        else {
            numbre3--;
            document.getElementById('num3').innerHTML = numbre3;
        }
    }

    //ENREGISTRE
    function enregistre() {
        localStorage.setItem('jaune', numbre1);
        localStorage.setItem('vert', numbre2);
        localStorage.setItem('violet', numbre3);
    }
    //PANIER
    function panier() {

        //affiche nombre de ticket
        document.getElementById('jaune').innerHTML = jaune + ' ticket jaune a '+ prix1 +'€ dans votre panier';
        document.getElementById('vert').innerHTML = vert + ' ticket vert a '+ prix2 +'€ dans votre panier';
        document.getElementById('violet').innerHTML = violet + ' ticket violet a '+ prix3 +'€ dans votre panier';

        //affiche prix
        document.getElementById('total1').innerHTML = 'TOTAL: ' + total1 +'€';
        document.getElementById('total2').innerHTML = 'TOTAL: ' + total2 +'€';
        document.getElementById('total3').innerHTML = 'TOTAL: ' + total3 +'€';

        document.getElementById('totalfinal').innerHTML = 'TOTAL: ' + totalfinal +'€';
    }

});
