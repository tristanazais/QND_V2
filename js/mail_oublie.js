function mail_mot_de_passe()
{
	$.ajax({
					url: 'http://www.vivactis-multimedia.fr/test_ajax/mail_oublie.php',
					type: 'POST',
					dataType: 'text',
					data: {mdp: $("#mail").val()},
				})
				.success(function(data,textStatus,jqXHR) {
					if(data=='0')
						$('#erreur_mop').text('L\'adresse rentrez n\'est pas valide');
					else
						$('#erreur_mop').text('Un email a été envoyé à l\'adresse saisie');
				})
				.fail(function() {
					alert("Erreur Serveur. Reessayer plus tard.");
				});
				return false;
}