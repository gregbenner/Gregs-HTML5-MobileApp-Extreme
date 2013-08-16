window.addEventListener('load', function(e) {
	window.applicationCache.addEventListener('updateready', function(e) {
		if(window.applicationCache.status == window.applicationCache.UPDATEREADY) {
			window.applicationCache.swapCache();
			if(confirm("we have detected a new version of this site would you like to reload it?")) {
				window.location.reload();
			}
			else {
				// nothing
			}
		}
	});
});