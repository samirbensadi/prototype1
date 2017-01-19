<?php
require_once 'inc/functions.php';

reconnect();
logged_only();


    // on affiche sinon les données du compte
    $reponse = array("reponse" => true, "nom" => $_SESSION['auth']->nom, "prenom" => $_SESSION['auth']->prenom, "tel" => $_SESSION['auth']->tel, "email" => $_SESSION['auth']->email);


send_json($reponse);

?>
