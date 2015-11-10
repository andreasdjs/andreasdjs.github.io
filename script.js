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

/* */

var itemCounter = 0;
var sum = 0;
var storePriceInt = 0;
/*
var itemCounterObject = function(){
	itemCounter =
}*/

function shoppingBag (item, price) {
	this.item = item;
	this.price = price;
}

myShoppingBag = new shoppingBag();



	$(".buyButton").click(function (){
		var storePrice = $(this).find(".price").text(); /* save text as string */
		var storePriceInt = parseInt(storePrice); /* convert string to int */
		sum += storePriceInt; /* sum */
		console.log(storePrice);
		console.log(storePriceInt);
		console.log(sum); /* Shoppingbag sum */
	
		$(".shoppingBag").addClass("itemsToCheckout");
		itemCounter += 1;
		var itemCounterString = itemCounter.toString();
		$(".counter").text("(" + itemCounter + ")");
/*		$(".counter").text("(1)"); */

/*		$(this).find("itemsToCheckout").animate({'color': '#ffffff'}, 'normal'); */
/*		    var animateIt = $(".itemsToCheckout");
		    animateIt.animate({fontSize: '17px'}, 30);
 		    animateIt.animate({fontSize: '16px'}, 80); */
 /*

      $( ".itemsToCheckOut" ).animate({
          backgroundColor: "#aa0000",
          color: "#fff"
        }, 1000 );*/
	});



/* -- Show shopping bag-- */
	$(".shoppingBag").click(function (event){
		event.preventDefault();		
/*		console.log("click click"); */
		$("article").remove();
		$("#innerContainer").html("<article class='mainArticleShoppingBag'><h1>Your shoppingbag</h1><p>Item 1</p><p>Item 2</p><p>Item 3</p></article>");
		$("article").append("<p>Item 4</p><p>Item 5</p><p>Item 6</p><p></p>");
		$("article").append("<p>Total: 1234 kr</p>")
		$("article").append("<button class='button checkout'>Check out</button>");

	});

/* -- Launch full screen advertisment box (make sure Ad-block is switched off) --*/

	$(".innerContainerStore").one("click", function(){
		setTimeout(function(){
			$(".advertisment").slideDown(); 
			$(".advertisment").delay(3000).fadeOut();
		}, 1500);
		console.log("did it fire?"); // Yes, it did fire, after disabling Ad-Block. 
	});

/* Thank you for your purchase! */
/* Using .on() and class as parameter to select the modified DOM element */

	$("body").on("click", ".checkout", function() {
		console.log("click click checkout");
		$("article").remove();
		$("#innerContainer").html("<article class='mainArticleShoppingBag'><h1>Thank you for choosing to buy from Melon-Citron.</h1><p>Your order is now being processed.</p></article>");		
		/* hide shoppingBag items */
		$(".counter").text("");
		$(".shoppingBag").removeClass("itemsToCheckout");
	});


});

