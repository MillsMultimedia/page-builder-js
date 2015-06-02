$( document ).ready(function() {
  
  var pageData = {
        current: "",
        title: "",
        logo: "",
        mainColor: "",
        header: "",
        headerBkg: "",
        about: "",
        subhead: "",
        subtext: "",
        subBkg: "",
        address: "",
        zip: "",
        }

  var currentSect = 0;
  
  
 // check for local storage, if set go directly to finished page
  if (window.localStorage.getItem("data")) {
    var output = JSON.parse( window.localStorage.getItem("data") );
    setPage(output);
   }

  
  if (currentSect==0){
  	 $('#part1').css('display', 'block');
  	 currentSect++;
 }
 
 //click handler for color selection 
 $('.colors').click( function(evt) {
		 var color = "#" + evt.target.id;
		
		 $('#colorChoice').html( color );
		  $('#colorChoice').css( 'color', color );
		 $('#primColor').css('background-color', color);
   });
  
  //click handler for next buttons
  $('.next').click( function(evt) {
  			evt.preventDefault(); 
  			readForm(currentSect);
   });
   
   //click handler for back buttons
   $('.back').click( function(evt) {
  			evt.preventDefault(); 
  			currentSection = currentSection - 2;
  			nextForm();
   });
  
//switch for which form to display  
function readForm( current ) {
 	
 	switch (current)
 	{
 		case 1:
 			setFirst();
 			break;
 		case 2:
 		    setSecond();
 		    break;
 		case 3:
 		    setThird();
 		    break;
 		case 4:
 		    setFourth();
 		    break;
 		case 5:
 		    setLast();
 		    break;
 		default:
 		    break;
 	}
 	 	
}

$('#reset').click( function () {
    var sure = confirm("are you sure you want to reset the page?");
    if (sure)
    {
        localStorage.clear();
        location.reload();   
    }
    
});

//sets the information from the 1st form
function setFirst () {

    if ($('#title').val().length > 0 && $('#logoFile').val().length > 0)
    {
        pageData['title'] = $('#title').val();
        var logoName = $('#logoFile').val();
        alert($('#logoFile').val());
        pageData['logo'] = logoName;
        pageData['mainColor'] = $('#primColor').val();
        nextForm();
    }
    else
        errorCall(1);
}

//sets the information for the 2nd form
function setSecond () {

    if ( $('#bkg1').val().length > 0 && $('#heading1').val().length > 0)
    {
        pageData['headerBkg'] = 'url("images/' + $('#bkg1').val();
        pageData['header'] = $('#heading1').val();
        nextForm();
    }
    else
        errorCall(1);
}

//sets the information from the 3rd form
function setThird () {
    if ($('#aboutText').val().length > 0)
    {
        pageData['about'] = $('#aboutText').val();
        nextForm();
    }
    else
        errorCall(3);
}

//sets the information from the 4th form
function setFourth () {
    if ($('#bkg2').val().length > 0 && $('#heading2').val().length > 0 && $('#addText').val().length > 0)
    {
        pageData['subBkg'] = 'url("images/' + $('#bkg2').val();
        pageData['subhead'] = $('#heading2').val();
        pageData['subtext'] = $('#addText').val();
        nextForm();
    }
    else
        errorCall(4);
}

////sets the information from the final form, saves the data and calls the page builder
function setLast () {
    if ($('#busAddress').val().length > 0 && $('#busZip').val().length > 0 && $('#state').val().length > 0)
    {
    pageData['address'] = $('#busAddress').val();
    pageData['zip'] = $('#busZip').val();
    saveData();
    setPage(pageData);
  
    }
    else
        errorCall(5);
}

//save to local storage
function saveData () {
    var jsonInput = JSON.stringify(pageData);
    
    window.localStorage.setItem("data", jsonInput); 
}

//toggles the display of all the forms as needed
function nextForm () {
    var sectName = '#part' + currentSect;
  			$(sectName).css('display', 'none');
			if(currentSect == 5)
				$('#sitePage').slideToggle(); //css('display', 'block');
			else {
  			currentSect++;
  			sectName = '#part' + currentSect;
             $(sectName).slideToggle(); //css('display', 'block');
            }
}

//takes the text input, finds the midpoint and splits the text into two columns at the first previous whitespace
function setTwoColumn (text) {
    var splitPoint = text.length / 2;
    var whsp = /\s/; //any whitespace
    
    while (!whsp.test(text.charAt(splitPoint)) && splitPoint != 0)
    {
        splitPoint--;
    }
    
    if (splitPoint == 0)
        $('#col1').html( '<p>no value</p>');
    else
    {
        var col1 = text.substring(0, splitPoint);
        var col2 = text.substring(splitPoint, text.length);
    
        $('#col1').html( '<p>' + col1 + '</p>');
        $('#col2').html( '<p>' + col2 + '</p>');
    }
}

//This pretty much came straight out of the lecture code, but I'm at least using the data differently
function getMap(add, zip){

            var lat = "";
            var lon = "";

            // make an send an XmlHttpRequest
            var x = new XMLHttpRequest();
            x.open("GET","http://maps.googleapis.com/maps/api/geocode/json?address=" + add + zip, true);
            x.send();

            // set up a listener for the response
            x.onreadystatechange=function()
            {
                if (this.readyState==4 && this.status==200){
                    //alert(this.response);
                    var l = JSON.parse(this.response).results[0].geometry.location;
                        lat = l.lat;
                        lon = l.lng;
                        
                        //use the response to set latitude and longitude of map center
                        var mapCanvas = document.getElementById('map-canvas');
                        var mapOptions = {
                            center: new google.maps.LatLng( lat, lon ),
                            zoom: 10,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        }
                        var map = new google.maps.Map(mapCanvas, mapOptions);
                        
                        
                 }
            }
            
            //sets the address text at the bottom
            var addr = add + ", " + $('#state').val() + ", " + zip;
            $('#compAddress').html( addr );
            pageData['address'] = addr;
            
}

//builds the page from the stored data
function setPage ( data ) {
    document.title = data.title;
    $('#logo').html('<img src="images/' + data.logo + '"/>');
    $('h3').css('color', data.mainColor);
    $('#sectOne').css('background-image', data.headerBkg);
    $('#headerText').html( data.header );
    setTwoColumn( data.about );
    $('#sectThree').css('background-image', data.subBkg);
    $('#heading2').html( data.subhead );
    $('#addInfo').html( data.subText );
    $('body').css('background', '#ffffff none');
    getMap( data.address, data.zip );
    currentSect = 5;
    nextForm();
}


    
}); //end document ready