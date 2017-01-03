<?php

//CONNEXION A LA BASE DE DONNEES
//On essaie qqch avec try, si il ya une erreur, on exécute qqch avec catch
try{

  global $bdd;
  //Création de l'objet bdd via le constructeur PDO (issu de l'extension PHP Data Objects). C'est ainsi que l'on se connecte à MySQL. On active également la détection d'erreurs SQL.
  $bdd = new PDO('mysql:host=localhost;dbname=application;charset=utf8','root','pipi');
  $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $bdd->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ); // on modifie l'option pour que la requete soit fetchée en tant qu'objet

}
  //On récupère le code erreur renvoyé par PHP, on met fin à l'exécution de la page, et on affiche le message correspondant au code erreur.
catch (Exception $e) {
  die('Erreur : '. $e->getMessage());
}

// cette fonction permet de générer une chaine de caractères alphanumérique, pseudo-aléatoire.

function str_random($length) {
  $alphabet = "0123456789azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN";
  return substr(str_shuffle(str_repeat($alphabet, $length)), 0, $length);
}


//// verifier le token remember
//function checkRemToken()
//{
//  var_dump($bdd);
//  $token_string = str_random(60);
//
//  $reqtoken = $bdd->prepare('SELECT remember_token FROM clients WHERE remember_token = ?');
//  $reqtoken->execute([$token_string]);
//  $result_token = $reqtoken->fetch();
//
//  // si le resultat est different de false (càd si le token existe déjà dans la bdd)
//  if ($result_token != false) {
//    checkRemToken();
//  } else { // sinon (si le resultat vaut false,
//    return $token_string; // on renvoit le token généré
//  }
//}
//
//// verifier le token de confirmation de compte
//
//function checkConfToken()
//{
//  var_dump($bdd);
//  $token_string = str_random(60);
//
//  $reqtoken = $bdd->prepare('SELECT confirmation_token FROM clients WHERE confirmation_token = ?');
//  $reqtoken->execute([$token_string]);
//  $result_token = $reqtoken->fetch();
//
//  // si le resultat est different de false (càd si le token existe déjà dans la bdd)
//  if ($result_token != false) {
//    checkConfToken();
//  } else { // sinon (si le resultat vaut false,
//    return $token_string; // on renvoit le token généré
//  }
//}

// verifier le qrcode
function checkCode()
{
  var_dump($bdd);
  $code_string = str_random(150);

  $reqcode = $bdd->prepare('SELECT codeQR FROM clients WHERE codeQR = ?');
  $reqcode->execute([$code_string]);
  $result_code = $reqcode->fetch();

  // si le resultat est different de false (càd si le code existe déjà dans la bdd)
  if ($result_code != false) {
    checkCode();
  } else { // sinon (si le resultat vaut false,
    return $code_string; // on renvoit le code généré
  }
}