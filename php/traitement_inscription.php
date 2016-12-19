<?php
if (isset($_POST) && !empty($_POST)) {
  $nom = $_POST['nom'];
  $prenom = $_POST['prenom'];
  $bday = $_POST['bday'];
  $tel = $_POST['tel'];
  $email = $_POST['email'];
  $emailconf = $_POST['emailconf'];
  $mdp = $_POST['mdp'];
  $mdpconf = $_POST['mdpconf'];
  $formation = $_POST['formation'];

  $reponse = array('nom' =>  $nom, 'prenom' => $prenom, 'bday' => $bday, 'tel' => $tel, 'email' => $email, 'formation' => $formation );




}
else {
  $reponse = false;
}

$reponsejs = json_encode($tableau);
echo $reponsejs;


 ?>
