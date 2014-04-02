      // $(function(){ lancer_gmap();  });


  function ajax_gmap()
  { 
        var tableau_icons='[';
        $.ajax({
                 type: "GET",
                 dataType:"json",
                 url: "http://www.vivactis-multimedia.fr/test_ajax/liste_medecin_gmap.php",
             })
        .success(function(data) {
          for(medecin in data){
            if(medecin!=0)
              tableau_icons+=",";
            tableau_icons+="{";
            tableau_icons+="\"address\":\""+data[medecin].adresse+", "+data[medecin].cp+" "+data[medecin].ville+"\",";
            tableau_icons+="\"data\":\""+data[medecin].nom_med+" "+data[medecin].prenom_med+"<br>"+data[medecin].adresse+", "+data[medecin].cp+" "+data[medecin].ville+"<br><a onclick=is_favoris("+data[medecin].id_med+");open_lien_medecin_liste("+data[medecin].id_med+");retour_geomap(); href=detail_perso.html>Acceder aux informations</a>\",";
            tableau_icons+="\"options\":{\"icon\": \"../img/marker_green.png\"}";
            tableau_icons+="}";
          }
          tableau_icons+=']';

          var array_icon = JSON.parse(tableau_icons);

          lancer_gmap(array_icon);
        })
        .fail(function() {
          alert("Erreur Serveur. Reessayer plus tard.");
        });
  }
  
  function lancer_gmap(array_icon)
  {     
        $("#test").gmap3({
		      map:{
            options:{
              zoom: 11
            }
          },
          marker:{
            values:array_icon,
            events:{
              click: function(marker, event, context){
                var map = $(this).gmap3("get"),
                  infowindow = $(this).gmap3({get:{name:"infowindow"}});
                if (infowindow){
                  infowindow.open(map, marker);
                  infowindow.setContent(context.data);
                } else {
                  $(this).gmap3({
                    infowindow:{
                      anchor:marker, 
                      options:{content: context.data}
                    }
                  });
                }
              }
            }
          }
        });
  
        $('#test-ok').click(function(){
          var addr = $('#test-address').val();
          if ( !addr || !addr.length ) return;

          $("#test").gmap3({
            getlatlng:{
              address:  addr,
              callback: function(results){
                if ( !results ) return;
                $(this).gmap3({
                  marker:{
         			          latLng:results[0].geometry.location,
                				},                 
                				map:{
                				  options: {
                					center: results[0].geometry.location, 
                					zoom: 14
                				  }
                				},
                				 infowindow:{
                				  options:{
                					size: new google.maps.Size(50,50),
                					content: addr
                				  },
                				  events:{
                					closeclick: function(infowindow){
                            // alert(infowindow.getContent());
                					}
                				  }
                				}
                });
              }
            }
          });
        });
        
        $('#test-address').keypress(function(e){
          if (e.keyCode == 13){
            $('#test-ok').click();
          }
        });

  } 
      

// });