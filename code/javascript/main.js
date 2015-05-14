
var clearCookies = function() {
	/*Filler function*/
	var date = new Date();
	Cookie.remove("username");
	Cookie.remove("group");
	Cookie.remove("groupID");
	console.log("success");
	//beforeLoggedInBar();
	window.location.href = "index.php";
}