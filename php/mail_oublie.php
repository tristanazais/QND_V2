<?php

/************************** EXEMPLE DE RECUPERATION DE DONNEES SUR LA BASE ********************************/
header('Access-Control-Allow-Origin: file://'); //autorise les appels ajax pour les fichier locals
header('Access-Control-Allow-Origin: *'); //autorise les appels ajax pour tous les domaines

$serveur = "localhost";
$nom_base = "qnd";
$login = "admin_qnd";
$motdepasse = "qnd753";

    if( isset($_POST['mdp']) && $_POST['mdp']!='' ){

        $mdp=$_POST['mdp'];
        mysql_connect ($serveur,$login,$motdepasse) or die ('ERREUR '.mysql_error());
        mysql_select_db ($nom_base) or die ('ERREUR '.mysql_error());

        mysql_query ("set character_set_client='utf8'"); 
        mysql_query ("set character_set_results='utf8'"); 
        mysql_query ("set collation_connection='utf8_general_ci'"); 
        
        $requete_medecin = 'SELECT email, mdp_med FROM Medecin WHERE email=\''.$mdp.'\'';
        $resultat_medecin = mysql_query ($requete_medecin);
        $data = '0';
        $new = '';

        $ligne_medecin = mysql_fetch_assoc($resultat_medecin);

        if($ligne_medecin){ // Si les infos correspondent pour un medecin ....
            $data=$ligne_medecin["email"];
            $new=$ligne_medecin["mdp_med"];      
        }
        else{   // Sinon test pour un patient
            $requete_patient = 'SELECT email, mdp_pat FROM Patient WHERE email=\''.$mdp.'\'';
            $resultat_patient = mysql_query ($requete_patient);

            $ligne_patient = mysql_fetch_assoc($resultat_patient);

            if($ligne_patient){ // Si les infos correspondent pour un patient
                $data=$ligne_patient["email"];
                $new=$ligne_patient["mdp_pat"];       
            }
        }

/****************************/
        if($data!='0')
        {
            $mail = $data; // Déclaration de l'adresse de destination.
            $mail = 'tristan.azais@gmail.com'; // Déclaration de l'adresse de destination.
            if (!preg_match("#^[a-z0-9._-]+@(hotmail|live|msn).[a-z]{2,4}$#", $mail)) // On filtre les serveurs qui rencontrent des bogues.
            {
                $passage_ligne = "\r\n";
            }
            else
            {
                $passage_ligne = "\n";
            }
            //=====Déclaration des messages au format texte et au format HTML.
            $message_txt = 'Bonjour, voici un e-mail envoyé par votre application "Quoi de neuf docteur ?". Votre mot de passe est le suivant : '.$new.'';
            $message_html = '<html><head></head><body>Bonjour, voici un e-mail envoyé par votre application "Quoi de neuf docteur ?"<br>Votre mot de passe est le suivant : <b>'.$new.'</b>.</body></html>';
            //==========
             
            //=====Création de la boundary
            $boundary = "-----=".md5(rand());
            //==========
             
            //=====Définition du sujet.
            $sujet = "QND";
            //=========
             
            //=====Création du header de l'e-mail.
            $header = "From: \"QND\"<adminQND@QND.fr>".$passage_ligne;
            $header.= "Reply-to: \"QND\" <adminQND@QND.fr>".$passage_ligne;
            $header.= "MIME-Version: 1.0".$passage_ligne;
            $header.= "Content-Type: multipart/alternative;".$passage_ligne." boundary=\"$boundary\"".$passage_ligne;
            //==========
             
            //=====Création du message.
            $message = $passage_ligne."--".$boundary.$passage_ligne;
            //=====Ajout du message au format texte.
            $message.= "Content-Type: text/plain; charset=\"ISO-8859-1\"".$passage_ligne;
            $message.= "Content-Transfer-Encoding: 8bit".$passage_ligne;
            $message.= $passage_ligne.$message_txt.$passage_ligne;
            //==========
            $message.= $passage_ligne."--".$boundary.$passage_ligne;
            //=====Ajout du message au format HTML
            $message.= "Content-Type: text/html; charset=\"ISO-8859-1\"".$passage_ligne;
            $message.= "Content-Transfer-Encoding: 8bit".$passage_ligne;
            $message.= $passage_ligne.$message_html.$passage_ligne;
            //==========
            $message.= $passage_ligne."--".$boundary."--".$passage_ligne;
            $message.= $passage_ligne."--".$boundary."--".$passage_ligne;
            //==========
             
            //=====Envoi de l'e-mail.
            mail($mail,$sujet,$message,$header);
            //==========

        }
        
        echo $data;        
        
        
        mysql_close();

    }
    else
    {
        $data='0';
        echo $data;
    }

?>