var map,
	db,
	lat,
	lng,
	infowindow = new google.maps.InfoWindow();

$('#my-activity-list').listview();

$(window).bind('hashchange', function(e) {
	newHash = window.location.hash.substring(1);
	
	if (newHash == "find") {
		if ($.trim($("#map").html()) === "") {
			var lastTime = myStorage.get("lastGeo");
			if (lastTime) {
				var currentTime = new Date().getTime();
				var subtract = parseInt(currentTime, 10) - parseInt(lastTime, 10);
				if(subtract > 250) {
					console.log("need a new position");
					navigator.geolocation.getCurrentPosition(successPosition, errorPosition);
				}
				else {
					console.log("got an old one");
					navigator.geolocation.getCurrentPosition(successPosition, errorPosition);
				}
			}
			else {
				navigator.geolocation.getCurrentPosition(successPosition, errorPosition);
			}
			
		}
		else if (newHash === "activity") {
			grabActivity();
		}
	}
	else {
		grabActivity();
	}
	e.preventDefault();
});

var myStorage = {
	set: function(a,b) {
		var val = "";
		if (typeof b == "object") {
			val = JSON.stringify(b);
		}
		else {
			val = b;
		}
		localStorage.setItem(a,val);
	},
	remove: function(a) {
		localStorage.setItem(a, "");
	},
	get: function(a, b) {
		if(b == "JSON") {
			return JSON.parse(localStorage.getItem(a));
		}
		else {
			return localStorage.getItem(a);
		}
	},
	clear: function() {
		localStorage.clear();
	}
};

var currentTime = function() {
	return new Date().getTime();
};

$(document).ready(function(){
	
	
		
	
	
	db.transaction(function (tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS wines (wine_id INTEGER PRIMARY KEY AUTOINCREMENT, wine_name, wine_description, wine_abv, winery_id, color_id, created_at DATETIME)", null, sR, fR);
		tx.executeSql("CREATE TABLE IF NOT EXISTS winery (winery_id INTEGER PRIMARY KEY AUTOINCREMENT, winery_name, created_at DATETIME)", null, sR, fR);
		tx.executeSql('CREATE TABLE IF NOT EXISTS color (color_id INTEGER PRIMARY KEY AUTOINCREMENT, color_name, created_at DATETIME)', null, sR, fR);
		tx.executeSql('CREATE TABLE IF NOT EXISTS activity (activity_id INTEGER PRIMARY KEY AUTOINCREMENT, wine_id, activity_note, activity_quantity, created_at DATETIME)', null, sR, fR);
	});
	
	db.transaction(function (tx) {
		tx.executeSql("SELECT * from color where color_name = ?", ['Red'],
		function(tx, res) {
			if (res.rows.length == 0) {
				
				var start = new Date().getTime();
				
				tx.executeSql("INSERT INTO color (color_name, created_at) VALUES('White', ?)", [start], null, fR);
				tx.executeSql("INSERT INTO color (color_name, created_at) VALUES('Red', ?)", [start], null, fR);
				tx.executeSql("INSERT INTO color (color_name, created_at) VALUES('Other', ?)", [start], null, fR);
	
				get_color();
			}
			else
			{	
				get_color();
			}
		},
		fR);
	});
	
});

function sR(a,b){

	// The query was successfully!
}

function fR(a,b){
	// Oops! There was an issue let's alert it the user.
	
	alert(b.message);
}