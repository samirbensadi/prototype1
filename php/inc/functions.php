<?php

// cette fonction permet de générer une chaine de caractères alphanumérique, pseudo-aléatoire.

function str_random($length) {
  $alphabet = "0123456789azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN";
  return substr(str_shuffle(str_repeat($alphabet, $length)), 0, $length);
}
