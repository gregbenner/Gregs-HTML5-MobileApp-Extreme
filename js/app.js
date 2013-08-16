var geoLocation = function() {
		if (navigator.geolocation) {
		var options = {
			enableAccuracy: true
		};
		navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		}
		else {
			var content = document.getElementById("content");
			content.innerHTML("Geolocation is not enabled on your browser");
		}
	
	//Success
	function onSuccess(position) {
		var content = document.getElementById("content");
		var message = "";
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		content.innerHTML = "your latitude is: <strong>" + lat + "</strong> and your longitude is: <strong>" + lng + "</strong>";
	}
	function onError(error) {
		// var content = document.getElementById("content");
		// var message = "";
		// var lat = position.coords.latitude;
		// var lng = position.coords.longitude;
		// content.innerHTML = "error";
		content.innerHTML = "error";
	}

};