<?php
header("Access-Control-Allow-Origin : *"); // pour que tout le monde puisse interroger ce script
header('Content-Type: application/json');

require 'inc/functions.php';

reconnect();
logged_only();
refreshSession();

$vert = (int) $_SESSION['auth']->ticket_vert;
$rose = (int) $_SESSION['auth']->ticket_rose;
$jaune = (int) $_SESSION['auth']->ticket_jaune;

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

if ($vert == 0 && $rose == 0 && $jaune == 0) {
    $reponse = array("reponse" => "noticket", "present" => $present, "couleur" => $color);
} else{
    $reponse = array("reponse" => true, "vert" => $vert, "rose" => $rose, "jaune" => $jaune, "present" => $present, "couleur" => $color);
}

send_json($reponse);

?>
