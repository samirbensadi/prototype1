<?php
header("Access-Control-Allow-Origin : *"); // pour que tout le monde puisse interroger ce script
header('Content-Type: application/json');
require 'inc/functions.php';
reconnect();
logged_only();
refreshSession();

require 'inc/db.php';

$req = $bdd->prepare('SELECT * FROM menus ORDER BY date_menu DESC LIMIT 5');
$req->execute();
$result = $req->fetchAll();

send_json($result);



?>
