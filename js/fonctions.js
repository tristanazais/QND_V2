


sessionStorage['calendar_medecin']='0';

sessionStorage['user_medecin_connect']='0';

if(!sessionStorage["id_patient"])
	sessionStorage["id_patient"]="0";
if(!sessionStorage["id_medecin"])
	sessionStorage["id_medecin"]="0";

if(sessionStorage["id_medecin"]!="0")
	sessionStorage['user_medecin_connect']='1';
// localStorage.clear();
/****************************** AJAX CONNEXION LOGIN MOT DE PASSE ***************************************/

function se_loger()	{
				$.ajax({
					url: 'http://www.vivactis-multimedia.fr/test_ajax/connexion.php',
					type: 'POST',
					dataType: 'text',
					data: {username: $('#username').val(), password: $('#password').val()},
				})
				.success(function(data,textStatus,jqXHR) {
					var result=data.split("_");
					if(result[0]=='0')
						$('#erreur').text('Login ou Mot de passe incorrect');
					else if(result[0]=='1'){
						sessionStorage['user_medecin_connect']='1';
						sessionStorage["id_medecin"]=result[1];
						sessionStorage["id_patient"]="0";
						document.location.href = '../page_medecin/menu.html';
					}
					else if(result[0]=='2'){
						sessionStorage["id_patient"]=result[1];
						sessionStorage["id_medecin"]="0";
						document.location.href = 'menu.html';
					}
				})
				.fail(function() {
					alert("Erreur Serveur. Reessayer plus tard.");
				});
}

/****************************** AJAX INIT LISTE DES MEDECINS BDD ***************************************/

function init_liste_medecin(which)
{
	var choix_user=$('#find_'+which).val();

	$.ajax({
           type: 'POST',
		   dataType: 'json',
		   data: {type_recherche: which, user_data: choix_user},
           url: "http://www.vivactis-multimedia.fr/test_ajax/liste_medecin.php",
       })
	.success(function(data) {
		var html = '<ul data-role="listview" class="ui-listview">';
		for(medecin in data){

			 html+='<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="detail_perso.html" data-transition="pop" onclick="is_favoris('+data[medecin].id_med+');open_lien_medecin_liste('+data[medecin].id_med+');">'+data[medecin].nom_med+' '+data[medecin].prenom_med+' - '+data[medecin].adresse+' '+data[medecin].cp+' '+data[medecin].ville+'</a></li>';

		}
		html+='</ul>';
		$('#content_liste_medecin').append(html);
		if(data=='0' || html=='<ul data-role="listview" class="ui-listview"></ul>')
			$('#content_liste_medecin').append('<br>Aucun résultat pour votre recherche<br>Nous vous invitons à chercher un médecin près de chez vous grâce à la carte : <br><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="geomap.html" data-transition="pop"  data-role="button" onClick=\'setTimeout(function(){ajax_gmap();},200);\'>Carte des médecins QND</a>');
			
	})
	.fail(function() {
		alert("Erreur Serveur. Reessayer plus tard.");
	});

	
}

/****************************** AJAX INIT INFO DU USER CURRENT ***************************************/

function init_profil()
{
	$.ajax({
		url: 'http://www.vivactis-multimedia.fr/test_ajax/recup_profil_patient.php',
		type: 'POST',
		dataType: 'text',
		data: {id_patient: sessionStorage["id_patient"]},
	})
	.success(function(data,textStatus,jqXHR) {
		var result = JSON.parse(data);
		// console.log(result[0]);
		// console.log(sessionStorage["id_patient"]);
		
		var html='<button id="envoi_info_perso" type="button" class="ui-btn ui-shadow ui-corner-all" onclick="modifier_profil();">Modifier Profil</button>';

		html+='<label>Nom : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Nom" type="text" value="'+result[0].nom_pat+'" /></div>';
		html+='<label>Prenom : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Prenom" type="text" value="'+result[0].prenom_pat+'" /></div>';
		html+='<label>Adresse : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Adresse" type="text" value="'+result[0].adresse+'" /></div>';
		html+='<label>Code postal : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Code_postal" type="text" value="'+result[0].code_postal+'" /></div>';
		html+='<label>Ville : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Ville" type="text" value="'+result[0].ville+'" /></div>';
		html+='<label>Telephone : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Telephone" type="text" value="'+result[0].tel+'" /></div>';
		html+='<label>Date de Naissance : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Date_de_Naissance" type="text" value="'+result[0].date_naissance+'" /></div>';
		html+='<label>email : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="email" type="text" value="'+result[0].email+'" /></div>';
		html+='<label>Identifiant : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Identifiant" type="text" value="'+result[0].login_pat+'" /></div>';
		html+='<label>Mot de Passe : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Mot_de_Passe" type="text" value="'+result[0].mdp_pat+'" /></div>';
		
		html+='<button id="envoi_info_perso2" type="button" class="ui-btn ui-shadow ui-corner-all" onclick="modifier_profil();">Modifier Profil</button>';
		
		$('#content_mon_profil').prepend(html);
	})
	.fail(function() {
		alert("Erreur Serveur. Reessayer plus tard.");
	});
}

/****************************** AJAX UPDATE INFO DU USER CURRENT ***************************************/

function modifier_profil()
{
	$.ajax({
		url: 'http://www.vivactis-multimedia.fr/test_ajax/modif_profil_user.php',
		type: 'POST',
		dataType: 'text',
		data: {id_patient:sessionStorage["id_patient"] ,Nom:$('#Nom').val(),Prenom:$('#Prenom').val(),Adresse:$('#Adresse').val(),Code_postal:$('#Code_postal').val(),Ville:$('#Ville').val(),Telephone:$('#Telephone').val(),Date_de_Naissance:$('#Date_de_Naissance').val(),Identifiant:$('#Identifiant').val(),Mot_de_Passe:$('#Mot_de_Passe').val(),email:$('#email').val()},
	})
	.success(function(data,textStatus,jqXHR) {
		if(data=="1")
			alert("Vos informations personnels ont bien été enregistrées");
		else
			alert("Assurez-vous que tous les champs soient remplis !");
	})
	.fail(function() {
		alert("Erreur Serveur. Reessayer plus tard.");
	});
}


/****************************** CHAMP INPUT NUMBER MAX SIZE ********************************************/

function appel_number_size_max()
{
	input_number('.input_number');
}

function input_number(elem)
{
	$(elem).on('keypress', function(ev) {
               var keyCode = window.event ? ev.keyCode : ev.which;
               //codes for 0-9
               if (keyCode < 48 || keyCode > 57) {
                       //codes for backspace, delete, enter
                       if (keyCode != 0 && keyCode != 8 && keyCode != 13 && !ev.ctrlKey) {
                               ev.preventDefault();
                       }
               }
   });
}


/************************** KILL SESSION STORAGE *****************************************************/

function kill_session()
{
	sessionStorage.clear();
}

/************************** INIT PAGE MENU PATIENT (message rendez-vous) ***********************/

function init_message_menu_patient()
{
	var html='Bonjour !<br>';
	if(localStorage["calendar_data"])
	{
		var deparse_tab = JSON.parse(localStorage["calendar_data"]);

		var confirme=0;
		var annule=0;
		var attente=0;

		for (nbre in deparse_tab){
			if(deparse_tab[nbre][0].confirme=='1')
				confirme++;
			else if(deparse_tab[nbre][0].confirme=='0')
				attente++;
			else if(deparse_tab[nbre][0].confirme=='-1')
				annule++;
		}
		if(confirme!=0)
			html+='Vous avez <span style="color:red">'+confirme+'</span> Rendez-vous de prévu<br>';
		if(annule!=0)
			html+='Vous avez <span style="color:red">'+annule+'</span> Rendez-vous annulé par un médecin<br>';
		if(attente!=0)
			html+='Vous avez <span style="color:red">'+attente+'</span> Rendez-vous en attente de confirmation<br>';
	}
	else
	{
		html+='Vous n\'avez aucun Rendez-vous de prévu';
	}

	$('#message').html(html);

}