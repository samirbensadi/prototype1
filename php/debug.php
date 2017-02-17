<?php
/**
 * Created by PhpStorm.
 * User: coda
 * Date: 06/02/17
 * Time: 09:17
 */



if(session_status() == PHP_SESSION_NONE){
    session_start();
}

var_dump($_SESSION);
