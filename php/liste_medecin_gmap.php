<?php

/************************** LOGIN PAGE ********************************/
header('Access-Control-Allow-Origin: file://'); //autorise les appels ajax pour les fichier locals
header('Access-Control-Allow-Origin: *'); //autorise les appels ajax pour tous les domaines
header('Content-Type: text/html; charset=utf-8');

$serveur = "localhost";
$nom_base = "qnd";
$login = "admin_qnd";
$motdepasse = "qnd753";

        $type_recherche=$_POST['type_recherche'];
        $user_data=$_POST['user_data'];

        mysql_connect ($serveur,$login,$motdepasse) or die ('ERREUR '.mysql_error());
        mysql_select_db ($nom_base) or die ('ERREUR '.mysql_error());

        mysql_query ("set character_set_client='utf8'"); 
        mysql_query ("set character_set_results='utf8'"); 
        mysql_query ("set collation_connection='utf8_general_ci'"); 
        
        $requete_medecin = 'SELECT id_med, nom_med, prenom_med, email, type_med, tel_med, adresse, cp, ville FROM Medecin';

        $resultat_medecin = mysql_query ($requete_medecin);

        $donnees = array();

        for ($i=0;$i<mysql_num_rows($resultat_medecin);$i++){

             while($row = mysql_fetch_assoc($resultat_medecin))
             {
                 $donnees[] = $row;
             }
        }
        echo(json_encode($donnees));


?>