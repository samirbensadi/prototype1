<?php
header("Access-Control-Allow-Origin : *"); // pour que tout le monde puisse interroger ce script
header('Content-Type: application/json');
require_once 'inc/functions.php';

reconnect();
logged_only();
refreshSession();

if (!empty($_POST['newEmail']) && !empty($_POST['newTel'])) { // si des choses ont été envoyées par post
    require 'inc/db.php';
    $newTel = htmlspecialchars($_POST['newTel']);
    $newEmail = htmlspecialchars($_POST['newEmail']);

    $req3 = $bdd->prepare('UPDATE clients SET tel = ?, email = ? WHERE id_client = ?');
    $req3->execute([$newTel, $newEmail, $_SESSION['auth']->id_client]);

    $reponse = array('reponse' => true);


}
else{
    $reponse = array('reponse' => false);
}

send_json($reponse);


?>
