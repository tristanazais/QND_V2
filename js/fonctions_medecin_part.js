/************************** INIT PAGE MENU MEDECIN (message rendez-vous) ***********************/

function init_message_menu()
{
	$.ajax({
		url: 'http://www.vivactis-multimedia.fr/test_ajax/recup_rendez_vous_medecin_part.php',
		type: 'POST',
		dataType: 'text',
		data: {id_med:sessionStorage["id_medecin"]},
		})
		.success(function(data,textStatus,jqXHR) {
			$('#message').html('Bonjour, vous avez <span style="color:red">'+(JSON.parse(data)).length+'</span> nouveau(x) rendez-vous à confirmer');
		})
		.fail(function() {
			alert("Erreur Serveur. Reessayer plus tard.");
		});
}

/*************************** AU CLICK CALENDRIER DU MEDECIN *************************************/

function open_calendar_medecin_part()
{
	init_medecin_calendar_medecin_part(sessionStorage["id_medecin"]);
}

function init_medecin_calendar_medecin_part(id_medecin)
{
	add_calendar_this_medecin(id_medecin);
	sessionStorage['calendar_medecin']='1';

		$("#ajout_rdv_button").attr('onclick','addRdv_medecin_part('+id_medecin+');');

		$("#retour a").attr('href','#').attr('onclick','kill_calendar("menu");');

}

/************************** FONCTION CALENDAR.JS MEDECIN PART ************************************/

function addRdv_medecin_part(id_medecin)
	{
		var new_annee = ($(".c-month-view").children('p').text()).lastIndexOf('201');
		var final_annee = $(".c-month-view").children('p').text().substr(parseInt(new_annee)+3,1);
		
		var new_mois = $("#mois").text();

		switch(new_mois){
			case 'Jan':new_mois="01";break;
			case 'Fev':new_mois="02";break;
			case 'Mar':new_mois="03";break;
			case 'Avr':new_mois="04";break;
			case 'Mai':new_mois="05";break;
			case 'Jul':new_mois="06";break;
			case 'Jui':new_mois="07";break;
			case 'Aou':new_mois="08";break;
			case 'Sep':new_mois="09";break;
			case 'Oct':new_mois="10";break;
			case 'Nov':new_mois="11";break;
			case 'Dec':new_mois="12";break;
		}
		var new_jour = $("#jour").text();
		var new_date = '201'+final_annee+new_mois+new_jour;

		var heure_debut = document.getElementById('horaire_debut'); 
		var valeurdebut = heure_debut.options[heure_debut.selectedIndex].value;
		
		var new_rdvarray = [
		  {
		    date: new_date,
		    name: $("#motif").val(),
		    start: valeurdebut
		  }
		];

		var a_new_rdvarray = {
				    date_rdv: new_date,
					motif: $("#motif").val(),
				    horaire_debut: valeurdebut,
				    confirmation: '1'
				  };
		array_calendar[array_calendar.length]=a_new_rdvarray;

////////// SAUVEGARDE EN AJAX EN BDD //////////////////////////////
		$.ajax({
		url: 'http://www.vivactis-multimedia.fr/test_ajax/enregistrer_rdv_medecin.php',
		type: 'POST',
		dataType: 'text',
		data: {id_med:sessionStorage["id_medecin"], date_rdv:new_rdvarray[0].date, horaire_debut:new_rdvarray[0].start,motif:new_rdvarray[0].name, confirmation:'1'},
		})
		.success(function(data,textStatus,jqXHR) {
			if(data=='0')
			  	alert('Veuillez saisir un motif');
		})
		.fail(function() {
			alert("Erreur Serveur. Reessayer plus tard.");
		});

		if(new_rdvarray != '') {
			$.each(new_rdvarray, function(date,events) {
					var tempeventarray = [];
					tempeventarray["name"] = events.name;
					tempeventarray["start"] = events.start;
					tempeventarray["date"] = events.date;
					tempeventarray["confirme"] = '1';
					if(calendarArray[events.date] == undefined) {
						calendarArray[events.date] = [tempeventarray];
					} else {
						calendarArray[events.date].push(tempeventarray);
					}
			});
		 }
		 calendarSetMonth($('.calendar'));

		 re_init_color();
	}


/****************************** AJAX INIT INFO DU USER CURRENT MEDECIN PART ***************************************/

function init_profil_medecin_part()
{
	$.ajax({
		url: 'http://www.vivactis-multimedia.fr/test_ajax/recup_profil_medecin.php',
		type: 'POST',
		dataType: 'text',
		data: {id_medecin: sessionStorage["id_medecin"]},
	})
	.success(function(data,textStatus,jqXHR) {
		var result = JSON.parse(data);
		// console.log(result[0]);
		// console.log(sessionStorage["id_medecin"]);
		
		var html='<button id="envoi_info_perso" type="button" class="ui-btn ui-shadow ui-corner-all" onclick="modifier_profil_medecin_part();">Modifier Profil</button>';

		html+='<label>Nom : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Nom" type="text" value="'+result[0].nom_med+'" /></div>';
		html+='<label>Prenom : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Prenom" type="text" value="'+result[0].prenom_med+'" /></div>';
		html+='<label>Adresse : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Adresse" type="text" value="'+result[0].adresse+'" /></div>';
		html+='<label>Code postal : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Code_postal" type="text" value="'+result[0].cp+'" /></div>';
		html+='<label>Ville : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Ville" type="text" value="'+result[0].ville+'" /></div>';
		html+='<label>Telephone : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Telephone" type="text" value="'+result[0].tel_med+'" /></div>';
		html+='<label>Type Medecin : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Type_Medecin" type="text" value="'+result[0].type_med+'" /></div>';
		html+='<label>email : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="email" type="text" value="'+result[0].email+'" /></div>';
		html+='<label>Identifiant : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Identifiant" type="text" value="'+result[0].login_med+'" /></div>';
		html+='<label>Mot de Passe : </label><div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input id="Mot_de_Passe" type="text" value="'+result[0].mdp_med+'" /></div>';
		
		html+='<button id="envoi_info_perso2" type="button" class="ui-btn ui-shadow ui-corner-all" onclick="modifier_profil_medecin_part();">Modifier Profil</button>';
		
		$('#content_mon_profil').prepend(html);
	})
	.fail(function() {
		alert("Erreur Serveur. Reessayer plus tard.");
	});
}

/****************************** AJAX UPDATE INFO DU USER CURRENT MEDECIN PART ***************************************/

function modifier_profil_medecin_part()
{
	$.ajax({
		url: 'http://www.vivactis-multimedia.fr/test_ajax/modif_profil_user_medecin_part.php',
		type: 'POST',
		dataType: 'text',
		data: {id_medecin:sessionStorage["id_medecin"] ,Nom:$('#Nom').val(),Prenom:$('#Prenom').val(),Adresse:$('#Adresse').val(),Code_postal:$('#Code_postal').val(),Ville:$('#Ville').val(),Telephone:$('#Telephone').val(),Type_Medecin:$('#Type_Medecin').val(),Identifiant:$('#Identifiant').val(),Mot_de_Passe:$('#Mot_de_Passe').val(),email:$('#email').val()},
	})
	.success(function(data,textStatus,jqXHR) {
		if(data=="1")
			alert("Vos informations personnels ont bien été enregistrées");
		else
			alert("Assurez-vous que tous les champs soient remplis !");
		// console.log(data);
	})
	.fail(function() {
		alert("Erreur Serveur. Reessayer plus tard.");
	});
}
