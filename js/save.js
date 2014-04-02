/************************** EXEMPLE LOCALSTORAGE FONCTIONS DE SAUVEGARDE DES DONNEES ************************************/
function final_save()
{
	
	var date = sessionStorage["date"];

		var result = { 
	        "traitement": sessionStorage["traitement"],
	        "repas": sessionStorage["repas"],
	        "size": 1,
	        "selles": {
	               "type": sessionStorage["type"],
	               "moment": sessionStorage["moment"]
	            },
	        "temps": sessionStorage["temps"],
	        "moyens": sessionStorage["moyens"],
	        "douleurs": sessionStorage["douleurs"],
	        "humeur": sessionStorage["humeur"]
	    };


	if(localStorage[date])
	{
		var change = JSON.parse(localStorage[date]);
		change.size = change.size +1;
		localStorage.setItem(date, JSON.stringify(change));	// Update de l'original (size corespond au nb de caca à cette date)

		localStorage.setItem(date+'_'+change.size , JSON.stringify(result)); // Creation du nouveau caca à la date choisi

		// console.log(JSON.parse(localStorage[date]));
		// console.log(change);
		// console.log(JSON.parse(localStorage[date+'_'+change.size]));
	}
	else
	{
		localStorage.setItem(date, JSON.stringify(result));
	}


	var retrievedObject = localStorage[date];
	// console.log(JSON.parse(retrievedObject));
}