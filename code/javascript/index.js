var showinfo = function(id) {
	console.log("here", id);
	$("#" + id).show();
	$("#" + id).animate({height: "30%"}, 500);
}
var closeinfo = function(id) {
	$("#" + id).animate({height: "5%"}, 500, function() {
		$("#" + id).hide();
	});
	//$("#" + id).hide();
}