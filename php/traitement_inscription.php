<?php

header("Access-Control-Allow-Origin: *"); // pour que tout le monde puisse interroger ce script

$regexNom = "#^([a-zàáâäçèéêëìíîïñòóôöùúûüA-Z]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûüA-Z]+)*)+([-]([a-zàáâäçèéêëìíîïñòóôöùúûüA-Z]+(( |')[a-zàáâäçèéêëìíîïñòóôöùúûüA-Z]+)*)+)*$#iu";

if (isset($_POST) && !empty($_POST)) { // si la superglobale existe et qu'elle n'est pas vide
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

  if (isset($_POST['nom'], $_POST['prenom']) && !empty($_POST['nom'], $_POST['prenom']) && preg_match($regexNom, $_POST['nom']) && preg_match($regexNom, $_POST['prenom']) ) {
  } else {
    $reponse = "Votre nom et/ou prénom n'a pas été soumis )
  }



}
else {
  $reponse = "nothing received";
}

$reponsejs = json_encode($reponse);
echo $reponsejs;


 ?>
