<?php
header('Content-Type: application/json');
require_once 'inc/functions.php';

reconnect();
logged_only();
refreshSession();


    if (!empty($_POST['oldMdp']) && !empty($_POST['newMdp']) ) { // si les mots de passe sont entrés

        if (password_verify($_POST['oldMdp'], $_SESSION['auth']->mdp_hash)) {
            require 'inc/db.php';
            $req2 = $bdd->prepare('UPDATE clients SET mdp_hash = ? WHERE id_client = ?');
            $mdp = password_hash($_POST['newMdp'], PASSWORD_BCRYPT);

            $req2->execute([$mdp, $_SESSION['auth']->id_client]);
            refreshSession();
            $reponse  = array('reponse' => true );
        } else {
            $reponse = array('reponse' => "password");

        }
        send_json($reponse);

    }





?>
