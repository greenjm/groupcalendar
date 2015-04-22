var showinfo = function(id) {
	console.log("here", id);
	$("#" + id).show();
	$("#" + id).animate({height: "30%"}, 750);
}
var closeinfo = function(id) {
		$("#" + id).hide();
	});
	//$("#" + id).hide();
}