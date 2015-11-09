$(document).ready(function(){

/* -- Focus all but IE < 11*/
function msieversion() {

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
         /*   alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)))); */
        else { 
        	$("input[type='email']").focus(); 
           	alert('otherbrowser'); 
		}

   return false;
}

	msieversion();

	

	var signup = 0;
	$(".signup").click(function (event){
		if (signup === 0) {
			event.preventDefault();
//			$(".signin").before("<input type='name' placeholder='Firstname and lastname'>");
			$("input:first-of-type").before("<input type='name' placeholder='Firstname and lastname' required>");

/*
			$(".submit").fadeIn().before("<input type='username' placeholder='Username'/>").prev().hide().fadeIn("fast");
		*/
			signup = 1;
			$(".signin").remove();
			$(".signup").after("<button class='signin'>or <span class='switchLoginMethod'>Sign-In</span></button>");

			$(".signup").addClass("selected button");
			$(".signup").html("Sign-Up");
			
			$("input[type='name']").focus(); /* focus Firstname and lastname */ 

/*			$(".signin").removeClass("selected"); */
		}
	});

	$(".signin").click(function (event){
		if (signup === 1) {
			event.preventDefault();
//			$(".signin").before("<input type='name' placeholder='Firstname and lastname'>");
//			$("input:first-of-type").before("<input type='name' placeholder='Firstname and lastname'>");

/*
			$(".submit").fadeIn().before("<input type='username' placeholder='Username'/>").prev().hide().fadeIn("fast");
		*/
			signup = 1;
			$(".signin").remove();
			$(".signup").after("<button class='signin'>Sign-In</button>");

			$(".signup").addClass("selected button"); 
/*			$(".signin").removeClass("selected"); */
		}
	});


	/* Oh no! Commersial break. */
	$(".innerContainerStore").one("click", function(){
		setTimeout(function(e){
			$(".advertisment").slideDown(); 
			$(".advertisment").delay(3000).fadeOut();
		}, 1500);
	});


});

