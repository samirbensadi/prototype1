<?php
header("Access-Control-Allow-Origin : *"); // pour que tout le monde puisse interroger ce scripts
header('Content-Type: application/json');
require_once 'inc/functions.php';
reconnect();
logged_only();

if (isset($_SESSION['auth'])) {
  $reponse = array('reponse' => true, 'qrcode' => $_SESSION['auth']->codeQR);
  send_json($reponse);
}


?>
