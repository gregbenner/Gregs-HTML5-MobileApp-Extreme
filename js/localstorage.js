//check if a key is set before
var keyToCheck = "books",
	newValue = "a book title";

var addLocalStorage = function(keyToCheck, newValue) {
	if (localStorage.getItem(keyToCheck)) {
		// check if key exists before setting it.
		var bookTitle = localStorage.getItems(keyToCheck);
		document.write("The book title is:" + bookTitle);
	}
	else {
		localStorage.setItem(keyToCheck, "smashing Magazine");
	}
};

var keyToKill = "";

var removeLocalStorage = function(keyToKill) {
	if (localStorage.getItem(keyToKill)) {
		localStorage.removeItem(keyToKill);
	}
};

