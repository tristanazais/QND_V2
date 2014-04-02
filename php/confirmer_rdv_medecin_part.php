<?php

/************************** CHECK LOGIN ET MOT DE PASSE PAGE INDEX DE LOG ********************************/
header('Access-Control-Allow-Origin: file://'); //autorise les appels ajax pour les fichier locals
header('Access-Control-Allow-Origin: *'); //autorise les appels ajax pour tous les domaines

$serveur = "localhost";
$nom_base = "qnd";
$login = "admin_qnd";
$motdepasse = "qnd753";

    if(isset($_POST['id_medecin']) &&
    isset($_POST['date']) && 
	isset($_POST['motif']) &&
	isset($_POST['horaire']) &&
	isset($_POST['confirme'])
	){
		//medecin
		$id_medecin=$_POST['id_medecin'];
        $date=$_POST['date'];  
		$motif=$_POST['motif']; 
		$horaire=$_POST['horaire']; 
		$confirme=$_POST['confirme']; 

		if($id_medecin!='' && $date!='' && $motif!='' && $horaire!='' && $confirme!='')
		{
		
	        mysql_connect ($serveur,$login,$motdepasse) or die ('ERREUR '.mysql_error());
	        mysql_select_db ($nom_base) or die ('ERREUR '.mysql_error());

		    mysql_query ("set character_set_client='utf8'"); 
	        mysql_query ("set character_set_results='utf8'"); 
	        mysql_query ("set collation_connection='utf8_general_ci'"); 
	        
	        $requete_medecin = 'UPDATE Calendrier SET confirmation=\''.$confirme.'\' WHERE id_cal=\''.$id_medecin.'\' AND date_rdv=\''.$date.'\' AND motif=\''.$motif.'\' AND horaire_debut=\''.$horaire.'\'';
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