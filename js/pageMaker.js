$( document ).ready(function() {
  
    
  var currentSect = 0;
  
  if (currentSect==0){
  	 $('#part1').css('display', 'block');
  	 currentSect++;
 }
 
 $('input').focus( function(evt) {
    if ( $(this).val().charAt(0) == '*')
        $( this ).val("");
 });
 
 $('.colors').click( function(evt) {
		 var color = "#" + event.target.id;
		
		 $('#colorChoice').html( color );
		  $('#colorChoice').css( 'color', color );
		 $('#primColor').css('background-color', color);
		 
		 
   });
  
  
  $('.next').click( function(evt) {
  			evt.preventDefault(); 
  			readForm(currentSect);
   });
  
  
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
  
function setFirst () {
    
    if ($('#title').val().length > 0 && $('#logoFile').val().length > 0)
    {
        document.title = $('#title').val();
        var logoName = $('#logoFile').val().substring(12, $('#logoFile').val().length);
        $('#logo').html('<img src="images/' + logoName + '"/>');
        $('#logo img').css({'height':'80px', 'width':'auto'});
        $('h3').css('color', $('#primColor').val() );
        nextForm();
    }
    else
        errorCall(1);
}

function setSecond () {

    if ( $('#bkg1').val().length > 0 && $('#heading1').val().length > 0)
    {
        $('#sectOne').css('background-image', 'url("images/' + $('#bkg1').val().substring(12, $('#bkg1').val().length) + '")' );
        $('#headerText').html( $('#heading1').val() );
        nextForm();
    }
    else
        errorCall(2);
}

function setThird () {
    if ($('#aboutText').val().length > 0)
    {
        setTwoColumn( $('#aboutText').val() );
        nextForm();
    }
    else
        errorCall(3);
}

function setFourth () {

    if ($('#bkg2').val().length > 0 && $('#heading2').val().length > 0 && $('#addText').val().length > 0)
    {
        $('#sectThree').css('background-image', 'url("images/' + $('#bkg2').val().substring(12, $('#bkg2').val().length) + '")' );
        $('#heading2').html( $('#heading2').val() );
        $('#addInfo').html( $('#addText').val() );
        nextForm();
    }
    else
        errorCall(4);
}

function setLast () {
    
    if ($('#busAddress').val().length > 0 && $('#busZip').val().length > 0 && $('#state').val().length > 0)
    {
        $('body').css('background', '#ffffff none');
        getMap($('#busAddress').val(), $('#busZip').val());
        $('#siteName').html( $('#title').val() );
        nextForm();
    }
    else
        errorCall(5);
}



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

function setTwoColumn (text) {
    var splitPoint = text.length / 2;
    var whsp = /\s/;
    
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

/*****************************
This pretty much came straight out of the lecture code, but I'm at least using the data differently
*****************************/
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
                        
                        var mapCanvas = document.getElementById('map-canvas');
                        var mapOptions = {
                            center: new google.maps.LatLng( lat, lon ),
                            zoom: 10,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        }
                        var map = new google.maps.Map(mapCanvas, mapOptions);
                        
                        
                 }
            }

            $('#compAddress').html( add + ", " + $('#state').val() + ", " + zip);
}

function errorCall ( n ) {
    $('#error'+n).html("&nbsp;All fields required&nbsp;");
}


//  if (window.localStorage.getItem("data")) {
//    
//    }
//  else
    
});