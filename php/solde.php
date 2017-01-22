<?php
require 'inc/functions.php';

reconnect();
logged_only();
refreshSession();

$vert = $_SESSION['auth']->ticket_vert;
$rose = $_SESSION['auth']->ticket_rose;
$jaune = $_SESSION['auth']->ticket_jaune;

if ($vert == 0 && $rose == 0 && $jaune == 0) {
    $reponse = array("reponse" => "noticket");
} else{
    require 'inc/db.php';
    $req = $bdd->prepare('SELECT * FROM presence WHERE id_client = ? AND date_presence = CURDATE()');
    $req->execute([$_SESSION['auth']->id_client]);
    $result = $req->fetch();
    $req->closeCursor();

    if ($result) {
      $present = true;
      $color = $result->couleurTicket;
    } else {
      $present = false;
      $color = false;
    }

    $reponse = array("reponse" => true, "vert" => $vert, "rose" => $rose, "jaune" => $jaune, "present" => $present, "couleur" => $color);
}

send_json($reponse);

?>
