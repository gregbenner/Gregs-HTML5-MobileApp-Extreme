function toggleBox(a) {
	
	if ($(a).is(':checked'))
	{
		$("#cellar_ques").show();
		$("#cellar_ques input").addClass("required");
	}
	else
	{
		$("#cellar_ques").hide();
		$("#cellar_ques input").removeClass("required");
	}
}



function handleForm() {
	
	var is_error = false;
	
	$("#error-msg").hide();
	
	$("#manage-form input").each(function() {
		
		$(this).prev().removeClass("error");
		
	});
	
	$("#manage-form .required").each(function() {

		if ($(this).val() == "")
		{
			//alert($(this).attr("id") + " is empty!");
			$(this).prev().addClass("error");
			is_error = true;
		}
	});
	
	
	
	if (is_error) {

		$("#error-msg").show();

		return false;
	}
	else {
		var wine_name = $("#wine_name").val();
		var winery_name = $("#winery_name").val();
		var color_id = $("#color_id").val();
		var wine_abv = $("#wine_abv").val();
		var wine_description = $("#wine_description").val();

		var qty = $("#cellar_qty").val();
		var note = $("#cellar_description").val();

		addWineActivty(wine_name, winery_name, wine_abv, color_id, $("#is_add").is(':checked'), wine_description, qty, note);
		
		$("#success-msg").show();
		$("#manage-form input").val('');
		$("#manage-form textarea").val('');


		return false;
	}
}
	