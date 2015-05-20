
var clearCookies = function() {
	/*Filler function*/
	var date = new Date();
	Cookie.remove("username");
	Cookie.remove("group");
	Cookie.remove("groupID");
	//beforeLoggedInBar();
	window.location.href = "index.php";
}