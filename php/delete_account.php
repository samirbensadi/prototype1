<?php
header('Content-Type: application/json');
require 'inc/functions.php';
reconnect();
logged_only();
refreshSession();

if (isset($_POST) && !empty($_POST['mdp'])) {

    if (password_verify($_POST['mdp'], $_SESSION['auth']->mdp_hash)) {

        require 'inc/db.php';

        $req = $bdd->prepare('DELETE FROM clients WHERE id_client = ?');

        $req->execute([$_SESSION['auth']->id_client]);

        $reponse = ['reponse' => true];

        unset($_SESSION['auth']);
        setcookie('remember', NULL, -1);
        session_destroy();

    } else{
        $reponse = ['reponse' => "mdp"];
    }

} else {
    $reponse = ['reponse' => false];
}

send_json($reponse);


?>
