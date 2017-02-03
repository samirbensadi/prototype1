<?php
header('Content-Type: application/json');
require_once 'inc/functions.php';

reconnect();
logged_only();
refreshSession();

if (!empty($_POST['newEmail']) && !empty($_POST['newTel'])) { // si des choses ont été envoyées par post
    require 'inc/db.php';
    $req3 = $bdd->prepare('UPDATE clients SET tel = ?, email = ? WHERE id_client = ?');
    $req3->execute([$_POST['newTel'], $_POST['newEmail'], $_SESSION['auth']->id_client]);

    $reponse = array('reponse' => true);


}
else{
    $reponse = array('reponse' => false);
}

send_json($reponse);


?>
