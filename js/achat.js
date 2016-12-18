// VANILLA JS

//ACHAT//

//NombreTicket
var nombre1 = 0;
var nombre2 = 0;
var nombre3 = 0;

//PRIX
var prix1 = 2.50;
var prix2 = 3;
var prix3 = 3.50;

//recupe prix pour afficher
function prix(){
    document.getElementById('prix1').innerHTML = prix1 + '€';
    document.getElementById('prix2').innerHTML = prix2 + '€';
    document.getElementById('prix3').innerHTML = prix3 + '€';
}
//ticket jaune
function add1() {
    nombre1++;
    document.getElementById('num1').innerHTML = nombre1;
}
function remove1() {
    if (nombre1<1) {
        nombre1 = 0;
    }
    else {
        nombre1--;
        document.getElementById('num1').innerHTML = nombre1;
    }
}

//ticket vert
function add2() {
    nombre2++;
    document.getElementById('num2').innerHTML = nombre2;
}
function remove2() {
    if (nombre2<1) {
        nombre2 = 0;
    }
    else {
        nombre2--;
        document.getElementById('num2').innerHTML = nombre2;
    }
}

//ticket violet
function add3() {
    nombre3++;
    document.getElementById('num3').innerHTML = nombre3;
}

function remove3() {
    if (nombre3<1) {
        nombre3 = 0;
    }
    else {
        nombre3--;
        document.getElementById('num3').innerHTML = nombre3;
    }
}

//PANIER
function panier() {
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

    //affiche nombre de ticket
    document.getElementById('jaune').innerHTML = nombre1 + ' ticket jaune a '+ prix1 +'€ dans votre panier';
    document.getElementById('vert').innerHTML = nombre2 + ' ticket vert a '+ prix2 +'€ dans votre panier';
    document.getElementById('violet').innerHTML = nombre3 + ' ticket violet a '+ prix3 +'€ dans votre panier';

    //affiche prix
    document.getElementById('total1').innerHTML = 'TOTAL: ' + prix1 * nombre1 + '€';
    document.getElementById('total2').innerHTML = 'TOTAL: ' + prix2 * nombre2 + '€';
    document.getElementById('total3').innerHTML = 'TOTAL: ' + prix3 * nombre3 + '€';

    document.getElementById('totalfinal').innerHTML = 'TOTAL: ' + prixTotal + '€';

}
