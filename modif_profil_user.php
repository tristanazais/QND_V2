<?php

/************************** CHECK LOGIN ET MOT DE PASSE PAGE INDEX DE LOG ********************************/
header('Access-Control-Allow-Origin: file://'); //autorise les appels ajax pour les fichier locals
header('Access-Control-Allow-Origin: *'); //autorise les appels ajax pour tous les domaines

$serveur = "localhost";
$nom_base = "qnd";
$login = "admin_qnd";
$motdepasse = "qnd753";

    if(isset($_POST['id_patient']) &&
    isset($_POST['Nom']) && 
	isset($_POST['Prenom']) &&
	isset($_POST['Adresse']) &&
	isset($_POST['Code_postal']) &&
	isset($_POST['Ville']) &&
	isset($_POST['Telephone']) &&
	isset($_POST['Date_de_Naissance']) &&
	isset($_POST['Identifiant']) &&
	isset($_POST['Mot_de_Passe']) &&
	isset($_POST['email'])
	){
		//patient
		$id_patient=$_POST['id_patient'];
        $nom=$_POST['Nom'];  
		$prenom=$_POST['Prenom']; 
		$adresse=$_POST['Adresse']; 
		$cp=$_POST['Code_postal']; 
		$ville=$_POST['Ville'];
		$tel=$_POST['Telephone']; 
		$date_naissance=$_POST['Date_de_Naissance']; 
		$login_pat=$_POST['Identifiant']; 
		$mdp=$_POST['Mot_de_Passe']; 
		$email=$_POST['email'];

		if($nom!='' && $prenom!='' && $adresse!='' && $cp!='' && $ville!='' && $tel!='' && $date_naissance!='' && $login_pat!='' && $mdp!='' && $email!='')
		{
		
	        mysql_connect ($serveur,$login,$motdepasse) or die ('ERREUR '.mysql_error());
	        mysql_select_db ($nom_base) or die ('ERREUR '.mysql_error());

	        mysql_query ("set character_set_client='utf8'"); 
        mysql_query ("set character_set_results='utf8'"); 
        mysql_query ("set collation_connection='utf8_general_ci'"); 
	        
	        $requete_medecin = 'UPDATE Patient SET nom_pat=\''.$nom.'\', prenom_pat=\''.$prenom.'\', date_naissance=\''.$date_naissance.'\', adresse=\''.$adresse.'\', code_postal=\''.$cp.'\', ville=\''.$ville.'\', email=\''.$email.'\', tel=\''.$tel.'\', login_pat=\''.$login_pat.'\', mdp_pat=\''.$mdp.'\' WHERE id_pat=\''.$id_patient.'\'';
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