<?php
  header("Access-Control-Allow-Origin: *"); // pour que tout le monde puisse interroger ce script


  if (isset($_POST['login']) && isset($_POST['mdp'])) { // si le login et le mot de passe ont bien été envoyés
    $login = $_POST['login']; // alors on les stocke dans des variables
    $mdp = $_POST['mdp'];

    if ($login == "admin" && $mdp == "coda") { // si le login et le mot de passe corresponde
      $reponse = true; // alors on enregistre une réponse positive
      $reponsejson = json_encode($reponse); // qu'on encode en json

      echo $reponsejson; // et qu'on envoie
    } else { //sinon
      $reponse = false;  // on enregistre une réponse négative
      $reponsejson = json_encode($reponse); // qu'on encode en json

      echo $reponsejson; // et qu'on envoie
    }


  } else { // sinon
    // envoyer msg d'erreur :
    $reponse = false;
    $reponsejson = json_encode($reponse);

    echo $reponsejson;

  }

 ?>
