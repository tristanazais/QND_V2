<?php

/************************** CHECK LOGIN ET MOT DE PASSE PAGE INDEX DE LOG ********************************/
header('Access-Control-Allow-Origin: file://'); //autorise les appels ajax pour les fichier locals
header('Access-Control-Allow-Origin: *'); //autorise les appels ajax pour tous les domaines

$serveur = "localhost";
$nom_base = "qnd";
$login = "admin_qnd";
$motdepasse = "qnd753";

    if(isset($_POST['username']) && 
	isset($_POST['password']) &&
	isset($_POST['nom']) &&
	isset($_POST['prenom']) &&
	isset($_POST['birth']) &&
	isset($_POST['address']) &&
	isset($_POST['cp']) &&
	isset($_POST['city']) &&
	isset($_POST['mail']) &&
	isset($_POST['phone'])
	){
		//patient
		
        $username=$_POST['username'];
        $password=$_POST['password'];
		$nom=$_POST['nom'];
		$prenom=$_POST['prenom'];
		$birth=$_POST['birth'];
		$address=$_POST['address'];
		$cp=$_POST['cp'];
		$city=$_POST['city'];
		$mail=$_POST['mail'];
		$phone=$_POST['phone'];

		if($username!='' && $password!='' && $nom!='' && $prenom!='' && $birth!='' && $address!='' && $cp!='' && $city!='' && $mail!='' && $phone!='')
		{
		
	        mysql_connect ($serveur,$login,$motdepasse) or die ('ERREUR '.mysql_error());
	        mysql_select_db ($nom_base) or die ('ERREUR '.mysql_error());

	        mysql_query ("set character_set_client='utf8'"); 
        mysql_query ("set character_set_results='utf8'"); 
        mysql_query ("set collation_connection='utf8_general_ci'"); 
	        
	        $requete_medecin = 'Insert into Patient(nom_pat, prenom_pat, date_naissance, adresse, code_postal, ville, email, tel, login_pat, mdp_pat)
			VALUES("'.$nom.'", "'.$prenom.'",
			"'.$birth.'", "'.$address.'",
			"'.$cp.'", "'.$city.'",
			"'.$mail.'", "'.$phone.'",
			"'.$username.'", "'.$password.'");';
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