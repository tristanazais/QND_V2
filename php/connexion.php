<?php

/************************** LOGIN PAGE ********************************/
header('Access-Control-Allow-Origin: file://'); //autorise les appels ajax pour les fichier locals
header('Access-Control-Allow-Origin: *'); //autorise les appels ajax pour tous les domaines

$serveur = "localhost";
$nom_base = "qnd";
$login = "admin_qnd";
$motdepasse = "qnd753";

    if( isset($_POST['username']) && isset($_POST['password']) && $_POST['username']!='' && $_POST['password']!='' ){

        $username=$_POST['username'];
        $password=$_POST['password'];
        mysql_connect ($serveur,$login,$motdepasse) or die ('ERREUR '.mysql_error());
        mysql_select_db ($nom_base) or die ('ERREUR '.mysql_error());
        
        $requete_medecin = 'SELECT id_med, login_med, mdp_med FROM Medecin WHERE login_med = \'' . $username . '\' AND mdp_med = \'' . $password . '\'';
        $resultat_medecin = mysql_query ($requete_medecin);

        $ligne_medecin = mysql_fetch_assoc($resultat_medecin);

        // echo 'le premier enregistrement a pour login '.$ligne_medecin["login"];

        if($ligne_medecin){ // Si les infos correspondent pour un medecin ....
            echo '1_'.$ligne_medecin["id_med"];        
        }
        else{   // Sinon test pour un patient
            $requete_patient = 'SELECT id_pat, login_pat, mdp_pat FROM Patient WHERE login_pat = \'' . $username . '\' AND mdp_pat = \'' . $password . '\'';
            $resultat_patient = mysql_query ($requete_patient);

            $ligne_patient = mysql_fetch_assoc($resultat_patient);

            // echo 'le premier enregistrement a pour login '.$ligne_patient["login_pat"];

            if($ligne_patient){ // Si les infos correspondent pour un patient
                echo '2_'.$ligne_patient["id_pat"];        
            }
            else
            {
                echo '0';
            }
        }

        mysql_close();

    }
    else
    {
        echo '0';
    }

?>