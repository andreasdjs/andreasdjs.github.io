$(document).ready(function(){
	var signup = 0;
	$(".signup").click(function (event){
		if (signup === 0) {
			event.preventDefault();
			$(".submit").before("<input type='username' placeholder='Username'/>");
			signup = 1;
			$(".signup").addClass("selected");
			$(".signin").removeClass("selected");
		}
	});
});