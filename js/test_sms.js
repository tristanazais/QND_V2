         $(document).ready(function() {
         
			 //leave empty for sending sms using default intent
             $("#btnDefaultSMS").click(function(){
             
             	var number = $("#numberTxt").val();
             	var message = $("#messageTxt").val();
	            SmsPlugin.prototype.send(number, message, '',
				    function () { 
				       alert('Message sent successfully');  
				    },
				    function (e) {
				        alert('Message Failed:' + e);
				    }
				);               
             }); 
         });