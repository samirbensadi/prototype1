<?php

header("Access-Control-Allow-Origin: *"); // pour que tout le monde puisse interroger ce script

  // $nom = $_POST['nom'];
  // $prenom = $_POST['prenom'];
  // $bday = $_POST['bday'];
  // $tel = $_POST['tel'];
  // $email = $_POST['email'];
  // $emailconf = $_POST['emailconf'];
  // $mdp = $_POST['mdp'];
  // $mdpconf = $_POST['mdpconf'];
  // $formation = $_POST['formation'];
  //
  // $reponse = array('nom' =>  $nom, 'prenom' => $prenom, 'bday' => $bday, 'tel' => $tel, 'email' => $email, 'formation' => $formation );

if (isset($_POST['nom'], $_POST['prenom']) && !empty($_POST['nom']) && !empty($_POST['prenom'])) {
  $reponse = array("reponse" => true);
} else {
  $reponse = array("reponse" => false);
}


$reponsejs = json_encode($reponse);
echo $reponsejs;


 ?>
