db = openDatabase('myCorks', '1.0', 'My Corks Database', 2 * 1024 * 1024);

function grabActivity() {
	db.transaction(function (tx) {
		tx.executeSql("SELECT wine_name, wine_description, activity_note, activity_quantity, activity_id, activity.wine_id, activity.created_at from activity INNER JOIN wines on activity.wine_id = wines.wine_id order by activity.created_at desc", null,
			function(tx, res) {
				if(res.rows.length === 0) {
					// No Results
					console.log("no activity");
				}
				else {
					// results go here
					$('#my-activity-list').listview();

					var len = res.rows.length,
						code = "",
						obj = {};

					var source = $('#activity-template').html();
					var template = Handlebars.compile(source);

					for (var i = 0; i < len; i++) {
						code += template(res.rows.item(i));
					}
					console.log(code);
					$('#my-activity-list').html(code);
					$('#my-activity-list').listview('refresh');
				}

				$('#my-activity-list').listview('refresh');
			});
	});
}

function get_color() {
	
	db.transaction(function (tx) {
		tx.executeSql("SELECT * from color order by color_name", null,
		function(tx, res) {
			if (res.rows.length == 0) {

				// this shouldn't happen - as we already inserted them.
		
			}
			else
			{	
				var len = res.rows.length;
				
				var code = "";
				
				for (var i = 0; i < len; i++){
					
					if (i == 0) {
						code = code + '<option selected="TRUE" value="'+res.rows.item(i).color_id+'">'+res.rows.item(i).color_name+'</option>';
					}
					else
					{
						code = code + '<option value="'+res.rows.item(i).color_id+'">'+res.rows.item(i).color_name+'</option>';
					}
					
					

				}
			
				$("#color_id").html(code);
			}
		},
		fR);
	});
}

/* Adding Wine Activity */

function addWineActivty(wine_name, winery_name, wine_abv, color_id, is_act, wine_description, qty, note) {
	db.transaction(function (tx) {
		
		tx.executeSql("SELECT winery_id from winery where winery_name = ?", [winery_name],
		function(tx, res) {
			if (res.rows.length == 0) {
				var start = new Date().getTime();
				tx.executeSql("INSERT INTO winery (winery_name, created_at) VALUES(?, ?)", [winery_name, start],
				function(trx,response) {
					var a = response.insertId;
					addWine(wine_name, a, wine_abv, color_id, wine_description, is_act, qty, note);
				}
				, fR);
			}
			else
			{	
				var a = res.rows.item(0).winery_id;
				addWine(wine_name, a, wine_abv, color_id, wine_description, is_act, qty, note);
				
			}
		},
		fR);
	});
}

/* Adding Wine */

function addWine(wine_name, winery_id, wine_abv, color_id, wine_description, is_act, qty, note) {
	db.transaction(function (tx) {
		var start = new Date().getTime();
		tx.executeSql("INSERT into wines (wine_name, wine_description, wine_abv, winery_id, color_id, created_at) values (?,?,?,?,?, ?)", [wine_name, wine_description, wine_abv, winery_id, color_id, start],
		function(tx, res) {
			var a = res.insertId;
			if (is_act) {
				addActivity(a, qty, note);
			}
			
		},
		fR);
	});
}

/* Add Activity */

function addActivity(wine_id, activity_qty, activity_note) {
	db.transaction(function (tx) {
		var start = new Date().getTime();
		tx.executeSql("INSERT into activity (wine_id, activity_quantity, activity_note, created_at) values (?,?,?,?)", [wine_id, activity_qty, activity_note, start],
		function(tx, res) {
			//return last_id("activity_id", "activity");
		},
		fR);
	});
}
