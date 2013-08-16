var db;

function sR(a,b) {
	//success
}
function fR(a,b) {
	//Opps
	console.log(b.message);
}

db = openDatabase('myCorks', '1.0', 'wineries', 2 * 1024 * 1024);

$(document).ready(function() {
	
	
	//Create some tables
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS wines(wine_id INTEGER PRIMARY KEY AUTOINCREMENT, wine_name, wine_description, wine_abv, winery_id, color_id, created_at)', null, sR, fR);
		tx.executeSql('CREATE TABLE IF NOT EXISTS winery(winery_id INTEGER PRIMARY KEY AUTOINCREMENT, winery_name, created_at)', null, sR, fR);
		tx.executeSql('CREATE TABLE IF NOT EXISTS color(color_id INTEGER PRIMARY KEY AUTOINCREMENT, color_name, created_at)', null, sR, fR);
		tx.executeSql('CREATE TABLE IF NOT EXISTS activity(activity_id INTEGER PRIMARY KEY AUTOINCREMENT, wine_id, activity_note, activity_quantity, created_at)', null, sR, fR);
	});
	db.transaction(function (tx) {
		tx.executeSql("SELECT * from color where color_name = ?", ['Red'], function (tx, res) {
				if (res.rows.length === 0) {
					var start = new Date().getTime();
					tx.executeSql("INSERT INTO color(color_name, created_at) VALUES('Red', ?)", [start], null, fR);
					tx.executeSql("INSERT INTO color(color_name, created_at) VALUES('White', ?)", [start], null, fR);
					tx.executeSql("INSERT INTO color(color_name, created_at) VALUES('Other', ?)", [start], null, fR);
				}
				else {
				// table already has values
				}
		}, fR);
	});
});

function get_color() {
	db.transaction(function (tx) {
		tx.executeSql("SELECT * from color order by color_name", null, function(tx, res) {
			if(res === 0) {
				// we already inserted
			} else {
				var len = res.rows.length;
				var code ="";
				for ( var i = 0; i < len; i++) {
					var colour_id = res.rows.item(i).color_id,
						colour_name = res.rows.item(i).color_name,
						code = code + '<option value="' + colour_id + '">' + colour_name + '</option>';
				}
				$('#color_id').html(code);
			}
		});
	});
}

get_color();