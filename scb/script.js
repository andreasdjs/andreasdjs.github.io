
// Load the Visualization API with bar package
google.load('visualization', '1', {packages: ['corechart', 'bar']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(function() {

   // Check if document is loaded
   $(document).ready(function() {

      // First letter capitalized
      function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
      }

      // Draw chart function
      function drawBars(columns, data) {

         var row1 = parseInt(data[0].values);  // String to int
         var row2 = parseInt(data[1].values);  // String to int

         var columnOne = capitalizeFirstLetter(columns[0].text);  // Set name of column
         //   var title = capitalizeFirstLetter(columns[2].text + " - " + columns[1].text);

         var data = new google.visualization.DataTable();
         data.addColumn('string', columnOne);
         data.addColumn('number', 'Antal');
         data.addRows([
               ['Lägenheter', row1],
               ['Radhus', row2] 
         ]);
         var options = {
            bars: 'vertical'
         };
         var bars = new google.charts.Bar(document.getElementById('chart_div'));
         bars.draw(data, options);  // Draw bar chart
      }    

      // AJAX progress 
      // https://api.jquery.com/Ajax_Events/ 

      $(document).ajaxStart(function() {
         console.log("Loading...")
         $("button").prop("disabled",true);
      });
      $(document).ajaxStop(function() {
         console.log("Finished!")
         $("button").prop("disabled",false);
      });


      /* ----------------------------- befolkning ----------------------------- */

    $("html").on("click", ".befolkningJSON", function(event) {

         // Set JSON Object
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

      // Call SCB with .ajax

      $.ajax({
           url:"http://api.scb.se/OV0104/v1/doris/sv/ssd/BE/BE0101/BE0101A/BefolkningNy",
            type: "POST",
            data: JSON.stringify(jsonObj),    // Make JSON like a string    
            dataType: "json",                 // Use JSON
            success: function(obj){           // Recieve JSON object from SCB    
            console.log(obj);
              },
          error: function() {
               console.log("error");
           }
        
         }); //end $.ajax

    });

      /* ----------------------------- Lägenheter ----------------------------- */

      // Get list of all measurements

      $.get( "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/BO/BO0101/BO0101A/LagenhetNyKv/", function( data ) {
         console.log("GET DATA:");
         console.log(data.variables[3].values);  // Get kvartal
         console.log("---------");
/*         
         $("select").append("<option value='2010K3'>2010K3</option>");
         $("select").append("<option value='2011K3'>2011K3</option>");
         $("select").append("<option value='2012K3'>2012K3</option>");
         $("select").append("<option value='2013K3'>2013K3</option>");
         $("select").append("<option value='2014K3'>2014K3</option>");
         $("select").append("<option value='2015K3' selected>2015K3</option>");
*/
         var arr = data.variables[3].values;
         $.each(arr, function(i, val){
            console.log(i);
            console.log(val);
            $("select").prepend("<option value='" + val + "'>" + val + "</option>");
         });


      }, "json" );


      // Get 2015 K3 for whole sweden

      $("html").on("click", ".custom", function(event) {
         event.preventDefault();

         // get selected value
         console.log($( "select" ).val()); // 2015K3

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
//                   "2015K3"
                   $( "select" ).val() // set year and quarter
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
            success: function(obj){   //Ta emot JSON objektet från SCB   
                  console.log(obj);
      //            console.log(obj.data[0].values[0]);
      //            console.log(obj.data[1].values[0]);
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
                     // DataArray
                     // var dataArray = [obj.data[0].values[0], obj.data[1].values[0]]

            //  var title = capitalizeFirstLetter(obj.columns[2].text + " - " + obj.columns[1].text);

            // Get Chart title and set capital letter
            var title = capitalizeFirstLetter(obj.columns[2].text);

            // Set title in HTML
            $("article > h5").html(title);

            // Call the draw bars function with fetched data.
            drawBars(obj.columns, obj.data); 
           },
            error: function(obj) {
              console.log("error");
              console.log(obj);
            }
           
         }); //end $.ajax

      });

   /*
   http://www.statistikdatabasen.scb.se/pxweb/sv/ssd/?rxid=758f4ced-0396-4e48-8bea-4edf0fc321d2
   Nya undersökningar:
   http://www.scb.se/sv_/Hitta-statistik/Statistikdatabasen/Senast-publicerade-tabeller/
   */

   });
});

