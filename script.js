$(document).ready(function(){

/* -- Focus all but IE < 11 because placeholder won't be visible otherwise	*/
	function defocusInputForIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE "); 
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, do nothing.
         	var x = 0; /* dummy code*/
        else 
        	$("input[type='email']").focus(); // Focus input field email
	   return false;
	}
	defocusInputForIE();

/* -- Switch Sign-in / Sign-up for usability-- */	

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


/* -- Launch full screen advertisment box (make sure Ad-block is switched off) --*/

	$(".innerContainerStore").one("click", function(){
		setTimeout(function(){
			$(".advertisment").slideDown(); 
			$(".advertisment").delay(3000).fadeOut();
		}, 1500);
		console.log("did it fire?");
	});

});

