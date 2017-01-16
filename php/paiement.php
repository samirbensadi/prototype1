<?php
require 'inc/functions.php';

reconnect();
logged_only();
refreshSession();

if(isset($_POST) && !empty($_POST['jaune']) && !empty($_POST['vert']) && !empty($_POST['rose']) && !empty($_POST['total'])) {
    
}

?>