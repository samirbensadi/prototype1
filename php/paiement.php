<?php
require 'inc/functions.php';

reconnect();
logged_only();
refreshSession();



if (isset($_POST) && !empty($_POST['achat'])) {
    require  'inc/db.php';

    $achat = json_decode($_POST['achat']);

    $achat->jaune = (float) $achat->jaune;
    $achat->vert = (float) $achat->vert;
    $achat->rose = (float) $achat->rose;
    $achat->total = (float) $achat->total;


//    var_dump($achat);

    $req = $bdd->prepare('SELECT t.tarifJaune, t.tarifVert, t.tarifRose FROM clients c INNER JOIN tarifsStatut t ON c.id_statut = t.id_statut WHERE c.id_client = ?');
    $req->execute([$_SESSION['auth']->id_client]);

    $result = $req->fetch();

    if ($result) {

        $result->tarifJaune = (float) $result->tarifJaune;
        $result->tarifVert = (float) $result->tarifVert;
        $result->tarifRose = (float) $result->tarifRose;

        $totalJaune = $achat->jaune * $result->tarifJaune;
        $totalVert = $achat->vert * $result->tarifVert;
        $totalRose = $achat->rose * $result->tarifRose;
        $total = $totalJaune + $totalVert + $totalRose;

        if ($total == $achat->total)  {
            $jaune = $_SESSION['auth']->ticket_jaune + $achat->jaune;
            $vert = $_SESSION['auth']->ticket_vert + $achat->vert;
            $rose = $_SESSION['auth']->ticket_rose + $achat->rose;

            $req2 = $bdd->prepare('UPDATE clients SET ticket_jaune = ?, ticket_vert = ?, ticket_rose = ? WHERE id_client = ?');
            $req2->execute([$jaune, $vert, $rose, $_SESSION['auth']->id_client]);

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