<?php

if(isset($_SESSION['auth'])){
    unset($_SESSION['user']);
}

if(session_status() == PHP_SESSION_ACTIVE){
    setcookie('remember', NULL, -1);
    session_destroy();
}
?>