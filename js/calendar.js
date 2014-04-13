var array_calendar=[];

var yy;
var calendarArray=[];
var monthOffset = [6,7,8,9,10,11,0,1,2,3,4,5];
var monthArray = [["JAN","Janvier"],["FEV","Fevrier"],["MAR","Mars"],["AVR","Avril"],["MAI","Mai"],["JUN","Jully"],["JUL","Juillet"],["AOU","Aout"],["SEP","Septembre"],["OCT","Octobre"],["NOV","Novembre"],["DEC","Decembre"]];
var dayArray = ["7","1","2","3","4","5","6"];
var dayName =["L","M","M","J","V","S","D"];
$(document).ready(function() {
	$(document).on('click','.c-day.have-events',activateDay);
	// $(document).on('click','.c-day',addDay);
	$(document).on('click','.specific-day',activatecalendar);
	$(document).on('click','.c-month-arrow',offsetcalendar);
	$(window).resize(calendarScale);
	calendarSet();
	calendarScale();
});
(function ( $ ) {
    $.fn.calendar = function(array, options) {
    	$this = this;
		$this.append('<div class="c-month-view"><div class="c-month-arrow" data-dir="left">‹</div><p></p><div class="c-month-arrow" data-dir="right">›</div></div><div class="c-holder"><div class="c-grid"></div><div class="c-specific"><div class="specific-day"><div class="specific-day-info" i="day"></div><div class="specific-day-info" i="month"></div></div><div class="s-scheme"></div></div></div>');
		$this.addClass('calendar');
		var defaults = {
			color: "red",
			showdays: true
		};

		var opt = $.extend({}, defaults,options);
		$this.data("color",opt.color);
		$this.data("showdays",opt.showdays);
		if(array !== undefined) {
			$.each(array, function(date,events) {
					var tempeventarray = [];
					tempeventarray["name"] = events.name;
					tempeventarray["start"] = events.start;
					tempeventarray["end"] = events.end;
					tempeventarray["location"] = events.location;
					tempeventarray["date"] = events.date;
					if(calendarArray[events.date] == undefined) {
						calendarArray[events.date] = [tempeventarray];
					} else {
						calendarArray[events.date].push(tempeventarray);
					}
			});
		}
		calendarSetMonth($this);
        return this;
    }; 
}( jQuery ));


	function calendarScale() {
		$(".calendar").each(function() {
			if($(this).width() < 400 && !$(this).hasClass('small')) {
				$(this).addClass('small');
			} else if($(this).width() > 400 && $(this).hasClass('small')) {
				$(this).removeClass('small');
			}
		})
	}

	function offsetcalendar() {
		var par = $(this).parents('.calendar'); 
		var cm = parseInt(par.attr('offset'));
		if($(this).data('dir') == "left") {
			calendarSetMonth(par,cm-1);
		} else if($(this).data('dir') == "right") {
			calendarSetMonth(par,cm+1);
		}

		re_init_color();
	}

	function orderBy(deli,array) {
		var p = array.slice();
		var o = p.length;
		var y,t;
		var temparray = [];
		for(var u=0; u<o;u++) {
			for(var uu=0;uu<p.length;uu++) {
				if(uu==0) {
					t = uu;
					y = p[uu];
				}
				else if(parseInt(p[uu][deli].replace('.','')) < parseInt(y[deli].replace('.',''))) {
					y = p[uu];
					t = uu;
				}
			}
			temparray.push(y);
			p.splice(t,1);
		}
		return temparray;
	}

	function calendarSet() {
		$(".calendar").append('<div class="c-month-view"><div class="c-month-arrow" data-dir="left">‹</div><p></p><div class="c-month-arrow" data-dir="right">›</div></div><div class="c-holder"><div class="c-grid"></div><div class="c-specific"><div class="specific-day"><div class="specific-day-info" i="day"></div><div class="specific-day-info" i="month"></div></div><div class="s-scheme"></div></div></div>');
		$(".calendar").each(function() {
		var defaults = {
			color: "red",
			showdays: true
		};
			var opt = $.extend({}, defaults, $(this).data());
			$(this).data('color',opt.color);
			$(this).data('showdays', opt.showdays);
			$(this).find('[data-role=day]').each(function() {
				var tday = $(this).data('day');
				$(this).find('[data-role=event]').each(function() {
					var tempeventarray = [];
					tempeventarray["name"] = $(this).data("name");
					tempeventarray["start"] = $(this).data("start");
					tempeventarray["end"] = $(this).data("end");
					tempeventarray["location"] = $(this).data("location");
					tempeventarray["date"] = tday;
					if(calendarArray[tday] == undefined) {
						calendarArray[tday] = [tempeventarray];
					} else {
						calendarArray[tday].push(tempeventarray);
					}
				}); 
			});
			calendarSetMonth($(this));
		});
		$(".calendar [data-role=day]").remove();
	}
	function activateDay() {
		$(this).parents('.calendar').addClass('spec-day');
		var di = new Date(parseInt($(this).attr('time')));
		var strtime = $(this).attr('strtime');
		var d = new Object();
		d.day = di.getDate();
		d.month = di.getMonth();
		d.events = calendarArray[strtime];
		d.tocalendar = tocalendar;
		d.tocalendar();
	}
	function addDay(elem) {
		 var mois_jour = $(elem).attr('strtime').substr(4, 4);

		 $('.c-day').css('background-color','#28AE61');
		 $('.have-events').css('backgroundColor','#FA6C8E');

		 $.each($('.have-events'), function(index, val) {
			 	for(rdv in array_calendar)
				{
			 		if(array_calendar[rdv].date_rdv==$(this).attr('strtime') && array_calendar[rdv].confirmation=="1")
			 		{
			 			$(this).css('backgroundColor','blue');
			 		}
			 		if(array_calendar[rdv].date_rdv==$(this).attr('strtime') && array_calendar[rdv].confirmation=="0")
			 		{
			 			$(this).css('backgroundColor','#D6D600');
			 		}
			 		if(array_calendar[rdv].date_rdv==$(this).attr('strtime') && array_calendar[rdv].confirmation=="-1")
			 		{
			 			$(this).css('backgroundColor','#FA6C8E');
			 		}
			 	}
			 });
		 $('.this-day').css('background','none repeat scroll 0 0 rgba(0, 0, 0, 0)');
		 $(elem).css('background-color','#2A2A2A');

		 var mon_jour = mois_jour.substr(2, 2);
		 $("#jour").text(mon_jour);
		 var mon_mois = convert_string_mont(mois_jour.substr(0, 2));
		 $("#mois").text(mon_mois);
	}
	var tocalendar = function() {
		$(".specific-day-info[i=day]").html(this.day);
		$(".specific-day-info[i=month]").html(monthArray[this.month][0]);
		if(this.events !== undefined) {
		var ev = orderBy('start',this.events);
		for(var o = 0; o<ev.length;o++) {
			if(sessionStorage['calendar_medecin']=='0')
			{
				if(ev[o]['confirme']=='1')
				{
					var html_confirme_patient='<span style="color:blue;">Confirmé</span>';
				}
				else if(ev[o]['confirme']=='-1')
				{
					var html_confirme_patient='<span style="color:red;">Annulé</span>';
				}
				else if(ev[o]['confirme']=='0')
				{
					var html_confirme_patient='<span style="color:yellow;">En attente de confirmation du médecin</span>';
				}
				$(".s-scheme").append('<div class="s-event"><h1 style="margin-bottom:10px;">Motif : '+ev[o]['name']+'</h1><p data-role="dur"  style="margin-bottom:10px;">'+ev[o]['start']+' - '+ev[o]['end']+'</p><p data-role="loc">Lieu : '+ev[o]['location']+'</p><p data-role="loc">Medecin : '+ev[o]['medecin']+'</p><p style="margin-top:10px; data-role="loc">'+html_confirme_patient+'</p></div>');
			}
			else
			{
				var temp=ev[o]['date']+ev[o]['name'];
				if(ev[o]['confirme']=='1' || sessionStorage[temp]=="1")
				{
					var html_confirme='<span style="color:blue;">Confirmé</span>';
				}
				else if(ev[o]['confirme']=='-1' || sessionStorage[temp]=="-1")
				{
					var html_confirme='<span style="color:red;">Annulé</span>';
				}
				else if(ev[o]['confirme']=='0' && sessionStorage['user_medecin_connect']=="1")
				{
					var html_confirme='Confirmer le RDV ? <input style="padding:0;display:inline;margin-left:20px;" class="ui-btn ui-input-btn ui-corner-all ui-shadow" type="button" onclick="RDV_OK_ou_Annule(this,\''+ev[o]['date']+'\',\''+ev[o]["name"]+'\',\''+ev[o]['start']+'\',\'1\');" value="Oui" id="rdv_ok"/><input style="padding:0;display:inline;margin-left:20px;" class="ui-btn ui-input-btn ui-corner-all ui-shadow" type="button" onclick="RDV_OK_ou_Annule(this,\''+ev[o]['date']+'\',\''+ev[o]["name"]+'\',\''+ev[o]['start']+'\',\'-1\');" value="Non" id="rdv_annule"/>';
				}
				else if(ev[o]['confirme']=='0' && sessionStorage['user_medecin_connect']=="0")
				{
					var html_confirme='<span style="color:yellow;">En attente de confirmation du médecin</span>';
				}

				$(".s-scheme").append('<div class="s-event"><h1 style="margin-bottom:10px;">Motif : '+ev[o]['name']+'</h1><p data-role="dur"  style="margin-bottom:10px;">'+ev[o]['start']+'</p><p data-role="dur">'+html_confirme+'</p></div>'); 
			}
			}
		}
	}
	function activatecalendar() {
		$(this).parents('.calendar').removeClass('spec-day').find('.s-scheme').html('');
	}
	function calendarSetMonth(ele,offset) {
		ele.find(".c-grid").html('');
		var d = new Date();
		var c = new Date();
		var e = new Date();
		var p = d;
		if(offset !== undefined) {
			d = monthChange(p,offset);
			e = monthChange(p,offset);
			ele.attr('offset', offset);
		} else {
			ele.attr('offset', 0);
		}
		ele.find(".c-month-view p").text(monthArray[d.getMonth()][1]+' '+d.getFullYear());
			d.setDate(1);
			if(dayArray[d.getDay()] == 1) {
				d.setDate(d.getDate()-7);
			} else {
				d.setDate(d.getDate()-dayArray[d.getDay()]+1);
			}
			var crow;
			if(ele.data('showdays')) {
				ele.find('.c-grid').append('<div class="c-row"><div class="c-day c-l"><div class="date-holder">'+dayName[0]+'</div></div><div class="c-day c-l"><div class="date-holder">'+dayName[1]+'</div></div><div class="c-day c-l"><div class="date-holder">'+dayName[2]+'</div></div><div class="c-day c-l"><div class="date-holder">'+dayName[3]+'</div></div><div class="c-day c-l"><div class="date-holder">'+dayName[4]+'</div></div><div class="c-day c-l"><div class="date-holder">'+dayName[5]+'</div></div><div class="c-day c-l"><div class="date-holder">'+dayName[6]+'</div></div></div>');
			}
			for(var i=0;i<42;i++) {
				if(i==0 || i==7 || i==14 || i==21 || i==28 || i==35) {
					crow = $('<div class="c-row"></div>');
					ele.find('.c-holder .c-grid').append(crow);
				}
				d.setDate(d.getDate()+i);
				var cal_day = $('<div class="c-day"><div class="date-holder">'+d.getDate()+'</div></div>');
				if(d.getMonth() !== e.getMonth()) {
					cal_day.addClass('other-month');
				}
				if(d.getTime() == c.getTime()) {
					cal_day.addClass('this-day');
				}
				var strtime = dToString(d);
				if(calendarArray[strtime] !== undefined) {
					cal_day.addClass('have-events');
				}
				var cal_day_eventholder = $('<div class="event-n-holder"></div>');
				if(calendarArray[strtime] != undefined) {
					for(var u=0;u<3 && u<calendarArray[strtime].length;u++) {
						cal_day_eventholder.append('<div class="event-n"></div>')
					}
				}
				cal_day.attr('strtime',strtime);
				cal_day.attr('time',d.getTime());
				cal_day.prepend(cal_day_eventholder);

				crow.append(cal_day);
				d.setDate(d.getDate()-i);
			}
	}
	function dToString(d) {
		var y = d.getFullYear();
		var m = d.getMonth()+1;
		var da = d.getDate();
		if(m.toString().length<2) m = "0"+m;
		if(da.toString().length<2) da = "0"+da;
		return y+''+m+''+da;
	}
	function monthChange(d,o) {
		var dim = [31,28,31,30,31,30,31,31,30,31,30,31];
		var day = d.getDate();
		var month = o !== undefined ? d.getMonth()+o : d.getMonth();
		var year = d.getFullYear();
		var hours = d.getHours();
		var minutes = d.getMinutes();
		var seconds = d.getSeconds();
		while(month>11) {
			month= month-12;
			year++;
		}
		while(month<0) {
			month= month+12;
			year--;
		}
		if(dim[month] < day) {
			day = dim[month];
		}
		return new Date(year,month,day,hours,minutes,seconds);
	}

	
	function convert_string_mont(the_month)
	{
		switch(the_month)
		{
			case '01':
			the_month="Jan";
			break;
			case '02':
			the_month="Fev";
			break;
			case '03':
			the_month="Mar";
			break;
			case '04':
			the_month="Avr";
			break;
			case '05':
			the_month="Mai";
			break;
			case '06':
			the_month="Juin";
			break;
			case '07':
			the_month="Juil";
			break;
			case '08':
			the_month="Aou";
			break;
			case '09':
			the_month="Sep";
			break;
			case '10':
			the_month="Oct";
			break;
			case '11':
			the_month="Nov";
			break;
			case '12':
			the_month="Dec";
			break;
		}
		return the_month;
	}

	

	/*************************************** CALENDRIER GERER POUR PATIENT SEULEMENT (localstorage) ******************/

	function addRdv()
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

		var heure_fin = document.getElementById('horaire_fin'); 
		var valeurfin = heure_fin.options[heure_fin.selectedIndex].value;
		
		var new_rdvarray = [
		  {
		    date: new_date,
		    name: $("#motif").val(),
		    start: valeurdebut,
		    end: valeurfin,
		    location: $("#lieu").val(),
		    medecin: $("#medecin").val(),
		    confirme: '1'
		  }
		];

		var array_color_storage={
				    date_rdv: new_date,
					motif: $("#motif").val(),
				    horaire_debut: valeurdebut,
				    confirmation: '1'
				  	};
		array_calendar[array_calendar.length]=array_color_storage;

////////// SAUVEGARDE EN LOCAL STORAGE DE L'AJOUT //////////////////////////////
		if(localStorage["calendar_data"])
		{
			var deparse_tab = JSON.parse(localStorage["calendar_data"]);

			var last_id;
			for (nbre in deparse_tab){
				last_id=parseInt(nbre)+1;
			}
			deparse_tab[last_id]=new_rdvarray;
			
			localStorage.setItem("calendar_data", JSON.stringify(deparse_tab));
		}
		else
		{
			var first_rdv = {};
			first_rdv[0]=new_rdvarray;
			localStorage.setItem("calendar_data", JSON.stringify(first_rdv));
		}

		if(new_rdvarray != '') {
			$.each(new_rdvarray, function(date,events) {
					var tempeventarray = [];
					tempeventarray["name"] = events.name;
					tempeventarray["start"] = events.start;
					tempeventarray["end"] = events.end;
					tempeventarray["location"] = events.location;
					tempeventarray["medecin"] = events.medecin;
					tempeventarray["date"] = events.date;
					tempeventarray["confirme"] = events.confirme;
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

	function add_new_calendar()
	{
			calendarSet();
			calendarScale();

			if(localStorage["calendar_data"])
			{
				var deparse_tab = JSON.parse(localStorage["calendar_data"]);
				var array = deparse_tab;
				var array_color_storage;
				for(i in array)
				{
					array_color_storage={
					    date_rdv: array[i][0].date,
						motif: array[i][0].name,
					    horaire_debut: array[i][0].start,
					    confirmation: array[i][0].confirme
				  	};
					array_calendar[i]=array_color_storage;
				}
			}
			else
			{
				var array = '';
				array_calendar=[];
			}
		
		if(array != '') 
		  {
			for(current_date in array)
			{
				$.each(array[current_date] , function(date,events) {
						var tempeventarray = [];
						tempeventarray["name"] = events.name;		
						tempeventarray["start"] = events.start;		
						tempeventarray["end"] = events.end;		
						tempeventarray["location"] = events.location;		
						tempeventarray["medecin"] = events.medecin;		
						tempeventarray["date"] = events.date;		
						tempeventarray["confirme"] = events.confirme;		
						if(calendarArray[events.date] == undefined) {
							calendarArray[events.date] = [tempeventarray];
						} else {
							calendarArray[events.date].push(tempeventarray);
						}
				});
			}
		 }

		 calendarSetMonth($('.calendar'));
		 
		 re_init_color();

	}

	/*************************************** CALENDRIER GERER POUR PATIENT REGARDANT MEDECIN ******************/

	function demande_rdv(id_medecin, adresse_med, nom_med)
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
		    start: valeurdebut,
		    end: '',
		    location: adresse_med,
		    medecin: nom_med,
		    confirme: '0'
		  }
		];

////////// SAUVEGARDE EN AJAX EN BDD //////////////////////////////
		$.ajax({
		url: 'http://www.vivactis-multimedia.fr/test_ajax/enregistrer_rdv_medecin.php',
		type: 'POST',
		dataType: 'text',
		data: {id_med:id_medecin, date_rdv:new_rdvarray[0].date, horaire_debut:new_rdvarray[0].start,motif:new_rdvarray[0].name, confirmation:'0'},
		})
		.success(function(data,textStatus,jqXHR) {
			if(data=='0')
			  	alert('Veuillez saisir un motif');
			else
				alert('Votre demande a bien été prise en compte. En attendant une confirmation du médecin');

			////////// SAUVEGARDE EN LOCAL STORAGE DE L'AJOUT //////////////////////////////
			if(localStorage["calendar_data"])
			{
				var deparse_tab = JSON.parse(localStorage["calendar_data"]);

				var last_id;
				for (nbre in deparse_tab){
					last_id=parseInt(nbre)+1;
				}
				deparse_tab[last_id]=new_rdvarray;
				
				localStorage.setItem("calendar_data", JSON.stringify(deparse_tab));
			}
			else
			{
				var first_rdv = {};
				first_rdv[0]=new_rdvarray;
				localStorage.setItem("calendar_data", JSON.stringify(first_rdv));
			}
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
					tempeventarray["confirme"] = '0';
					if(calendarArray[events.date] == undefined) {
						calendarArray[events.date] = [tempeventarray];
					} else {
						calendarArray[events.date].push(tempeventarray);
					}
			});
		 }
		 calendarSetMonth($('.calendar'));

		 var a_new_rdvarray = {
				    date_rdv: new_date,
					motif: $("#motif").val(),
				    horaire_debut: valeurdebut,
				    confirmation: '0'
				  };
		array_calendar[array_calendar.length]=a_new_rdvarray;

		 re_init_color();
	}



	function add_calendar_this_medecin(id_medecin)
	{

		$.ajax({
		url: 'http://www.vivactis-multimedia.fr/test_ajax/calendar_medecin_info.php',
		type: 'POST',
		dataType: 'json',
		data: {id_med:id_medecin},
		})
		.success(function(data,textStatus,jqXHR) {
			// console.log(data);

			var rdv_du_medecin = {};
			var next_rdvarray;
			for(rdv in data)
			{
				if(rdv==0)
					$('#content_calendar').prev().children('h1').html('Calendrier du Médecin : <br>'+data[rdv].nom_med+' '+data[rdv].prenom_med+'');
				next_rdvarray = [
				  {
				    date: data[rdv].date_rdv,
				    name: data[rdv].motif,
				    start: data[rdv].horaire_debut,
				    confirme: data[rdv].confirmation
				  }
				];
				rdv_du_medecin[rdv]=next_rdvarray;
			}

			calendarSet();
			calendarScale();

			var array = rdv_du_medecin;
			array_calendar = data;
			
			if(array != '' )
				// && sessionStorage["calendrier"]=='0'
			{
				for(current_date in array)
				{	
					$.each(array[current_date] , function(date,events) {
							var tempeventarray = [];
							tempeventarray["name"] = events.name;		
							tempeventarray["start"] = events.start;			
							tempeventarray["date"] = events.date;		
							tempeventarray["confirme"] = events.confirme;		
							if(calendarArray[events.date] == undefined) {
								calendarArray[events.date] = [tempeventarray];
							} else {
								calendarArray[events.date].push(tempeventarray);
							}
					});
				}
			 }
			 // sessionStorage["calendrier"]='1';
			 calendarSetMonth($('.calendar'));
			 
			 re_init_color();


		})
		.fail(function() {
			alert("Erreur Serveur. Reessayer plus tard.");
		});
	}


/********************** Re-initialise le calendrier *****************************/

	function kill_calendar(page)
	{
		$('.have-events').removeClass('have-events').children('.event-n-holder').html('');
		document.location.href = page+'.html';
	}


/*********************** MEDECIN PART - CONFIRMER OU NON LE RDV ********************************/

	function RDV_OK_ou_Annule(elem,date,motif,horaire,result)
	{
		var a_new_rdvarray = {
				    date_rdv: date,
					motif: motif,
				    horaire_debut: horaire,
				    confirmation: result
				  };
		array_calendar[array_calendar.length]=a_new_rdvarray;

		if(localStorage["calendar_data"])
		{
			var deparse_tab = JSON.parse(localStorage["calendar_data"]);
			var array_temp=deparse_tab;

			for (nbre in array_temp){
				if(array_temp[nbre][0].date==date && array_temp[nbre][0].name==motif && array_temp[nbre][0].start==horaire)
					array_temp[nbre][0].confirme=result;
				// console.log(array_temp);
			}
			
			localStorage.setItem("calendar_data", JSON.stringify(array_temp));
		}


		if(result=="1")			// Confirme le rdv
		{
			$(elem).parent().html('<span style="color:blue;">Confirmé</span>');
			sessionStorage[date+motif]="1";

			$.each($('.have-events'), function(index, val) {
				if($(this).attr('strtime')==date)
			 		$(this).css('backgroundColor','blue').addClass('have-events');
			});
		}
		else if(result=="-1")				// Annuler le rdv
		{
			$(elem).parent().html('<span style="color:red;">Annulé</span>');
			sessionStorage[date+motif]="-1";

			$.each($('.have-events'), function(index, val) {
				if($(this).attr('strtime')==date)
			 		$(this).css('backgroundColor','#FA6C8E').addClass('have-events');
			});
		}
		re_init_color();	
		$.ajax({
		url: 'http://www.vivactis-multimedia.fr/test_ajax/confirmer_rdv_medecin_part.php',
		type: 'POST',
		dataType: 'text',
		data: {id_medecin:sessionStorage["id_medecin"],date:date,motif:motif,horaire:horaire,confirme:result},
		})
		.success(function(data,textStatus,jqXHR) {
			if(data!="1")
				alert("Probleme de syncronisation. Reessayer plus tard.");
		})
		.fail(function() {
			alert("Erreur Serveur. Reessayer plus tard.");
		});
		
	}


	/******************************** FONCTION RE-INIT COLOR BLOCK CALENDAR REPEAT *******************************/

	function re_init_color()
	{
		 $('.c-day').css('ZIndex', '8000');
		 $('.c-day').click(function(event) {
		 	addDay($(this));
		 });
		 $('.have-events').css('backgroundColor','#FA6C8E');
		 
		 var cpt;
		 var blue;
		 var yellow;
		 var red;
		 $.each($('.have-events'), function(index, val) {
		 cpt=0;
		 blue=false;
		 yellow=false;
		 red=false;
			 	for(rdv in array_calendar)
				{
			 		if(array_calendar[rdv].date_rdv==$(this).attr('strtime') && array_calendar[rdv].confirmation=="1")
			 		{
			 			$(this).css('backgroundColor','blue');cpt++;blue=true;
			 		}
			 		if(array_calendar[rdv].date_rdv==$(this).attr('strtime') && array_calendar[rdv].confirmation=="0")
			 		{
			 			$(this).css('backgroundColor','#D6D600');cpt++;yellow=true;
			 		}
			 		if(array_calendar[rdv].date_rdv==$(this).attr('strtime') && array_calendar[rdv].confirmation=="-1")
			 		{
			 			$(this).css('backgroundColor','#FA6C8E');cpt++;red=true;
			 		}
			 	}
			 	if(cpt>1)
			 	{
			 		if(red)$(this).css('backgroundColor','#FA6C8E');
			 		if(blue)$(this).css('backgroundColor','blue');
			 		if(yellow)$(this).css('backgroundColor','#D6D600');
			 	}
		});
	}