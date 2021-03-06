<?php
// cette fonction permet de générer une chaine de caractères alphanumérique, pseudo-aléatoire.

// sleep(1);


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
    $reqtoken->closeCursor();

  // si le resultat est different de false (càd si le token existe déjà dans la bdd)
  if ($result_token != false) {
    checkRemToken($base);
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
    $reqtoken->closeCursor();


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
    $reqcode->closeCursor();

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
    $reponse = array("reponse" => "disconnect");
    send_json($reponse);
    exit();
  }
}

// fonction pour envoyer la reponse tableau en json

function send_json($tableau){
  $reponsejs = json_encode($tableau);
  echo $reponsejs;
}

// fonction pour se reconnecter automatiquement avec un cookie si la session a été perdue

function reconnect(){
    if(session_status() == PHP_SESSION_NONE){
        session_start();
    }

    if(isset($_COOKIE['remember']) && !isset($_SESSION['auth']) ){
        require 'db.php';

        $remember_token = $_COOKIE['remember'];
        $parts = explode('==', $remember_token);
        $user_id = $parts[0];
        $req = $bdd->prepare('SELECT * FROM clients WHERE id_client = ?');
        $req->execute([$user_id]);
        $user = $req->fetch();
        $req->closeCursor();
        if($user){
            $expected = $user_id . '==' . $user->remember_token . sha1($user_id . 'palpatine');
            if($expected == $remember_token){
                $_SESSION['auth'] = $user;
                setcookie('remember', $remember_token, time() + 60 * 60 * 24 * 30);
            } else{
                setcookie('remember', null, -1);
            }
        }else{
            setcookie('remember', null, -1);
        }
    }
}

//rafraichir les variables de session
function refreshSession() {
    require 'db.php';

    $req=$bdd->prepare('SELECT * FROM clients WHERE id_client = ?');
    $req->execute([$_SESSION['auth']->id_client]);
    $user = $req->fetch();
    $req->closeCursor();

    if ($user) {
        $_SESSION['auth'] = $user;
    }
    else{
        exit();
    }

}

function checkTime() {
  $heure_actuelle = date('H:i');

  $fichier = fopen('http://localhost/Appli-du-chef/php/horaires.json', "r");

  $lecture = fgets($fichier);
  fclose($fichier);

  $horaires = json_decode($lecture);

  if ($heure_actuelle >= $horaires->start && $heure_actuelle < $horaires->end ) {
    return true;
  } else {
    return false;
  }
}
