<?php

/************************** LOGIN PAGE ********************************/
header('Access-Control-Allow-Origin: file://'); //autorise les appels ajax pour les fichier locals
header('Access-Control-Allow-Origin: *'); //autorise les appels ajax pour tous les domaines

$serveur = "localhost";
$nom_base = "qnd";
$login = "admin_qnd";
$motdepasse = "qnd753";
    
    if( isset($_POST['id_med']) && $_POST['id_med']!='' ){

        $id_med=$_POST['id_med'];
        mysql_connect ($serveur,$login,$motdepasse) or die ('ERREUR '.mysql_error());
        mysql_select_db ($nom_base) or die ('ERREUR '.mysql_error());

        mysql_query ("set character_set_client='utf8'"); 
        mysql_query ("set character_set_results='utf8'"); 
        mysql_query ("set collation_connection='utf8_general_ci'"); 
        
        $requete_medecin = 'SELECT id_med, nom_med, prenom_med, email, type_med, tel_med, adresse, cp, ville FROM Medecin WHERE id_med=\''.$id_med.'\'';

        $ligne_medecin=array();

        $resultat_medecin = mysql_query($requete_medecin);

        while($row = mysql_fetch_assoc($resultat_medecin))
        {
             $ligne_medecin[] = $row;
        }

        echo(json_encode($ligne_medecin));
    }

?>