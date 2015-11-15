$(document).ready(function(){

	/* -- Focus all but IE < 11 because placeholder text won't be visible otherwise	*/

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

	var signinSignupSwitch = new Object(); // Object to store state
	signinSignupSwitch.signup = 0;


	$("body").on("click", ".signup", function (event){
//	$(".signup").click(function (event){
		if (signinSignupSwitch.signup === 0) {
			event.preventDefault();
			// Add inputfield
			$("input:first-of-type").before("<input type='name' placeholder='Firstname and lastname' required>");
			// Remove Signin button
			$(".signin").remove();
			// Add new switch-button
			$(".signup").after("<button class='signin'>or <span class='switchLoginMethod'>Sign-In</span></button>");
			// Set switch button class
			$(".signup").addClass("selected button");
			// Switch button text
			$(".signup").html("Sign-Up");
			$("input[type='name']").focus(); /* Focus Firstname and lastname */ 
			signinSignupSwitch.signup = 1;
			// If IE or IE11, defocus all input fields
	        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
				$("body").blur();
	        }
		}
	});

	$("body").on("click", ".signin", function (event){
		if (signinSignupSwitch.signup === 1) {
			event.preventDefault();
			signinSignupSwitch.signup = 0;
			// Remove inputfield
			$("input[type='name']").remove();
			// Remove Signup-button
			$(".signup").remove();
			// Add new switch-button
			$(".signin").after("<button class='signup'>or <span class='switchLoginMethod'>Sign-Up</span></button>");
			// Set switch button class
			$(".signin").addClass("selected button");
			// Switch button text
			$(".signin").html("Sign-In");
			$("input[type='email']").focus(); /* focus Firstname and lastname */ 
			signinSignupSwitch.signup = 0;
			// If IE or IE11, defocus all input fields
	        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
				$("body").blur();
	        }			
		}
	});

	/* */

	var itemCounter = 0;
	var storePriceInt = 0;

	/* Shopping bag object storing sum and items */

	var shoppingBag = new Object();
	shoppingBag.sum = 0;
	shoppingBag.numberOfItems = 0;
	shoppingBag.price = [];
	shoppingBag.productName = [];
	shoppingBag.getSum = function() { 
		console.log("shoppingBag.getSum: " + shoppingBag.sum); 
			return shoppingBag.sum;
	};

	$(".buyButton").click(function (){
		var productName = $(this).parent().parent().find("h3").text(); /* vad heter produkten? */
		console.log(productName);
		var storePrice = $(this).find(".price").text(); /* save text inside element as string */
		var storePriceInt = parseInt(storePrice); /* convert string to int */
		shoppingBag.sum += storePriceInt; /* add to sum */

/*		sum += storePriceInt; *//* add to sum */
/*		shoppingBag.sum = sum; *//* set sum */ 

		$(".shoppingBag").addClass("itemsToCheckout");
		itemCounter += 1;
		var itemCounterString = itemCounter.toString();
		$(".counter").text("(" + itemCounter + ")");
		shoppingBag.numberOfItems = itemCounter; /* Store itemCounter in object */

		shoppingBag.price.push(storePriceInt); /* Store item price in array */
		shoppingBag.productName.push(productName);
		console.log("Added to shoppingbag\n" + productName + "\nPrice: " + storePrice + " kr");
	});

	/* -- Show shopping bag-- */

	$(".shoppingBag").click(function (event){
		event.preventDefault();		

		console.log("loop index");
		for(var i in shoppingBag.price) {
     		 console.log("Loopindexprice:" + shoppingBag.price[i]);
		}

		$("article").remove(); // clean page
		$("#innerContainer").html("<article class='mainArticleShoppingBag'><h1>Your shopping bag</h1></article>");
		
		for(var i in shoppingBag.price) {
    		$("article").append("<tr><td>" + shoppingBag.productName[i] + "</td><td>" + shoppingBag.price[i] + " kr</td></tr>");
		}
		
		$("tr").wrapAll("<table></table>");

		$("article").append("<p>Number of items: " + shoppingBag.numberOfItems + "</p>");
		$("article").append("<p><strong>Total</strong>: " + shoppingBag.getSum() + " kr </p>")
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

	/* Thank you for your purchase! Using .on() and class
	   as parameter to select the modified DOM element.   */

	$("body").on("click", ".checkout", function() {
		console.log("click click checkout");
		$("article").remove();
		$("#innerContainer").html("<article class='mainArticleShoppingBag'><h1>Thank you for choosing to buy from Melon-Citron.</h1><p>Your order is now being processed.</p></article>");		
		/* Hide shoppingBag items */
		$(".counter").text("");
		$(".shoppingBag").removeClass("itemsToCheckout");
	});

});

