<?php
require 'inc/functions.php';
reconnect();
logged_only();
refreshSession();


if (checkTime()) {
    if (isset($_POST) &&!empty($_POST['unconfirm']) ) {
       $act = (bool) $_POST['unconfirm'];

        require 'inc/db.php';
        $req = $bdd->prepare('SELECT * FROM presence WHERE id_client = ? AND date_presence = CURDATE()');
        $req->execute([$_SESSION['auth']->id_client]);
        $result = $req->fetch();
        $req->closeCursor();

        if ($result && $act == true) {

            if ($result->couleurTicket == "jaune") {
                $solde = (int) $_SESSION['auth']->ticket_jaune;
                $champCouleur = "ticket_jaune";
            } elseif ($result->couleurTicket == "vert") {
                $solde = (int) $_SESSION['auth']->ticket_vert;
                $champCouleur = "ticket_vert";
            } elseif ($result->couleurTicket == "rose") {
                $solde = (int) $_SESSION['auth']->ticket_rose;
                $champCouleur = "ticket_rose";
            }

            // on actualise le solde du client
            $req5 = $bdd->prepare('UPDATE clients SET ' . $champCouleur . ' = ? WHERE id_client = ?');
            $solde++;
            $req5->execute([$solde, $_SESSION['auth']->id_client ]);

            // on actualise la liste de présence
            $req4 = $bdd->prepare('DELETE FROM presence WHERE id_client = ? AND date_presence = CURDATE()');
            $req4->execute([$_SESSION['auth']->id_client]);

            //on actualise la table ticketsConsommes
            $req6 = $bdd->prepare('DELETE FROM ticketsConsommes WHERE id_client = ? AND date_consommation = CURDATE()');
            $req6->execute([$_SESSION['auth']->id_client]);

            $reponse = array("reponse" => true);
        } else {
            $reponse = array('reponse' => "nopresent");
        }



    } else {
        $reponse = array("reponse" => false);
    }




} else {
    $reponse = array('reponse' => "time");
}



send_json($reponse);

?>
