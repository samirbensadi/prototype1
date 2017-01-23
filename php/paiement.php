<?php
require 'inc/functions.php';

reconnect();
logged_only();
refreshSession();



if (isset($_POST) && !empty($_POST['achat'])) {
    require  'inc/db.php';

    $achat = json_decode($_POST['achat']);
//    var_dump($achat);

    $achat->jaune = (float) $achat->jaune;
    $achat->vert = (float) $achat->vert;
    $achat->rose = (float) $achat->rose;
    $achat->total = (float) $achat->total;


// récupération des tarifs correspondant au statut du client
    $req = $bdd->prepare('SELECT t.tarifJaune, t.tarifVert, t.tarifRose FROM clients c INNER JOIN tarifsStatut t ON c.id_statut = t.id_statut WHERE c.id_client = ?');
    $req->execute([$_SESSION['auth']->id_client]);

    $result = $req->fetch();

    if ($result) {

        $result->tarifJaune = (float) $result->tarifJaune;
        $result->tarifVert = (float) $result->tarifVert;
        $result->tarifRose = (float) $result->tarifRose;
        // calcul de vérification du cout total
        $totalJaune = $achat->jaune * $result->tarifJaune;
        $totalVert = $achat->vert * $result->tarifVert;
        $totalRose = $achat->rose * $result->tarifRose;
        $total = $totalJaune + $totalVert + $totalRose;

        // si les totaux correspondent
        if ($total == $achat->total)  {
            // on additionne le crédit au solde
            $jaune = (float) $_SESSION['auth']->ticket_jaune + $achat->jaune;
            $vert = (float) $_SESSION['auth']->ticket_vert + $achat->vert;
            $rose = (float) $_SESSION['auth']->ticket_rose + $achat->rose;


            // et on met à jour la table clients
            $req2 = $bdd->prepare('UPDATE clients SET ticket_jaune = ?, ticket_vert = ?, ticket_rose = ? WHERE id_client = ?');
            $req2->execute([$jaune, $vert, $rose, $_SESSION['auth']->id_client]);
            $req2->closeCursor();

            // et la table vente

            $req3 = $bdd->prepare('INSERT INTO vente (ticket_vert, ticket_rose, ticket_jaune, date_vente ,id_client) VALUES (:ticket_vert, :ticket_rose, :ticket_jaune, NOW() ,:id_client)');
            $req3->execute(["ticket_vert" => $achat->vert, "ticket_rose" => $achat->rose, "ticket_jaune" => $achat->jaune, "id_client" => $_SESSION['auth']->id_client ]);
            $req3->closeCursor();

            $reponse = array('reponse' => true);

        } else {
            $reponse = array('reponse' => "total");
        }
    } else {
        $reponse = array('reponse' => "nofares");
    }
} else {
    $reponse = array('reponse' => false);
}

send_json($reponse);

?>
