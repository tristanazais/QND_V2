<?php

/************************** CHECK LOGIN ET MOT DE PASSE PAGE INDEX DE LOG ********************************/
header('Access-Control-Allow-Origin: file://'); //autorise les appels ajax pour les fichier locals
header('Access-Control-Allow-Origin: *'); //autorise les appels ajax pour tous les domaines

$serveur = "localhost";
$nom_base = "qnd";
$login = "admin_qnd";
$motdepasse = "qnd753";

    if(isset($_POST['id_medecin']) &&
    isset($_POST['Nom']) && 
	isset($_POST['Prenom']) &&
	isset($_POST['Adresse']) &&
	isset($_POST['Code_postal']) &&
	isset($_POST['Ville']) &&
	isset($_POST['Telephone']) &&
	isset($_POST['Type_Medecin']) &&
	isset($_POST['Identifiant']) &&
	isset($_POST['Mot_de_Passe']) &&
	isset($_POST['email'])
	){
		//medecin
		$id_medecin=$_POST['id_medecin'];
        $nom_med=$_POST['Nom'];  
		$prenom_med=$_POST['Prenom']; 
		$adresse=$_POST['Adresse']; 
		$cp=$_POST['Code_postal']; 
		$ville=$_POST['Ville'];
		$tel_med=$_POST['Telephone']; 
		$type_medecin=$_POST['Type_Medecin']; 
		$login_med=$_POST['Identifiant']; 
		$mdp_med=$_POST['Mot_de_Passe']; 
		$email=$_POST['email'];

		if($nom_med!='' && $prenom_med!='' && $adresse!='' && $cp!='' && $ville!='' && $tel_med!='' && $type_medecin!='' && $login_med!='' && $mdp_med!='' && $email!='')
		{
		
	        mysql_connect ($serveur,$login,$motdepasse) or die ('ERREUR '.mysql_error());
	        mysql_select_db ($nom_base) or die ('ERREUR '.mysql_error());

	    mysql_query ("set character_set_client='utf8'"); 
        mysql_query ("set character_set_results='utf8'"); 
        mysql_query ("set collation_connection='utf8_general_ci'"); 
	        
	        $requete_medecin = 'UPDATE Medecin SET nom_med=\''.$nom_med.'\', prenom_med=\''.$prenom_med.'\', type_med=\''.$type_medecin.'\', adresse=\''.$adresse.'\', cp=\''.$cp.'\', ville=\''.$ville.'\', email=\''.$email.'\', tel_med=\''.$tel_med.'\', login_med=\''.$login_med.'\', mdp_med=\''.$mdp_med.'\' WHERE id_med=\''.$id_medecin.'\'';
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