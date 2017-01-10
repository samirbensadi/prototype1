<?php
require_once 'inc/functions.php';

reconnect();
logged_only();


    if (!empty($_POST['oldMdp']) && !empty($_POST['newMdp']) ) { // si les mots de passe sont entrés
        
        $mdp = password_hash($_POST['oldMdp'], PASSWORD_BCRYPT);

        if (password_verify($mdp, $_SESSION['auth']->mdp_hash)) {
            require_once 'inc/db.php';
            $req2 = $bdd->prepare('UPDATE clients SET mdp_hash = ? WHERE id_client = ?');
            $req2->execute([$_POST['newMdp'], $_SESSION->id_client]);
            refreshSession();
            $reponse  = array('reponse' => true );
        } else {
            $reponse = array('reponse' => "password");

        }
        send_json($reponse);

    }

 



?>