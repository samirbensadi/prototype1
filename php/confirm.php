<?php
header("Access-Control-Allow-Origin : *"); // pour que tout le monde puisse interroger ce script
header('Content-Type: application/json');
require 'inc/functions.php';
reconnect();
logged_only();
refreshSession();


if (checkTime()) {
    if (isset($_POST) &&!empty($_POST['radioCouleur']) ) {
//  var_dump($_POST);

        if ($_POST['radioCouleur'] == "jaune") {
            $solde = (int) $_SESSION['auth']->ticket_jaune;
            $champCouleur = "ticket_jaune";
        } elseif ($_POST['radioCouleur'] == "vert") {
            $solde = (int) $_SESSION['auth']->ticket_vert;
            $champCouleur = "ticket_vert";
        } elseif ($_POST['radioCouleur'] == "rose") {
            $solde = (int) $_SESSION['auth']->ticket_rose;
            $champCouleur = "ticket_rose";
        }



        if ( $solde > 0 ) {
            require 'inc/db.php';

            // on actualise le solde du client
            $req5 = $bdd->prepare('UPDATE clients SET ' . $champCouleur . ' = ? WHERE id_client = ?');
            $solde--;
            $req5->execute([$solde, $_SESSION['auth']->id_client ]);

            // on actualise la liste de présence
            $req4 = $bdd->prepare('INSERT INTO presence(date_presence, couleurTicket, id_client) VALUES(CURDATE(), :couleurTicket, :id_client)');
            $req4->execute(["couleurTicket" => $_POST['radioCouleur'], "id_client" => (int) $_SESSION['auth']->id_client]);

            //on actualise la table ticketsConsommes
            $req6 = $bdd->prepare('INSERT INTO ticketsConsommes(id_client, couleur_ticket, date_consommation) VALUES(:id_client, :couleur_ticket, CURDATE())');
            $req6->execute(['id_client' => $_SESSION['auth']->id_client, 'couleur_ticket' => $_POST['radioCouleur']]);

            $reponse = array("reponse" => true);
        } else {
            $reponse = array("reponse" => "noticket");
        }



    } else {
        $reponse = array("reponse" => false);
    }
} else {
    $reponse = array('reponse' => "time");
}



send_json($reponse);

 ?>
