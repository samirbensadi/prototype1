<?php
require_once 'inc/functions.php';

reconnect();
logged_only();

if (!empty($_POST)) { // si des choses ont été envoyées par post
    if (!empty($_POST['mdp']) && !empty($_POST['newMdp']) ) { // si les mots de passe sont entrés
      $mdp = password_hash($_POST['mdp'], PASSWORD_BCRYPT);

      if (password_verify($mdp, $_SESSION['auth']->mdp_hash)) {
        $req2 = $bdd->prepare('UPDATE clients SET mdp_hash = ? WHERE id_client = ?');
        $req2->execute([$_POST['newMdp'], $user_id]);
      }
    }

    $req3 = $bdd->prepare('UPDATE clients SET tel = ?, email = ? WHERE id_client = ?');
    $req3->execute([$_POST['tel'], $_POST['newEmail']]);

    $reponse  = array('reponse' => true );
}
else{
    // on affiche sinon les données du compte
    $reponse = array("nom" => $_SESSION['auth']->nom, "prenom" => $_SESSION['auth']->prenom, "tel" => $_SESSION['auth']->tel, "email" => $_SESSION['auth']->email);
}

send_json($reponse);

?>
