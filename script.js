$(document).ready(function(){
	var signup = 0;
	$(".signup").click(function (event){
		if (signup === 0) {
			event.preventDefault();
//			$(".signin").before("<input type='name' placeholder='Firstname and lastname'>");
			$("input:first-of-type").before("<input type='name' placeholder='Firstname and lastname'>");

/*
			$(".submit").fadeIn().before("<input type='username' placeholder='Username'/>").prev().hide().fadeIn("fast");
		*/
			signup = 1;
			$(".signin").remove();
			$(".signup").after("<button class='signin'>Sign-In</button>");

			$(".signup").addClass("selected"); 
/*			$(".signin").removeClass("selected"); */
		}
	});
});



prev().hide().fadeIn(1000);