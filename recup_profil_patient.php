<?php

/************************** LOGIN PAGE ********************************/
header('Access-Control-Allow-Origin: file://'); //autorise les appels ajax pour les fichier locals
header('Access-Control-Allow-Origin: *'); //autorise les appels ajax pour tous les domaines

$serveur = "localhost";
$nom_base = "qnd";
$login = "admin_qnd";
$motdepasse = "qnd753";
    
    if( isset($_POST['id_patient']) && $_POST['id_patient']!='' ){

        $id_patient=$_POST['id_patient'];
        mysql_connect ($serveur,$login,$motdepasse) or die ('ERREUR '.mysql_error());
        mysql_select_db ($nom_base) or die ('ERREUR '.mysql_error());

        mysql_query ("set character_set_client='utf8'"); 
        mysql_query ("set character_set_results='utf8'"); 
        mysql_query ("set collation_connection='utf8_general_ci'"); 
        
        $requete_patient = 'SELECT id_pat, nom_pat, prenom_pat, email, tel, adresse, code_postal, ville, login_pat, mdp_pat, date_naissance FROM Patient WHERE id_pat=\''.$id_patient.'\'';

        $ligne_patient=array();

        $resultat_patient = mysql_query($requete_patient);

        while($row = mysql_fetch_assoc($resultat_patient))
        {
             $ligne_patient[] = $row;
        }

        echo(json_encode($ligne_patient));
    }

?>