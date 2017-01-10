<?php
require_once 'inc/functions.php';

reconnect();
logged_only();
refreshSession();

$vert = $_SESSION['auth']->ticket_vert;
$rose = $_SESSION['auth']->ticket_rose;
$jaune = $_SESSION['auth']->ticket_jaune;

if ($vert == 0 && $rose == 0 && $jaune == 0) {
    $reponse = array("reponse" => "noticket");
} else{
    $reponse = array("reponse" => true, "vert" => $vert, "rose" => $rose, "jaune" => $jaune ) ;
}

send_json($reponse);

?>