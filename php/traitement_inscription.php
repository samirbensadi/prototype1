<?php

if (isset( ??? )) { // vérifier d'abord que toutes les données ont bien été envoyées

} else { // sinon
  // envoyer msg d'erreur :
  $reponse = false;
  $reponsejson = json_encode($reponse);

  echo $reponsejson;
}



 ?>
