<?php
require 'inc/functions.php';
reconnect();
logged_only();
refreshSession();

if (isset($_POST) ) {
  var_dump($_POST);
}

 ?>
