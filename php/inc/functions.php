<?php


// cette fonction permet de générer une chaine de caractères alphanumérique, pseudo-aléatoire.

  function str_random($length)
  {
    $alphabet = "0123456789azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN";
    return substr(str_shuffle(str_repeat($alphabet, $length)), 0, $length);
  }



// verifier le token remember
function checkRemToken($base)
{
  $token_string = str_random(60);

  $reqtoken = $base->prepare('SELECT remember_token FROM clients WHERE remember_token = ?');
  $reqtoken->execute([$token_string]);
  $result_token = $reqtoken->fetch();

  // si le resultat est different de false (càd si le token existe déjà dans la bdd)
  if ($result_token != false) {
    checkRemToken();
  } else { // sinon (si le resultat vaut false,
    return $token_string; // on renvoit le token généré
  }
}

// verifier le token de confirmation de compte

function checkConfToken($base)
{
  $token_string = str_random(60);

  $reqtoken = $base->prepare('SELECT confirmation_token FROM clients WHERE confirmation_token = ?');
  $reqtoken->execute([$token_string]);
  $result_token = $reqtoken->fetch();

  // si le resultat est different de false (càd si le token existe déjà dans la bdd)
  if ($result_token != false) {
    checkConfToken();
  } else { // sinon (si le resultat vaut false,
    return $token_string; // on renvoit le token généré
  }
}

// verifier le qrcode
function checkCode($base)
{
  $code_string = str_random(150);

  $reqcode = $base->prepare('SELECT codeQR FROM clients WHERE codeQR = ?');
  $reqcode->execute([$code_string]);
  $result_code = $reqcode->fetch();

  // si le resultat est different de false (càd si le code existe déjà dans la bdd)
  if ($result_code != false) {
    checkCode();
  } else { // sinon (si le resultat vaut false,
    return $code_string; // on renvoit le code généré
  }
}

// fonction pour limiter l'accès aux scripts aux seuls utilisateurs

function logged_only(){
  if (session_status() == PHP_SESSION_NONE) {
    session_start();
  }
  if(!isset($_SESSION['auth'])) {
    exit();
  }
}

// fonction pour envoyer la reponse tableau en json

function send_json($tableau){
  $reponsejs = json_encode($tableau);
  echo $reponsejs;
}