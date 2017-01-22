<?php
require 'inc/functions.php';

if (!empty($_POST['emailForgot'])) {
    require "inc/db.php";

    $req = $bdd->prepare('SELECT * FROM clients WHERE email = ? AND confirmed_at IS NOT NULL ');
    $req->execute([$_POST['emailForgot']]);
    $user = $req->fetch();

    if ($user){
        $reset_token = str_random(60);
        $req2 = $bdd->prepare('UPDATE clients SET reset_token = ?, reset_at = NOW() WHERE id_client = ?');
        $req2->execute([$reset_token, $user->id_client]);

//        mail($user->email, "Réinitiatilisation de votre mot de passe", "Afin de réinitialiser votre mot de passe merci de cliquer sur ce lien\n\nhttp://localhost/prototype1/php/reset_mdp.php?id={$user->id_client}&token=$reset_token");
        $reponse = array("reponse" => true);
    } else{
        $reponse = array('reponse' => "email");
    }
} else {
    $reponse = array("reponse" => false);
}

send_json($reponse);


?>
