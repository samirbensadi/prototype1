
//ACHAT//

$(document).on("pageinit", "#achat", function () {
    //NombreTicket
    var nombre1 = 0;
    var nombre2 = 0;
    var nombre3 = 0;

    //PRIX
    var prix1 = 2.50;
    var prix2 = 3;
    var prix3 = 3.50;

    $('#prix1').text(prix1 +'€');
    $('#prix2').text(prix2 +'€');
    $('#prix3').text(prix3 +'€');

    //ticket Jaune
    $('#add1').click(function () {
        nombre1++;
        $('#num1').text(nombre1);
    });

    $('#remove1').click(function () {
        if (nombre1<1) {
            nombre1 = 0;
        }
        else {
            nombre1--;
            $('#num1').text(nombre1);
        }
    });

    //ticket Vert
    $('#add2').click(function () {
        nombre2++;
        $('#num2').text(nombre2);
    });

    $('#remove2').click(function () {
        if (nombre2<1) {
            nombre2 = 0;
        }
        else {
            nombre2--;
            $('#num2').text(nombre2);
        }
    });

    //ticket Violet
    $('#add3').click(function () {
        nombre3++;
        $('#num3').text(nombre3);
    });

    $('#remove3').click(function () {
        if (nombre3<1) {
            nombre3 = 0;
        }
        else {
            nombre3--;
            $('#num3').text(nombre3);
        }
    });

    $('#Slot').click(function () {
        //set localStorage
        localStorage.setItem('ticket1', nombre1);
        localStorage.setItem('ticket2', nombre2);
        localStorage.setItem('ticket3', nombre3);

        //Calcule PrixTotal
        var total1 = nombre1 * prix1;
        var total2 = nombre2 * prix2;
        var total3 = nombre3 * prix3;
        var prixTotal = total1 + total2 + total3;

        localStorage.setItem('prixtotal', prixTotal);


    });

    $('#resetTicket').click(function () {
        localStorage.removeItem('ticket1');
        localStorage.removeItem('ticket2');
        localStorage.removeItem('ticket3');
        localStorage.removeItem('prixtotal');
    });

});
