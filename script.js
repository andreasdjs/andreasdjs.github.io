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


/*
function shoppingBag (item, price) {
	this.item = item;
	this.price = price;
	function this.getSum()
}

myShoppingBag = new shoppingBag();

*/
/*
var shoppingBag = function(input) {
	var sum = input;
	var returnSum = function() {
		console.log(sum);
	};
};
shoppingBag(200);
shoppingBag.returnSum();
*/

/* Shopping bag object storing sum and items */

var shoppingBag = new Object();
shoppingBag.sum = 0;
shoppingBag.numberOfItems = 0;
shoppingBag.price = [];
/*shoppingBag.itemAndPrice = [[],[]]; */
shoppingBag.productName = [];
shoppingBag.getSum = function() { 
	console.log("shoppingBag.getSum: " + shoppingBag.sum); 
		return shoppingBag.sum;
};

console.log(shoppingBag.price); /* check items */
console.log(shoppingBag.productName); /* check items */



	$(".buyButton").click(function (){
		var productName = $(this).parent().parent().find("h3").text(); /* vad heter produkten? */
		console.log(productName);
		var storePrice = $(this).find(".price").text(); /* save text inside element as string */
		var storePriceInt = parseInt(storePrice); /* convert string to int */
		sum += storePriceInt; /* add to sum */
//		console.log(storePrice); /* sum as string */
		console.log(storePriceInt); /* sum converted to int */
		console.log(sum); /* Shoppingbag sum */
		shoppingBag.sum = sum; /* set sum */ 
		shoppingBag.getSum(); /* */

		$(".shoppingBag").addClass("itemsToCheckout");
		itemCounter += 1;
		var itemCounterString = itemCounter.toString();
		$(".counter").text("(" + itemCounter + ")");
		shoppingBag.numberOfItems = itemCounter; /* Store itemCounter in object */

		shoppingBag.price.push(storePriceInt); /* Store item price in array */
		shoppingBag.productName.push(productName);
		console.log("Added to shoppingbag\n" + productName + "\nPrice: " + storePrice + " kr");

		/* shoppingBag.items.push(storePriceInt); */
		/* Store item price to array */

/*		$(this).find("itemsToCheckout").animate({'color': '#ffffff'}, 'normal'); */
/*		    var animateIt = $(".itemsToCheckout");
		    animateIt.animate({fontSize: '17px'}, 30);
 		    animateIt.animate({fontSize: '16px'}, 80); */
 		console.log("animate it?");

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

		console.log("loop index");
		for(var i in shoppingBag.price) {
     		 console.log("Loopindexprice:" + shoppingBag.price[i]);
		}

		$("article").remove();
		$("#innerContainer").html("<article class='mainArticleShoppingBag'><h1>Your shopping bag</h1></article>");

		for(var i in shoppingBag.price) {
/*     		 console.log("Loopindexprice:" + shoppingBag.price[i]); */
    		$("article").append("<p>" + shoppingBag.productName[i] + " " + shoppingBag.price[i] + " kr</p>");

		}

		$("article").append("<p>Number of items: " + shoppingBag.numberOfItems + "</p>");
/*		$("article").append("<p>Total: 1234 kr</p>") */
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

