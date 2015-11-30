// Load the Visualization API with bar package
google.load('visualization', '1', {packages: ['corechart', 'bar']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(function() {

// Check if document is loaded
$(document).ready(function() {

// first letter capitalized
/*String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}*/

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

console.log(capitalizeFirstLetter("text"));

// Draw chart function
function drawBars(test, columns, data) {
console.log("columns: " + capitalizeFirstLetter(columns[0].text));
console.log("columns: " + capitalizeFirstLetter(columns[1].text));

console.log(parseInt(data[0].values));
console.log(parseInt(data[1].values));

var row1 = parseInt(data[0].values);
var row2 = parseInt(data[1].values);

console.log("row 1: " + row1);
console.log("row 2: " + row2);

var columnOne = capitalizeFirstLetter(columns[0].text);
var title = capitalizeFirstLetter(columns[2].text + " - " + columns[1].text);

var data = new google.visualization.DataTable();
data.addColumn('string', columnOne);
data.addColumn('number', 'Antal');
data.addRows([
        ['Lägenheter', row1],
        ['Radhus', row2] 
/*        ['Lägenheter', parseInt(test[0])],
        ['Radhus', parseInt(test[1])] */
/*        ['Lägenheter', parseInt(data[0].values)],
        ['Radhus', parseInt(data[1].values)] */
/*        ['Olives', 1], 
        ['Zucchini', 1],
        ['Pepperoni', 2]*/
      ]);
//console.log(test[0]);
/*
var data = google.visualization.arrayToDataTable([
         ['Hustyp', 'Antal', { role: 'style' }],
         ['Lägenhet', test[0], '#b87333'],
         ['Radhus', test[1], 'silver'],            
         ['Gold', 1000, 'gold'],
         ['Platinum', test[3], 'color: #e5e4e2' ], 
      ]); */
      var options = {
 /* moving out from SVG to HTML/CSS
        chart: {
          title: title
        },   */
/*        hAxis: {
          title: 'Total Population',
          minValue: 0,
        },
        vAxis: {
          title: 'City'
        }, */
        bars: 'vertical'
//        bars: 'horizontal'
      };
      var bars = new google.charts.Bar(document.getElementById('chart_div'));

//var chart = new google.visualization.PieChart(document.getElementById('chart_div'));


//var chart = new google.visualization.PieChart(document.getElementById('piechart'));

//      var material = new google.charts.Bar(document.getElementById('chart_div'));

      bars.draw(data, options);
//chart.draw(data, options);

  }    


  $(document).ajaxStart(function() {
    console.log("loading... loading...")
    $("button").prop("disabled",true);
  });
  $(document).ajaxStop(function() {
    console.log("finished!")
    $("button").prop("disabled",false);
  });




// https://api.jquery.com/Ajax_Events/ 
/* ----------------------------- befolkning ----------------------------- */

	$("html").on("click", ".befolkningJSON", function(event) {

		var jsonObj = 
		{   
		"query": [
		 {       
		 "code": "ContentsCode",
		  "selection": {         
		    "filter": "item",         
		    "values": [           
		      "BE0101N1"         
		    ]       
		   }     
		},    
		{       
		  "code": "Tid",
		   "selection": {         
		   "filter": "item",         
		   "values": [           
		   "2010",           
		   "2011"         
		   ]       
		  }     
		 }    
		],   
		"response": {     
		  "format": "json"   
		 } 
		}

    $.ajax({
        url:"http://api.scb.se/OV0104/v1/doris/sv/ssd/BE/BE0101/BE0101A/BefolkningNy",
    	  	type: "POST",
    	  	data: JSON.stringify(jsonObj),  //skapa en textsträng av vår JSON-formaterad fråga 	  
    	  	dataType: "json",
    	  	success: function(obj){		//Ta emot JSON objektet från SCB 	 
      	 		console.log(obj);
 	      	},
      	    error: function() {
            	console.log("error");
    	    }
     
      }); //end $.ajax

	});

/* ----------------------------- befolkning ----------------------------- */


	$("html").on("click", ".custom", function(event) {

var jsonObj2 = {
  "query": [
    {
      "code": "Region",
      "selection": {
        "filter": "vs:RegionRiket99",
        "values": []
      }
    },
    {
      "code": "Hustyp",
      "selection": {
        "filter": "item",
        "values": [
          "FLERBO",
          "SMÅHUS"
        ]
      }
    },
    {
      "code": "ContentsCode",
      "selection": {
        "filter": "item",
        "values": [
          "BO0101A4"
        ]
      }
    },
    {
      "code": "Tid",
      "selection": {
        "filter": "item",
        "values": [
          "2015K3"
        ]
      }
    }
  ],
  "response": {
    "format": "json"
  }
}

    $.ajax({
        url:"http://api.scb.se/OV0104/v1/doris/sv/ssd/START/BO/BO0101/BO0101A/LagenhetNyKv/",
    	  	type: "POST",
    	  	data: JSON.stringify(jsonObj2),  //skapa en textsträng av vår JSON-formaterad fråga 	  
    	  	dataType: "json",
    	  	success: function(obj){		//Ta emot JSON objektet från SCB 	 
      	 		console.log(obj);
//      	 		console.log(obj.data[0].values[0]);
//      	 		console.log(obj.data[1].values[0]);
                console.log(obj.columns[0].text);
                console.log(obj.columns[1].text);
                console.log(obj.columns[2].text);
/*
      	 		var result = "<h1>Data:</h1>";
      	 		result += "<p>" + obj.data[0].values[0] + "</p>";
      	 		result += "<p>" + obj.data[1].values[0] + "</p>";
      	 		$("#content article").html(result); */

/*                var dataArray = [obj.data[0].values[0], obj.data[1].values[0]]
                drawMaterial(dataArray, obj.columns); 
*/
                var dataArray = [obj.data[0].values[0], obj.data[1].values[0]]


  var title = capitalizeFirstLetter(obj.columns[2].text + " - " + obj.columns[1].text);
      console.log("this is title: " + title);

  $("article > h3").html(title);
                drawBars(dataArray, obj.columns, obj.data); 

 	      	},
      	    error: function(obj) {
            	console.log("error");
            	console.log(obj);
    	    }
     
      }); //end $.ajax


	});

/* -----------------------------            ----------------------------- */
/*
google.load('visualization', '1', {packages: ['corechart', 'bar']});
google.setOnLoadCallback(drawMaterial);

function drawMaterial() {
      var data = google.visualization.arrayToDataTable([
        ['City', '2010 Population', '2000 Population'],
        ['New York City, NY', 8175000, 8008000],
        ['Los Angeles, CA', 3792000, 3694000],
        ['Chicago, IL', 2695000, 2896000],
        ['Houston, TX', 2099000, 1953000],
        ['Philadelphia, PA', 1526000, 1517000]
      ]);

      var options = {
        chart: {
          title: 'Population of Largest U.S. Cities'
        },
        hAxis: {
          title: 'Total Population',
          minValue: 0,
        },
        vAxis: {
          title: 'City'
        },
        bars: 'horizontal'
      };
      var material = new google.charts.Bar(document.getElementById('chart_div'));
      material.draw(data, options);
    }
*/


/*
http://www.statistikdatabasen.scb.se/pxweb/sv/ssd/?rxid=758f4ced-0396-4e48-8bea-4edf0fc321d2

http://www.scb.se/sv_/Hitta-statistik/Statistikdatabasen/Senast-publicerade-tabeller/

*/
console.log("jQuery loaded");
//console.log(data);

});

/*
google.load('visualization', '1', {packages: ['corechart', 'bar']}); 
google.setOnLoadCallback(drawMaterial);  
*/
/*
google.load('visualization', '1', {packages: ['corechart', 'bar']});
function drawMaterial() {
*/

console.log("Googleloaded");
//console.log(data);

/*
google.load('visualization', '1', {packages: ['corechart', 'bar']});
google.setOnLoadCallback(drawMaterial);
*/

/*
function drawMaterial() {

var data = google.visualization.arrayToDataTable([
         ['Element', 'Density', { role: 'style' }],
         ['Copper', 8.94, '#b87333'],            // RGB value
         ['Silver', 10.49, 'silver'],            // English color name
         ['Gold', 19.30, 'gold'],
         ['Platinum', 21.45, 'color: #e5e4e2' ], // CSS-style declaration
      ]);
      var options = {
        chart: {
          title: 'Population of Largest U.S. Cities'
        },
        hAxis: {
          title: 'Total Population',
          minValue: 0,
        },
        vAxis: {
          title: 'City'
        },
        bars: 'vertical'
      };
      var material = new google.charts.Bar(document.getElementById('chart_div'));
      material.draw(data, options);
    } 
*/
//console.log(data);

});

