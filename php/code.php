<?php
require_once 'inc/functions.php';
reconnect();
logged_only();

$reponse = array('qrcode' => $_SESSION['auth']->codeQR);

send_json($reponse);

 ?>
