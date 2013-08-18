var CLIENT_ID = "3BJE0V1DM0A1TTEGANID4EQVLQARVC2JS25QHINTMN0WZIRH",
	CLIENT_SECRET = "AJPPFE5JPOPN1O4QI1GZFBXUTKUDZVJFJG5QGSEP2EA1XRFG";

 Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
  };

d = new Date();
var yyyymmdd = d.yyyymmdd();



function findPlaces() {
	$.getJSON("https://api.foursquare.com/v2/venues/search?&ll=" + lat + "," + lng + "&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&query=wine store&limit=25&v=" + yyyymmdd,
		function(data) {
			console.log(data);
			if(data.meta.code === 200) {
				$.each(data.response.venues, function(i, venues) {
						var venue_name = venues.name,
							latlng = new google.maps.LatLng(venues.location.lat, venues.location.lng);
							marker = new google.maps.Marker({
								position: latlng,
								map: map
							});



							if (venues.categories.length === 0) {
								venue_image = "http://foursquare.com/img/categories/none_64.png"
							}
							else {

								venue_image = venues.categories[0].icon.prefix + '32.png';
								console.log(venue_image);
								// $(venues.categories).each(function(o, cats) {
								// 	if (cats.primary) {
								// 		venue_image = cats.icon;
								// 		return false;
								// 	}
								// });
							}

							if(venues.location.address && venues.location.city) {
								venue_info_city = '<div style="font-size: 12px;">'+venues.location.address+'</div><div style="font-size: 12px;">'+venues.location.city+", "+venues.location.state+"</div>";
							}
							else {
								venue_info_city = "";
							}

							var html = "<span class='venue_image' style='background:#CCC;float: left; margin-right: 10px;'><img src='"+venue_image+"'></span><div>"+venues.name+"</div>"+venue_info_city;
							google.maps.event.addListener(marker, 'click', function() {
								getInfoWindowEvent(marker,html);
							});

							
					});

					
				
				
			}
		}
	);
}


