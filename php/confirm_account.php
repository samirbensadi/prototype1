<?php

// si l'id et le token de confirmation ont bien été envoyés et ne sont pas vide

if (isset($_GET['id'], $_GET['token']) && !empty($_GET['id']) && !empty($_GET['token'])) {
    $user_id = $_GET['id']; //
    $token = $_GET['token'];
    require_once "inc/db.php";
    $req = $bdd->prepare('SELECT * FROM clients WHERE id = ?'); // alors on fait une requete pour recuperer le client concerné
    $req->execute([$user_id]);
    $user = $req->fetch();


    // si le token envoyé par GET et celui enregistré en bdd correspondent
    if ($user && $user->confirmation_token == $token) {
        // alors on met à jour la table clients en supprimant le token et précisant la date de confirmation (nécessaire pour se connecter)
        $req2 = $bdd->prepare('UPDATE clients SET confirmation_token = NULL, confirmed_at = NOW() WHERE id = ?'); 
        $req2->execute([$user_id]);

        echo "Votre compte a bien été validé";

    }
    else{
        echo "Ce token n'est pas valide.";
    }
}
else{
    echo "Accès non autorisé";
}

?>