<?php

/************************** CHECK LOGIN ET MOT DE PASSE PAGE INDEX DE LOG ********************************/
header('Access-Control-Allow-Origin: file://'); //autorise les appels ajax pour les fichier locals
header('Access-Control-Allow-Origin: *'); //autorise les appels ajax pour tous les domaines

$serveur = "localhost";
$nom_base = "qnd";
$login = "admin_qnd";
$motdepasse = "qnd753";

    if(isset($_POST['id_med']) &&
    isset($_POST['date_rdv']) && 
	isset($_POST['horaire_debut']) &&
	isset($_POST['motif']) &&
	isset($_POST['confirmation'])
	) 
	{
		//patient
		$id_med=$_POST['id_med'];
        $date_rdv=$_POST['date_rdv'];  
		$horaire_debut=$_POST['horaire_debut']; 
		$motif=$_POST['motif']; 
		$confirmation=$_POST['confirmation']; 


		if($id_med!='' && $date_rdv!='' && $horaire_debut!='' && $motif!='')
		{
		
	        mysql_connect ($serveur,$login,$motdepasse) or die ('ERREUR '.mysql_error());
	        mysql_select_db ($nom_base) or die ('ERREUR '.mysql_error());

	        mysql_query ("set character_set_client='utf8'"); 
        	mysql_query ("set character_set_results='utf8'"); 
       		mysql_query ("set collation_connection='utf8_general_ci'"); 
	        
	        $requete_medecin = 'Insert into Calendrier(id_cal, date_rdv, horaire_debut, motif, confirmation)
			VALUES("'.$id_med.'", "'.$date_rdv.'",
			"'.$horaire_debut.'", "'.$motif.'", "'.$confirmation.'");';
	        $resultat_medecin = mysql_query ($requete_medecin);

	        echo '1';

        }
        else
        {
        	echo '0';
        }

        mysql_close();

    }

?>