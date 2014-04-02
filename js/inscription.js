function inscription()	{
				$.ajax({
					url: 'http://www.vivactis-multimedia.fr/test_ajax/inscription.php',
					type: 'POST',
					dataType: 'text',
					data: {
					nom: $('#nom').val(), 
					prenom: $('#prenom').val(),
					birth: $('#birth').val(),
					address: $('#address').val(),
					cp: $('#cp').val(),
					city: $('#city').val(),
					mail: $('#mail').val(),
					phone: $('#phone').val(),
					username: $('#username').val(),
					password: $('#password').val()					
					},
				})
				.success(function(data,textStatus,jqXHR) {
					if(data=='1')
						alert("Votre inscription a bien été prise en compte, vous pouvez maintenant vous connecter");
					else
						alert("Attention! assurez-vous de remplir tous les champs");
				})
				.fail(function() {
					alert("Erreur Serveur. Reessayer plus tard.");
				});
				return false;
}