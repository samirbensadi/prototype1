<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>Yummy !</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css">

</head>
<body>

<nav>
    <div class="nav-wrapper" style="background-color: #FF5722">
        <a href="#" class="brand-logo">YUMMY !</a>
    </div>
</nav>
<?php

if (isset($_GET['id'], $_GET['token'])) {
    require_once 'inc/db.php';
    require_once 'inc/functions.php';

    $req = $bdd->prepare('SELECT * FROM clients WHERE id_client = ? AND reset_token IS NOT NULL AND clients.reset_token = ? AND reset_at > DATE_SUB(NOW(), INTERVAL 30 MINUTE )');
    $req->execute([$_GET['id'], $_GET['token']]);
    $user = $req->fetch();
    if ($user) {
        if (!empty($_POST['newMdp']) && $_POST['newMdp'] == $_POST['newMdpConf'] ) {
            $mdp = password_hash($_POST['newMdp'], PASSWORD_BCRYPT);
            $req2 = $bdd->prepare('UPDATE clients SET mdp_hash = ?, reset_at = NULL, reset_token = NULL WHERE id_client = ?');
            $req2->execute([$mdp, $user->id_client]);
            echo  "<h4>Votre mot de passe a été réinitialisé</h4>";
        } else {
            ?>

<form method="POST" action="">
    <label for="newMdp">Nouveau mot de passe</label>
    <input class="validate" type="password" name="newMdp" id="newMdp">
    <label for="newMdpConf">Confirmation nouveau mot de passe</label>
    <input class="validate" type="password" name="newMdpConf" id="newMdpConf">
    <button class="waves-effect waves-light btn" type="submit">Confirmer</button>
</form>





<?php
        }

    } else {
        echo "Erreur : ce code de confirmation n'est pas valide";
    }
} else {
    echo "Vous n'avez rien à faire là !";
}

?>

</body>
</html>
