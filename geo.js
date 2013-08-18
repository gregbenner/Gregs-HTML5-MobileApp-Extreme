var lat, lng;

function successPosition(position) {
	lat = position.coords.latitude;
	lng = position.coords.longitude;

	 findPlaces();

	var latlng = new google.maps.LatLng(lat, lng);
	var myOptions = {
	    zoom: 13,
	    center: latlng,
	    mapTypeControl: false,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	

	map = new google.maps.Map(document.getElementById("map"), myOptions);

	// Adding the Maker
	var marker = new google.maps.Marker({
	        position: latlng, 
	        map: map,
	});
	google.maps.event.addListener(marker, 'click', function() {
		getInfoWindowEvent(marker, 'Home Sweet Home!');
	});

	findPlaces();

	google.maps.event.trigger(map, 'resize');

}

function errorPosition(error) {
	switch(error.code) {
		case 0:
			message = "Something went wrong " + error.message;
			break;
		case 1:
			message = "You denided permission to this page to retrive a location " + error.message;
			break;
		case 2:
			message = "The browser was unable to determine a location " + error.message;
			break;
		case 3:
			message = "The browser timed out " + error.message;
			break;
	} 
	alert(message);
}

function getInfoWindowEvent(marker,text) {
	infowindow.close();
	infowindow.setContent(text);
	infowindow.open(map, marker);
}

function refreshLocation() {
	navigator.geolocation.getCurrentPosition(successPosition, errorPosition);
}
