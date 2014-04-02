/************** FONCTION AU CLICK SUR L'ETOILE POUR AJOUTER AU FAVORIS (jaune, blanc) ************************/

function change_fav(img, id_medecin) 
{

	if($(img).hasClass("blanc") )
	{
		if(localStorage['favoris'])
		{
			var mes_favoris = JSON.parse(localStorage['favoris']);
			mes_favoris[id_medecin] = { "name": $('#content_detail_perso').children('label:first').text(),"adresse1": $('#content_detail_perso').children('label:nth-child(6)').text(),"adresse2": $('#content_detail_perso').children('label:nth-child(7)').text() ,"email":$('#content_detail_perso').children('label:nth-child(9)').text() , "tel": $('#content_detail_perso').children('label:nth-child(4)').text(), "type_med":$('#content_detail_perso').children('label:nth-child(2)').text() };
		}
		else
		{
			var mes_favoris={};
			mes_favoris[id_medecin] = { "name": $('#content_detail_perso').children('label:first').text(),"adresse1": $('#content_detail_perso').children('label:nth-child(6)').text(),"adresse2": $('#content_detail_perso').children('label:nth-child(7)').text() ,"email":$('#content_detail_perso').children('label:nth-child(9)').text() , "tel": $('#content_detail_perso').children('label:nth-child(4)').text(), "type_med":$('#content_detail_perso').children('label:nth-child(2)').text() };
		}
		
		
		$(img).attr("src", "../img/etoile.png").removeClass("blanc").addClass("jaune"); 
	}
	else 
	{	
		var mes_favoris = JSON.parse(localStorage['favoris']);
		delete mes_favoris[id_medecin];

		$(img).attr("src", "../img/etoile2.png").removeClass("jaune").addClass("blanc");
	}
	localStorage.setItem('favoris', JSON.stringify(mes_favoris));
	if(localStorage['favoris']=='{}')
		localStorage.clear();

	
}

/************** FONCTION AU CLICK SUR UN ELEMENT DANS LA LISTE DE TOUS LES MEDECINS (Est-il favoris ?) ************************/

function is_favoris(id_medecin)
{
	setTimeout(function() {
		$('#fav_etoile').attr('onclick','change_fav(this,\''+id_medecin+'\');');

		if(localStorage['favoris'])
		{
			var mes_favoris = JSON.parse(localStorage['favoris']);
			var is_a_favori=false;
			for (medecin in mes_favoris)
			{
				if(medecin==id_medecin){
					is_a_favori=true;
				}
				if(is_a_favori)
					$('#fav_etoile').attr("src", "../img/etoile.png").addClass("jaune");
				else
					$('#fav_etoile').attr("src", "../img/etoile2.png").addClass("blanc");
			}
		}
		else
		{
			$('#fav_etoile').attr("src", "../img/etoile2.png").addClass("blanc");
		}

		$("#retour a").attr('href','choix_perso_liste.html');

	}, 200);
}

/************** FONCTION AU CLICK SUR UN ELEMENT DANS LA LISTE DE TOUS LES MEDECINS (Affichage du medecin detail) ********/

function open_lien_medecin_liste(id_medecin)
{
	setTimeout(function() {

		$.ajax({
			url: 'http://www.vivactis-multimedia.fr/test_ajax/detail_medecin.php',
			type: 'POST',
			dataType: 'text',
			data: {id_med: id_medecin},
		})
		.success(function(data,textStatus,jqXHR) {
			var result = JSON.parse(data);
			console.log(result[0].nom_med);
			var html='<label>'+result[0].nom_med+' '+result[0].prenom_med+'</label>';
			html+='<label>'+result[0].type_med+'</label>';
			html+='<label style="color:#A1BF78;font-weight: bold;" class="space_label"> Telephone :  </label>';
			html+='<label><a href="tel:'+result[0].tel_med+'" >'+result[0].tel_med+'</a></label>';
			html+='<label style="color:#A1BF78;font-weight: bold;" class="space_label">Adresse : </label><label>'+result[0].adresse+' </label><label>'+result[0].cp+' '+result[0].ville+'</label>';
			html+='<label style="color:#A1BF78;font-weight: bold;" class="space_label">email : </label><label>'+result[0].email+'</label>';
			html+='<a class="space_label ui-btn ui-input-btn ui-corner-all ui-shadow" data-role="button" href="calendar_medecin.html" onclick="init_medecin_calendar('+result[0].id_med+',\''+result[0].adresse+' '+result[0].cp+' '+result[0].ville+'\', \''+result[0].nom_med+' '+result[0].prenom_med+'\');" id="button_calendar_info">Voir les disponibilités de ce médecin</a>';
			$('#content_detail_perso').prepend(html);
		})
		.fail(function() {
			alert("Erreur Serveur. Reessayer plus tard.");
		});

	}, 200);
}

/************* FONCTION POUR ACCEDER AU CALENDRIER DU MEDECIN SELECTIONNE ************************************/

function init_medecin_calendar(id_medecin, adresse_med, nom_med)
{
	sessionStorage['calendar_medecin']='1';

	setTimeout(function() {

		add_calendar_this_medecin(id_medecin);

		 $("#demande_rdv_button").attr('onclick','demande_rdv('+id_medecin+', \''+adresse_med+'\', \''+nom_med+'\');');

		$("#retour a").attr('href','#').attr('onclick','kill_calendar("menu");');

	}, 200);
}

/************** FONCTION AU CLICK D'UN ELEMENT DANS LA PAGE favoris.html ************************/

function open_favoris(id_medecin)
{
	setTimeout(function() {
		$('#fav_etoile').attr('onclick','change_fav(this,\''+id_medecin+'\');');

		if(localStorage['favoris'])
		{
			var mes_favoris = JSON.parse(localStorage['favoris']);
			var is_a_favori=false;
			for (medecin in mes_favoris)
			{
				if(medecin==id_medecin){
					is_a_favori=true;
				}
				if(is_a_favori)
					$('#fav_etoile').attr("src", "../img/etoile.png").addClass("jaune");
				else
					$('#fav_etoile').attr("src", "../img/etoile2.png").addClass("blanc");
			}
		}
		else
		{
			$('#fav_etoile').attr("src", "../img/etoile2.png").addClass("blanc");
		}
		// console.log(mes_favoris[id_medecin]);
		var html='<label>'+mes_favoris[id_medecin].name+'</label>';
			html+='<label>'+mes_favoris[id_medecin].type_med+'</label>';
			html+='<label style="color:#A1BF78;font-weight: bold;" class="space_label"> Telephone :  </label>';
			html+='<label><a href="tel:'+mes_favoris[id_medecin].tel+'" >'+mes_favoris[id_medecin].tel+'</a></label>';
			html+='<label style="color:#A1BF78;font-weight: bold;" class="space_label">Adresse : </label><label>'+mes_favoris[id_medecin].adresse1+' </label><label>'+mes_favoris[id_medecin].adresse2+'</label>';
			html+='<label style="color:#A1BF78;font-weight: bold;" class="space_label">email : </label><label>'+mes_favoris[id_medecin].email+'</label>';
			html+='<a class="space_label ui-btn ui-input-btn ui-corner-all ui-shadow" data-role="button" href="calendar_medecin.html" onclick="init_medecin_calendar('+id_medecin+',\''+mes_favoris[id_medecin].adresse1+' '+mes_favoris[id_medecin].adresse2+'\', \''+mes_favoris[id_medecin].name+'\');" id="button_calendar_info">Voir les disponibilités de ce médecin</a>';
			$('#content_detail_perso').prepend(html);

		$("#retour a").attr('href','favoris.html').attr('onclick','setTimeout(function(){init_favoris();},200);');

	}, 200);
}

/************** INITIALISATION PAGE favoris.html AJOUT DES LIENS EN LOCALSTORAGE ************************/

function init_favoris()
{
	if(localStorage['favoris'])
	{
		var mes_favoris = JSON.parse(localStorage['favoris']);
		var html='<ul class="ui-listview" data-role="listview"><li class="ui-first-child">';
		for (medecin in mes_favoris)
		{
			html += '<a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="detail_perso.html" data-transition="pop" onclick="open_favoris('+medecin+');">'+mes_favoris[medecin].name+'</a>';
			html += '</li><li>';
		}
		html += '</li></ul>';

		$("#content_liste_medecin").append(html);
	}
	else
		$("#content_liste_medecin").append('<div>Vous n\'avez aucun favoris</div>');

	// $("#retour a").attr('href','menu.html');

}

/********************** BOUTON RETOUR POUR GEOMAP (lien medecin) *****************************/

function retour_geomap()
{
	setTimeout(function() {
		$("#retour a").attr('href','geomap.html').attr('onclick','setTimeout(function(){ajax_gmap();},200);');
	}, 400);
}



