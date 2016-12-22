<?php
  header("Access-Control-Allow-Origin : *"); // pour que tout le monde puisse interroger ce script


  if (isset($_POST['login']) && isset($_POST['mdp'])) { // si le login et le mot de passe ont bien été envoyés
    $login = $_POST['login']; // alors on les stocke dans des variables
    $mdp = $_POST['mdp'];

    if ($login == "admin" && $mdp == "mickey") { // si le login et le mot de passe corresponde
      $remembertoken = "sdfsd5f6s4d5fsd5fsdf"; // un token au hasard pour se reconnecter  (il sera stocké dans le localstorage)
      $reponse = array('reponse' => true, 'token' => $remembertoken); // alors on enregistre une réponse positive dans un tableau

    } else { //sinon
      $reponse = array("reponse" => false);  // on enregistre une réponse négative
    }

  } else { // sinon
    // envoyer msg d'erreur :
    $reponse = false;
  }

  $reponsejson = json_encode($reponse); // qu'on encode en json
  echo $reponsejson; // et qu'on envoie


 ?>
