<?php
header("Access-Control-Allow-Origin : *"); // pour que tout le monde puisse interroger ce script
header('Content-Type: application/json');
require 'inc/functions.php';
reconnect();
logged_only();
refreshSession();

require  'inc/db.php';

$req = $bdd->prepare('SELECT t.tarifJaune, t.tarifVert, t.tarifRose FROM clients c INNER JOIN tarifsStatut t ON c.id_statut = t.id_statut WHERE c.id_client = ?');
$req->execute([$_SESSION['auth']->id_client]);

$result = $req->fetch();

$result->tarifJaune = (float) $result->tarifJaune;
$result->tarifVert = (float) $result->tarifVert;
$result->tarifRose = (float) $result->tarifRose;



//var_dump($result);

if ($result) {
    $reponse = array("reponse" => true, "jaune" => $result->tarifJaune, "vert" => $result->tarifVert, "rose" => $result->tarifRose);
} else {
    $reponse = array("reponse" => false);
}

send_json($reponse);


?>
