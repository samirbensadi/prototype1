<?php

header("Access-Control-Allow-Origin: *"); // pour que tout le monde puisse interroger ce script

include "inc/db.php";
include "inc/functions.php";

if (isset($_POST['nom'], $_POST['prenom']) && !empty($_POST['nom']) && !empty($_POST['prenom'])) {

  $nom = htmlspecialchars($_POST['nom']);
  $prenom = htmlspecialchars($_POST['prenom']);
  $bday = $_POST['bday'];
  $tel = htmlspecialchars($_POST['tel']);
  $email = $_POST['email']; // il faudra factoriser une condition permettant de vérifier s'il n'existe pas déjà dans la bdd
  $emailconf = $_POST['emailconf'];

  $mdpconf = $_POST['mdpconf'];
  $formation = $_POST['formation'];


  $req = $bdd->prepare('INSERT INTO clients(nom, prenom, email, dateNaissance, mdp_hash, formation, statut, codeQR, confirmation_token) VALUES(:nom, :prenom, :email, :dateNaissance, :mdp_hash, :formation, :statut, :codeQR, :confirmation_token)'); // préparation de la requete

  $qrcode = str_random(150); // fabrication du qrcode alphanumérique // il faudra factoriser une condition permettant de vérifier s'il n'existe pas déjà dans la bdd

  $token = str_random(60); // fabrication du token de confirmation // il faudra factoriser une condition permettant de vérifier s'il n'existe pas déjà dans la bdd

  $statut = "on sait pas encore";

  $mdp = password_hash($_POST['mdpreg'], PASSWORD_BCRYPT); // hachage du mdp

  $req->execute(array('nom' => $nom, 'prenom' => $prenom, 'email' => $email, 'dateNaissance' => $bday, 'mdp_hash' => $mdp, 'formation' => $formation, 'statut' => $statut, 'codeQR' => $qrcode, 'confirmation_token' => $token ));
  // exécution de la requete

  $user_id = $bdd->lastInsertId();

  // // mail de confirmation
  // mail($email, 'Confirmation de votre compte', "Afin de valider votre compte, merci de cliquer sur ce lien\n\nhttp://localhost/prototype1/php/confirm_account.php?id=$user_id&token=$token");


  $reponse = array("reponse" => true);

} else {
  $reponse = array("reponse" => false);
}


$reponsejs = json_encode($reponse);
echo $reponsejs;


 ?>
