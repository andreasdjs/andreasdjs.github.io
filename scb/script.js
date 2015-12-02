
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
//         console.log("Loading...")
         $("button").prop("disabled",true);
      });
      $(document).ajaxStop(function() {
//         console.log("Finished!")
         $("button").prop("disabled",false);
      });

      /* ----------------------------- Lägenheter ----------------------------- */

      // Get list of all measurements conducted

      $.get( "http://api.scb.se/OV0104/v1/doris/sv/ssd/START/BO/BO0101/BO0101A/LagenhetNyKv/", function( data ) {
         var arr = data.variables[3].values;
         $.each(arr, function(i, val){
            var year = val.slice(0,4);
            var k = val.slice(4);

            // Put it in the drowdown menu
            $("select").prepend("<option value='" + val + "'>" + year + " " + k + "</option>");
         });
      }, "json" );

      // Get latest measurement for throughout Sweden

      $("html").on("click", ".custom", function(event) {
         event.preventDefault();

         // JSON obj to send with POST request

         var jsonObj = {
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
                   $( "select" ).val() // get selected value
                 ]
               }
             }
           ],
           "response": {
             "format": "json"
           }
         }

         // POST JSON to server. Output title and send selected data to Draw Charts function.

         $.ajax({
            url:"http://api.scb.se/OV0104/v1/doris/sv/ssd/START/BO/BO0101/BO0101A/LagenhetNyKv/",
            type: "POST",
            data: JSON.stringify(jsonObj),  //skapa en textsträng av vår JSON-formaterad fråga     
            dataType: "json",
            success: function(obj){   //Ta emot JSON objektet från SCB   

            // Get Chart title and set capital letter
            var title = capitalizeFirstLetter(obj.columns[2].text);

            // Set title in HTML
            $("article > h5").html(title);

            // Call the draw bars function with fetched data.
            drawBars(obj.columns, obj.data); 
           },
            error: function(obj) {
              console.log("Error.");
              console.log(obj);
            }
           
         }); 

      });

   /*
   Hela databasen:
   http://www.statistikdatabasen.scb.se/pxweb/sv/ssd/?rxid=758f4ced-0396-4e48-8bea-4edf0fc321d2
   Nya undersökningar:
   http://www.scb.se/sv_/Hitta-statistik/Statistikdatabasen/Senast-publicerade-tabeller/
   */

   });
});

