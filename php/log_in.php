<?php
  header("Access-Control-Allow-Origin : *"); // pour que tout le monde puisse interroger ce script
  header('Content-Type: application/json');

  if (isset($_POST['login'], $_POST['mdp']) && !empty($_POST['login']) && !empty($_POST['mdp'])) { // si le login et le mot de passe ont bien été envoyés
    $login = $_POST['login']; // alors on les stocke dans des variables
    $mdp = $_POST['mdp'];

    require_once 'inc/db.php';
    require_once 'inc/functions.php';


    $req=$bdd->prepare('SELECT * FROM clients WHERE email = ? AND confirmed_at IS NOT NULL ');
    $req->execute([$login]);
    $user = $req->fetch();

    if ($user == null) { // si l'utilisateur n'existe pas où qu'il n'a pas confirmé son compte
      $reponse = array('reponse' => false); // alors on enregistre une réponse négative dans un tableau
    }
    elseif (password_verify($mdp, $user->mdp_hash)) {
        session_start(); //on démarre la session
        $_SESSION['auth'] = $user; // on enregistre l'objet de l'utilisateur dans une variable de session

        // on fabrique un cookie pour se reconnecter automatiquement
        $remToken = checkRemToken($bdd); // fabrication du token remember
        $req2 = $bdd->prepare('UPDATE clients SET remember_token = ? WHERE id_client = ?');
        $req2->execute([$remToken, $user->id_client]);

        setcookie('remember', $user->id_client . '==' . $remToken . sha1($user->id_client . 'palpatine'), time() + 60 * 60 * 24 * 30);
        // le token est inséré dans le cookie en le concatenant avec l'id du client, et un hash de l'id et d'un mot clé // la durée du cookie est fixé à 30 jours

        $reponse = array('reponse' => true, 'qrcode' => $_SESSION['auth']->codeQR); // on enregistre une réponse positive
    }
    else { //sinon
      $reponse = array("reponse" => false);  // on enregistre une réponse négative
    }

  } else { // sinon c'est que les identifiants n'ont pas été envoyés
    // envoyer msg d'erreur :
    $reponse = false;
  }

send_json($reponse);



?>
