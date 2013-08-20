// var lat, lng;

function getCurrentPosition() {
	var position = {
		coords: {
			latitude: lat,
			longitude: lng
		}
	};

	successPosition(position);
}

function successPosition(position) {
	lat = position.coords.latitude;
	lng = position.coords.longitude;
	var currentTime = new Date().getTime();
	myStorage.set("lastGeo", currentTime);
	drawMap();
}


function drawMap() {
	
	var latlng = new google.maps.LatLng(lat, lng);
	var myOptions = {
		zoom: 13,
		center: latlng,
		mapTypeControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	
	google.maps.event.trigger(map, 'resize');

	findPlaces();
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

function parseMap(data, store)
{
	if (data.meta.code == 200) {
		
		if (store) {
			console.log("Detected that you want to store!");
			
			myStorage.set("foursquareVenues", data);
			
			console.log("Venue Data is stored!");

			var currentTime = new Date().getTime();
			
			console.log("Storing:" + currentTime);

			myStorage.set("lastVenuePull", currentTime);
			
			console.log("Timestamp is stored!");
		}
		
		var venues = data.response;
	
		$(venues.groups).each(function(i, group_items) {

			$(group_items.items).each(function(q, venue_items) {

				var venue_name = venue_items.venue_name;

				var latlng = new google.maps.LatLng(venue_items.location.lat, venue_items.location.lng);

				var marker = new google.maps.Marker({
						position: latlng,
						map: map,
				});
					
				if (venue_items.categories.length === 0) {
					venue_image = "http://foursquare.com/img/categories/none_32.png";
				}
				else {

					$(venue_items.categories).each(function(o, cats) {
						if (cats.primary) {
							venue_image = cats.icon;
							return false;
						}
					});
				}

				if (venue_items.location.address && venue_items.location.city) {
					venue_info_city = '<div style="font-size: 12px;">'+venue_items.location.address+'</div><div style="font-size: 12px;">'+venue_items.location.city+", "+venue_items.location.state+"</div>";
				}
				else {
					venue_info_city = "";
				}

				var html = "<span class='venue_image' style='float: left; margin-right: 10px;'><img src='"+venue_image+"'></span><div>"+venue_items.name+"</div>"+venue_info_city;

					google.maps.event.addListener(marker, 'click', function() {

					getInfoWindowEvent(marker, html);

				   });

			});
		});
		
		google.maps.event.trigger(map, 'resize');
	}
}
