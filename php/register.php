<?php

header("Access-Control-Allow-Origin: *"); // pour que tout le monde puisse interroger ce script

require_once "inc/db.php";
require_once "inc/functions.php";

if (isset($_POST['nom'], $_POST['prenom']) && !empty($_POST['nom']) && !empty($_POST['prenom'])) {

  $nom = htmlspecialchars($_POST['nom']);
  $prenom = htmlspecialchars($_POST['prenom']);
  $bday = $_POST['bday'];
  $tel = htmlspecialchars($_POST['tel']);

  // On va vérifier que l'e-mail n'existe pas déjà dans la bdd

  $reqmail = $bdd->prepare('SELECT email FROM clients WHERE email = ?');
  $reqmail->execute([$_POST['email']]);
  $result_mail = $reqmail->fetch();

  // si le resultat est different de false (càd si l'e-mail existe déjà dans la bdd)
  if ($result_mail != false) {
    $reponse = array("reponse" => "email"); // alors personnaliser la reponse pour que le front l'interprete
   } else { // sinon si le resultat vaut false,

    $email = $_POST['email'];
    $emailconf = $_POST['emailconf'];

    $mdpconf = $_POST['mdpconf'];
    $formation = $_POST['formation'];


    $req = $bdd->prepare('INSERT INTO clients(nom, prenom, email, dateNaissance, mdp_hash, formation, statut, codeQR, confirmation_token) VALUES(:nom,    :prenom, :email, :dateNaissance, :mdp_hash, :formation, :statut, :codeQR, :confirmation_token)'); // préparation de la requete

    
    $qrcode = checkCode($bdd); // fabrication du qrcode alphanumérique //

    $confToken = checkConfToken($bdd); // fabrication du token de confirmation //

    $statut = "on sait pas encore";

    $mdp = password_hash($_POST['mdpreg'], PASSWORD_BCRYPT); // hachage du mdp

    $req->execute(array('nom' => $nom, 'prenom' => $prenom, 'email' => $email, 'dateNaissance' => $bday, 'mdp_hash' => $mdp, 'formation' => $formation, 'statut' => $statut, 'codeQR' => $qrcode, 'confirmation_token' => $confToken)); // exécution de la requete

    $user_id = $bdd->lastInsertId();

    // // mail de confirmation
    // mail($email, 'Confirmation de votre compte', "Afin de valider votre compte, merci de cliquer sur ce lien\n\nhttp://localhost/prototype1/php/confirm_account.php?id=$user_id&token=$confToken");


    $reponse = array("reponse" => true);

  }
} else {
  $reponse = array("reponse" => false);
}


$reponsejs = json_encode($reponse);
echo $reponsejs;


 ?>
