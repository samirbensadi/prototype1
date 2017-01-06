<?php
require_once 'inc/functions.php';
reconnect();
logged_only();

if (!empty($_POST)) { // si des choses ont été envoyées par post
    if (!empty($_POST['mdp']) && !empty($_POST['newMdp'])) // si les mots de passe sont entrés
}
else{
    // on affiche sinon les données du compte
    $reponse = array("nom" => $_SESSION['auth']->nom, "prenom" => $_SESSION['auth']->prenom, "tel" => $_SESSION['auth']->tel);
}

send_json($reponse);