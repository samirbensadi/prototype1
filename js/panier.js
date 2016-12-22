//PANIER

        $(document).on("pageinit", "#panier", function () {

            //affiche nombre de ticket
            $('#jaune').text(nombre1 + ' ticket jaune a '+ prix1 +'€ dans votre panier');
            $('#vert').text(nombre2 + ' ticket vert a '+ prix2 +'€ dans votre panier');
            $('#violet').text(nombre3 + ' ticket violet a '+ prix3 +'€ dans votre panier');

            //affiche prix
            $('#total1').text('TOTAL: ' + prix1 * nombre1 + '€');
            $('#total2').text('TOTAL: ' + prix2 * nombre2 + '€');
            $('#total3').text('TOTAL: ' + prix3 * nombre3 + '€');

            $('#totalfinal').text('TOTAL: ' + prixTotal + '€');

        });
        // <ul data-role="listview">
        //  <li id="zone">
        //
        //     <div class="btn-ticket">
        //         <h2 id="jaune">vous n'avez pas de ticket jaune </br>
        //                        dans votre panier</h2>
        //         <p id="total1">TOTAL: 0€</p>
        //     </div>
        //  </li>
        //  <li id="zone">
        //     <div class="imgVert"></div>
        //     <div class="btn-ticket">
        //         <h2 id="vert">vous avait pas de ticket vert </br>
        //                       dans votre panier</h2>
        //         <p id="total2">TOTAL: 0€</p>
        //     </div>
        //  </li>
        //  <li id="zone">
        //     <div class="imgViolet"></div>
        //     <div class="btn-ticket">
        //         <h2 id="violet">vous avait pas de ticket violet </br>
        //                         dans votre panier</h2>
        //         <p id="total3">TOTAL: 0€</p>
        //     </div>
        //  </li>
        // </ul>
        // <div class="ui-body ui-body-a ui-corner-all">
        //
        //   <h3 id="totalfinal">TOTAL: 0€</h3>
        //
        //   <a href="paiement.html" class="ui-btn">Valider</a>
        // </div>
