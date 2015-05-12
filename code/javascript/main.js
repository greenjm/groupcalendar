
var clearCookies = function() {
	/*Filler function*/
	var date = new Date();
	Cookie.remove("username");
	console.log("success");
	//beforeLoggedInBar();
	window.location.href = "index.php";
}