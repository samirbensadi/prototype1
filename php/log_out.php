<?php
if(session_status() == PHP_SESSION_ACTIVE && isset($_SESSION['auth'])){
    unset($_SESSION['user']);
    setcookie('remember', NULL, -1);
    session_destroy();
}
?>